"use client";

import { createContext, useContext, useEffect, useState, useRef, useCallback, ReactNode } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { geolocationStorage } from "@/lib/geolocation-storage";
import { geocoding } from "@/lib/geocoding";
import { throttle, isSignificantMovement } from "@/lib/location-utils";
import { GeolocationError } from "@/lib/geolocation-errors";
import { FallbackLocationCard } from "./FallbackLocationCard";

interface LocationContextType {
  position: {
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null;
  address: string | null;
  isLoading: boolean;
  error: GeolocationError | null;
  permissionStatus: PermissionState | null;
  hasPermission: boolean;
  requestPermission: () => Promise<void>;
  getCurrentLocation: () => Promise<void>;
  clearLocation: () => void;
  showFallback: boolean;
  retryLocation: () => Promise<void>;
  // Real-time location properties
  isWatching: boolean;
  startWatching: () => void;
  stopWatching: () => void;
  lastUpdate: Date | null;
  movementDistance: number | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [movementDistance, setMovementDistance] = useState<number | null>(null);
  
  const watchIdRef = useRef<number | null>(null);
  const lastPositionRef = useRef<{ latitude: number; longitude: number } | null>(null);
  
  const {
    position,
    error,
    isLoading,
    permissionStatus,
    requestPermission: requestGeolocationPermission,
    getCurrentPosition,
    watchPosition,
    clearWatch,
  } = useGeolocation();

  // Check if we have stored permission status
  useEffect(() => {
    const storedPermission = geolocationStorage.getPermissionStatus();
    if (storedPermission === "granted") {
      setHasPermission(true);
    }
  }, []);

  // Update hasPermission and showFallback when permissionStatus changes
  useEffect(() => {
    if (permissionStatus === "granted") {
      setHasPermission(true);
      setShowFallback(false);
      geolocationStorage.setPermissionStatus("granted");
    } else if (permissionStatus === "denied") {
      setHasPermission(false);
      setShowFallback(true);
      geolocationStorage.setPermissionStatus("denied");
    }
  }, [permissionStatus]);

  // Show fallback when there's an error
  useEffect(() => {
    if (error) {
      setShowFallback(true);
    }
  }, [error]);

  // Throttled function to update address
  const throttledUpdateAddress = useCallback(
    throttle(async (lat: number, lng: number) => {
      try {
        const newAddress = await geocoding.reverseGeocode(lat, lng);
        if (newAddress) {
          setAddress(newAddress);
        }
      } catch (error) {
        console.error("Error getting address:", error);
      }
    }, 1000), // Throttle to 1 Hz
    []
  );

  // Store position and get address when it changes
  useEffect(() => {
    if (position) {
      setShowFallback(false);
      const { latitude, longitude } = position.coords;
      
      // Calculate movement distance
      if (lastPositionRef.current) {
        const distance = calculateDistance(
          lastPositionRef.current.latitude,
          lastPositionRef.current.longitude,
          latitude,
          longitude
        );
        setMovementDistance(distance);
      } else {
        setMovementDistance(null);
      }
      
      // Update last position
      lastPositionRef.current = { latitude, longitude };
      
      // Store position
      geolocationStorage.setLastPosition(latitude, longitude);
      
      // Update timestamp
      setLastUpdate(new Date());
      
      // Get address from coordinates (throttled)
      throttledUpdateAddress(latitude, longitude);
    }
  }, [position, throttledUpdateAddress]);

  // Cleanup watcher on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [clearWatch]);

  const requestPermission = async (): Promise<void> => {
    try {
      setShowFallback(false);
      const status = await requestGeolocationPermission();
      if (status === "granted") {
        setHasPermission(true);
        await getCurrentLocation();
      } else {
        setShowFallback(true);
      }
    } catch (err) {
      console.error("Error requesting permission:", err);
      setShowFallback(true);
    }
  };

  const getCurrentLocation = async (): Promise<void> => {
    try {
      setShowFallback(false);
      await getCurrentPosition();
    } catch (err) {
      console.error("Error getting current location:", err);
      setShowFallback(true);
    }
  };

  const clearLocation = (): void => {
    geolocationStorage.clear();
    setAddress(null);
    setHasPermission(false);
    setShowFallback(true);
    setIsWatching(false);
    setLastUpdate(null);
    setMovementDistance(null);
    lastPositionRef.current = null;
    
    // Clear watcher
    if (watchIdRef.current !== null) {
      clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  const retryLocation = async (): Promise<void> => {
    setShowFallback(false);
    await requestPermission();
  };

  // Start watching location with throttling and distance filtering
  const startWatching = useCallback(() => {
    if (!hasPermission || isWatching) return;

    try {
      setIsWatching(true);
      
      const throttledPositionHandler = throttle((newPosition: any) => {
        const { latitude, longitude } = newPosition.coords;
        
        // Check if movement is significant (5 meters minimum)
        if (lastPositionRef.current && !isSignificantMovement(lastPositionRef.current, { latitude, longitude }, 5)) {
          return; // Ignore small movements
        }
        
        // Update position (this will trigger the useEffect above)
        // The position will be set by the watchPosition callback
      }, 1000); // Throttle to 1 Hz

      watchIdRef.current = watchPosition(throttledPositionHandler);
    } catch (err) {
      console.error("Error starting location watch:", err);
      setIsWatching(false);
    }
  }, [hasPermission, isWatching, watchPosition]);

  // Stop watching location
  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsWatching(false);
  }, [clearWatch]);

  const contextValue: LocationContextType = {
    position: position ? {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
    } : null,
    address,
    isLoading,
    error,
    permissionStatus,
    hasPermission,
    requestPermission,
    getCurrentLocation,
    clearLocation,
    showFallback,
    retryLocation,
    // Real-time location properties
    isWatching,
    startWatching,
    stopWatching,
    lastUpdate,
    movementDistance,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}

// Helper function to calculate distance (moved from location-utils for internal use)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
} 
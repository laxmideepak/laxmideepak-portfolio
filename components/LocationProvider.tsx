"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GeolocationError } from '@/lib/geolocation-errors';

// Dallas, Texas coordinates
const DALLAS_COORDINATES = {
  latitude: 32.7767,
  longitude: -96.7970,
  accuracy: 10
};

// Dallas address
const DALLAS_ADDRESS = "Dallas, Texas, United States";

interface LocationContextType {
  // Static location data
  position: typeof DALLAS_COORDINATES | null;
  address: string | null;
  isLoading: boolean;
  error: GeolocationError | null;
  hasPermission: boolean;
  showFallback: boolean;
  
  // Simplified actions (no real geolocation)
  requestPermission: () => Promise<void>;
  clearLocation: () => void;
  retryLocation: () => void;
  
  // Real-time tracking (disabled)
  isWatching: boolean;
  startWatching: () => void;
  stopWatching: () => void;
  lastUpdate: Date | null;
  movementDistance: number | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState<typeof DALLAS_COORDINATES | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [hasPermission, setHasPermission] = useState(true); // Always true for static location
  const [showFallback, setShowFallback] = useState(false);
  
  // Real-time tracking states (disabled)
  const [isWatching, setIsWatching] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [movementDistance, setMovementDistance] = useState<number | null>(null);

  // Initialize with Dallas location
  useEffect(() => {
    const initializeDallasLocation = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Set Dallas coordinates
        setPosition(DALLAS_COORDINATES);
        
        // Set Dallas address
        setAddress(DALLAS_ADDRESS);
        
        // Set last update to now
        setLastUpdate(new Date());
        
        setShowFallback(false);
      } catch (err) {
        console.error('Failed to initialize Dallas location:', err);
        setError({
          code: 0,
          message: 'Failed to load Dallas location',
          userMessage: 'Unable to display Dallas location',
          type: 'unknown',
          canRetry: true,
          requiresUserAction: false
        });
        setShowFallback(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDallasLocation();
  }, []);

  // Simplified permission request (always succeeds)
  const requestPermission = useCallback(async () => {
    setHasPermission(true);
    setPosition(DALLAS_COORDINATES);
    setAddress(DALLAS_ADDRESS);
    setLastUpdate(new Date());
    setShowFallback(false);
  }, []);

  // Clear location (resets to Dallas)
  const clearLocation = useCallback(() => {
    setPosition(null);
    setAddress(null);
    setLastUpdate(null);
    setMovementDistance(null);
    setIsWatching(false);
  }, []);

  // Retry location (resets to Dallas)
  const retryLocation = useCallback(() => {
    setPosition(DALLAS_COORDINATES);
    setAddress(DALLAS_ADDRESS);
    setLastUpdate(new Date());
    setShowFallback(false);
    setError(null);
  }, []);

  // Disabled real-time tracking functions
  const startWatching = useCallback(() => {
    console.log('Real-time tracking disabled - showing static Dallas location');
    setIsWatching(false);
  }, []);

  const stopWatching = useCallback(() => {
    setIsWatching(false);
  }, []);

  const value: LocationContextType = {
    position,
    address,
    isLoading,
    error,
    hasPermission,
    showFallback,
    requestPermission,
    clearLocation,
    retryLocation,
    isWatching,
    startWatching,
    stopWatching,
    lastUpdate,
    movementDistance,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
} 
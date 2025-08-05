"use client";

import { useState, useEffect, useCallback } from "react";
import { formatGeolocationError, isSecureContext, getInsecureContextError, GeolocationError } from "@/lib/geolocation-errors";

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

interface UseGeolocationReturn {
  position: GeolocationPosition | null;
  error: GeolocationError | null;
  isLoading: boolean;
  permissionStatus: PermissionState | null;
  requestPermission: () => Promise<PermissionState>;
  getCurrentPosition: () => Promise<GeolocationPosition>;
  watchPosition: (callback: (position: GeolocationPosition) => void) => number;
  clearWatch: (watchId: number) => void;
}

const GEOLOCATION_TIMEOUT = 10000; // 10 seconds
const GEOLOCATION_MAX_AGE = 60000; // 1 minute

export function useGeolocation(): UseGeolocationReturn {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);

  // Check if geolocation is supported
  const isGeolocationSupported = typeof navigator !== "undefined" && "geolocation" in navigator;

  // Check for secure context
  const checkSecureContext = useCallback(() => {
    if (!isSecureContext()) {
      const insecureError = getInsecureContextError();
      setError(insecureError);
      return false;
    }
    return true;
  }, []);

  // Get current permission status
  const getPermissionStatus = useCallback(async (): Promise<PermissionState> => {
    if (!isGeolocationSupported) {
      throw new Error("Geolocation is not supported in this browser");
    }

    if (!checkSecureContext()) {
      throw new Error("Geolocation requires a secure context (HTTPS)");
    }

    try {
      const permission = await navigator.permissions.query({ name: "geolocation" as PermissionName });
      setPermissionStatus(permission.state);
      return permission.state;
    } catch (err) {
      console.warn("Could not query geolocation permission:", err);
      return "prompt";
    }
  }, [isGeolocationSupported, checkSecureContext]);

  // Request permission
  const requestPermission = useCallback(async (): Promise<PermissionState> => {
    if (!isGeolocationSupported) {
      throw new Error("Geolocation is not supported in this browser");
    }

    if (!checkSecureContext()) {
      throw new Error("Geolocation requires a secure context (HTTPS)");
    }

    setIsLoading(true);
    setError(null);

    try {
      const status = await getPermissionStatus();
      setPermissionStatus(status);
      return status;
    } catch (err) {
      const geolocationError: GeolocationError = {
        code: 2, // POSITION_UNAVAILABLE
        message: "Failed to get permission status",
        userMessage: "Unable to check location permissions. Please ensure you're using HTTPS.",
        type: 'unavailable',
        canRetry: true,
        requiresUserAction: false,
      };
      setError(geolocationError);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isGeolocationSupported, getPermissionStatus, checkSecureContext]);

  // Get current position
  const getCurrentPosition = useCallback((): Promise<GeolocationPosition> => {
    if (!isGeolocationSupported) {
      throw new Error("Geolocation is not supported in this browser");
    }

    if (!checkSecureContext()) {
      throw new Error("Geolocation requires a secure context (HTTPS)");
    }

    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: GEOLOCATION_TIMEOUT,
        maximumAge: GEOLOCATION_MAX_AGE,
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const position: GeolocationPosition = {
            coords: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              altitude: pos.coords.altitude,
              altitudeAccuracy: pos.coords.altitudeAccuracy,
              heading: pos.coords.heading,
              speed: pos.coords.speed,
            },
            timestamp: pos.timestamp,
          };
          setPosition(position);
          setIsLoading(false);
          resolve(position);
        },
        (err) => {
          const geolocationError = formatGeolocationError(err);
          setError(geolocationError);
          setIsLoading(false);
          reject(geolocationError);
        },
        options
      );
    });
  }, [isGeolocationSupported, checkSecureContext]);

  // Watch position
  const watchPosition = useCallback((callback: (position: GeolocationPosition) => void): number => {
    if (!isGeolocationSupported) {
      throw new Error("Geolocation is not supported in this browser");
    }

    if (!checkSecureContext()) {
      throw new Error("Geolocation requires a secure context (HTTPS)");
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: GEOLOCATION_TIMEOUT,
      maximumAge: GEOLOCATION_MAX_AGE,
    };

    return navigator.geolocation.watchPosition(
      (pos) => {
        const position: GeolocationPosition = {
          coords: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            altitude: pos.coords.altitude,
            altitudeAccuracy: pos.coords.altitudeAccuracy,
            heading: pos.coords.heading,
            speed: pos.coords.speed,
          },
          timestamp: pos.timestamp,
        };
        setPosition(position);
        callback(position);
      },
      (err) => {
        const geolocationError = formatGeolocationError(err);
        setError(geolocationError);
      },
      options
    );
  }, [isGeolocationSupported, checkSecureContext]);

  // Clear watch
  const clearWatch = useCallback((watchId: number): void => {
    if (isGeolocationSupported) {
      navigator.geolocation.clearWatch(watchId);
    }
  }, [isGeolocationSupported]);

  // Initialize permission status on mount
  useEffect(() => {
    if (isGeolocationSupported) {
      getPermissionStatus().catch(console.warn);
    }
  }, [isGeolocationSupported, getPermissionStatus]);

  return {
    position,
    error,
    isLoading,
    permissionStatus,
    requestPermission,
    getCurrentPosition,
    watchPosition,
    clearWatch,
  };
} 
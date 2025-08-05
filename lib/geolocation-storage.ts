const GEOLOCATION_PERMISSION_KEY = "geolocation_permission_status";
const GEOLOCATION_POSITION_KEY = "geolocation_last_position";

interface StoredPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export const geolocationStorage = {
  // Store permission status
  setPermissionStatus: (status: PermissionState): void => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(GEOLOCATION_PERMISSION_KEY, status);
      } catch (error) {
        console.warn("Failed to store geolocation permission status:", error);
      }
    }
  },

  // Get stored permission status
  getPermissionStatus: (): PermissionState | null => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(GEOLOCATION_PERMISSION_KEY);
        return stored as PermissionState | null;
      } catch (error) {
        console.warn("Failed to retrieve geolocation permission status:", error);
        return null;
      }
    }
    return null;
  },

  // Store last known position
  setLastPosition: (latitude: number, longitude: number): void => {
    if (typeof window !== "undefined") {
      try {
        const position: StoredPosition = {
          latitude,
          longitude,
          timestamp: Date.now(),
        };
        localStorage.setItem(GEOLOCATION_POSITION_KEY, JSON.stringify(position));
      } catch (error) {
        console.warn("Failed to store geolocation position:", error);
      }
    }
  },

  // Get stored last position
  getLastPosition: (): StoredPosition | null => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(GEOLOCATION_POSITION_KEY);
        if (stored) {
          const position: StoredPosition = JSON.parse(stored);
          // Check if position is not too old (24 hours)
          const isRecent = Date.now() - position.timestamp < 24 * 60 * 60 * 1000;
          return isRecent ? position : null;
        }
      } catch (error) {
        console.warn("Failed to retrieve geolocation position:", error);
      }
    }
    return null;
  },

  // Clear stored data
  clear: (): void => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(GEOLOCATION_PERMISSION_KEY);
        localStorage.removeItem(GEOLOCATION_POSITION_KEY);
      } catch (error) {
        console.warn("Failed to clear geolocation storage:", error);
      }
    }
  },
}; 
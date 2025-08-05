// Location utility functions for real-time updates

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
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

// Throttle function to limit function calls
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// Debounce function to delay function calls
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Check if movement is significant enough to warrant an update
export function isSignificantMovement(
  oldCoords: Coordinates | null,
  newCoords: Coordinates,
  minDistance: number = 5 // 5 meters default
): boolean {
  if (!oldCoords) return true; // First position is always significant

  const distance = calculateDistance(
    oldCoords.latitude,
    oldCoords.longitude,
    newCoords.latitude,
    newCoords.longitude
  );

  return distance >= minDistance;
}

// Format distance for display
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  } else {
    return `${(meters / 1000).toFixed(1)}km`;
  }
}

// Format accuracy for display
export function formatAccuracy(accuracy: number): string {
  if (accuracy < 10) {
    return "High";
  } else if (accuracy < 50) {
    return "Medium";
  } else {
    return "Low";
  }
} 
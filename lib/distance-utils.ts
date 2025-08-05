// Distance calculation utilities for Dallas location

// Dallas coordinates (approximate center of Dallas)
export const DALLAS_COORDINATES = {
  latitude: 32.7767,
  longitude: -96.7970,
} as const;

// Distance threshold for showing remote connection CTA (50 km)
export const REMOTE_CONNECTION_THRESHOLD_KM = 50;

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
  const R = 6371; // Earth's radius in kilometers
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}

// Calculate distance from Dallas
export function calculateDistanceFromDallas(userCoords: Coordinates): number {
  return calculateDistance(
    userCoords.latitude,
    userCoords.longitude,
    DALLAS_COORDINATES.latitude,
    DALLAS_COORDINATES.longitude
  );
}

// Check if user is far enough from Dallas to show remote connection CTA
export function isUserFarFromDallas(userCoords: Coordinates): boolean {
  const distance = calculateDistanceFromDallas(userCoords);
  return distance > REMOTE_CONNECTION_THRESHOLD_KM;
}

// Format distance for display
export function formatDistanceFromDallas(userCoords: Coordinates): string {
  const distance = calculateDistanceFromDallas(userCoords);
  
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m from Dallas`;
  } else if (distance < 10) {
    return `${distance.toFixed(1)}km from Dallas`;
  } else {
    return `${Math.round(distance)}km from Dallas`;
  }
}

// Get distance category for styling
export function getDistanceCategory(userCoords: Coordinates): 'local' | 'nearby' | 'remote' {
  const distance = calculateDistanceFromDallas(userCoords);
  
  if (distance <= 10) {
    return 'local'; // Within 10km
  } else if (distance <= 50) {
    return 'nearby'; // Within 50km
  } else {
    return 'remote'; // Beyond 50km
  }
}

// Get appropriate message based on distance
export function getDistanceMessage(userCoords: Coordinates): string {
  const distance = calculateDistanceFromDallas(userCoords);
  
  if (distance <= 10) {
    return "You're in the Dallas area! Let's meet up! 🤝";
  } else if (distance <= 50) {
    return "You're nearby! We could meet halfway! 🚗";
  } else {
    return "👋 Let's connect remotely!";
  }
}

// Get CTA button text based on distance
export function getCTAText(userCoords: Coordinates): string {
  const distance = calculateDistanceFromDallas(userCoords);
  
  if (distance <= 10) {
    return "Meet in Dallas";
  } else if (distance <= 50) {
    return "Meet Halfway";
  } else {
    return "Connect Remotely";
  }
}

// Get CTA variant based on distance
export function getCTAVariant(userCoords: Coordinates): 'default' | 'secondary' | 'outline' {
  const distance = calculateDistanceFromDallas(userCoords);
  
  if (distance <= 10) {
    return 'default'; // Local - primary action
  } else if (distance <= 50) {
    return 'secondary'; // Nearby - secondary action
  } else {
    return 'outline'; // Remote - tertiary action
  }
} 
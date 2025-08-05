// Geolocation error handling utilities

export interface GeolocationError {
  code: number;
  message: string;
  userMessage: string;
  type: 'timeout' | 'denied' | 'unavailable' | 'insecure' | 'unknown';
  canRetry: boolean;
  requiresUserAction: boolean;
}

// Geolocation error codes
export const GEOLOCATION_ERROR_CODES = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
} as const;

// Convert geolocation error to user-friendly format
export function formatGeolocationError(error: GeolocationPositionError): GeolocationError {
  switch (error.code) {
    case GEOLOCATION_ERROR_CODES.PERMISSION_DENIED:
      return {
        code: error.code,
        message: error.message,
        userMessage: "Location access was denied. Please enable location permissions in your browser settings to use this feature.",
        type: 'denied',
        canRetry: false,
        requiresUserAction: true,
      };

    case GEOLOCATION_ERROR_CODES.POSITION_UNAVAILABLE:
      return {
        code: error.code,
        message: error.message,
        userMessage: "Unable to determine your location. This might be due to poor GPS signal or network issues. Please try again.",
        type: 'unavailable',
        canRetry: true,
        requiresUserAction: false,
      };

    case GEOLOCATION_ERROR_CODES.TIMEOUT:
      return {
        code: error.code,
        message: error.message,
        userMessage: "Location request timed out. Please check your internet connection and try again.",
        type: 'timeout',
        canRetry: true,
        requiresUserAction: false,
      };

    default:
      return {
        code: error.code,
        message: error.message,
        userMessage: "An unexpected error occurred while getting your location. Please try again.",
        type: 'unknown',
        canRetry: true,
        requiresUserAction: false,
      };
  }
}

// Check if the current context is secure (HTTPS)
export function isSecureContext(): boolean {
  if (typeof window === "undefined") return false;
  return window.isSecureContext || window.location.protocol === 'https:';
}

// Get error message for insecure context
export function getInsecureContextError(): GeolocationError {
  return {
    code: 0,
    message: "Geolocation requires a secure context (HTTPS)",
    userMessage: "Location access requires a secure connection (HTTPS). Please access this site over a secure connection.",
    type: 'insecure',
    canRetry: false,
    requiresUserAction: true,
  };
}

// Get browser-specific guidance for enabling location
export function getBrowserLocationGuidance(): string {
  if (typeof navigator === "undefined") return "";

  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('chrome')) {
    return "Chrome: Settings → Privacy and security → Site Settings → Location → Allow";
  } else if (userAgent.includes('firefox')) {
    return "Firefox: Settings → Privacy & Security → Permissions → Location → Settings";
  } else if (userAgent.includes('safari')) {
    return "Safari: Safari → Preferences → Websites → Location → Allow";
  } else if (userAgent.includes('edge')) {
    return "Edge: Settings → Cookies and site permissions → Location → Allow";
  } else {
    return "Check your browser settings and enable location permissions";
  }
}

// Get retry guidance based on error type
export function getRetryGuidance(error: GeolocationError): string {
  switch (error.type) {
    case 'timeout':
      return "Try moving to an area with better GPS signal or check your internet connection.";
    case 'unavailable':
      return "Try refreshing the page or moving to an area with better GPS coverage.";
    case 'denied':
      return "You'll need to enable location permissions in your browser settings first.";
    case 'insecure':
      return "Access this site over HTTPS to enable location features.";
    default:
      return "Try refreshing the page or check your browser settings.";
  }
}

// Check if error can be resolved by user action
export function isUserResolvableError(error: GeolocationError): boolean {
  return error.type === 'denied' || error.type === 'insecure';
}

// Get action button text based on error type
export function getActionButtonText(error: GeolocationError): string {
  switch (error.type) {
    case 'denied':
      return "Enable Location";
    case 'insecure':
      return "Use HTTPS";
    case 'timeout':
    case 'unavailable':
    default:
      return "Try Again";
  }
} 
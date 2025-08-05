/**
 * Environment variable validation utilities
 */

export const validateMapboxToken = (): string | null => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  if (!token) {
    console.error("NEXT_PUBLIC_MAPBOX_TOKEN is not set");
    return null;
  }
  
  if (token === "your_mapbox_token_here") {
    console.error("Please replace the placeholder Mapbox token with your actual token");
    return null;
  }
  
  // Basic validation for Mapbox token format
  if (!token.startsWith("pk.") && !token.startsWith("sk.")) {
    console.error("Invalid Mapbox token format");
    return null;
  }
  
  return token;
};

export const validateEnvironment = (): boolean => {
  const requiredVars = [
    "NEXT_PUBLIC_MAPBOX_TOKEN",
  ];
  
  const missingVars = requiredVars.filter(
    (varName) => !process.env[varName] || process.env[varName] === "your_mapbox_token_here"
  );
  
  if (missingVars.length > 0) {
    console.error("Missing required environment variables:", missingVars);
    return false;
  }
  
  return true;
};

export const getMapboxConfig = () => {
  const token = validateMapboxToken();
  
  if (!token) {
    throw new Error("Mapbox token is not properly configured");
  }
  
  return {
    token,
    style: "mapbox://styles/mapbox/streets-v12",
    attributionControl: false,
  };
};

// Security configuration
export const securityConfig = {
  // Content Security Policy for Mapbox
  csp: {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://api.mapbox.com"],
    "style-src": ["'self'", "'unsafe-inline'", "https://api.mapbox.com"],
    "img-src": ["'self'", "data:", "https://api.mapbox.com", "https://*.mapbox.com"],
    "connect-src": ["'self'", "https://api.mapbox.com", "https://*.mapbox.com"],
    "frame-src": ["'self'"],
  },
  
  // HTTPS enforcement
  httpsOnly: process.env.NODE_ENV === "production",
  
  // Domain restrictions (to be configured in Mapbox dashboard)
  allowedDomains: [
    "localhost:3000",
    "laxmideepak-portfolio.vercel.app",
  ],
}; 
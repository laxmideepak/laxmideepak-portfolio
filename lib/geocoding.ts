/**
 * Reverse geocoding utilities using Nominatim API
 */

interface GeocodingResult {
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
}

interface CachedGeocodingResult {
  address: string;
  timestamp: number;
}

const GEOCODING_CACHE_KEY = "geocoding_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const geocoding = {
  // Reverse geocode coordinates to address
  async reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
    try {
      // Check cache first
      const cached = this.getCachedResult(latitude, longitude);
      if (cached) {
        return cached;
      }

      // Call Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'Laxmideepak-Portfolio/1.0',
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status}`);
      }

      const data: GeocodingResult = await response.json();
      
      // Format the address
      const address = this.formatAddress(data);
      
      // Cache the result
      this.cacheResult(latitude, longitude, address);
      
      return address;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return null;
    }
  },

  // Format address from Nominatim result
  formatAddress(data: GeocodingResult): string {
    const { address } = data;
    
    const parts = [];
    
    if (address.house_number && address.road) {
      parts.push(`${address.house_number} ${address.road}`);
    } else if (address.road) {
      parts.push(address.road);
    }
    
    if (address.city) {
      parts.push(address.city);
    }
    
    if (address.state) {
      parts.push(address.state);
    }
    
    if (address.country) {
      parts.push(address.country);
    }
    
    return parts.length > 0 ? parts.join(", ") : data.display_name;
  },

  // Cache geocoding result
  cacheResult(latitude: number, longitude: number, address: string): void {
    if (typeof window === "undefined") return;

    try {
      const cache = this.getCache();
      const key = `${latitude.toFixed(6)},${longitude.toFixed(6)}`;
      
      cache[key] = {
        address,
        timestamp: Date.now(),
      };
      
      localStorage.setItem(GEOCODING_CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.warn("Failed to cache geocoding result:", error);
    }
  },

  // Get cached result
  getCachedResult(latitude: number, longitude: number): string | null {
    if (typeof window === "undefined") return null;

    try {
      const cache = this.getCache();
      const key = `${latitude.toFixed(6)},${longitude.toFixed(6)}`;
      const cached = cache[key];
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.address;
      }
      
      return null;
    } catch (error) {
      console.warn("Failed to get cached geocoding result:", error);
      return null;
    }
  },

  // Get cache object
  getCache(): Record<string, CachedGeocodingResult> {
    if (typeof window === "undefined") return {};

    try {
      const cached = localStorage.getItem(GEOCODING_CACHE_KEY);
      return cached ? JSON.parse(cached) : {};
    } catch (error) {
      console.warn("Failed to get geocoding cache:", error);
      return {};
    }
  },

  // Clear cache
  clearCache(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(GEOCODING_CACHE_KEY);
    } catch (error) {
      console.warn("Failed to clear geocoding cache:", error);
    }
  },
}; 
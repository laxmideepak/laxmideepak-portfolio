"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface MapboxMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  className?: string;
}

// Dynamic import for Mapbox GL JS to enable lazy loading
const MapboxMapComponent = ({ latitude, longitude, zoom = 12, className }: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const initMap = async () => {
      try {
        // Dynamically import mapbox-gl
        const mapboxgl = await import("mapbox-gl");
        
        // Set access token with validation
        const { validateMapboxToken } = await import("@/lib/env-validation");
        const token = validateMapboxToken();
        if (!token) {
          setError("Mapbox token not configured. Please add your token to .env.local");
          setIsLoading(false);
          return;
        }
        
        (mapboxgl as any).accessToken = token;

        // Initialize map
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [longitude, latitude],
          zoom: zoom,
          attributionControl: false,
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        // Add custom user location marker
        const markerElement = document.createElement("div");
        markerElement.className = "custom-user-marker";
        
        // Create React component for the marker
        const marker = new mapboxgl.Marker({
          element: markerElement,
          anchor: "bottom",
        })
          .setLngLat([longitude, latitude])
          .addTo(map.current);

        // Render our custom marker component
        const renderCustomMarker = () => {
          const markerContainer = document.createElement("div");
          markerContainer.className = "w-8 h-8";
          
          // Create the marker content
          const markerContent = `
            <div class="relative flex items-center justify-center transform -translate-x-1/2 -translate-y-full w-8 h-8" role="img" aria-label="Your location at coordinates ${latitude}, ${longitude}" aria-live="polite">
              <div class="absolute inset-0">
                <div class="absolute inset-0 rounded-full border-2 animate-ping opacity-75 border-blue-500"></div>
                <div class="absolute inset-0 rounded-full border-2 animate-ping opacity-50 animation-delay-300 border-blue-500"></div>
              </div>
              <div class="relative z-10 flex items-center justify-center bg-white dark:bg-gray-900 rounded-full shadow-lg border-2 border-white dark:border-gray-800 w-8 h-8">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse-blue drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
            </div>
          `;
          
          markerContainer.innerHTML = markerContent;
          markerElement.appendChild(markerContainer);
        };

        renderCustomMarker();

        // Add custom CSS animations for the marker
        if (!document.getElementById("mapbox-custom-marker-styles")) {
          const style = document.createElement("style");
          style.id = "mapbox-custom-marker-styles";
          style.textContent = `
            @keyframes pulse-blue {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            .animate-pulse-blue {
              animation: pulse-blue 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            .animation-delay-300 {
              animation-delay: 300ms;
            }
          `;
          document.head.appendChild(style);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing map:", err);
        setError("Failed to load map. Please check your internet connection.");
        setIsLoading(false);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [latitude, longitude, zoom]);

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-48 text-red-600">
            <div className="text-center">
              <p className="text-sm">{error}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Please configure your Mapbox token in .env.local
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        {isLoading && (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
        <div 
          ref={mapContainer} 
          className={`w-full h-48 ${isLoading ? 'hidden' : ''}`}
          style={{ minHeight: isLoading ? 0 : '12rem' }}
        />
      </CardContent>
    </Card>
  );
};

// Export with dynamic import for lazy loading
export default MapboxMapComponent; 
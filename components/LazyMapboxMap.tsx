"use client";

import { useEffect, useState } from "react";
import { validateMapboxToken } from "@/lib/env-validation";

interface LazyMapboxMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  className?: string;
}

export default function LazyMapboxMap({ 
  latitude, 
  longitude, 
  zoom = 12, 
  className = "" 
}: LazyMapboxMapProps) {
  const [MapboxMap, setMapboxMap] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMapbox = async () => {
      try {
        // Validate Mapbox token first
        const token = validateMapboxToken();
        if (!token) {
          setError("Mapbox token not configured");
          setIsLoading(false);
          return;
        }

        // Dynamically import mapbox-gl
        const mapboxgl = await import("mapbox-gl");
        mapboxgl.default.accessToken = token;

        // Import the Map component
        const { default: MapComponent } = await import("./MapboxMap");
        setMapboxMap(() => MapComponent);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load Mapbox:", err);
        setError("Failed to load map");
        setIsLoading(false);
      }
    };

    loadMapbox();
  }, []);

  if (isLoading) {
    return (
      <div className={`bg-muted animate-pulse rounded-lg ${className}`}>
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-muted rounded-lg border border-dashed border-muted-foreground/30 ${className}`}>
        <div className="flex items-center justify-center h-48">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🗺️</div>
            <h3 className="font-semibold text-foreground mb-1">Map Preview</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {error === "Mapbox token not configured" 
                ? "Map display requires configuration"
                : "Map temporarily unavailable"
              }
            </p>
            {error === "Mapbox token not configured" && (
              <div className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                <p>To enable maps, add your Mapbox token to:</p>
                <code className="block mt-1 font-mono text-xs">.env.local</code>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!MapboxMap) {
    return null;
  }

  return (
    <MapboxMap
      latitude={latitude}
      longitude={longitude}
      zoom={zoom}
      className={className}
    />
  );
} 
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LazyMapboxMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  className?: string;
}

// Dynamic import with SSR disabled for Mapbox GL JS
const MapboxMapComponent = dynamic(
  () => import("./MapboxMap"),
  {
    ssr: false,
    loading: () => (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
  }
);

export default function LazyMapboxMap({ latitude, longitude, zoom, className }: LazyMapboxMapProps) {
  return (
    <Suspense
      fallback={
        <Card className={className}>
          <CardContent className="p-4">
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      }
    >
      <MapboxMapComponent
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        className={className}
      />
    </Suspense>
  );
} 
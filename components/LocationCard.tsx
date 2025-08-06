"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";
import LazyMapboxMap from "./LazyMapboxMap";
import { LoadingSpinner } from "./LoadingSpinner";
import { formatDistance, formatAccuracy } from "@/lib/location-utils";

interface LocationCardProps {
  latitude: number;
  longitude: number;
  address?: string | null;
  isLoading?: boolean;
}

export function LocationCard({ 
  latitude, 
  longitude, 
  address, 
  isLoading = false 
}: LocationCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Dallas, Texas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSpinner message="Loading Dallas location..." size="sm" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Dallas, Texas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map */}
        <div className="relative">
          <LazyMapboxMap
            latitude={latitude}
            longitude={longitude}
            zoom={12}
            className="w-full h-48 rounded-lg"
          />
        </div>

        {/* Location Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Location</span>
            <Badge variant="secondary" className="text-xs">
              Dallas, TX
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Coordinates</span>
            <span className="text-xs font-mono text-muted-foreground">
              {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </span>
          </div>

          {address && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Address</span>
              <span className="text-xs text-muted-foreground text-right max-w-[200px] truncate">
                {address}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Accuracy</span>
            <span className="text-xs text-muted-foreground">
              {formatAccuracy(10)}
            </span>
          </div>
        </div>

        {/* Navigation Link */}
        <div className="pt-2">
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Navigation className="h-4 w-4" />
            View on Google Maps
          </a>
        </div>
      </CardContent>
    </Card>
  );
} 
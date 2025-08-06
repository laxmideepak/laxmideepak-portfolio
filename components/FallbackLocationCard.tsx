"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, RefreshCw, AlertCircle } from "lucide-react";
import LazyMapboxMap from "./LazyMapboxMap";
import { GeolocationError } from "@/lib/geolocation-errors";

interface FallbackLocationCardProps {
  error?: GeolocationError | null;
  onRetry?: () => void;
}

export function FallbackLocationCard({ error, onRetry }: FallbackLocationCardProps) {
  // Dallas coordinates for fallback
  const dallasCoords = {
    latitude: 32.7767,
    longitude: -96.7970
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Dallas, Texas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map showing Dallas */}
        <div className="relative">
          <LazyMapboxMap
            latitude={dallasCoords.latitude}
            longitude={dallasCoords.longitude}
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
              {dallasCoords.latitude.toFixed(4)}, {dallasCoords.longitude.toFixed(4)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address</span>
            <span className="text-xs text-muted-foreground text-right max-w-[200px] truncate">
              Dallas, Texas, United States
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant="outline" className="text-xs">
              Static Location
            </Badge>
          </div>
        </div>

        {/* Info Message */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Static Location Display</p>
            <p>Showing Dallas, Texas location for demonstration purposes.</p>
          </div>
        </div>

        {/* Action Button */}
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Location
          </Button>
        )}
      </CardContent>
    </Card>
  );
} 
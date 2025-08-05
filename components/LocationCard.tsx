"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import LazyMapboxMap from "./LazyMapboxMap";
import { LoadingSpinner } from "./LoadingSpinner";

interface LocationCardProps {
  latitude: number;
  longitude: number;
  address?: string | null;
  className?: string;
  isLoading?: boolean;
}

export function LocationCard({ 
  latitude, 
  longitude, 
  address, 
  className,
  isLoading = false 
}: LocationCardProps) {
  return (
    <Card 
      className={cn(
        // Base styles
        "transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        "border-2 hover:border-blue-200 dark:hover:border-blue-800",
        
        // Desktop layout (≥1280px): Card floats right, 300x220px
        "xl:w-[300px] xl:h-[220px] xl:flex-shrink-0",
        
        // Tablet layout (<1280px): Card stacks below, responsive width
        "lg:w-full lg:max-w-[400px] lg:h-[200px]",
        
        // Mobile layout (≤640px): 90% width, 160px height
        "w-[90%] h-[160px] sm:w-full sm:max-w-[350px] sm:h-[180px]",
        
        // Ensure proper flex behavior
        "flex flex-col",
        
        className
      )}
      role="region"
      aria-label="Your current location"
      aria-describedby="location-address"
    >
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-pulse" aria-hidden="true" />
          You are here
        </CardTitle>
        {address && (
          <p 
            id="location-address"
            className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight"
            aria-live="polite"
          >
            {address}
          </p>
        )}
        {!address && !isLoading && (
          <p 
            className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight"
            aria-live="polite"
          >
            Getting your location...
          </p>
        )}
        {isLoading && (
          <p 
            className="text-sm text-blue-600 dark:text-blue-400 font-medium leading-tight"
            aria-live="polite"
          >
            Finding your location...
          </p>
        )}
      </CardHeader>
      
      <CardContent className="p-0 flex-1 min-h-0 relative">
        {isLoading ? (
          // Show loading spinner when loading
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
            <LoadingSpinner 
              message="Finding your location..." 
              size="sm"
              className="bg-background/90"
            />
          </div>
        ) : (
          // Show map when not loading
          <div 
            className="w-full h-full min-h-0"
            role="img"
            aria-label={`Interactive map showing your location at coordinates ${latitude}, ${longitude}`}
          >
            <LazyMapboxMap
              latitude={latitude}
              longitude={longitude}
              zoom={12}
              className="w-full h-full rounded-lg"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
} 
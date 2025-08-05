"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserLocationMarkerProps {
  latitude: number;
  longitude: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "red" | "orange";
}

export function UserLocationMarker({
  latitude,
  longitude,
  className,
  size = "md",
  color = "blue",
}: UserLocationMarkerProps) {
  const markerRef = useRef<HTMLDivElement>(null);

  // Size classes
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  // Color classes
  const colorClasses = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    red: "text-red-600 dark:text-red-400",
    orange: "text-orange-600 dark:text-orange-400",
  };

  // Pulsing animation classes
  const pulseClasses = {
    blue: "animate-pulse-blue",
    green: "animate-pulse-green",
    red: "animate-pulse-red",
    orange: "animate-pulse-orange",
  };

  return (
    <div
      ref={markerRef}
      className={cn(
        "relative flex items-center justify-center",
        "transform -translate-x-1/2 -translate-y-full", // Center the marker on the point
        sizeClasses[size],
        className
      )}
      role="img"
      aria-label={`Your location at coordinates ${latitude}, ${longitude}`}
      aria-live="polite"
    >
      {/* Pulsing rings */}
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2",
            "animate-ping opacity-75",
            {
              "border-blue-500": color === "blue",
              "border-green-500": color === "green",
              "border-red-500": color === "red",
              "border-orange-500": color === "orange",
            }
          )}
        />
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2",
            "animate-ping opacity-50",
            "animation-delay-300",
            {
              "border-blue-500": color === "blue",
              "border-green-500": color === "green",
              "border-red-500": color === "red",
              "border-orange-500": color === "orange",
            }
          )}
        />
      </div>

      {/* Main marker */}
      <div
        className={cn(
          "relative z-10 flex items-center justify-center",
          "bg-white dark:bg-gray-900 rounded-full shadow-lg",
          "border-2 border-white dark:border-gray-800",
          sizeClasses[size]
        )}
      >
        <MapPin
          className={cn(
            "drop-shadow-sm",
            colorClasses[color],
            pulseClasses[color],
            {
              "w-4 h-4": size === "sm",
              "w-5 h-5": size === "md",
              "w-7 h-7": size === "lg",
            }
          )}
          aria-hidden="true"
        />
      </div>

      {/* Tooltip */}
      <div
        className={cn(
          "absolute bottom-full left-1/2 transform -translate-x-1/2",
          "mb-2 px-2 py-1 text-xs font-medium text-white",
          "bg-gray-900 dark:bg-gray-700 rounded shadow-lg",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          "pointer-events-none whitespace-nowrap"
        )}
        role="tooltip"
      >
        You are here
      </div>
    </div>
  );
}

// Custom CSS animations for different colors
const customStyles = `
  @keyframes pulse-blue {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes pulse-green {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes pulse-red {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes pulse-orange {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .animate-pulse-blue {
    animation: pulse-blue 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-pulse-green {
    animation: pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-pulse-red {
    animation: pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-pulse-orange {
    animation: pulse-orange 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animation-delay-300 {
    animation-delay: 300ms;
  }
`;

// Add styles to document head
if (typeof document !== "undefined") {
  const styleId = "user-location-marker-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = customStyles;
    document.head.appendChild(style);
  }
} 
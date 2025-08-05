"use client";

import { Loader2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ 
  message = "Finding your location...", 
  className,
  size = "md" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center space-y-3 p-4",
        "bg-background/80 backdrop-blur-sm rounded-lg",
        "border border-border/50",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading location data"
    >
      {/* Spinner with location icon */}
      <div className="relative">
        <MapPin 
          className={cn(
            "text-blue-600 dark:text-blue-400",
            sizeClasses[size]
          )}
          aria-hidden="true"
        />
        <Loader2 
          className={cn(
            "absolute inset-0 animate-spin text-blue-600/30 dark:text-blue-400/30",
            sizeClasses[size]
          )}
          aria-hidden="true"
        />
      </div>
      
      {/* Loading message */}
      <div className="text-center">
        <p className={cn(
          "font-medium text-foreground/80",
          textSizes[size]
        )}>
          {message}
        </p>
        <p className={cn(
          "text-muted-foreground mt-1",
          textSizes[size]
        )}>
          Please wait...
        </p>
      </div>
      
      {/* Animated dots */}
      <div className="flex space-x-1">
        <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

// Overlay version for full-screen loading
export function LoadingOverlay({ 
  message = "Finding your location...",
  className 
}: Omit<LoadingSpinnerProps, 'size'>) {
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-background/90 backdrop-blur-sm",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading location data"
    >
      <LoadingSpinner message={message} size="lg" />
    </div>
  );
}

// Inline version for small spaces
export function LoadingInline({ 
  message = "Loading...",
  className 
}: Omit<LoadingSpinnerProps, 'size'>) {
  return (
    <div 
      className={cn(
        "flex items-center space-x-2",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="w-4 h-4 animate-spin text-blue-600 dark:text-blue-400" />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
} 
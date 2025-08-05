"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Shield, X } from "lucide-react";
import { useLocation } from "./LocationProvider";

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  onDeny?: () => void;
}

export function LocationPermissionModal({
  isOpen,
  onClose,
  onAccept,
  onDeny,
}: LocationPermissionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { requestPermission, isLoading: isLocationLoading, error } = useLocation();

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await requestPermission();
      onAccept?.();
      onClose();
    } catch (error) {
      console.error("Error requesting location permission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeny = () => {
    onDeny?.();
    onClose();
  };

  // Keyboard navigation handlers
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    } else if (event.key === 'Enter' && !isLoading && !isLocationLoading) {
      handleAccept();
    }
  }, [onClose, handleAccept, isLoading, isLocationLoading]);

  // Add keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-md"
        role="dialog"
        aria-labelledby="location-permission-title"
        aria-describedby="location-permission-description"
      >
        <DialogHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" aria-hidden="true" />
            <DialogTitle id="location-permission-title">Show Your Location</DialogTitle>
          </div>
          <DialogDescription id="location-permission-description" className="text-left text-gray-700 dark:text-gray-300">
            We'd like to show you where you are on the map. This helps provide a personalized experience.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div 
            className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg"
            role="status"
            aria-live="polite"
            aria-label="Privacy information"
          >
            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-medium mb-1">Privacy First</p>
              <p>Your location is only used to show your position on the map. We don't store or share this information.</p>
            </div>
          </div>

          {error && (
            <div 
              className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg"
              role="alert"
              aria-live="assertive"
              aria-label="Error message"
            >
              <X className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div className="text-sm text-red-900 dark:text-red-100">
                <p className="font-medium mb-1">Error</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={handleAccept} 
              disabled={isLoading || isLocationLoading}
              className="flex-1"
              aria-label={isLoading || isLocationLoading ? "Requesting location permission..." : "Show my location on the map"}
              aria-describedby="location-permission-description"
            >
              {isLoading || isLocationLoading ? "Requesting..." : "Show My Location"}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDeny}
              disabled={isLoading}
              aria-label="Decline location permission"
            >
              <X className="h-4 w-4 mr-2" aria-hidden="true" />
              Not Now
            </Button>
          </div>

          <div className="text-xs text-gray-700 dark:text-gray-300 text-center">
            By accepting, you agree to our{" "}
            <a 
              href="/privacy" 
              className="underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
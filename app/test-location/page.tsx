"use client";

import { useState, useCallback, useEffect } from "react";
import { LocationCard } from "@/components/LocationCard";
import { FallbackLocationCard } from "@/components/FallbackLocationCard";
import { LocationPermissionModal } from "@/components/LocationPermissionModal";
import { LocationProvider, useLocation } from "@/components/LocationProvider";
import { RemoteConnectionCTA } from "@/components/RemoteConnectionCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistance, formatAccuracy } from "@/lib/location-utils";
import { MapPin, Play, Pause, RefreshCw, Clock, Move } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TestLocationContent() {
  const {
    position,
    address,
    isLoading,
    error,
    hasPermission,
    requestPermission,
    clearLocation,
    showFallback,
    retryLocation,
    // Real-time location properties
    isWatching,
    startWatching,
    stopWatching,
    lastUpdate,
    movementDistance,
  } = useLocation();

  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const handleRequestPermission = async () => {
    setShowPermissionModal(true);
  };

  // Keyboard shortcuts
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ctrl/Cmd + L to request location permission
    if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
      event.preventDefault();
      if (!hasPermission) {
        handleRequestPermission();
      }
    }
    // Ctrl/Cmd + R to retry location
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
      event.preventDefault();
      if (showFallback) {
        retryLocation();
      }
    }
    // Ctrl/Cmd + C to clear location
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
      event.preventDefault();
      clearLocation();
    }
    // Ctrl/Cmd + W to toggle watching
    if ((event.ctrlKey || event.metaKey) && event.key === 'w') {
      event.preventDefault();
      if (hasPermission) {
        if (isWatching) {
          stopWatching();
        } else {
          startWatching();
        }
      }
    }
  }, [hasPermission, showFallback, retryLocation, clearLocation, isWatching, startWatching, stopWatching]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleAcceptPermission = async () => {
    // This is now handled by LocationProvider's requestPermission
    setShowPermissionModal(false);
  };

  const handleDenyPermission = () => {
    setShowPermissionModal(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Location Test Page</h1>
        <p className="text-muted-foreground">Test the location features and real-time updates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Card */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Location Display</h2>
          {showFallback ? (
            <FallbackLocationCard 
              error={error}
              onRetry={retryLocation}
            />
          ) : (
            <LocationCard
              latitude={position?.latitude || 0}
              longitude={position?.longitude || 0}
              address={address}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Remote Connection CTA */}
        {position && hasPermission && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Connection Options</h2>
            <RemoteConnectionCTA
              userLatitude={position.latitude}
              userLongitude={position.longitude}
              onConnect={() => {
                // Custom connect action
                console.log('Connect button clicked!');
                alert('Connect functionality would open email or contact form here.');
              }}
            />
          </div>
        )}
      </div>

      {/* Test Controls */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
        <Card>
          <CardHeader>
            <CardTitle>Location Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={handleRequestPermission}
                aria-label="Request location permission (Ctrl/Cmd + L)"
              >
                Request Location Permission
              </Button>
              <Button 
                variant="outline" 
                onClick={clearLocation}
                disabled={!hasPermission}
                aria-label="Clear location data (Ctrl/Cmd + C)"
              >
                Clear Location Data
              </Button>
            </div>

            {/* Real-time Controls */}
            {hasPermission && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={isWatching ? "default" : "secondary"}>
                    {isWatching ? "Watching" : "Not Watching"}
                  </Badge>
                  {isWatching && (
                    <Badge variant="outline" className="text-xs">
                      Real-time
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={startWatching}
                    disabled={isWatching || !hasPermission}
                    size="sm"
                    aria-label="Start real-time location tracking (Ctrl/Cmd + W)"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Watching
                  </Button>
                  <Button
                    onClick={stopWatching}
                    disabled={!isWatching}
                    variant="outline"
                    size="sm"
                    aria-label="Stop real-time location tracking (Ctrl/Cmd + W)"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Watching
                  </Button>
                </div>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Permission Status: {hasPermission ? "✅ Granted" : "❌ Not granted"}</p>
              <p>Loading: {isLoading ? "🔄 Loading..." : "✅ Ready"}</p>
              <p>Fallback Mode: {showFallback ? "🔄 Active" : "✅ Normal"}</p>
              <p>Location: {position ? `${position.latitude}, ${position.longitude}` : "Not set"}</p>
              <p>Address: {address || "Not available"}</p>
              {error && <p className="text-red-600">Error: {error.userMessage}</p>}
              
              {/* Real-time status */}
              {hasPermission && (
                <>
                  {lastUpdate && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Last Update: {lastUpdate.toLocaleTimeString()}</span>
                    </div>
                  )}
                  {movementDistance !== null && (
                    <div className="flex items-center gap-2">
                      <Move className="h-4 w-4" />
                      <span>Movement: {formatDistance(movementDistance)}</span>
                    </div>
                  )}
                  {position && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Accuracy: {formatAccuracy(position.accuracy)}</span>
                    </div>
                  )}
                </>
              )}
              
              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded text-xs">
                <p className="font-medium mb-1">Keyboard Shortcuts:</p>
                <ul className="space-y-1">
                  <li>• Ctrl/Cmd + L: Request location permission</li>
                  <li>• Ctrl/Cmd + R: Retry location (when in fallback mode)</li>
                  <li>• Ctrl/Cmd + C: Clear location data</li>
                  <li>• Ctrl/Cmd + W: Toggle real-time watching</li>
                  <li>• Escape: Close modals</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Status Card */}
      {hasPermission && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className={`h-5 w-5 ${isWatching ? 'animate-spin' : ''}`} />
              Real-time Location Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {isWatching ? "🟢 Active" : "🔴 Inactive"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isWatching ? "Tracking location changes" : "Not tracking"}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {lastUpdate ? formatDistance(movementDistance || 0) : "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Distance moved
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {lastUpdate ? lastUpdate.toLocaleTimeString() : "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Last update
                </div>
              </div>
            </div>
            
            {isWatching && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Real-time updates active:</strong> Location is being tracked with throttling (1 Hz) 
                  and distance filtering (5m minimum movement). Small movements are ignored to reduce re-renders.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <LocationPermissionModal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        onAccept={handleAcceptPermission}
        onDeny={handleDenyPermission}
      />
    </div>
  );
}

export default function TestLocationPage() {
  return (
    <LocationProvider>
      <TestLocationContent />
    </LocationProvider>
  );
} 
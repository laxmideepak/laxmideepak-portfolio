"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Globe, 
  AlertTriangle, 
  Shield, 
  Wifi, 
  RefreshCw, 
  Settings,
  Lock
} from "lucide-react";
import { 
  getBrowserLocationGuidance, 
  getRetryGuidance, 
  getActionButtonText,
  isUserResolvableError,
  GeolocationError 
} from "@/lib/geolocation-errors";

interface FallbackLocationCardProps {
  error?: GeolocationError | null;
  onRetry?: () => void;
  className?: string;
}

export function FallbackLocationCard({ 
  error, 
  onRetry, 
  className 
}: FallbackLocationCardProps) {
  const getErrorIcon = () => {
    if (!error) return <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
    
    switch (error.type) {
      case 'denied':
        return <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'insecure':
        return <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'timeout':
        return <Wifi className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
      case 'unavailable':
        return <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
    }
  };

  const getErrorMessage = () => {
    if (!error) return "Unable to get your current location";
    return error.userMessage;
  };

  const getRetryButtonText = () => {
    if (!error) return "Try Again";
    return getActionButtonText(error);
  };

  const getGuidanceMessage = () => {
    if (!error) return getBrowserLocationGuidance();
    return getRetryGuidance(error);
  };

  const canRetry = !error || error.canRetry;
  const requiresUserAction = error && error.requiresUserAction;

  return (
    <Card 
      className={cn(
        "w-full max-w-[300px] h-[220px] md:max-w-[300px] md:h-[220px]",
        "sm:w-full sm:max-w-none sm:h-auto sm:min-h-[160px]",
        "transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        "border-2 border-orange-200 dark:border-orange-800",
        "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
        className
      )}
      role="region"
      aria-label="Location unavailable"
      aria-describedby="fallback-location-description"
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          {getErrorIcon()}
          Location Unavailable
        </CardTitle>
        <p 
          id="fallback-location-description"
          className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight"
        >
          {getErrorMessage()}
        </p>
      </CardHeader>

      <CardContent className="p-4 flex-1">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          {/* Static World Graphic */}
          <div 
            className="relative w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <Globe className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            <div className="absolute inset-0 rounded-full border-2 border-blue-300 dark:border-blue-700 opacity-50"></div>
            <div className="absolute inset-2 rounded-full border border-blue-400 dark:border-blue-600 opacity-30"></div>
          </div>

          {/* Error Message */}
          <div className="text-center space-y-2">
            <p 
              className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
              aria-live="polite"
            >
              {getGuidanceMessage()}
            </p>
            
            {/* Browser-specific guidance */}
            {requiresUserAction && (
              <div 
                className="text-xs text-gray-800 dark:text-gray-200 bg-orange-100 dark:bg-orange-900/30 p-2 rounded"
                role="complementary"
                aria-label="Browser-specific location settings"
              >
                <p className="font-medium mb-1">How to enable location:</p>
                <ul className="text-left space-y-1">
                  <li>• {getBrowserLocationGuidance()}</li>
                  <li>• Refresh the page after enabling</li>
                  <li>• Ensure you're using HTTPS</li>
                </ul>
              </div>
            )}
          </div>

          {/* Action Button */}
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              disabled={!canRetry}
              className="mt-2"
              aria-label={`${getRetryButtonText()} - Retry location request (Ctrl/Cmd + R)`}
            >
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              {getRetryButtonText()}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  MapPin, 
  MessageCircle, 
  Video, 
  Calendar,
  Globe,
  Car,
  Handshake
} from "lucide-react";
import { 
  calculateDistanceFromDallas,
  formatDistanceFromDallas,
  getDistanceMessage,
  getCTAText,
  getCTAVariant,
  getDistanceCategory,
  DALLAS_COORDINATES
} from "@/lib/distance-utils";

interface RemoteConnectionCTAProps {
  userLatitude: number;
  userLongitude: number;
  className?: string;
  onConnect?: () => void;
}

export function RemoteConnectionCTA({ 
  userLatitude, 
  userLongitude, 
  className,
  onConnect 
}: RemoteConnectionCTAProps) {
  const userCoords = { latitude: userLatitude, longitude: userLongitude };
  const distance = calculateDistanceFromDallas(userCoords);
  const distanceCategory = getDistanceCategory(userCoords);
  const message = getDistanceMessage(userCoords);
  const ctaText = getCTAText(userCoords);
  const ctaVariant = getCTAVariant(userCoords);

  const getCategoryIcon = () => {
    switch (distanceCategory) {
      case 'local':
        return <Handshake className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'nearby':
        return <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'remote':
        return <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getCategoryColor = () => {
    switch (distanceCategory) {
      case 'local':
        return 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800';
      case 'nearby':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800';
      case 'remote':
        return 'bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-950/20 dark:border-gray-800';
    }
  };

  const getCategoryBadge = () => {
    switch (distanceCategory) {
      case 'local':
        return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Local</Badge>;
      case 'nearby':
        return <Badge variant="secondary" className="bg-blue-600 hover:bg-blue-700">Nearby</Badge>;
      case 'remote':
        return <Badge variant="outline" className="border-purple-600 text-purple-600">Remote</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleConnect = () => {
    if (onConnect) {
      onConnect();
    } else {
      // Default action - could open email or contact form
      window.open('mailto:contact@example.com?subject=Let\'s Connect!', '_blank');
    }
  };

  return (
    <Card 
      className={cn(
        "w-full max-w-[300px] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        "border-2",
        getCategoryColor(),
        className
      )}
      role="region"
      aria-label="Connection call-to-action"
      aria-describedby="connection-message"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            {getCategoryIcon()}
            Connection
          </CardTitle>
          {getCategoryBadge()}
        </div>
        <p 
          id="connection-message"
          className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-tight"
        >
          {message}
        </p>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Distance Information */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatDistanceFromDallas(userCoords)}
            </span>
          </div>
          
          {distanceCategory === 'remote' && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Dallas: {DALLAS_COORDINATES.latitude.toFixed(4)}, {DALLAS_COORDINATES.longitude.toFixed(4)}
            </div>
          )}
        </div>

        {/* Connection Options */}
        <div className="space-y-2">
          <Button
            onClick={handleConnect}
            variant={ctaVariant}
            className="w-full"
            aria-label={`${ctaText} - Connect with me`}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {ctaText}
          </Button>
          
          {distanceCategory === 'remote' && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => window.open('https://calendly.com/example', '_blank')}
                aria-label="Schedule a video call"
              >
                <Video className="h-4 w-4 mr-1" />
                Video Call
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => window.open('https://calendly.com/example', '_blank')}
                aria-label="Schedule a meeting"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Schedule
              </Button>
            </div>
          )}
        </div>

        {/* Additional Info */}
        {distanceCategory === 'local' && (
          <div className="text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 p-2 rounded">
            <p className="font-medium">Great! We're in the same area.</p>
            <p>Let's grab coffee or meet at a convenient location!</p>
          </div>
        )}
        
        {distanceCategory === 'nearby' && (
          <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
            <p className="font-medium">You're within driving distance!</p>
            <p>We could meet halfway or I can travel to your area.</p>
          </div>
        )}
        
        {distanceCategory === 'remote' && (
          <div className="text-xs text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
            <p className="font-medium">Distance is no barrier!</p>
            <p>Let's connect via video call, email, or schedule a meeting.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 
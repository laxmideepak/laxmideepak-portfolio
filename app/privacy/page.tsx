import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, MapPin, Eye, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">
            How we handle your data and protect your privacy
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Location Data Usage
            </CardTitle>
            <CardDescription>
              Information about how we use your location data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">What We Collect</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Your current location coordinates (latitude and longitude)</li>
                <li>Location accuracy information</li>
                <li>Permission status for location access</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">How We Use It</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Display your position on an interactive map</li>
                <li>Provide a personalized user experience</li>
                <li>Show relevant location-based information</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Data Protection</h3>
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Lock className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  <p className="font-medium mb-1">Your Data Stays Local</p>
                  <p>We never send your location data to our servers. All location information is processed locally in your browser and is not stored permanently.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Your Control</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>You can deny location access at any time</li>
                <li>Location data is not shared with third parties</li>
                <li>You can revoke permission through your browser settings</li>
                <li>No location data is stored after you leave the site</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              General Privacy Information
            </CardTitle>
            <CardDescription>
              Our overall approach to data privacy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Information We Collect</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Information you provide directly to us</li>
                <li>Usage data and analytics (anonymized)</li>
                <li>Technical information about your device and browser</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">How We Use Information</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Provide and improve our services</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Data Security</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>We use industry-standard security measures</li>
                <li>Data is encrypted in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Your Rights</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of certain data processing</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              How to reach us with privacy concerns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us at{" "}
              <a 
                href="mailto:privacy@laxmideepak-portfolio.vercel.app" 
                className="text-blue-500 hover:underline"
              >
                privacy@laxmideepak-portfolio.vercel.app
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
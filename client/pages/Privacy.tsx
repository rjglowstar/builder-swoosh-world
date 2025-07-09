import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Server,
  Smartphone,
  Globe,
  AlertTriangle,
  CheckCircle,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";

export default function Privacy() {
  const { goBack } = useSmartNavigation();

  const privacyPrinciples = [
    {
      icon: Smartphone,
      title: "Local Processing",
      description:
        "All face recognition and biometric processing happens locally on your device. Your face data never leaves your phone.",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description:
        "Any data that syncs to the cloud is encrypted with keys only you control. We cannot decrypt your data.",
    },
    {
      icon: Eye,
      title: "No Tracking",
      description:
        "We don't track your usage, location, or behavior. No analytics or advertising SDKs are included.",
    },
    {
      icon: Server,
      title: "Minimal Data Collection",
      description:
        "We only collect what's absolutely necessary for the app to function - no personal information selling.",
    },
  ];

  const dataTypes = [
    {
      title: "Face Recognition Data",
      collected: false,
      description:
        "Processed locally only, never transmitted or stored remotely",
      storage: "Local device storage only",
    },
    {
      title: "App Usage Analytics",
      collected: false,
      description: "We don't collect usage statistics or behavioral data",
      storage: "Not collected",
    },
    {
      title: "Account Information",
      collected: true,
      description: "Email address for Google Sign-in and support contact",
      storage: "Encrypted cloud storage",
    },
    {
      title: "Device Information",
      collected: true,
      description: "Device model and OS version for compatibility",
      storage: "Local app preferences",
    },
    {
      title: "Crash Reports",
      collected: true,
      description: "Anonymous crash logs to improve app stability",
      storage: "Temporary, automatically deleted after 30 days",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={goBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Privacy Policy</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Privacy First Banner */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center space-y-3">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary">Privacy First</h2>
              <p className="text-sm text-primary/80">
                Your biometric data stays on your device. Always.
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Last updated: December 2024
            </div>
          </CardContent>
        </Card>

        {/* Core Privacy Principles */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Our Privacy Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {privacyPrinciples.map((principle, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <principle.icon className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Collection Overview */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>What Data We Collect</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataTypes.map((data, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground">
                      {data.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {data.collected ? (
                        <CheckCircle className="w-4 h-4 text-warning" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                      <span
                        className={`text-xs ${
                          data.collected ? "text-warning" : "text-success"
                        }`}
                      >
                        {data.collected ? "Collected" : "Not Collected"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {data.description}
                  </p>
                  <div className="text-xs text-slate-500">
                    <strong>Storage:</strong> {data.storage}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Face Recognition Details */}
        <Card className="bg-info/10 border-info/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-info" />
              Face Recognition Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-info/90">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-info rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Face templates</strong> are mathematical
                  representations, not photos
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-info rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Local processing</strong> means face data never leaves
                  your device
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-info rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>No cloud backup</strong> of biometric data, even with
                  sync enabled
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-info rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  <strong>Deletion</strong> removes all face data permanently
                  from device
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cloud Sync Privacy */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Cloud Sync (Premium Plus)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                When you enable cloud sync, only app settings and configuration
                are synchronized. Face recognition data remains local only.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Settings & Preferences</span>
                  <span className="text-warning">Synced</span>
                </div>
                <div className="flex justify-between">
                  <span>Protection Schedule</span>
                  <span className="text-warning">Synced</span>
                </div>
                <div className="flex justify-between">
                  <span>Face Templates</span>
                  <span className="text-success">Local Only</span>
                </div>
                <div className="flex justify-between">
                  <span>Biometric Data</span>
                  <span className="text-success">Local Only</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Data Access:</strong> View all data the app has stored
                (available in Settings)
              </div>
              <div>
                <strong>Data Deletion:</strong> Permanently delete all app data
                and face templates
              </div>
              <div>
                <strong>Data Export:</strong> Export your settings and unlock
                history (no biometric data)
              </div>
              <div>
                <strong>Opt-out:</strong> Disable cloud sync or crash reporting
                at any time
              </div>
              <div>
                <strong>Questions:</strong> Contact us about your privacy rights
                anytime
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third Parties */}
        <Card className="bg-warning/10 border-warning/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Third-Party Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-warning/90">
              <div>
                <strong>Google Sign-In:</strong> For authentication only. Google
                Privacy Policy applies.
              </div>
              <div>
                <strong>App Store:</strong> Downloads and updates managed by
                Apple/Google App Stores.
              </div>
              <div>
                <strong>No Analytics:</strong> We don't use Google Analytics,
                Facebook SDK, or other tracking services.
              </div>
              <div>
                <strong>No Ads:</strong> UnlockGuard contains no advertising
                networks or trackers.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-slate-50/60 border-slate-200/60">
          <CardContent className="p-4 text-center space-y-3">
            <FileText className="w-8 h-8 text-slate-600 mx-auto" />
            <div>
              <h3 className="font-semibold text-slate-700">
                Privacy Questions?
              </h3>
              <p className="text-sm text-slate-600">
                Contact our privacy team at privacy@unlockguard.com
              </p>
            </div>
            <div className="flex space-x-2">
              <Link to="/feedback" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Contact Us
                </Button>
              </Link>
              <Link to="/about" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

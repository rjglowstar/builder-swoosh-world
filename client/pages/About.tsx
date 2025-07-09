import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Shield,
  Eye,
  Smartphone,
  Crown,
  Users,
  Globe,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";

export default function About() {
  const { goBack } = useSmartNavigation();

  const features = [
    {
      icon: Eye,
      title: "Face Recognition",
      description:
        "Advanced AI-powered face detection and recognition technology",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Military-grade security with local processing for privacy",
    },
    {
      icon: Smartphone,
      title: "Multi-Device",
      description: "Sync across all your devices with cloud backup",
    },
    {
      icon: Users,
      title: "Multi-User",
      description: "Support for multiple trusted faces and guest access",
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
            <h1 className="text-xl font-bold text-primary">
              About UnlockGuard
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* App Info */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                UnlockGuard
              </h2>
              <p className="text-muted-foreground">
                Advanced Face Recognition Security
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Version 2.1.0</div>
              <div className="text-sm text-muted-foreground">
                © 2024 UnlockGuard Technologies
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To provide everyone with secure, intelligent, and user-friendly
              face recognition technology that protects your digital life while
              respecting your privacy.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-info/10 border-info/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-info" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-info/90">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-info rounded-full"></div>
                <span>All face data processed locally on your device</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-info rounded-full"></div>
                <span>No biometric data sent to external servers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-info rounded-full"></div>
                <span>End-to-end encryption for cloud sync</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-info rounded-full"></div>
                <span>GDPR and privacy regulation compliant</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Contact & Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-foreground">Email Support</div>
                <div className="text-muted-foreground">
                  support@unlockguard.com
                </div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Website</div>
                <div className="text-muted-foreground">www.unlockguard.com</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Documentation</div>
                <div className="text-muted-foreground">
                  docs.unlockguard.com
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal */}
        <Card className="bg-slate-50/60 border-slate-200/60">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="text-xs text-muted-foreground">
                By using UnlockGuard, you agree to our Terms of Service and
                Privacy Policy
              </div>
              <div className="flex justify-center space-x-4 text-xs">
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

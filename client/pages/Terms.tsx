import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  Crown,
  Gavel,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";

export default function Terms() {
  const { goBack } = useSmartNavigation();

  const keyTerms = [
    {
      icon: Shield,
      title: "Service Usage",
      description:
        "UnlockGuard is provided for personal device security. Commercial use requires a separate license.",
    },
    {
      icon: Users,
      title: "User Responsibilities",
      description:
        "You're responsible for keeping your account secure and using the app in compliance with local laws.",
    },
    {
      icon: Crown,
      title: "Premium Features",
      description:
        "Subscription features are billed monthly/yearly. You can cancel anytime through your account settings.",
    },
    {
      icon: Globe,
      title: "Privacy & Data",
      description:
        "Face data stays on your device. Cloud sync uses encrypted storage for settings only.",
    },
  ];

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By downloading, installing, or using UnlockGuard, you agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, please do not use our service.",
        "We may update these terms from time to time. Continued use constitutes acceptance of updated terms.",
      ],
    },
    {
      title: "2. Description of Service",
      content: [
        "UnlockGuard provides face recognition security for mobile devices using local AI processing.",
        "The service includes face detection, recognition, access control, and optional cloud synchronization.",
        "We strive for 99.9% uptime but cannot guarantee uninterrupted service availability.",
      ],
    },
    {
      title: "3. User Accounts and Security",
      content: [
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must provide accurate and complete information during registration.",
        "You agree to notify us immediately of any unauthorized use of your account.",
        "Emergency PIN serves as backup access - keep it secure and don't share it.",
      ],
    },
    {
      title: "4. Acceptable Use",
      content: [
        "Use UnlockGuard only for legitimate personal device security purposes.",
        "Do not attempt to reverse engineer, hack, or compromise the application.",
        "Do not use the service to violate any applicable local, state, or federal laws.",
        "Do not share or distribute face recognition data collected by the app.",
      ],
    },
    {
      title: "5. Privacy and Data Protection",
      content: [
        "All face recognition processing occurs locally on your device.",
        "We do not have access to your biometric data or face recognition templates.",
        "Cloud sync only includes app settings and preferences, never biometric data.",
        "See our Privacy Policy for detailed information about data handling.",
      ],
    },
    {
      title: "6. Premium Subscriptions",
      content: [
        "Premium features require a paid subscription (monthly or yearly billing).",
        "Subscriptions auto-renew unless cancelled before the renewal date.",
        "Refunds are available within 30 days of purchase for unused subscription time.",
        "Premium features may be modified or discontinued with 30 days notice.",
      ],
    },
    {
      title: "7. Limitation of Liability",
      content: [
        "UnlockGuard is provided 'as is' without warranties of any kind.",
        "We are not liable for any damages arising from use or inability to use the service.",
        "Face recognition technology has inherent limitations and is not 100% accurate.",
        "Always maintain alternative access methods (Emergency PIN, device passcode).",
      ],
    },
    {
      title: "8. Termination",
      content: [
        "You may terminate your account at any time through the app settings.",
        "We may terminate accounts that violate these terms with or without notice.",
        "Upon termination, your access to premium features will cease immediately.",
        "Local face data will remain on your device until you manually delete it.",
      ],
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
            <FileText className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Terms of Service</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Terms Overview */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center space-y-3">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Gavel className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary">
                Terms of Service
              </h2>
              <p className="text-sm text-primary/80">
                Understanding your rights and responsibilities
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Effective Date: December 2024 • Version 2.1
            </div>
          </CardContent>
        </Card>

        {/* Key Terms Summary */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Key Terms Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {keyTerms.map((term, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <term.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {term.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {term.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-warning mb-1">
                  Important Security Notice
                </h3>
                <p className="text-sm text-warning/80">
                  Face recognition is not 100% accurate. Always maintain backup
                  access methods like Emergency PIN. Do not rely solely on face
                  recognition for critical security applications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        {sections.map((section, index) => (
          <Card
            key={index}
            className="bg-white/60 backdrop-blur-sm border-white/20"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.content.map((paragraph, pIndex) => (
                  <div key={pIndex} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Contact and Governing Law */}
        <Card className="bg-info/10 border-info/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-info" />
              Governing Law & Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-info/90">
              <div>
                <strong>Governing Law:</strong> These terms are governed by the
                laws of your jurisdiction and applicable international laws.
              </div>
              <div>
                <strong>Disputes:</strong> Any disputes will be resolved through
                binding arbitration or small claims court.
              </div>
              <div>
                <strong>Questions:</strong> Contact us at legal@unlockguard.com
                for any questions about these terms.
              </div>
              <div>
                <strong>Updates:</strong> We'll notify users of material changes
                through the app and email.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Details */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              Subscription Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Free Plan:</strong>
                  <div className="text-muted-foreground">
                    • Local features only
                    <br />
                    • Up to 5 faces
                    <br />• Basic support
                  </div>
                </div>
                <div>
                  <strong>Premium Plus:</strong>
                  <div className="text-muted-foreground">
                    • Cloud sync
                    <br />
                    • Unlimited faces
                    <br />• Priority support
                  </div>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium">Billing Cycle</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Subscriptions renew automatically. Cancel anytime before
                  renewal date to avoid charges. No partial refunds for unused
                  time within billing period.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agreement */}
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-success mb-1">
                  By Using UnlockGuard
                </h3>
                <p className="text-sm text-success/80">
                  You acknowledge that you have read, understood, and agree to
                  be bound by these Terms of Service and our Privacy Policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/privacy">
            <Button variant="outline" className="w-full h-12">
              Privacy Policy
            </Button>
          </Link>
          <Link to="/feedback">
            <Button variant="outline" className="w-full h-12">
              Contact Legal
            </Button>
          </Link>
        </div>

        {/* Version Info */}
        <Card className="bg-slate-50/60 border-slate-200/60">
          <CardContent className="p-3 text-center">
            <div className="text-xs text-muted-foreground">
              UnlockGuard Terms of Service v2.1 • December 2024
              <br />© 2024 UnlockGuard Technologies • All Rights Reserved
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

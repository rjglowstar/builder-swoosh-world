import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  Info,
  MessageSquare,
  ChevronRight,
  Crown,
  Clock,
  Sliders,
  Smartphone,
  Key,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";

export default function Settings() {
  const settingsCategories = [
    {
      title: "Account",
      icon: User,
      items: [
        { name: "Profile", path: "/profile" },
        { name: "Device Management", path: "/device-management" },
        { name: "Subscription", path: "/subscription", premium: true },
        { name: "Sync Settings", path: "/sync", premium: true },
      ],
    },
    {
      title: "Security",
      icon: Shield,
      items: [
        { name: "Face Management", path: "/manage-faces" },
        { name: "Blocked Faces", path: "/blocked-faces" },
        { name: "Guest Mode", path: "/guest-mode" },
        { name: "Emergency PIN", path: "/emergency-pin" },
        { name: "Detection Sensitivity", path: "/sensitivity" },
        { name: "Protection Schedule", path: "/schedule" },
        { name: "Unlock History", path: "/unlock-history" },
      ],
    },
    {
      title: "App Settings",
      icon: Smartphone,
      items: [
        { name: "Quick Toggle Widget", path: "/widget-setup" },
        { name: "Notifications", path: "/notifications" },
        { name: "Auto-Lock Settings", path: "/auto-lock" },
      ],
    },
    {
      title: "Support",
      icon: Info,
      items: [
        { name: "About UnlockGuard", path: "/about" },
        { name: "Help & Tutorials", path: "/help" },
        { name: "Feedback & Support", path: "/feedback" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
          <Link to="/manage-faces">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Premium Status Card */}
        <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Free Plan</h3>
                  <p className="text-sm opacity-90">Basic face recognition</p>
                </div>
              </div>
              <Link to="/pricing">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Upgrade
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Settings Categories */}
        {settingsCategories.map((category, index) => (
          <div key={category.title} className="space-y-3">
            <div className="flex items-center space-x-2 px-2">
              <category.icon className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">
                {category.title}
              </h2>
            </div>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardContent className="p-0">
                {category.items.map((item, itemIndex) => (
                  <div key={item.name}>
                    <Link
                      to={item.path}
                      className="flex items-center justify-between p-4 hover:bg-white/40 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-foreground">{item.name}</span>
                        {item.premium && (
                          <div className="flex items-center space-x-1 px-2 py-0.5 bg-warning/20 rounded-full">
                            <Crown className="w-3 h-3 text-warning" />
                            <span className="text-xs text-warning font-medium">
                              PRO
                            </span>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                    {itemIndex < category.items.length - 1 && (
                      <Separator className="mx-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* App Info */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center space-y-2">
            <div className="text-sm text-muted-foreground">
              UnlockGuard v2.1.0
            </div>
            <div className="text-xs text-muted-foreground">
              Build 2024.1.15 • Privacy First Security
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/emergency-pin">
            <Card className="bg-danger/10 border-danger/20 hover:bg-danger/20 transition-colors">
              <CardContent className="p-4 text-center">
                <Key className="w-6 h-6 text-danger mx-auto mb-2" />
                <div className="text-sm font-medium text-danger">
                  Emergency PIN
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/schedule">
            <Card className="bg-info/10 border-info/20 hover:bg-info/20 transition-colors">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-info mx-auto mb-2" />
                <div className="text-sm font-medium text-info">Schedule</div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

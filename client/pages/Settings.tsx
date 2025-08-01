import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  Check,
  AlertTriangle,
  HelpCircle,
  Mail,
  Bug,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";
import { useAppStatus } from "@/contexts/AppStatusContext";

export default function Settings() {
  const { goBack } = useSmartNavigation();
  const {
    emergencyPinSet,
    faceManagementSet,
    trustedFaces,
    guestModeEnabled,
    scheduleEnabled,
    subscriptionActive,
  } = useAppStatus();

  const getStatusIndicator = (isSet: boolean, itemName: string) => {
    if (isSet) {
      return (
        <Badge
          variant="secondary"
          className="bg-success/10 text-success border-success/20 text-xs px-2 py-0"
        >
          <Check className="w-3 h-3 mr-1" />
          Set
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="secondary"
          className="bg-warning/10 text-warning border-warning/20 text-xs px-2 py-0"
        >
          <AlertTriangle className="w-3 h-3 mr-1" />
          Not Set
        </Badge>
      );
    }
  };

  const settingsCategories = [
    {
      title: "Account",
      icon: User,
      items: [
        { name: "Profile", path: "/profile" },
        { name: "Device Management", path: "/device-management" },
        {
          name: "Subscription",
          path: "/subscription",
          premium: true,
          subtitle: subscriptionActive
            ? "Premium Plus active"
            : "Free plan - upgrade available",
        },
        { name: "Sync Settings", path: "/sync", premium: true },
      ],
    },
    {
      title: "Security",
      icon: Shield,
      items: [
        {
          name: "Face Management",
          path: "/manage-faces",
          status: faceManagementSet,
          subtitle: faceManagementSet
            ? `${trustedFaces} trusted faces`
            : "No faces added yet",
        },
        { name: "Blocked Faces", path: "/blocked-faces" },
        {
          name: "Guest Mode",
          path: "/guest-mode",
          subtitle: guestModeEnabled ? "Currently active" : "Inactive",
          statusColor: guestModeEnabled
            ? "text-warning"
            : "text-muted-foreground",
        },
        {
          name: "Emergency PIN",
          path: "/emergency-pin",
          status: emergencyPinSet,
          subtitle: emergencyPinSet
            ? "Backup access enabled"
            : "Recommended for security",
        },
        { name: "Detection Sensitivity", path: "/sensitivity" },
        {
          name: "Protection Schedule",
          path: "/schedule",
          subtitle: scheduleEnabled ? "Schedule active" : "Manual mode only",
        },
        { name: "Unlock History", path: "/unlock-history" },
      ],
    },
    {
      title: "App Settings",
      icon: Smartphone,
      items: [
        { name: "Quick Toggle Widget", path: "/widget-setup" },
        { name: "Notifications", path: "/notifications" },
        { name: "Auto-Lock Settings", path: "/schedule" },
      ],
    },
    {
      title: "Support",
      icon: Info,
      items: [
        { name: "About UnlockGuard", path: "/about" },
        { name: "Help & Tutorials", path: "/help" },
        { name: "Contact Support", path: "/feedback", icon: Mail },
        { name: "Report a Bug", path: "/feedback", icon: Bug },
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
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={goBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Premium Status Card */}
        <Card
          className={`bg-gradient-to-r ${subscriptionActive ? "from-warning to-yellow-500" : "from-primary to-blue-600"} text-white border-none`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">
                      {subscriptionActive ? "Premium Plus" : "Free Plan"}
                    </h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 opacity-80 hover:opacity-100 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="space-y-1 text-sm">
                            <p className="font-medium">What's included:</p>
                            {subscriptionActive ? (
                              <>
                                <p>• Unlimited trusted faces</p>
                                <p>• Cross-device sync</p>
                                <p>• Advanced detection</p>
                                <p>• Priority support</p>
                              </>
                            ) : (
                              <>
                                <p>• Basic face recognition</p>
                                <p>• Up to 3 trusted faces</p>
                                <p>• Local storage only</p>
                                <p>• Standard sensitivity</p>
                              </>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-sm opacity-90">
                    {subscriptionActive
                      ? "All features unlocked"
                      : "Basic face recognition"}
                  </p>
                </div>
              </div>
              {!subscriptionActive && (
                <Link to="/pricing">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Upgrade
                  </Button>
                </Link>
              )}
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
                      <div className="flex items-center space-x-3 flex-1">
                        {item.icon && (
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-foreground">{item.name}</span>
                            {item.premium && (
                              <div className="flex items-center space-x-1 px-2 py-0.5 bg-warning/20 rounded-full">
                                <Crown className="w-3 h-3 text-warning" />
                                <span className="text-xs text-warning font-medium">
                                  PRO
                                </span>
                              </div>
                            )}
                            {item.hasOwnProperty("status") &&
                              getStatusIndicator(item.status, item.name)}
                          </div>
                          {item.subtitle && (
                            <p
                              className={`text-xs mt-1 ${item.statusColor || "text-muted-foreground"}`}
                            >
                              {item.subtitle}
                            </p>
                          )}
                        </div>
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
            <div className="flex justify-center space-x-4 text-xs text-muted-foreground mt-2">
              <button className="hover:text-primary">Check for Updates</button>
              <button className="hover:text-primary">Changelog</button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/emergency-pin">
            <Card
              className={`${emergencyPinSet ? "bg-success/10 border-success/20 hover:bg-success/20" : "bg-danger/10 border-danger/20 hover:bg-danger/20"} transition-colors`}
            >
              <CardContent className="p-4 text-center">
                <div className="relative">
                  <Key
                    className={`w-6 h-6 mx-auto mb-2 ${emergencyPinSet ? "text-success" : "text-danger"}`}
                  />
                  {!emergencyPinSet && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full animate-pulse"></div>
                  )}
                </div>
                <div
                  className={`text-sm font-medium ${emergencyPinSet ? "text-success" : "text-danger"}`}
                >
                  Emergency PIN
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {emergencyPinSet ? "Configured" : "Set Now"}
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/schedule">
            <Card
              className={`${scheduleEnabled ? "bg-primary/10 border-primary/20 hover:bg-primary/20" : "bg-info/10 border-info/20 hover:bg-info/20"} transition-colors`}
            >
              <CardContent className="p-4 text-center">
                <Clock
                  className={`w-6 h-6 mx-auto mb-2 ${scheduleEnabled ? "text-primary" : "text-info"}`}
                />
                <div
                  className={`text-sm font-medium ${scheduleEnabled ? "text-primary" : "text-info"}`}
                >
                  Schedule
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {scheduleEnabled ? "Active" : "Quick Access"}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

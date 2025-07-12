import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Shield,
  Settings,
  FileText,
  Users,
  Eye,
  Clock,
  Smartphone,
  Bell,
  Lock,
  UserPlus,
  Calendar,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Cloud,
  Crown,
  Zap,
  Activity,
  TrendingUp,
  Home,
  UserX,
  Info,
  Unlock,
  UserCheck,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";
import { useState, useEffect } from "react";

export default function Dashboard2() {
  const { navigateFrom } = useSmartNavigation();
  const [guestModeStatus, setGuestModeStatus] = useState({
    enabled: false,
    timeLimit: "unlimited",
    remainingMinutes: 0,
  });

  // Check Guest Mode status from localStorage
  useEffect(() => {
    const checkGuestMode = () => {
      const enabled = localStorage.getItem("guestModeEnabled") === "true";
      const timeLimit =
        localStorage.getItem("guestModeTimeLimit") || "unlimited";
      const startTime = localStorage.getItem("guestModeStartTime");

      if (enabled && startTime && timeLimit !== "unlimited") {
        const start = new Date(startTime);
        const now = new Date();
        const elapsedMinutes = Math.floor(
          (now.getTime() - start.getTime()) / (1000 * 60),
        );
        const remainingMinutes = Math.max(
          0,
          parseInt(timeLimit) - elapsedMinutes,
        );

        // Auto-disable if time expired
        if (remainingMinutes <= 0) {
          localStorage.removeItem("guestModeEnabled");
          localStorage.removeItem("guestModeTimeLimit");
          localStorage.removeItem("guestModeStartTime");
          setGuestModeStatus({
            enabled: false,
            timeLimit: "unlimited",
            remainingMinutes: 0,
          });
        } else {
          setGuestModeStatus({ enabled, timeLimit, remainingMinutes });
        }
      } else {
        setGuestModeStatus({ enabled, timeLimit, remainingMinutes: 0 });
      }
    };

    checkGuestMode();
    // Check every 30 seconds for updates
    const interval = setInterval(checkGuestMode, 30000);

    return () => clearInterval(interval);
  }, []);

  const dashboardData = {
    protection: {
      status: "active",
      currentFace: "Alice",
      guestMode: guestModeStatus,
    },
    todayStats: {
      allowed: 8,
      blocked: 2,
      unknown: 1,
    },
    weekStats: {
      totalUnlocks: 52,
      successRate: 88,
      newFaces: 2,
    },
    lastSync: "10:42 AM",
    totalTaggedFaces: 5,
    planType: "free", // free, premium, plus
    notifications: 3,
    systemHealth: "excellent", // excellent, good, needs_attention
  };

  const securityScore = Math.round(
    (dashboardData.todayStats.allowed /
      (dashboardData.todayStats.allowed + dashboardData.todayStats.blocked)) *
      100,
  );

  const getStatusIndicator = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success/10 text-success border-success/20">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary">
        <XCircle className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  // Improved Quick Actions with better naming
  const quickActions = [
    {
      to: "/manage-faces",
      icon: Users,
      label: "Trusted / Blocked Faces",
      desc: "Manage face permissions",
    },
    {
      to: "/unlock-history",
      icon: FileText,
      label: "View Log",
      desc: "See all unlock attempts",
    },
    {
      to: "/add-face",
      icon: UserPlus,
      label: "Add Face",
      desc: "Register new trusted face",
    },
    {
      to: "/notifications",
      icon: Bell,
      label: "Alerts",
      desc: `${dashboardData.notifications} new`,
    },
    {
      to: "/schedule",
      icon: Calendar,
      label: "Schedule",
      desc: "Set protection hours",
    },
    {
      to: "/blocked-faces",
      icon: UserX,
      label: "View Blocked",
      desc: "See blocked users",
    },
  ];

  // Add Guest Mode quick action when active
  const allQuickActions = dashboardData.protection.guestMode.enabled
    ? [
        {
          to: "/guest-mode",
          icon: Clock,
          label: "Guest Mode",
          desc:
            dashboardData.protection.guestMode.timeLimit === "unlimited"
              ? "No time limit - turn OFF manually"
              : `${dashboardData.protection.guestMode.remainingMinutes}m remaining`,
          priority: true,
        },
        ...quickActions,
      ]
    : quickActions;

  // Separated User Controls and Sync/Settings
  const userControls = [
    {
      to: "/emergency-pin",
      icon: Lock,
      label: "Emergency PIN",
      desc: "Backup access method",
    },
    {
      to: "/sensitivity",
      icon: BarChart3,
      label: "Sensitivity",
      desc: "Tune detection accuracy",
    },
    {
      to: "/guest-mode",
      icon: Clock,
      label: "Guest Mode",
      desc: "Temporary access bypass",
    },
  ];

  const syncSettings = [
    {
      to: "/widget-setup",
      icon: Home,
      label: "Widget",
      desc: "Home screen controls",
    },
    {
      to: "/sync",
      icon: Cloud,
      label: "Cloud Sync",
      desc: "Cross-device sync",
    },
    {
      to: "/device-management",
      icon: Smartphone,
      label: "Devices",
      desc: "Manage connected devices",
    },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">Dashboard 2.0</h1>
            </div>
            <div className="flex items-center space-x-2">
              {dashboardData.notifications > 0 && (
                <Link to="/notifications">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full relative"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {dashboardData.notifications}
                    </span>
                  </Button>
                </Link>
              )}
              <Link to="/settings">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-4 space-y-4">
          {/* Security Status Overview - Added help icon */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Protection:</span>
                {getStatusIndicator(dashboardData.protection.status)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-foreground">Current Face:</span>
                <span className="font-medium text-foreground">
                  {dashboardData.protection.currentFace}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-foreground">Security Score:</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${securityScore >= 80 ? "bg-success" : securityScore >= 60 ? "bg-warning" : "bg-danger"}`}
                      style={{ width: `${securityScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{securityScore}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-foreground">System Health:</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        Overall system performance and security status
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">
                  <Zap className="w-3 h-3 mr-1" />
                  Excellent
                </Badge>
              </div>

              {/* Guest Mode Status */}
              {dashboardData.protection.guestMode.enabled && (
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Guest Mode:</span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-warning/10 text-warning border-warning/20">
                      <Clock className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {dashboardData.protection.guestMode.timeLimit ===
                      "unlimited"
                        ? "No limit"
                        : `${dashboardData.protection.guestMode.remainingMinutes}m left`}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Today's Activity - Added "Today" label */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">
                  {dashboardData.todayStats.allowed}
                </div>
                <div className="text-xs text-success/80">Allowed</div>
                <div className="text-xs text-success/60 mt-1">Today</div>
              </CardContent>
            </Card>

            <Card className="bg-danger/10 border-danger/20">
              <CardContent className="p-4 text-center">
                <XCircle className="w-6 h-6 text-danger mx-auto mb-2" />
                <div className="text-2xl font-bold text-danger">
                  {dashboardData.todayStats.blocked}
                </div>
                <div className="text-xs text-danger/80">Blocked</div>
                <div className="text-xs text-danger/60 mt-1">Today</div>
              </CardContent>
            </Card>

            <Card className="bg-warning/10 border-warning/20">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-6 h-6 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-warning">
                  {dashboardData.todayStats.unknown}
                </div>
                <div className="text-xs text-warning/80">Unknown</div>
                <div className="text-xs text-warning/60 mt-1">Today</div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Insights - Added icons for unlock and faces */}
          <Card className="bg-info/10 border-info/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-info" />
                <h3 className="font-semibold text-info">This Week</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Unlock className="w-4 h-4 text-info mr-1" />
                  </div>
                  <div className="text-lg font-bold text-info">
                    {dashboardData.weekStats.totalUnlocks}
                  </div>
                  <div className="text-xs text-info/80">Unlocks</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-info">
                    {dashboardData.weekStats.successRate}%
                  </div>
                  <div className="text-xs text-info/80">Success Rate</div>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <UserCheck className="w-4 h-4 text-info mr-1" />
                  </div>
                  <div className="text-lg font-bold text-info">
                    {dashboardData.weekStats.newFaces}
                  </div>
                  <div className="text-xs text-info/80">New Faces</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions - Improved naming */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {allQuickActions.map((action) => (
                  <Link key={action.to} to={action.to}>
                    <Card
                      className={`hover:bg-primary/5 transition-colors cursor-pointer ${
                        action.priority ? "bg-warning/10 border-warning/20" : ""
                      }`}
                    >
                      <CardContent className="p-3">
                        <action.icon
                          className={`w-5 h-5 mb-2 ${
                            action.priority ? "text-warning" : "text-primary"
                          }`}
                        />
                        <div className="text-sm font-medium text-foreground">
                          {action.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {action.desc}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Controls */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">User Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {userControls.map((feature) => (
                  <Link key={feature.to} to={feature.to}>
                    <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
                      <CardContent className="p-3">
                        <feature.icon className="w-5 h-5 text-slate-600 mb-2" />
                        <div className="text-sm font-medium text-foreground">
                          {feature.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {feature.desc}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sync & Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Sync & Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {syncSettings.map((feature) => (
                  <Link key={feature.to} to={feature.to}>
                    <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
                      <CardContent className="p-3">
                        <feature.icon className="w-5 h-5 text-slate-600 mb-2" />
                        <div className="text-sm font-medium text-foreground">
                          {feature.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {feature.desc}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plan Status & Stats - Center aligned with tooltip */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-lg font-bold text-foreground">
                    {dashboardData.totalTaggedFaces}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xs text-muted-foreground">
                      Tagged Faces
                    </span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          Faces that have been identified and labeled in your
                          system
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <Cloud className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">
                    {dashboardData.lastSync}
                  </div>
                  <div className="text-xs text-muted-foreground">Last Sync</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Plan Upgrade Card - Added tooltip with plan details */}
          {dashboardData.planType === "free" && (
            <Card className="bg-gradient-to-r from-primary/10 to-blue-100/50 border-primary/20">
              <CardContent className="p-4 text-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Crown className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">
                    Unlock Premium Features
                  </span>
                </div>
                <p className="text-sm text-primary/80">
                  Get cloud sync, unlimited faces, sensitivity controls, and
                  advanced security features
                </p>
                <div className="flex gap-2">
                  <Link to="/pricing" className="flex-1">
                    <Button className="w-full h-10 rounded-xl">
                      View Plans
                    </Button>
                  </Link>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/supporter-confirmation" className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full h-10 rounded-xl"
                        >
                          3-Year Deal
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs space-y-1">
                        <p className="font-semibold">Premium Plus includes:</p>
                        <p>• Unlimited Faces</p>
                        <p>• Cloud Sync</p>
                        <p>• Up to 5 Devices</p>
                        <p>• Priority Support</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Cloud,
  Smartphone,
  Check,
  AlertTriangle,
  RefreshCw,
  Crown,
  Shield,
  Zap,
  HelpCircle,
  Wifi,
  Lock,
  Star,
  Monitor,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SyncSetup() {
  const [isSyncEnabled, setIsSyncEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [lastSync, setLastSync] = useState("2024-01-15 14:30");
  const [wifiOnlySync, setWifiOnlySync] = useState(true);
  const [troubleshootingLogs, setTroubleshootingLogs] = useState<
    Record<string, string>
  >({});
  const [expandedSyncItems, setExpandedSyncItems] = useState(false);

  const connectedDevices = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      type: "iOS",
      lastSync: "2024-01-15 14:30",
      status: "synced",
      isPrimary: true,
      lastSyncTime: "Today at 2:30 PM",
    },
    {
      id: 2,
      name: "MacBook Pro",
      type: "macOS",
      lastSync: "2024-01-15 12:15",
      status: "synced",
      isPrimary: false,
      lastSyncTime: "Today at 12:15 PM",
    },
    {
      id: 3,
      name: "iPad Air",
      type: "iOS",
      lastSync: "2024-01-14 18:45",
      status: "pending",
      isPrimary: false,
      lastSyncTime: "Yesterday at 6:45 PM",
    },
  ];

  const handleSync = () => {
    console.log("Manual sync triggered");
    setLastSync(new Date().toLocaleString());
  };

  const handleToggleSync = (enabled: boolean) => {
    setIsSyncEnabled(enabled);
    if (enabled) {
      console.log("Sync enabled");
    } else {
      console.log("Sync disabled");
    }
  };

  const handleTroubleshootingAction = (action: string) => {
    const timestamp = new Date().toLocaleTimeString();
    let logMessage = "";

    switch (action) {
      case "reset":
        logMessage = `Sync connection reset at ${timestamp}`;
        break;
      case "force":
        logMessage = `Full sync forced at ${timestamp}`;
        break;
      case "status":
        logMessage = `Status check completed at ${timestamp} - All good ✓`;
        break;
    }

    setTroubleshootingLogs((prev) => ({
      ...prev,
      [action]: logMessage,
    }));

    // Clear log after 5 seconds
    setTimeout(() => {
      setTroubleshootingLogs((prev) => {
        const newLogs = { ...prev };
        delete newLogs[action];
        return newLogs;
      });
    }, 5000);
  };

  const syncItems = [
    {
      name: "Trusted face profiles",
      icon: "👤",
      tooltip:
        "Your registered face data and biometric templates - securely encrypted and synced across devices",
    },
    {
      name: "Blocked faces list",
      icon: "🚫",
      tooltip:
        "List of blocked/untrusted faces that should be denied access on all devices",
    },
    {
      name: "Security settings",
      icon: "⚙️",
      tooltip:
        "Your sensitivity levels, detection preferences, and security configurations",
    },
    {
      name: "Protection schedules",
      icon: "⏰",
      tooltip:
        "Automated protection time schedules and when face recognition should be active",
    },
    {
      name: "Unlock history logs",
      icon: "📊",
      tooltip:
        "Complete access logs showing when and where face recognition was used",
    },
    {
      name: "App preferences",
      icon: "🎛️",
      tooltip:
        "Your personal app settings, themes, and user interface preferences",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Cloud className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">
              Cross-Device Sync
            </h1>
          </div>
          <Badge className="bg-warning text-white ml-auto">
            <Crown className="w-3 h-3 mr-1" />
            Premium Plus
          </Badge>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Sync Status */}
        <Card
          className={`${
            isSyncEnabled && isConnected
              ? "bg-success/10 border-success/20"
              : isSyncEnabled
                ? "bg-warning/10 border-warning/20"
                : "bg-muted/10 border-muted/20"
          } transition-all duration-200`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isSyncEnabled && isConnected
                      ? "bg-success/20"
                      : isSyncEnabled
                        ? "bg-warning/20"
                        : "bg-muted/20"
                  }`}
                >
                  <Cloud
                    className={`w-5 h-5 ${
                      isSyncEnabled && isConnected
                        ? "text-success"
                        : isSyncEnabled
                          ? "text-warning"
                          : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      isSyncEnabled && isConnected
                        ? "text-success"
                        : isSyncEnabled
                          ? "text-warning"
                          : "text-muted-foreground"
                    }`}
                  >
                    {isSyncEnabled && isConnected
                      ? "Sync Active"
                      : isSyncEnabled
                        ? "Sync Enabled"
                        : "Sync Disabled"}
                  </h3>
                  <p
                    className={`text-sm ${
                      isSyncEnabled && isConnected
                        ? "text-success/80"
                        : isSyncEnabled
                          ? "text-warning/80"
                          : "text-muted-foreground"
                    }`}
                  >
                    {isSyncEnabled && isConnected
                      ? `Last sync: ${lastSync}`
                      : isSyncEnabled
                        ? "Connecting..."
                        : "Local storage only"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sync Controls */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-foreground font-medium">
                    Enable Cross-Device Sync
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Keep faces & logs synchronized across all your devices
                  </p>
                </div>
                <Switch
                  checked={isSyncEnabled}
                  onCheckedChange={handleToggleSync}
                />
              </div>

              {isSyncEnabled && (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground font-medium">
                        Google Account:
                      </span>
                      <span className="text-muted-foreground">
                        user@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground font-medium">
                        Last Sync:
                      </span>
                      <span className="text-muted-foreground">{lastSync}</span>
                    </div>
                  </div>

                  {/* WiFi Only Sync Option */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-4 h-4 text-primary" />
                      <div>
                        <Label className="text-sm font-medium">
                          WiFi Only Sync
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Save mobile data
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={wifiOnlySync}
                      onCheckedChange={setWifiOnlySync}
                      size="sm"
                    />
                  </div>

                  <Button
                    onClick={handleSync}
                    variant="outline"
                    className="w-full h-10 rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Now
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Connected Devices */}
        {isSyncEnabled && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Connected Devices</span>
              </h3>

              <div className="space-y-3">
                {connectedDevices.map((device) => (
                  <div
                    key={device.id}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      device.isPrimary
                        ? "bg-primary/5 border-primary/20"
                        : "bg-white/40 border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            device.isPrimary ? "bg-primary/20" : "bg-slate-200"
                          }`}
                        >
                          <Smartphone
                            className={`w-4 h-4 ${
                              device.isPrimary
                                ? "text-primary"
                                : "text-slate-600"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-foreground">
                              {device.name}
                            </h4>
                            {device.isPrimary && (
                              <Badge
                                variant="secondary"
                                className="text-xs px-2 py-0"
                              >
                                <Star className="w-3 h-3 mr-1" />
                                Primary
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {device.type} • {device.lastSync}
                          </p>
                          <p className="text-xs text-primary font-medium">
                            Last synced: {device.lastSyncTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {device.status === "synced" ? (
                          <Check className="w-4 h-4 text-success" />
                        ) : (
                          <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-muted-foreground text-center">
                Up to 5 devices on Premium Plus plan
              </div>
            </CardContent>
          </Card>
        )}

        {/* What Gets Synced */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-foreground">
              What Gets Synchronized
            </h3>

            <div className="space-y-3">
              <TooltipProvider>
                {syncItems
                  .slice(0, expandedSyncItems ? syncItems.length : 3)
                  .map((item, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-help">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-foreground flex-1">
                            {item.name}
                          </span>
                          <HelpCircle className="w-3 h-3 text-muted-foreground" />
                          {isSyncEnabled ? (
                            <Check className="w-4 h-4 text-success" />
                          ) : (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
              </TooltipProvider>

              {syncItems.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedSyncItems(!expandedSyncItems)}
                  className="w-full h-8 text-xs"
                >
                  {expandedSyncItems
                    ? "Show Less"
                    : `Show ${syncItems.length - 3} More Items`}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="font-semibold text-primary">
                  End-to-End Encrypted
                </h3>
                <p className="text-sm text-primary/80">
                  All synchronized data is encrypted with your device key.
                  UnlockGuard cannot access your face data or unlock logs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        {isSyncEnabled && (
          <Card className="bg-white/40 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-foreground">Troubleshoot</h3>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full h-10 rounded-xl justify-start"
                    onClick={() => handleTroubleshootingAction("reset")}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Reset Sync Connection
                  </Button>
                  {troubleshootingLogs.reset && (
                    <div className="ml-6 p-2 bg-slate-50 rounded text-xs text-muted-foreground">
                      {troubleshootingLogs.reset}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full h-10 rounded-xl justify-start"
                    onClick={() => handleTroubleshootingAction("force")}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Force Full Sync
                  </Button>
                  {troubleshootingLogs.force && (
                    <div className="ml-6 p-2 bg-slate-50 rounded text-xs text-muted-foreground">
                      {troubleshootingLogs.force}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full h-10 rounded-xl justify-start"
                    onClick={() => handleTroubleshootingAction("status")}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Check Sync Status
                  </Button>
                  {troubleshootingLogs.status && (
                    <div className="ml-6 p-2 bg-success/10 rounded text-xs text-success">
                      {troubleshootingLogs.status}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upgrade Notice */}
        {!isSyncEnabled && (
          <Card className="bg-gradient-to-r from-primary/10 to-blue-100/50 border-primary/20">
            <CardContent className="p-5 text-center space-y-4">
              <Crown className="w-10 h-10 text-primary mx-auto" />
              <div className="space-y-2">
                <h3 className="font-semibold text-primary text-lg">
                  Premium Plus Feature
                </h3>
                <p className="text-sm text-primary/80">
                  Cross-device sync requires Premium Plus subscription
                </p>

                {/* Benefits Summary */}
                <div className="bg-white/50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Monitor className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      Sync up to 5 devices
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-primary/80">
                    <div className="flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Face profiles</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Security logs</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>All settings</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/pricing">
                <Button className="w-full h-12 rounded-xl text-base font-semibold">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium Plus
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

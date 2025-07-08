import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SyncSetup() {
  const [isSyncEnabled, setIsSyncEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [lastSync, setLastSync] = useState("2024-01-15 14:30");

  const connectedDevices = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      type: "iOS",
      lastSync: "2024-01-15 14:30",
      status: "synced",
    },
    {
      id: 2,
      name: "MacBook Pro",
      type: "macOS",
      lastSync: "2024-01-15 12:15",
      status: "synced",
    },
    {
      id: 3,
      name: "iPad Air",
      type: "iOS",
      lastSync: "2024-01-14 18:45",
      status: "pending",
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
                    className="flex items-center justify-between p-3 bg-white/40 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">
                          {device.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {device.type} • {device.lastSync}
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
              {[
                { name: "Trusted face profiles", icon: "👤" },
                { name: "Blocked faces list", icon: "🚫" },
                { name: "Security settings", icon: "⚙️" },
                { name: "Protection schedules", icon: "⏰" },
                { name: "Unlock history logs", icon: "📊" },
                { name: "App preferences", icon: "🎛️" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-foreground">{item.name}</span>
                  <Check className="w-4 h-4 text-success ml-auto" />
                </div>
              ))}
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

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-xl justify-start"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Reset Sync Connection
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-xl justify-start"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Force Full Sync
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-xl justify-start"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Check Sync Status
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upgrade Notice */}
        {!isSyncEnabled && (
          <Card className="bg-gradient-to-r from-primary/10 to-blue-100/50 border-primary/20">
            <CardContent className="p-4 text-center space-y-3">
              <Crown className="w-8 h-8 text-primary mx-auto" />
              <div>
                <h3 className="font-semibold text-primary">
                  Premium Plus Feature
                </h3>
                <p className="text-sm text-primary/80">
                  Cross-device sync requires Premium Plus subscription
                </p>
              </div>
              <Link to="/pricing">
                <Button className="w-full h-10 rounded-xl">
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

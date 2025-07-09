import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  UserCheck,
  Shield,
  AlertTriangle,
  Eye,
  ShieldX,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function GuestMode() {
  const [isGuestModeEnabled, setIsGuestModeEnabled] = useState(false);

  const handleToggleGuestMode = (enabled: boolean) => {
    setIsGuestModeEnabled(enabled);
    console.log("Guest Mode:", enabled ? "Enabled" : "Disabled");
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
            <UserCheck className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Guest Mode</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Status Card */}
        <Card
          className={`${
            isGuestModeEnabled
              ? "bg-warning/10 border-warning/20"
              : "bg-white/60 border-white/20"
          } backdrop-blur-sm transition-all duration-200`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isGuestModeEnabled ? "bg-warning/20" : "bg-muted/20"
                  }`}
                >
                  <UserCheck
                    className={`w-5 h-5 ${
                      isGuestModeEnabled
                        ? "text-warning"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      isGuestModeEnabled
                        ? "text-warning"
                        : "text-muted-foreground"
                    }`}
                  >
                    {isGuestModeEnabled
                      ? "Guest Mode Active"
                      : "Guest Mode Disabled"}
                  </h3>
                  <p
                    className={`text-sm ${
                      isGuestModeEnabled
                        ? "text-warning/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {isGuestModeEnabled
                      ? "All unknown faces allowed"
                      : "Face recognition active"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Toggle Control */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-foreground font-medium">
                  Enable Guest Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow all faces except explicitly blocked ones
                </p>
              </div>
              <Switch
                checked={isGuestModeEnabled}
                onCheckedChange={handleToggleGuestMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>How Guest Mode Works</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-foreground font-medium">
                    Unknown faces are allowed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Any face not in your blocked list can unlock the device
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-danger rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-foreground font-medium">
                    Blocked faces remain blocked
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Explicitly blocked users are still denied access
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-info rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-foreground font-medium">
                    All attempts are logged
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Every access attempt is recorded for security review
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Warning */}
        {isGuestModeEnabled && (
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-warning">
                    Security Notice
                  </h3>
                  <p className="text-sm text-warning/80">
                    Guest Mode reduces security by allowing unknown faces. Only
                    enable this when you want to allow temporary access for
                    visitors or family members.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Access Rules */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-foreground">
              Current Access Rules
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-success" />
                  <span className="text-foreground">Trusted Faces</span>
                </div>
                <span className="text-success font-medium">Always Allowed</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-danger/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ShieldX className="w-4 h-4 text-danger" />
                  <span className="text-foreground">Blocked Faces</span>
                </div>
                <span className="text-danger font-medium">Always Denied</span>
              </div>

              <div
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isGuestModeEnabled ? "bg-success/10" : "bg-muted/10"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <UserCheck
                    className={`w-4 h-4 ${
                      isGuestModeEnabled
                        ? "text-success"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span className="text-foreground">Unknown Faces</span>
                </div>
                <span
                  className={`font-medium ${
                    isGuestModeEnabled
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                >
                  {isGuestModeEnabled ? "Allowed" : "Blocked"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/blocked-faces">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl justify-start"
            >
              <ShieldX className="w-4 h-4 mr-2" />
              Blocked Faces
            </Button>
          </Link>
          <Link to="/unlock-history">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl justify-start"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Logs
            </Button>
          </Link>
        </div>

        {/* Use Cases */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3">
              When to Use Guest Mode
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Having guests or visitors who need device access</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Family members not yet added to trusted faces</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Temporary situations requiring open access</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Troubleshooting face recognition issues</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

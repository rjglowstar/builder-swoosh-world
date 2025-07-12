import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  UserCheck,
  Shield,
  AlertTriangle,
  Eye,
  ShieldX,
  CheckCircle,
  XCircle,
  Users,
  Clock,
  Info,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";
import { useAppStatus } from "@/contexts/AppStatusContext";

export default function GuestMode() {
  const { goBack } = useSmartNavigation();
  const { guestModeEnabled, setGuestModeEnabled } = useAppStatus();
  const [isGuestModeEnabled, setIsGuestModeEnabled] =
    useState(guestModeEnabled);
  const [timeLimit, setTimeLimit] = useState("unlimited");
  const [remainingTime, setRemainingTime] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [parentModeEnabled, setParentModeEnabled] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleToggleGuestMode = (confirmed = false) => {
    const newState = !isGuestModeEnabled;

    // If enabling Guest Mode, show confirmation dialog first
    if (newState && !confirmed) {
      setShowConfirmDialog(true);
      return;
    }

    setIsGuestModeEnabled(newState);
    setGuestModeEnabled(newState);
    setShowConfirmDialog(false);

    if (newState) {
      // Starting Guest Mode
      const now = new Date();
      setStartTime(now);
      if (timeLimit !== "unlimited") {
        setRemainingTime(parseInt(timeLimit));
      }
      console.log(
        "Guest Mode: Enabled",
        timeLimit === "unlimited"
          ? "without time limit"
          : `for ${timeLimit} minutes`,
      );

      // Store in localStorage for Dashboard to read
      localStorage.setItem("guestModeEnabled", "true");
      localStorage.setItem("guestModeTimeLimit", timeLimit);
      localStorage.setItem("guestModeStartTime", now.toISOString());
      localStorage.setItem("parentModeEnabled", parentModeEnabled.toString());
    } else {
      // Stopping Guest Mode
      setStartTime(null);
      setRemainingTime(0);
      console.log("Guest Mode: Disabled");

      // Clear from localStorage
      localStorage.removeItem("guestModeEnabled");
      localStorage.removeItem("guestModeTimeLimit");
      localStorage.removeItem("guestModeStartTime");
      localStorage.removeItem("parentModeEnabled");
    }
  };

  // Calculate remaining time (in real app, this would be more sophisticated)
  const getDisplayTime = () => {
    if (!isGuestModeEnabled || !startTime) return timeLimit;

    if (timeLimit === "unlimited") return "unlimited";

    const now = new Date();
    const elapsedMinutes = Math.floor(
      (now.getTime() - startTime.getTime()) / (1000 * 60),
    );
    const remaining = Math.max(0, parseInt(timeLimit) - elapsedMinutes);

    return remaining.toString();
  };

  const mockData = {
    trustedFaces: 5,
    blockedFaces: 2,
  };

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
            <UserCheck className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Guest Mode</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Main Control */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <h2 className="text-xl font-semibold text-foreground">
                  Guest Mode
                </h2>
                <Badge
                  className={
                    isGuestModeEnabled
                      ? "bg-danger/10 text-danger border-danger/20 animate-pulse"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }
                >
                  {isGuestModeEnabled ? (
                    <>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      ACTIVE - REDUCED SECURITY
                    </>
                  ) : (
                    <>
                      <Shield className="w-3 h-3 mr-1" />
                      INACTIVE
                    </>
                  )}
                </Badge>
              </div>

              {/* Main Toggle Button */}
              {isGuestModeEnabled ? (
                // Turn OFF button - no confirmation needed
                <Button
                  onClick={() => handleToggleGuestMode()}
                  className="w-full h-14 rounded-xl text-lg font-semibold bg-danger hover:bg-danger/90 text-white"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Turn OFF Guest Mode
                </Button>
              ) : (
                // Turn ON button - with confirmation dialog
                <AlertDialog
                  open={showConfirmDialog}
                  onOpenChange={setShowConfirmDialog}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      onClick={() => handleToggleGuestMode()}
                      className="w-full h-14 rounded-xl text-lg font-semibold bg-primary hover:bg-primary/90"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Turn ON Guest Mode
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        <span>Enable Guest Mode?</span>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="space-y-2">
                          <p>
                            This mode reduces security by allowing unknown faces
                            to unlock your device.
                          </p>
                          <div className="bg-warning/10 p-3 rounded-lg border border-warning/20">
                            <p className="text-sm text-warning font-medium">
                              Security Impact:
                            </p>
                            <ul className="text-sm text-warning/80 mt-1 space-y-1">
                              <li>
                                • Any face (except blocked) will unlock device
                              </li>
                              <li>
                                • Unknown faces won't be saved permanently
                              </li>
                              <li>• Recommended for temporary use only</li>
                            </ul>
                          </div>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleToggleGuestMode(true)}
                        className="bg-warning hover:bg-warning/90"
                      >
                        Yes, Enable Guest Mode
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {isGuestModeEnabled && (
                <div className="p-3 bg-danger/10 rounded-lg border border-danger/20">
                  <div className="flex items-center justify-center space-x-2 text-danger">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {timeLimit === "unlimited"
                        ? "SECURITY REDUCED - No time limit"
                        : `SECURITY REDUCED - ${getDisplayTime()} minutes remaining`}
                    </span>
                  </div>
                  <div className="text-xs text-danger/70 text-center mt-1">
                    {timeLimit === "unlimited"
                      ? "Turn OFF manually when done"
                      : "Will auto-disable when time expires"}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Optional Settings */}
        {!isGuestModeEnabled && (
          <Card className="bg-slate-50/60 backdrop-blur-sm border-slate-200/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-600" />
                Guest Mode Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-foreground font-medium">
                    Time Limit
                  </span>
                  <div className="text-sm text-muted-foreground">
                    {timeLimit === "unlimited"
                      ? "Guest Mode will run until manually turned OFF"
                      : `Guest Mode will run for ${timeLimit} minutes when enabled`}
                  </div>
                </div>
                <Select value={timeLimit} onValueChange={setTimeLimit}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unlimited">No Time Limit</SelectItem>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* How Guest Mode Works */}
        <Card className="bg-info/10 border-info/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-info" />
              How Guest Mode Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-info/90">
              When Guest Mode is <strong>ON</strong>:
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <strong>Any face detected</strong> = Access allowed
                  <br />
                  <span className="text-muted-foreground">
                    Trusted faces, unknown faces, anyone can unlock
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <XCircle className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <strong>Blocked faces</strong> = Access denied
                  <br />
                  <span className="text-muted-foreground">
                    Only blocked users are still restricted
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldX className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <strong>No face detected</strong> = Device stays locked
                  <br />
                  <span className="text-muted-foreground">
                    Camera must detect a face for access
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Face Database */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Current Face Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">Trusted</span>
                </div>
                <div className="text-2xl font-bold text-success">
                  {mockData.trustedFaces}
                </div>
                <div className="text-xs text-muted-foreground">
                  Will be allowed
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Eye className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium">Unknown</span>
                </div>
                <div className="text-2xl font-bold text-warning">?</div>
                <div className="text-xs text-muted-foreground">
                  Will be allowed
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <XCircle className="w-4 h-4 text-danger" />
                  <span className="text-sm font-medium">Blocked</span>
                </div>
                <div className="text-2xl font-bold text-danger">
                  {mockData.blockedFaces}
                </div>
                <div className="text-xs text-muted-foreground">
                  Still restricted
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-info/10 rounded-lg border border-info/20">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
                <div className="text-sm text-info/90">
                  Unknown faces will be allowed access during Guest Mode, but
                  won't be added to your trusted list.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/manage-faces">
            <Button variant="outline" className="w-full h-12 rounded-xl">
              <Users className="w-4 h-4 mr-2" />
              Manage Faces
            </Button>
          </Link>
          <Link to="/blocked-faces">
            <Button variant="outline" className="w-full h-12 rounded-xl">
              <ShieldX className="w-4 h-4 mr-2" />
              Blocked List
            </Button>
          </Link>
        </div>

        {/* Safety Note */}
        <Card className="bg-danger/10 border-danger/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-danger mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="font-semibold text-danger">Security Notice</h3>
                <p className="text-sm text-danger/80">
                  Guest Mode reduces security by allowing unknown faces. Use
                  only when necessary and disable promptly after use.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

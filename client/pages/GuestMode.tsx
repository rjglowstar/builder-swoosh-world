import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";

export default function GuestMode() {
  const { goBack } = useSmartNavigation();
  const [isGuestModeEnabled, setIsGuestModeEnabled] = useState(false);
  const [timeLimit, setTimeLimit] = useState("30");
  const [remainingTime, setRemainingTime] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleToggleGuestMode = () => {
    const newState = !isGuestModeEnabled;
    setIsGuestModeEnabled(newState);

    if (newState) {
      // Starting Guest Mode
      const now = new Date();
      setStartTime(now);
      setRemainingTime(parseInt(timeLimit));
      console.log("Guest Mode: Enabled for", timeLimit, "minutes");

      // In a real app, you'd also:
      // - Store this in global state/context
      // - Set up a timer to auto-disable
      // - Sync with other components
    } else {
      // Stopping Guest Mode
      setStartTime(null);
      setRemainingTime(0);
      console.log("Guest Mode: Disabled");
    }
  };

  // Calculate remaining time (in real app, this would be more sophisticated)
  const getDisplayTime = () => {
    if (!isGuestModeEnabled || !startTime) return timeLimit;

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
                      ? "bg-success/10 text-success border-success/20"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }
                >
                  {isGuestModeEnabled ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      ACTIVE
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      INACTIVE
                    </>
                  )}
                </Badge>
              </div>

              <Button
                onClick={handleToggleGuestMode}
                className={`w-full h-14 rounded-xl text-lg font-semibold ${
                  isGuestModeEnabled
                    ? "bg-danger hover:bg-danger/90 text-white"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isGuestModeEnabled ? (
                  <>
                    <XCircle className="w-5 h-5 mr-2" />
                    Turn OFF Guest Mode
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Turn ON Guest Mode
                  </>
                )}
              </Button>

              {isGuestModeEnabled && (
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center justify-center space-x-2 text-success">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Active for {timeLimit} minutes
                    </span>
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
                Optional Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-foreground font-medium">
                    Time Limit
                  </span>
                  <div className="text-sm text-muted-foreground">
                    How long Guest Mode stays active
                  </div>
                </div>
                <Select value={timeLimit} onValueChange={setTimeLimit}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
            <div className="grid grid-cols-2 gap-4">
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

            <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                <div className="text-sm text-warning/90">
                  <strong>Unknown faces</strong> will be allowed access during
                  Guest Mode, but won't be added to your trusted list.
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
                  only when necessary and disable promptly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function GuestMode() {
  const [isGuestModeEnabled, setIsGuestModeEnabled] = useState(false);
  const [timeLimit, setTimeLimit] = useState("30");
  const [autoDisableScreenOff, setAutoDisableScreenOff] = useState(false);

  const handleToggleGuestMode = (enabled: boolean) => {
    setIsGuestModeEnabled(enabled);
    console.log("Guest Mode:", enabled ? "Enabled" : "Disabled");
  };

  const handleStartGuestMode = () => {
    setIsGuestModeEnabled(true);
    console.log("Starting Guest Mode for", timeLimit, "minutes");
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

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Guest Mode Card - matching wireframe exactly */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Status:</h2>
              <span
                className={`font-medium ${isGuestModeEnabled ? "text-success" : "text-foreground"}`}
              >
                {isGuestModeEnabled ? "ON" : "OFF"}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-foreground">•</span>
                <span className="text-foreground">Allows temporary bypass</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-foreground">•</span>
                <span className="text-foreground">Face checks disabled</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-foreground">•</span>
                <span className="text-foreground">Phone re-locks on exit</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-foreground">Time Limit:</span>
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

            <Button
              onClick={handleStartGuestMode}
              className="w-full h-12 rounded-xl"
              disabled={isGuestModeEnabled}
            >
              {isGuestModeEnabled ? "Guest Mode Active" : "Start Guest Mode"}
            </Button>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-foreground">
                Auto-disable when screen off
              </span>
              <Switch
                checked={autoDisableScreenOff}
                onCheckedChange={setAutoDisableScreenOff}
                size="sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

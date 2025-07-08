import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Clock,
  Moon,
  Sun,
  Calendar,
  Save,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Schedule() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [startTime, setStartTime] = useState("22:00");
  const [endTime, setEndTime] = useState("07:00");
  const [selectedDays, setSelectedDays] = useState([
    true,
    true,
    true,
    true,
    true,
    false,
    false,
  ]);

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const toggleDay = (index: number) => {
    const newDays = [...selectedDays];
    newDays[index] = !newDays[index];
    setSelectedDays(newDays);
  };

  const handleSave = () => {
    console.log("Saving schedule:", {
      enabled: isEnabled,
      startTime,
      endTime,
      days: selectedDays,
    });
  };

  const resetToDefault = () => {
    setIsEnabled(false);
    setStartTime("22:00");
    setEndTime("07:00");
    setSelectedDays([true, true, true, true, true, false, false]);
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
            <Clock className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">
              Protection Schedule
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Status Card */}
        <Card
          className={`${
            isEnabled
              ? "bg-success/10 border-success/20"
              : "bg-muted/10 border-muted/20"
          } transition-all duration-200`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isEnabled ? "bg-success/20" : "bg-muted/20"
                  }`}
                >
                  {isEnabled ? (
                    <Moon className="w-5 h-5 text-success" />
                  ) : (
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      isEnabled ? "text-success" : "text-muted-foreground"
                    }`}
                  >
                    {isEnabled ? "Schedule Active" : "Schedule Disabled"}
                  </h3>
                  <p
                    className={`text-sm ${
                      isEnabled ? "text-success/80" : "text-muted-foreground"
                    }`}
                  >
                    {isEnabled
                      ? `Active ${startTime} - ${endTime}`
                      : "Manual protection only"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enable Schedule */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-foreground font-medium">
                  Enable Schedule
                </Label>
                <p className="text-sm text-muted-foreground">
                  Automatically activate protection during set hours
                </p>
              </div>
              <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Time Settings */}
        {isEnabled && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 space-y-6">
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Time Range</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground font-medium flex items-center space-x-1">
                    <Moon className="w-4 h-4" />
                    <span>Start Time</span>
                  </Label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-border bg-white/80 text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium flex items-center space-x-1">
                    <Sun className="w-4 h-4" />
                    <span>End Time</span>
                  </Label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-border bg-white/80 text-foreground"
                  />
                </div>
              </div>

              <div className="text-center p-3 bg-info/10 rounded-xl">
                <p className="text-sm text-info">
                  Protection will be active from {startTime} to {endTime}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Days Selection */}
        {isEnabled && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Repeat Days</span>
              </h3>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => toggleDay(index)}
                    className={`aspect-square rounded-xl font-semibold text-sm transition-all duration-200 ${
                      selectedDays[index]
                        ? "bg-primary text-white shadow-lg"
                        : "bg-white/60 text-muted-foreground border border-border hover:bg-white/80"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                Selected:{" "}
                {selectedDays
                  .map((selected, index) => (selected ? dayNames[index] : null))
                  .filter(Boolean)
                  .join(", ") || "None"}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview */}
        {isEnabled && (
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-primary">
                    Schedule Preview
                  </h3>
                  <p className="text-sm text-primary/80">
                    Face recognition protection will automatically activate{" "}
                    {selectedDays.filter(Boolean).length > 0
                      ? `every ${selectedDays
                          .map((selected, index) =>
                            selected ? dayNames[index] : null,
                          )
                          .filter(Boolean)
                          .join(", ")}`
                      : "never"}{" "}
                    from {startTime} to {endTime}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSave}
            className="w-full h-14 rounded-xl text-lg font-semibold"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Schedule
          </Button>

          <Button
            onClick={resetToDefault}
            variant="outline"
            className="w-full h-12 rounded-xl"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
        </div>

        {/* Info */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3">How it Works</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Protection automatically activates during scheduled hours
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>You can manually override the schedule anytime</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Emergency PIN will still work during protected hours
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Smartphone,
  Plus,
  Shield,
  Power,
  Clock,
  Eye,
  Home,
  HelpCircle,
  Move,
  Battery,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function WidgetSetup() {
  const [selectedWidget, setSelectedWidget] = useState("toggle");
  const [isPreviewInteractive, setIsPreviewInteractive] = useState(false);

  const widgetTypes = [
    {
      id: "toggle",
      name: "Quick Toggle",
      description: "Simple on/off switch for protection",
      tooltip:
        "Use when you want to quickly enable/disable UnlockGuard before handing your phone to someone else",
      icon: Power,
      preview: {
        bg: "bg-primary",
        content: (
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white font-medium">Protection ON</span>
          </div>
        ),
      },
    },
    {
      id: "status",
      name: "Status Display",
      description: "Shows current protection status with details",
      tooltip:
        "Best for users who want real-time peace of mind and monitoring capabilities - ideal for parents",
      icon: Eye,
      preview: {
        bg: "bg-success",
        content: (
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">Active</span>
            </div>
            <div className="text-white text-xs opacity-80">3 faces trusted</div>
            {isPreviewInteractive && (
              <div className="text-white text-xs opacity-60">
                Last: Mom, 2m ago
              </div>
            )}
          </div>
        ),
      },
    },
    {
      id: "schedule",
      name: "Schedule Widget",
      description: "Shows next scheduled protection time",
      tooltip:
        "Ideal for school hours, bedtime, or office protection - perfect for routine-based security",
      icon: Clock,
      preview: {
        bg: "bg-info",
        content: (
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">Schedule</span>
            </div>
            <div className="text-white text-xs opacity-80">Next: 22:00</div>
            {isPreviewInteractive && (
              <div className="text-white text-xs opacity-60">Tap to snooze</div>
            )}
          </div>
        ),
      },
    },
  ];

  const handleAddToHomeScreen = () => {
    console.log("Adding widget to home screen:", selectedWidget);
    // This would trigger the actual widget installation
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
            <Smartphone className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Widget Setup</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header Info */}
        <Card className="bg-info/10 border-info/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Home className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="font-semibold text-info">Quick Access Widget</h3>
                <p className="text-sm text-info/80">
                  Add UnlockGuard controls to your home screen for instant
                  access to protection settings without opening the app.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Widget Type Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Choose Widget Type
          </h2>

          <div className="space-y-3">
            {widgetTypes.map((widget) => (
              <Card
                key={widget.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedWidget === widget.id
                    ? "ring-2 ring-primary bg-primary/5 border-primary/20"
                    : "bg-white/60 border-white/20 hover:bg-white/80"
                } backdrop-blur-sm`}
                onClick={() => setSelectedWidget(widget.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedWidget === widget.id
                          ? "bg-primary/20"
                          : "bg-muted/20"
                      }`}
                    >
                      <widget.icon
                        className={`w-6 h-6 ${
                          selectedWidget === widget.id
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-foreground">
                          {widget.name}
                        </h3>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-sm">{widget.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {widget.description}
                      </p>
                    </div>
                    {selectedWidget === widget.id && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Widget Preview */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <h3 className="font-semibold text-foreground">Widget Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewInteractive(!isPreviewInteractive)}
                className="text-xs"
              >
                <Zap className="w-3 h-3 mr-1" />
                {isPreviewInteractive ? "Static" : "Live"} Preview
              </Button>
            </div>

            <div className="flex justify-center">
              <div
                className="w-48 h-32 bg-slate-100 rounded-2xl p-4 relative overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => setIsPreviewInteractive(!isPreviewInteractive)}
              >
                {/* Mock home screen grid */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-4 gap-2 p-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-slate-400 rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Widget Preview */}
                <div className="relative z-10 mt-8">
                  <div
                    className={`${
                      widgetTypes.find((w) => w.id === selectedWidget)?.preview
                        .bg
                    } rounded-xl p-3 shadow-lg transition-all duration-200 ${
                      isPreviewInteractive ? "animate-pulse" : ""
                    }`}
                  >
                    {
                      widgetTypes.find((w) => w.id === selectedWidget)?.preview
                        .content
                    }
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              {isPreviewInteractive
                ? "Tap widget preview to see live interactions"
                : "This is how your widget will appear on your home screen"}
            </p>
          </CardContent>
        </Card>

        {/* Widget Features */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Widget Features</h3>

            <div className="space-y-3">
              {selectedWidget === "toggle" && (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-foreground">
                      One-tap protection toggle
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-foreground">
                      Visual status indicator
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-foreground">
                      Instant protection control
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-info rounded-full"></div>
                    <span className="text-foreground text-sm">
                      Optional confirmation prompt to avoid accidental disable
                    </span>
                  </div>
                </>
              )}

              {selectedWidget === "status" && (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-foreground">
                      Current protection status
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-foreground">
                      Number of trusted faces
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-foreground">
                      Recent activity summary
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-info rounded-full"></div>
                    <span className="text-foreground text-sm">
                      Tap to expand showing most recent unlock face and time
                    </span>
                  </div>
                </>
              )}

              {selectedWidget === "schedule" && (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-foreground">
                      Next scheduled activation
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-foreground">
                      Current schedule status
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-foreground">
                      Quick schedule toggle
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-info rounded-full"></div>
                    <span className="text-foreground text-sm">
                      Override or snooze schedule via widget tap
                    </span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Installation Instructions */}
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-primary">Installation Steps</h3>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    Tap "Add to Home Screen"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This will open your device's widget settings
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Move className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    Position the widget
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center space-x-1">
                    <span>
                      Drag to your preferred location on the home screen
                    </span>
                    <ChevronRight className="w-3 h-3" />
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    Start using your widget
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tap widget to open UnlockGuard instantly for secure access
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Widget Button */}
        <Button
          onClick={handleAddToHomeScreen}
          className="w-full h-14 rounded-xl text-lg font-semibold"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add to Home Screen
        </Button>

        {/* Additional Info */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3">
              Widget Requirements
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>iOS 14+ or Android 8+ required</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Widget updates every 15 minutes</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Tapping widget opens app for security verification</span>
              </li>
              <li className="flex items-start space-x-2">
                <Battery className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                <span>Battery usage: Minimal (approx. 0.5% daily)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

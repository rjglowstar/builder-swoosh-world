import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  RefreshCw,
  X,
  Circle,
  Wifi,
  WifiOff,
  Shield,
  AlertTriangle,
  Clock,
  HelpCircle,
  Star,
  Crown,
  ChevronDown,
  ChevronUp,
  ArrowLeftRight,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";

export default function DeviceManagement() {
  const { goBack } = useSmartNavigation();
  const [showAllDevices, setShowAllDevices] = useState(true);
  const [selectedPrimaryDevice, setSelectedPrimaryDevice] = useState<
    string | null
  >(null);
  const [devices, setDevices] = useState([
    {
      id: "A",
      name: "iPhone 15 Pro",
      type: "mobile",
      status: "online",
      isPrimary: true,
      lastSeen: "now",
      lastSync: "Just now",
      deviceId: "iOS-15Pro-2024",
      trustScore: "high",
      icon: Smartphone,
    },
    {
      id: "B",
      name: "MacBook Pro",
      type: "desktop",
      status: "online",
      isPrimary: false,
      lastSeen: "5m ago",
      lastSync: "5 minutes ago",
      deviceId: "macOS-MBP-2024",
      trustScore: "high",
      icon: Monitor,
    },
    {
      id: "C",
      name: "iPad Air",
      type: "tablet",
      status: "offline",
      isPrimary: false,
      lastSeen: "1d ago",
      lastSync: "1 day ago",
      deviceId: "iOS-iPad-2023",
      trustScore: "medium",
      icon: Tablet,
    },
    {
      id: "D",
      name: "iPhone 13",
      type: "mobile",
      status: "online",
      isPrimary: false,
      lastSeen: "12m ago",
      lastSync: "12 minutes ago",
      deviceId: "iOS-13-2023",
      trustScore: "high",
      icon: Smartphone,
    },
    {
      id: "E",
      name: "Android Phone",
      type: "mobile",
      status: "online",
      isPrimary: false,
      lastSeen: "3m ago",
      lastSync: "3 minutes ago",
      deviceId: "Android-Pixel-2024",
      trustScore: "high",
      icon: Smartphone,
    },
  ]);

  const maxDevices = 5;
  const usedDevices = devices.length;

  const handleRemoveDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== deviceId));
  };

  const getStatusIcon = (status: string) => {
    return status === "online" ? (
      <Wifi className="w-4 h-4 text-success" />
    ) : (
      <WifiOff className="w-4 h-4 text-muted-foreground" />
    );
  };

  const getStatusColor = (status: string) => {
    return status === "online" ? "text-success" : "text-muted-foreground";
  };

  const getTrustScoreColor = (score: string) => {
    switch (score) {
      case "high":
        return "text-success";
      case "medium":
        return "text-warning";
      case "low":
        return "text-danger";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrustScoreIcon = (score: string) => {
    switch (score) {
      case "high":
        return <Shield className="w-3 h-3 text-success" />;
      case "medium":
        return <AlertTriangle className="w-3 h-3 text-warning" />;
      case "low":
        return <X className="w-3 h-3 text-danger" />;
      default:
        return <Circle className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const handleTransferPrimary = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) => ({
        ...device,
        isPrimary: device.id === deviceId,
      })),
    );
    setSelectedPrimaryDevice(null);
  };

  const handleReplaceDevice = () => {
    // Replace device logic would go here
    console.log("Replace broken device initiated");
  };

  const visibleDevices = showAllDevices ? devices : devices.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={goBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Smartphone className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">
                Device Management
              </h1>
            </div>
          </div>

          <Badge className="bg-primary/10 text-primary border-primary/20">
            {usedDevices}/{maxDevices}
          </Badge>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Device Limit Status */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">My Devices</h2>
                <p className="text-sm text-muted-foreground">
                  {usedDevices} of {maxDevices} devices registered
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {Array.from({ length: maxDevices }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index < usedDevices ? "bg-success" : "bg-muted"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device List */}
        <div className="space-y-3">
          {visibleDevices.map((device) => (
            <Card
              key={device.id}
              className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <device.icon className="w-5 h-5 text-primary" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">
                          {device.id}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {device.name}
                        </span>
                        {device.isPrimary && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-0.5 cursor-help">
                                  <Star className="w-3 h-3 mr-1" />
                                  Primary
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="text-sm">
                                  Main device that controls face data and sync
                                  settings. Cannot be removed - transfer primary
                                  status first.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(device.status)}
                          <span
                            className={`text-sm font-medium ${getStatusColor(
                              device.status,
                            )}`}
                          >
                            {device.status === "online" ? "Online" : "Offline"}
                          </span>
                          {getTrustScoreIcon(device.trustScore)}
                          <span
                            className={`text-xs ${getTrustScoreColor(device.trustScore)}`}
                          >
                            {device.trustScore.charAt(0).toUpperCase() +
                              device.trustScore.slice(1)}{" "}
                            Trust
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Synced: {device.lastSync}</span>
                          {device.status === "offline" && (
                            <span>• Last seen: {device.lastSeen}</span>
                          )}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          Device ID: {device.deviceId}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    {!device.isPrimary && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => handleTransferPrimary(device.id)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                            >
                              <SwapHorizontal className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Make this device primary</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    <Button
                      onClick={() => handleRemoveDevice(device.id)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-muted-foreground hover:text-danger hover:bg-danger/10"
                      disabled={device.isPrimary}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {devices.length > 3 && (
            <Button
              variant="ghost"
              onClick={() => setShowAllDevices(!showAllDevices)}
              className="w-full h-10 rounded-xl"
            >
              {showAllDevices ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Show Less Devices
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Show {devices.length - 3} More Devices
                </>
              )}
            </Button>
          )}
        </div>

        {/* Device Actions */}
        <div className="space-y-3">
          <Button
            className="w-full h-12 rounded-xl"
            disabled={usedDevices >= maxDevices}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Device
            {usedDevices >= maxDevices && (
              <span className="ml-2 text-xs">(Limit Reached)</span>
            )}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl text-warning border-warning hover:bg-warning hover:text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Replace Broken Device
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Replace Broken Device</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove the selected device and allow you to add a
                  new one in its place. The device's local data will be
                  permanently cleared. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReplaceDevice}>
                  Replace Device
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Device Info */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-foreground">
              Device Information
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Circle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Primary Device</p>
                  <p className="text-muted-foreground">
                    Cannot be removed. Transfer primary status to another device
                    first.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Wifi className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Online Status</p>
                  <p className="text-muted-foreground">
                    Devices sync face data and settings when online.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <X className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Remove Device</p>
                  <p className="text-muted-foreground">
                    Removes device access and clears local data permanently.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Notice */}
        {usedDevices >= maxDevices && (
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 text-center space-y-3">
              <div className="flex items-center justify-center">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">
                  Device Limit Reached
                </h3>
                <p className="text-sm text-primary/80">
                  Upgrade to Premium Plus for unlimited device sync
                </p>

                {/* Benefits Tooltip */}
                <div className="bg-white/50 rounded-lg p-3 space-y-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center space-x-2 cursor-help">
                          <HelpCircle className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            What do I get with unlimited sync?
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <div className="space-y-1 text-sm">
                          <p>• Connect unlimited devices</p>
                          <p>• Family sharing (up to 6 users)</p>
                          <p>• Advanced device management</p>
                          <p>• Priority sync speed</p>
                          <p>• Device usage analytics</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Link to="/pricing">
                <Button className="w-full h-10 rounded-xl">Upgrade Plan</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Security Note */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3">
              Security Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Only add devices you personally own and control</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Remove devices immediately if lost or stolen</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Each device maintains local face recognition data</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Sync requires Premium Plus subscription</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

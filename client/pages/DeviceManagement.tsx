import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function DeviceManagement() {
  const [devices, setDevices] = useState([
    {
      id: "A",
      name: "iPhone 15 Pro",
      type: "mobile",
      status: "online",
      isPrimary: true,
      lastSeen: "now",
      icon: Smartphone,
    },
    {
      id: "B",
      name: "MacBook Pro",
      type: "desktop",
      status: "online",
      isPrimary: false,
      lastSeen: "5m ago",
      icon: Monitor,
    },
    {
      id: "C",
      name: "iPad Air",
      type: "tablet",
      status: "offline",
      isPrimary: false,
      lastSeen: "1d ago",
      icon: Tablet,
    },
    {
      id: "D",
      name: "iPhone 13",
      type: "mobile",
      status: "online",
      isPrimary: false,
      lastSeen: "12m ago",
      icon: Smartphone,
    },
    {
      id: "E",
      name: "Android Phone",
      type: "mobile",
      status: "online",
      isPrimary: false,
      lastSeen: "3m ago",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/settings">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
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

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
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
          {devices.map((device) => (
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
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-0.5">
                            Primary
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(device.status)}
                        <span
                          className={`text-sm font-medium ${getStatusColor(
                            device.status,
                          )}`}
                        >
                          {device.status === "online" ? "Online" : "Offline"}
                        </span>
                        {device.status === "offline" && (
                          <span className="text-xs text-muted-foreground">
                            {device.lastSeen}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

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
              </CardContent>
            </Card>
          ))}
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

          <Button
            variant="outline"
            className="w-full h-12 rounded-xl text-warning border-warning hover:bg-warning hover:text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Replace Broken Device
          </Button>
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
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">
                  Device Limit Reached
                </h3>
                <p className="text-sm text-primary/80">
                  Upgrade to Premium Plus for unlimited device sync
                </p>
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

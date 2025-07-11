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
  Bell,
  ShieldX,
  HelpCircle,
  Cloud,
  Crown,
  Trash2,
  Check,
  AlertTriangle,
  User,
  Smartphone,
  Clock,
  Laptop,
  Tablet,
  Star,
  Filter,
  Camera,
  MapPin,
  Archive,
  ChevronDown,
  ChevronUp,
  Key,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useAppStatus, NotificationData } from "@/contexts/AppStatusContext";

export default function Notifications() {
  const { notifications, setNotifications } = useAppStatus();
  const [filter, setFilter] = useState("all");
  const [expandedNotification, setExpandedNotification] = useState<
    number | null
  >(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);

  // Initialize with mock data if no notifications exist
  const defaultNotifications: NotificationData[] = [
    {
      id: 1,
      type: "security",
      title: "Face blocked: Bob",
      description: "Attempted access denied",
      timestamp: "Today at 09:15",
      read: false,
      icon: ShieldX,
      iconColor: "text-danger",
      bgColor: "bg-danger/10",
      borderColor: "border-danger/20",
      action: "/blocked-faces",
      details: {
        snapshot: "/api/snapshots/blocked-bob-001.jpg",
        location: "Front door camera",
        confidence: 87,
      },
    },
    {
      id: 2,
      type: "detection",
      title: "Unknown face detected",
      description: "Unrecognized person attempted access",
      timestamp: "Yesterday 17:42",
      read: false,
      icon: HelpCircle,
      iconColor: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      action: "/unlock-history",
      details: {
        snapshot: "/api/snapshots/unknown-001.jpg",
        location: "Front door camera",
        confidence: 92,
      },
    },
    {
      id: 3,
      type: "sync",
      title: "New device added to sync",
      description: "iPhone 15 Pro connected successfully",
      timestamp: "2 days ago",
      read: true,
      icon: Smartphone,
      iconColor: "text-info",
      bgColor: "bg-info/10",
      borderColor: "border-info/20",
      action: "/sync",
      details: {
        deviceInfo: "iPhone 15 Pro • iOS 17.2 • Automatic sync",
      },
    },
    {
      id: 4,
      type: "subscription",
      title: "Subscription renewed",
      description: "Premium plan renewed successfully",
      timestamp: "3 days ago",
      read: true,
      icon: Crown,
      iconColor: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      action: "/subscription",
    },
    {
      id: 5,
      type: "security",
      title: "Face successfully added",
      description: "Carol added to trusted faces",
      timestamp: "1 week ago",
      read: true,
      icon: User,
      iconColor: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      action: "/manage-faces",
      details: {
        faceName: "Carol",
        confidence: 95,
        deviceInfo: "Added via iPhone 15 Pro",
      },
    },
    {
      id: 6,
      type: "system",
      title: "Protection schedule activated",
      description: "Night mode protection is now active",
      timestamp: "1 week ago",
      read: true,
      icon: Clock,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      action: "/schedule",
      details: {
        deviceInfo: "Active: 22:00 – 07:00 • Monday-Friday",
      },
    },
  ];

  // Use default notifications if none exist
  const currentNotifications =
    notifications.length > 0 ? notifications : defaultNotifications;

  const filteredNotifications = currentNotifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "security")
      return (
        notification.type === "security" || notification.type === "detection"
      );
    if (filter === "unread") return !notification.read;
    if (filter === "important") return notification.important;
    return notification.type === filter;
  });

  const unreadCount = currentNotifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const handleToggleImportant = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, important: !notification.important }
          : notification,
      ),
    );
  };

  const handleArchiveNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent, id: number) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent, id: number) => {
    if (!touchStartX.current || !touchStartTime.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchDuration = Date.now() - touchStartTime.current;
    const swipeDistance = touchStartX.current - touchEndX;

    // Only trigger swipe if it's fast and significant
    if (touchDuration < 300 && Math.abs(swipeDistance) > 100) {
      if (swipeDistance > 0) {
        // Swipe left - Delete
        handleDeleteNotification(id);
      } else {
        // Swipe right - Archive
        handleArchiveNotification(id);
      }
    }

    touchStartX.current = null;
    touchStartTime.current = null;
  };

  const getDeviceIcon = (deviceName: string) => {
    const name = deviceName.toLowerCase();
    if (name.includes("iphone") || name.includes("phone")) return Smartphone;
    if (name.includes("ipad") || name.includes("tablet")) return Tablet;
    if (name.includes("mac") || name.includes("laptop")) return Laptop;
    return Smartphone;
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
              <Bell className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="bg-danger text-white text-xs px-2 py-0.5">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Filter Dropdown */}
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-24 h-8 text-xs">
                <Filter className="w-3 h-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="sync">Sync</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            {currentNotifications.length > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                variant="ghost"
                size="sm"
                className="text-xs"
              >
                <Check className="w-4 h-4 mr-1" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              const DeviceIcon =
                notification.type === "sync"
                  ? getDeviceIcon(notification.description)
                  : null;
              const isExpanded = expandedNotification === notification.id;

              return (
                <div
                  key={notification.id}
                  onTouchStart={(e) => handleTouchStart(e, notification.id)}
                  onTouchEnd={(e) => handleTouchEnd(e, notification.id)}
                  className="relative"
                >
                  <Card
                    className={`${notification.bgColor} ${notification.borderColor} hover:scale-[1.01] transition-all duration-200 cursor-pointer shadow-sm ${
                      !notification.read ? "ring-2 ring-primary/20" : ""
                    } ${notification.important ? "ring-2 ring-warning border-warning" : ""}`}
                    onClick={() => {
                      handleMarkAsRead(notification.id);
                      setExpandedNotification(
                        isExpanded ? null : notification.id,
                      );
                    }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.bgColor} ${notification.borderColor} border`}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${notification.iconColor}`}
                            />
                          </div>
                          {DeviceIcon && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border">
                              <DeviceIcon className="w-2 h-2 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3
                                  className={`font-semibold ${notification.iconColor} ${
                                    !notification.read ? "font-bold" : ""
                                  }`}
                                >
                                  {notification.title}
                                </h3>
                                {notification.important && (
                                  <Star className="w-4 h-4 text-warning fill-warning" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.description}
                              </p>
                              {notification.details?.faceName && (
                                <p className="text-sm font-medium text-primary mt-1">
                                  👤 {notification.details.faceName}
                                </p>
                              )}
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleImportant(notification.id);
                                    }}
                                    className="h-6 px-2"
                                  >
                                    <Star
                                      className={`w-3 h-3 ${notification.important ? "text-warning fill-warning" : "text-muted-foreground"}`}
                                    />
                                  </Button>
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </div>
                              </div>
                            </div>

                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1 flex-shrink-0"></div>
                            )}
                          </div>

                          {/* Expanded Details */}
                          {isExpanded && notification.details && (
                            <div className="mt-4 p-3 bg-white/50 rounded-lg border space-y-3">
                              {notification.details.snapshot && (
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Camera className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">
                                      Camera Snapshot
                                    </span>
                                  </div>
                                  <div className="w-full h-32 bg-slate-200 rounded-lg flex items-center justify-center">
                                    <span className="text-xs text-muted-foreground">
                                      📷 Snapshot:{" "}
                                      {notification.details.snapshot}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {notification.details.location && (
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    {notification.details.location}
                                  </span>
                                </div>
                              )}

                              {notification.details.confidence && (
                                <div className="flex items-center space-x-2">
                                  <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
                                    <span className="text-xs text-white">
                                      %
                                    </span>
                                  </div>
                                  <span className="text-sm">
                                    Confidence:{" "}
                                    {notification.details.confidence}%
                                  </span>
                                </div>
                              )}

                              {notification.details.deviceInfo && (
                                <div className="flex items-center space-x-2">
                                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    {notification.details.deviceInfo}
                                  </span>
                                </div>
                              )}

                              <div className="flex space-x-2 pt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleArchiveNotification(notification.id);
                                  }}
                                  className="flex-1"
                                >
                                  <Archive className="w-3 h-3 mr-1" />
                                  Archive
                                </Button>
                                <Link
                                  to={notification.action}
                                  className="flex-1"
                                >
                                  <Button size="sm" className="w-full">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Swipe Instructions */}
                  <div className="absolute inset-x-0 -bottom-6 flex justify-center opacity-50">
                    <div className="text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
                      ← Swipe to delete • Swipe to archive →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {filter === "all"
                  ? "No Notifications"
                  : `No ${filter} notifications`}
              </h3>
              <p className="text-muted-foreground mb-4">
                {filter === "all"
                  ? "You're all caught up! Security alerts, sync updates, and system messages will appear here."
                  : `No ${filter} notifications found. Try changing the filter to see more.`}
              </p>
              {filter !== "all" && (
                <Button variant="outline" onClick={() => setFilter("all")}>
                  Show All Notifications
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {currentNotifications.length > 0 && (
          <div className="space-y-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl text-danger border-danger hover:bg-danger hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Notifications
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear All Notifications</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all notifications. This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearAll}
                    className="bg-danger hover:bg-danger/90"
                  >
                    Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {/* Notification Categories Info */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-foreground">
              Notification Types
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <ShieldX className="w-4 h-4 text-danger" />
                <div>
                  <span className="font-medium text-foreground">
                    Security Alerts
                  </span>
                  <p className="text-muted-foreground text-xs">
                    Blocked faces, failed attempts, security events
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <HelpCircle className="w-4 h-4 text-warning" />
                <div>
                  <span className="font-medium text-foreground">
                    Detection Events
                  </span>
                  <p className="text-muted-foreground text-xs">
                    Unknown faces, recognition updates
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Cloud className="w-4 h-4 text-info" />
                <div>
                  <span className="font-medium text-foreground">
                    Sync & Devices
                  </span>
                  <p className="text-muted-foreground text-xs">
                    Cloud sync status, device connections
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Crown className="w-4 h-4 text-success" />
                <div>
                  <span className="font-medium text-foreground">
                    Subscription
                  </span>
                  <p className="text-muted-foreground text-xs">
                    Plan updates, billing, renewals
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Link */}
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <Link
              to="/settings"
              className="flex items-center justify-between w-full"
            >
              <div>
                <h3 className="font-semibold text-primary">
                  Notification Settings
                </h3>
                <p className="text-sm text-primary/80">
                  Customize which alerts you receive
                </p>
              </div>
              <ArrowLeft className="w-5 h-5 text-primary rotate-180" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

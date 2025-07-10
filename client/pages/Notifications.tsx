import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
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
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

          {notifications.length > 0 && (
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

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div className="d-block mb-2">
                <Link
                  key={notification.id}
                  to={notification.action}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <Card
                    className={`${notification.bgColor} ${notification.borderColor} hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow-sm ${
                      !notification.read ? "ring-2 ring-primary/20" : ""
                    }`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.bgColor} ${notification.borderColor} border`}
                        >
                          <notification.icon
                            className={`w-5 h-5 ${notification.iconColor}`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3
                                className={`font-semibold ${notification.iconColor} ${
                                  !notification.read ? "font-bold" : ""
                                }`}
                              >
                                {notification.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.timestamp}
                              </p>
                            </div>

                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1 flex-shrink-0"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Notifications
              </h3>
              <p className="text-muted-foreground">
                You're all caught up! Security alerts, sync updates, and system
                messages will appear here.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {notifications.length > 0 && (
          <div className="space-y-3">
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="w-full h-12 rounded-xl text-danger border-danger hover:bg-danger hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Notifications
            </Button>
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

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  Shield,
  Eye,
  EyeOff,
  Settings,
  Bell,
  Smartphone,
  CreditCard,
  Calendar,
  Target,
  Palette,
  Globe,
  Grid3X3,
  RotateCcw,
  LogOut,
  Trash2,
  Edit2,
  Camera,
  Check,
  ChevronRight,
  Users,
  UserX,
  Key,
  Moon,
  Sun,
  Monitor,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppStatus } from "@/contexts/AppStatusContext";

export default function Profile() {
  const {
    emergencyPinSet,
    trustedFaces,
    guestModeEnabled,
    setGuestModeEnabled,
    scheduleEnabled,
    subscriptionActive,
  } = useAppStatus();

  const [userInfo, setUserInfo] = useState({
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
  });

  const [editing, setEditing] = useState(false);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");
  const [defaultSection, setDefaultSection] = useState("Face Management");
  const [widgetEnabled, setWidgetEnabled] = useState(true);

  const [notifications, setNotifications] = useState({
    security: true,
    detection: true,
    device: true,
    subscription: false,
  });

  const handleSave = () => {
    setEditing(false);
    // In real app, save to backend
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      // Handle account deletion
      console.log("Account deletion requested");
    }
  };

  const handleResetSettings = () => {
    if (
      confirm(
        "Reset all app settings to default? This will not affect your trusted faces or emergency PIN.",
      )
    ) {
      // Handle settings reset
      console.log("Settings reset requested");
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      // Handle logout
      console.log("Logout requested");
    }
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
            <User className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* User Info Section */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profile Information</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (editing ? handleSave() : setEditing(true))}
              >
                {editing ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Edit2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full"
                >
                  <Camera className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  disabled={!editing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  disabled={!editing}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Used for sync and account recovery
                </p>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  disabled={!editing}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Overview Section */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>Security Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Trusted Faces */}
              <Link to="/manage-faces" className="block">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium">Trusted Faces</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-700">
                    {trustedFaces}
                  </p>
                  <p className="text-xs text-emerald-600">View / Manage</p>
                </div>
              </Link>

              {/* Blocked Faces */}
              <Link to="/blocked-faces" className="block">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                  <div className="flex items-center space-x-2 mb-1">
                    <UserX className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium">Blocked Faces</span>
                  </div>
                  <p className="text-lg font-bold text-red-700">2</p>
                  <p className="text-xs text-red-600">View Block List</p>
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Emergency PIN */}
              <Link to="/emergency-pin" className="block">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="flex items-center space-x-2 mb-1">
                    <Key className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Emergency PIN</span>
                  </div>
                  <p className="text-sm font-bold text-blue-700">
                    {emergencyPinSet ? "✅ Set" : "⚠️ Not Set"}
                  </p>
                  <p className="text-xs text-blue-600">Manage PIN</p>
                </div>
              </Link>

              {/* Guest Mode */}
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Guest Mode</span>
                  </div>
                  <Switch
                    checked={guestModeEnabled}
                    onCheckedChange={setGuestModeEnabled}
                    size="sm"
                  />
                </div>
                <p className="text-sm font-bold text-purple-700">
                  {guestModeEnabled ? "ON" : "OFF"}
                </p>
                <Link to="/guest-mode">
                  <p className="text-xs text-purple-600 hover:underline">
                    View Settings
                  </p>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cross-Device Sync Status */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <span>Cross-Device Sync</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sync Status</p>
                <p className="text-xs text-muted-foreground">
                  Last sync: 12:15 PM
                </p>
              </div>
              <Badge variant={subscriptionActive ? "default" : "secondary"}>
                {subscriptionActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Connected Devices</p>
                <p className="text-xs text-muted-foreground">
                  3 of 5 devices connected
                </p>
              </div>
              <Link to="/device-management">
                <Button variant="outline" size="sm">
                  Manage Devices
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-amber-600" />
                <span>Notifications</span>
              </CardTitle>
              <Link to="/notifications">
                <Button variant="outline" size="sm">
                  Notification Center
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Security Alerts</span>
              <Switch
                checked={notifications.security}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, security: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Detection Events</span>
              <Switch
                checked={notifications.detection}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, detection: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Device Events</span>
              <Switch
                checked={notifications.device}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, device: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Subscription Updates</span>
              <Switch
                checked={notifications.subscription}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, subscription: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Subscription & Plan */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              <span>Subscription Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Current Plan</p>
                <p className="text-lg font-bold text-green-600">
                  {subscriptionActive ? "Premium Plus" : "Free"}
                </p>
                {subscriptionActive && (
                  <p className="text-xs text-muted-foreground">
                    Renews: March 15, 2024
                  </p>
                )}
              </div>
              <Link to="/subscription">
                <Button variant="outline" size="sm">
                  {subscriptionActive ? "Manage Plan" : "Upgrade"}
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Protection Summary */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span>Protection Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Schedule Status</p>
                <p className="text-xs text-muted-foreground">
                  {scheduleEnabled ? "Mon–Fri, 10PM–7AM" : "Always Active"}
                </p>
              </div>
              <Link to="/schedule">
                <Button variant="outline" size="sm">
                  Edit Schedule
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Detection Sensitivity</p>
                <p className="text-xs text-muted-foreground">
                  85% (Recommended)
                </p>
              </div>
              <Link to="/sensitivity">
                <Button variant="outline" size="sm">
                  Adjust
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Preferences & Display Settings */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-gray-600" />
              <span>Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Theme</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant={theme === "light" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="w-3 h-3" />
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="w-3 h-3" />
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Language</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Default Home Section</p>
                <p className="text-xs text-muted-foreground">Face Management</p>
              </div>
              <select
                value={defaultSection}
                onChange={(e) => setDefaultSection(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option>Face Management</option>
                <option>Notifications</option>
                <option>Dashboard</option>
                <option>Security</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Quick Widget</p>
                <p className="text-xs text-muted-foreground">
                  Status: {widgetEnabled ? "Enabled" : "Disabled"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={widgetEnabled}
                  onCheckedChange={setWidgetEnabled}
                />
                <Link to="/widget-setup">
                  <Button variant="ghost" size="sm">
                    <Widget className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleResetSettings}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset App Settings
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>

            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleDeleteAccount}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

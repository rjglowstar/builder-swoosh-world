import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  User,
  Eye,
  Clock,
  Settings,
  FileText,
  Users,
  CheckCircle,
  XCircle,
  HelpCircle,
  Cloud,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dashboardData = {
    protection: {
      status: "active",
      currentFace: "Alice",
      facesAllowed: 3,
      facesLimit: "Unlimited", // or number for premium users
    },
    todayStats: {
      allowed: 8,
      blocked: 2,
      unknown: 1,
    },
    lastSync: "10:45 AM",
    planType: "free", // free, premium, plus
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "text-success" : "text-muted-foreground";
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-success/10 text-success border-success/20">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary">
        <XCircle className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>
          </div>

          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Protection Status */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Protection Status
              </h2>
              {getStatusBadge(dashboardData.protection.status)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current Face:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-success" />
                  </div>
                  <span className="font-medium text-foreground">
                    {dashboardData.protection.currentFace}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Faces Allowed:</span>
                <span className="font-medium text-foreground">
                  {dashboardData.protection.facesAllowed} /{" "}
                  {dashboardData.protection.facesLimit}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Activity */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Unlock Attempts (Today)
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-success/10 rounded-xl">
                <div className="text-xl font-bold text-success">
                  {dashboardData.todayStats.allowed}
                </div>
                <div className="text-xs text-success/80">Allowed</div>
              </div>
              <div className="text-center p-3 bg-danger/10 rounded-xl">
                <div className="text-xl font-bold text-danger">
                  {dashboardData.todayStats.blocked}
                </div>
                <div className="text-xs text-danger/80">Blocked</div>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-xl">
                <div className="text-xl font-bold text-warning">
                  {dashboardData.todayStats.unknown}
                </div>
                <div className="text-xs text-warning/80">Unknown</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sync Status */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cloud className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Last Sync:</span>
              </div>
              <span className="font-medium text-foreground">
                {dashboardData.lastSync}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/unlock-history">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl justify-start"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Log
            </Button>
          </Link>
          <Link to="/manage-faces">
            <Button className="w-full h-12 rounded-xl justify-start">
              <Users className="w-4 h-4 mr-2" />
              Manage Faces
            </Button>
          </Link>
        </div>

        {/* Additional Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/blocked-faces">
            <Card className="bg-danger/10 border-danger/20 hover:bg-danger/20 transition-colors cursor-pointer">
              <CardContent className="p-3 text-center">
                <XCircle className="w-5 h-5 text-danger mx-auto mb-1" />
                <div className="text-sm font-medium text-danger">
                  Blocked Faces
                </div>
                <div className="text-xs text-danger/80">
                  {dashboardData.todayStats.blocked} today
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/add-face">
            <Card className="bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
              <CardContent className="p-3 text-center">
                <User className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-sm font-medium text-primary">Add Face</div>
                <div className="text-xs text-primary/80">New trusted face</div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Security Insights */}
        <Card className="bg-info/10 border-info/20">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-info" />
              <h3 className="font-semibold text-info">Security Insights</h3>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-info/80">
                  {Math.round(
                    (dashboardData.todayStats.allowed /
                      (dashboardData.todayStats.allowed +
                        dashboardData.todayStats.blocked)) *
                      100,
                  )}
                  % success rate today
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-info/80">
                  {dashboardData.protection.facesAllowed} trusted faces
                  configured
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Status */}
        {dashboardData.planType === "free" && (
          <Card className="bg-gradient-to-r from-primary/10 to-blue-100/50 border-primary/20">
            <CardContent className="p-4 text-center space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">Free Plan</span>
              </div>
              <p className="text-sm text-primary/80">
                Upgrade to unlock cloud sync, unlimited faces, and advanced
                security features
              </p>
              <Link to="/pricing">
                <Button className="w-full h-10 rounded-xl">Upgrade Now</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

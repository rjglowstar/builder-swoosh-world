import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Settings, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dashboardData = {
    protection: {
      status: "active",
      currentFace: "Alice",
      guestMode: {
        enabled: false,
        timeLimit: 30,
        autoDisable: true,
      },
    },
    todayStats: {
      allowed: 8,
      blocked: 2,
    },
    lastSync: "10:42 AM",
    totalTaggedFaces: 5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Protection:</span>
              <span className="font-medium text-success">Active</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-foreground">Current Face:</span>
              <span className="font-medium text-foreground">
                {dashboardData.protection.currentFace}
              </span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-foreground">Unlocks Today:</span>
              <div className="text-right">
                <div className="text-foreground">
                  Allowed {dashboardData.todayStats.allowed}, Blocked{" "}
                  {dashboardData.todayStats.blocked}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-foreground">Total Tagged Faces:</span>
              <span className="font-medium text-foreground">
                {dashboardData.totalTaggedFaces}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-foreground">Last Sync:</span>
              <span className="font-medium text-foreground">
                {dashboardData.lastSync}
              </span>
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
}

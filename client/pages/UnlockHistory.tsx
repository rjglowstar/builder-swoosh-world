import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  History,
  Download,
  Trash2,
  Check,
  X,
  MoreVertical,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UnlockHistory() {
  const unlockLogs = [
    {
      id: 1,
      date: "08/07",
      time: "09:01",
      status: "allowed",
      user: "Alice",
      confidence: 0.95,
    },
    {
      id: 2,
      date: "08/07",
      time: "08:55",
      status: "blocked",
      user: "Bob",
      confidence: 0.87,
    },
    {
      id: 3,
      date: "08/07",
      time: "08:30",
      status: "allowed",
      user: "Alice",
      confidence: 0.92,
    },
    {
      id: 4,
      date: "08/06",
      time: "22:15",
      status: "blocked",
      user: "Unknown",
      confidence: 0.73,
    },
    {
      id: 5,
      date: "08/06",
      time: "18:45",
      status: "allowed",
      user: "Carol",
      confidence: 0.89,
    },
    {
      id: 6,
      date: "08/06",
      time: "14:20",
      status: "blocked",
      user: "Bob",
      confidence: 0.91,
    },
    {
      id: 7,
      date: "08/06",
      time: "09:15",
      status: "allowed",
      user: "Alice",
      confidence: 0.96,
    },
  ];

  const stats = {
    total: unlockLogs.length,
    allowed: unlockLogs.filter((log) => log.status === "allowed").length,
    blocked: unlockLogs.filter((log) => log.status === "blocked").length,
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
              <History className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">Unlock History</h1>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Filter className="w-4 h-4 mr-2" />
                Filter Logs
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </DropdownMenuItem>
              <DropdownMenuItem className="text-danger">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Log
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-foreground">
                {stats.total}
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card className="bg-success/10 border-success/20">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-success">
                {stats.allowed}
              </div>
              <div className="text-xs text-success/80">Allowed</div>
            </CardContent>
          </Card>
          <Card className="bg-danger/10 border-danger/20">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-danger">
                {stats.blocked}
              </div>
              <div className="text-xs text-danger/80">Blocked</div>
            </CardContent>
          </Card>
        </div>

        {/* Log Entries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Activity
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="rounded-xl">
                <Download className="w-4 h-4 mr-1" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Log Table Header */}
          <Card className="bg-white/40 backdrop-blur-sm border-white/20">
            <CardContent className="p-3">
              <div className="grid grid-cols-4 gap-3 text-sm font-medium text-muted-foreground">
                <div>Date</div>
                <div>Time</div>
                <div>Status</div>
                <div>User</div>
              </div>
            </CardContent>
          </Card>

          {/* Log Entries */}
          <div className="space-y-2">
            {unlockLogs.map((log) => (
              <Card
                key={log.id}
                className={`bg-white/60 backdrop-blur-sm border-white/20 transition-all duration-200 hover:shadow-md ${
                  log.status === "allowed"
                    ? "border-l-4 border-l-success"
                    : "border-l-4 border-l-danger"
                }`}
              >
                <CardContent className="p-3">
                  <div className="grid grid-cols-4 gap-3 items-center">
                    <div className="text-sm font-medium text-foreground">
                      {log.date}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {log.time}
                    </div>
                    <div>
                      <Badge
                        variant={
                          log.status === "allowed" ? "default" : "destructive"
                        }
                        className={
                          log.status === "allowed"
                            ? "bg-success text-white"
                            : "bg-danger text-white"
                        }
                      >
                        {log.status === "allowed" ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : (
                          <X className="w-3 h-3 mr-1" />
                        )}
                        {log.status === "allowed" ? "Allowed" : "Blocked"}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-foreground">
                        {log.user}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(log.confidence * 100).toFixed(0)}% match
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl text-danger border-danger hover:bg-danger hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Log
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Logs are automatically cleared after 30 days. Export important data
            before it expires.
          </p>
        </div>
      </div>
    </div>
  );
}

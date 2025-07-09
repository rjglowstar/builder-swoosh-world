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
  Clock,
  Info,
  HelpCircle,
  AlertCircle,
  MapPin,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

export default function UnlockHistory() {
  const unlockLogs = [
    {
      id: 1,
      date: "08/07",
      time: "09:01",
      status: "allowed",
      user: "Alice",
      confidence: 0.95,
      device: "Main Door",
      location: "Front Entrance",
      isUnknown: false,
    },
    {
      id: 2,
      date: "08/07",
      time: "08:55",
      status: "blocked",
      user: "Bob",
      confidence: 0.87,
      device: "Main Door",
      location: "Front Entrance",
      isUnknown: false,
    },
    {
      id: 3,
      date: "08/07",
      time: "08:30",
      status: "allowed",
      user: "Alice",
      confidence: 0.92,
      device: "Main Door",
      location: "Front Entrance",
      isUnknown: false,
    },
    {
      id: 4,
      date: "08/06",
      time: "22:15",
      status: "blocked",
      user: "Unknown",
      confidence: 0.73,
      device: "Side Door",
      location: "Side Entrance",
      isUnknown: true,
    },
    {
      id: 5,
      date: "08/06",
      time: "18:45",
      status: "allowed",
      user: "Carol",
      confidence: 0.89,
      device: "Main Door",
      location: "Front Entrance",
      isUnknown: false,
    },
    {
      id: 6,
      date: "08/06",
      time: "14:20",
      status: "blocked",
      user: "Bob",
      confidence: 0.91,
      device: "Main Door",
      location: "Front Entrance",
      isUnknown: false,
    },
    {
      id: 7,
      date: "08/06",
      time: "09:15",
      status: "allowed",
      user: "Alice",
      confidence: 0.96,
      device: "Main Door",
      location: "Front Entrance",
      isUnknown: false,
    },
  ];

  const stats = {
    total: unlockLogs.length,
    allowed: unlockLogs.filter((log) => log.status === "allowed").length,
    blocked: unlockLogs.filter((log) => log.status === "blocked").length,
    unknown: unlockLogs.filter((log) => log.isUnknown).length,
  };

  const handleClearLog = () => {
    // Handle clear log logic here
    console.log("Clearing logs...");
  };

  const handleExportCSV = () => {
    // Handle export CSV logic here
    console.log("Exporting CSV...");
  };

  return (
    <TooltipProvider>
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
                <h1 className="text-xl font-bold text-primary">
                  Unlock History
                </h1>
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
                <DropdownMenuItem onClick={handleExportCSV}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className="text-danger"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Log
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will delete all unlock history and cannot be
                        undone. Consider exporting your data first.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearLog}
                        className="bg-danger hover:bg-danger/90"
                      >
                        Delete All Logs
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* Stats Cards - Added Unknown tile with tooltip */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">
                Overview
              </h2>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Only stored for 30 days. Accuracy = match confidence.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-4 gap-2">
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
              <Card className="bg-warning/10 border-warning/20">
                <CardContent className="p-3 text-center">
                  <div className="text-xl font-bold text-warning">
                    {stats.unknown}
                  </div>
                  <div className="text-xs text-warning/80">Unknown</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Data Retention Notice */}
          <Card className="bg-info/10 border-info/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-info">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Only last 30 days are stored. Export important data before it
                  expires.
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Log Entries */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Activity
              </h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={handleExportCSV}
                >
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

            {/* Log Entries with Enhanced Tooltips */}
            <div className="space-y-2">
              {unlockLogs.map((log) => (
                <Tooltip key={log.id}>
                  <TooltipTrigger asChild>
                    <Card
                      className={`bg-white/60 backdrop-blur-sm border-white/20 transition-all duration-200 hover:shadow-md cursor-pointer ${
                        log.status === "allowed"
                          ? "border-l-4 border-l-success"
                          : log.isUnknown
                            ? "border-l-4 border-l-warning"
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
                                log.status === "allowed"
                                  ? "default"
                                  : log.isUnknown
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                log.status === "allowed"
                                  ? "bg-success text-white"
                                  : log.isUnknown
                                    ? "bg-warning text-white"
                                    : "bg-danger text-white"
                              }
                            >
                              {log.status === "allowed" ? (
                                <Check className="w-3 h-3 mr-1" />
                              ) : log.isUnknown ? (
                                <HelpCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <X className="w-3 h-3 mr-1" />
                              )}
                              {log.status === "allowed"
                                ? "Allowed"
                                : log.isUnknown
                                  ? "Unknown"
                                  : "Blocked"}
                            </Badge>
                          </div>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-foreground">
                                {log.user}
                              </span>
                              {log.isUnknown && (
                                <AlertCircle className="w-3 h-3 text-warning" />
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {(log.confidence * 100).toFixed(0)}% match
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs space-y-1">
                      <p className="font-semibold">
                        Match Quality: {(log.confidence * 100).toFixed(1)}%
                      </p>
                      <div className="flex items-center gap-1">
                        <Smartphone className="w-3 h-3" />
                        <span>Device: {log.device}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Location: {log.location}</span>
                      </div>
                      <p className="text-muted-foreground">
                        Sync Status: ✓ Synced
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Actions with Confirmation Dialog */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 rounded-xl"
                onClick={handleExportCSV}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl text-danger border-danger hover:bg-danger hover:text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Log
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-danger" />
                      Delete All Unlock History?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all {stats.total} unlock
                      records and cannot be undone. We recommend exporting your
                      data first if you need to keep these records.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearLog}
                      className="bg-danger hover:bg-danger/90"
                    >
                      Delete All Records
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

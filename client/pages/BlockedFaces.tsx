import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ShieldX,
  Trash2,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  Download,
  RefreshCw,
  Clock,
  Smartphone,
  Eye,
  HelpCircle,
} from "lucide-react";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";
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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function BlockedFaces() {
  const { goBack } = useSmartNavigation();
  const { toast } = useToast();
  const [selectedView, setSelectedView] = useState<
    "blocked" | "attempts" | null
  >(null);

  const blockedFaces = [
    {
      id: 1,
      name: "Bob",
      avatar: "👨‍💻",
      blockedDate: "2024-01-10",
      attempts: 12,
      lastAttempt: "2024-01-10T10:15:00",
      deviceId: "Main Door",
      location: "Front Entrance",
    },
    {
      id: 2,
      name: "Eve",
      avatar: "👩‍🦰",
      blockedDate: "2024-01-08",
      attempts: 7,
      lastAttempt: "2024-01-08T14:22:00",
      deviceId: "Side Door",
      location: "Side Entrance",
    },
    {
      id: 3,
      name: "Unknown User",
      avatar: "❓",
      blockedDate: "2024-01-05",
      attempts: 3,
      lastAttempt: "2024-01-05T20:45:00",
      deviceId: "Main Door",
      location: "Front Entrance",
    },
  ];

  const totalAttempts = blockedFaces.reduce(
    (sum, face) => sum + face.attempts,
    0,
  );
  const lastBlockedAttempt =
    blockedFaces.length > 0
      ? new Date(
          Math.max(
            ...blockedFaces.map((f) => new Date(f.lastAttempt).getTime()),
          ),
        )
      : null;

  const handleUnblock = (faceId: number, faceName: string) => {
    console.log(`Unblocking face: ${faceName}`);
    toast({
      title: "Face unblocked",
      description: `${faceName} has been moved back to neutral status.`,
    });
  };

  const handleDelete = (faceId: number, faceName: string) => {
    console.log(`Deleting face: ${faceName}`);
    toast({
      title: "Face deleted",
      description: `${faceName} and all associated data have been removed.`,
    });
  };

  const handleClearAll = () => {
    console.log("Clearing all blocked faces");
    toast({
      title: "All blocked faces cleared",
      description:
        "Protection has been removed from all previously blocked profiles.",
    });
  };

  const handleExport = () => {
    console.log("Exporting blocked faces log");
    toast({
      title: "Export started",
      description: "Blocked faces log is being prepared for download.",
    });
  };

  const formatLastAttempt = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffHours < 24) {
      return `${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} today`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <TooltipProvider>
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
                <ShieldX className="w-6 h-6 text-danger" />
                <h1 className="text-xl font-bold text-primary">
                  Blocked Faces
                </h1>
              </div>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh blocked faces</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* Enhanced Alert Info with Last Attempt */}
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-warning">Security Alert</h3>
                  <p className="text-sm text-warning/80">
                    These faces have been blocked from accessing your device.
                    Review and manage blocked users below.
                  </p>
                  {lastBlockedAttempt && (
                    <div className="flex items-center space-x-1 text-xs text-warning/70 mt-2">
                      <Clock className="w-3 h-3" />
                      <span>
                        Last blocked face detected at{" "}
                        {formatLastAttempt(lastBlockedAttempt.toISOString())}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Clickable Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card
              className={`bg-danger/10 border-danger/20 cursor-pointer transition-all hover:shadow-md ${
                selectedView === "blocked" ? "ring-2 ring-danger/30" : ""
              }`}
              onClick={() =>
                setSelectedView(selectedView === "blocked" ? null : "blocked")
              }
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-danger">
                  {blockedFaces.length}
                </div>
                <div className="text-sm text-danger/80">Blocked Faces</div>
                <div className="text-xs text-danger/60 mt-1">
                  Click to filter
                </div>
              </CardContent>
            </Card>
            <Card
              className={`bg-info/10 border-info/20 cursor-pointer transition-all hover:shadow-md ${
                selectedView === "attempts" ? "ring-2 ring-info/30" : ""
              }`}
              onClick={() =>
                setSelectedView(selectedView === "attempts" ? null : "attempts")
              }
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-info">
                  {totalAttempts}
                </div>
                <div className="text-sm text-info/80">Total Attempts</div>
                <div className="text-xs text-info/60 mt-1">
                  Click to view log
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blocked Faces List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Blocked Users
              </h2>
              <div className="text-sm text-muted-foreground">
                {blockedFaces.length} user{blockedFaces.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="space-y-3">
              {blockedFaces.map((face) => (
                <Card
                  key={face.id}
                  className="bg-white/60 backdrop-blur-sm border-white/20 border-l-4 border-l-danger"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-xl">
                          {face.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {face.name}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            Blocked on{" "}
                            {new Date(face.blockedDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-danger">
                            {face.attempts} failed attempt
                            {face.attempts !== 1 ? "s" : ""}
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                Last: {formatLastAttempt(face.lastAttempt)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Smartphone className="w-3 h-3" />
                              <span>{face.deviceId}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-success border-success hover:bg-success hover:text-white"
                              onClick={() => handleUnblock(face.id, face.name)}
                            >
                              <ShieldCheck className="w-4 h-4 mr-1" />
                              Unblock
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              This face will be moved back to neutral status.
                              You can reassign its status later.
                            </p>
                          </TooltipContent>
                        </Tooltip>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-danger border-danger hover:bg-danger hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete {face.name}?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to permanently delete this
                                face and its log? This action cannot be undone
                                and all associated data will be removed.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(face.id, face.name)}
                                className="bg-danger hover:bg-danger/90"
                              >
                                Delete Permanently
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {blockedFaces.length === 0 && (
            <Card className="bg-white/40 backdrop-blur-sm border-white/20">
              <CardContent className="p-8 text-center">
                <ShieldCheck className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Blocked Faces
                </h3>
                <p className="text-muted-foreground">
                  All faces are currently trusted. Any blocked faces will appear
                  here.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Actions with Confirmation */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl"
                onClick={handleExport}
                disabled={blockedFaces.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Log
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl text-danger border-danger hover:bg-danger hover:text-white"
                    disabled={blockedFaces.length === 0}
                  >
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      Clear All Blocked Faces?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to clear all {blockedFaces.length} blocked
                      faces. This will remove protection from these profiles and
                      they will be able to attempt access again. Are you sure?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearAll}
                      className="bg-danger hover:bg-danger/90"
                    >
                      Clear All Faces
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <Button className="w-full h-12 rounded-xl" onClick={goBack}>
              Back to Face Management
            </Button>
          </div>

          {/* Optional: Icon Legend */}
          <Card className="bg-white/40 backdrop-blur-sm border-white/20">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground text-center space-y-1">
                <p className="font-medium">Status Icons:</p>
                <div className="flex justify-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-danger rounded-full"></div>
                    <span>Blocked</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Trusted</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <HelpCircle className="w-3 h-3" />
                    <span>Unknown</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}

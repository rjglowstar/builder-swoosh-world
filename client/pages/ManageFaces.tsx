import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserPlus,
  MoreVertical,
  Check,
  X,
  Camera,
  Shield,
  ArrowLeft,
  Cloud,
  Search,
  Edit,
  Trash2,
  UserCheck,
  AlertCircle,
  Eye,
  Clock,
  Smartphone,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ManageFaces() {
  const { goBack } = useSmartNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingName, setEditingName] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const faces = [
    {
      id: 1,
      name: "Alice",
      trusted: true,
      avatar: "👩‍💼",
      matchConfidence: 95,
      lastSeen: "2 hours ago",
      addedBy: "Main Door",
      isSynced: true,
      addedDate: "Aug 5, 2024",
    },
    {
      id: 2,
      name: "Bob",
      trusted: false,
      avatar: "👨‍💻",
      matchConfidence: 87,
      lastSeen: "1 day ago",
      addedBy: "Side Entrance",
      isSynced: true,
      addedDate: "Aug 3, 2024",
    },
    {
      id: 3,
      name: "Carol",
      trusted: true,
      avatar: "👩‍🔬",
      matchConfidence: 92,
      lastSeen: "5 minutes ago",
      addedBy: "Main Door",
      isSynced: false,
      addedDate: "Aug 7, 2024",
    },
  ];

  const filteredFaces = faces.filter((face) =>
    face.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (faceName: string) => {
    console.log(`Deleting face: ${faceName}`);
  };

  const handleBlock = (faceId: number, faceName: string) => {
    console.log(`Blocking face: ${faceName}`);
  };

  const handleMoveToTrusted = (faceId: number, faceName: string) => {
    console.log(`Moving ${faceName} to trusted`);
  };

  const handleStartEdit = (face: any) => {
    setEditingName(face.id);
    setEditValue(face.name);
  };

  const handleSaveEdit = (faceId: number) => {
    console.log(`Renaming face ${faceId} to ${editValue}`);
    setEditingName(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingName(null);
    setEditValue("");
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
                <Shield className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">Manage Faces</h1>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to="/blocked-faces">
                  <DropdownMenuItem>View Blocked Faces</DropdownMenuItem>
                </Link>
                <Link to="/unlock-history">
                  <DropdownMenuItem>Unlock History</DropdownMenuItem>
                </Link>
                <Link to="/settings">
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-4 space-y-4">
          {/* Camera Preview */}
          <Card className="overflow-hidden bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                <Camera className="w-12 h-12 text-muted-foreground" />
                <div className="absolute top-4 left-4">
                  <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white font-medium">Live</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-sm text-white">Unknown Face</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-6 space-y-3">
                <div className="flex space-x-3">
                  <Link to="/add-face" className="flex-1">
                    <Button className="w-full rounded-xl h-12">
                      <UserPlus className="w-4 h-4 mr-2" />
                      ADD FACE
                    </Button>
                  </Link>
                  <Button variant="outline" className="flex-1 rounded-xl h-12">
                    <Camera className="w-4 h-4 mr-2" />
                    RESCAN
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Bar */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search faces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recognized Faces List - Fixed: Renamed from "Trusted Faces" */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <span>Recognized Faces</span>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </h2>
              <Badge variant="outline" className="text-xs">
                {filteredFaces.length} faces
              </Badge>
            </div>

            <div className="space-y-3">
              {filteredFaces.map((face) => (
                <Card
                  key={face.id}
                  className={`bg-white/60 backdrop-blur-sm border-white/20 transition-all duration-200 hover:shadow-md ${
                    face.trusted
                      ? "border-l-4 border-l-success"
                      : "border-l-4 border-l-danger"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-xl">
                            {face.avatar}
                          </div>
                          {face.isSynced && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Cloud className="absolute -top-1 -right-1 w-4 h-4 text-primary bg-white rounded-full p-0.5" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Synced to cloud</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <div className="flex-1">
                          {editingName === face.id ? (
                            <div className="flex items-center space-x-2">
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="h-8 text-sm"
                                autoFocus
                              />
                              <Button
                                size="sm"
                                onClick={() => handleSaveEdit(face.id)}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-foreground">
                                  {face.name}
                                </h3>
                                <Badge variant="outline" className="text-xs">
                                  {face.matchConfidence}% match
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                {face.trusted ? (
                                  <>
                                    <Check className="w-4 h-4 text-success" />
                                    <span className="text-sm text-success">
                                      Trusted
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <X className="w-4 h-4 text-danger" />
                                    <span className="text-sm text-danger">
                                      Blocked
                                    </span>
                                  </>
                                )}
                                <span className="text-xs text-muted-foreground ml-2">
                                  Last seen: {face.lastSeen}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleStartEdit(face)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>

                          {/* Fixed: Clarified Unblock action */}
                          {face.trusted ? (
                            <DropdownMenuItem
                              onClick={() => handleBlock(face.id, face.name)}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Block
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleMoveToTrusted(face.id, face.name)
                              }
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Move to Trusted
                            </DropdownMenuItem>
                          )}

                          {/* Enhanced: View Details Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <span className="text-2xl">
                                    {face.avatar}
                                  </span>
                                  {face.name} Details
                                </DialogTitle>
                                <DialogDescription>
                                  Complete information about this recognized
                                  face
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">
                                      Match Confidence
                                    </label>
                                    <p className="text-lg font-bold text-primary">
                                      {face.matchConfidence}%
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Status
                                    </label>
                                    <p
                                      className={`font-semibold ${face.trusted ? "text-success" : "text-danger"}`}
                                    >
                                      {face.trusted ? "Trusted" : "Blocked"}
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      Last seen: {face.lastSeen}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      Added by: {face.addedBy}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      Added: {face.addedDate}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Cloud className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">
                                      Sync Status:{" "}
                                      {face.isSynced
                                        ? "✓ Synced"
                                        : "⏳ Pending"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* Fixed: Added confirmation dialog for delete */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                className="text-danger"
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                  <AlertCircle className="w-5 h-5 text-danger" />
                                  Delete {face.name}?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this face?
                                  This action cannot be undone and
                                  {face.name} will need to be re-added to gain
                                  access again.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(face.name)}
                                  className="bg-danger hover:bg-danger/90"
                                >
                                  Delete Face
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Add Face Button - Removed duplicate as per feedback */}
          {filteredFaces.length === 0 && searchQuery && (
            <Card className="bg-white/40 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  No faces found matching "{searchQuery}"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">
                  {faces.filter((f) => f.trusted).length}
                </div>
                <div className="text-sm text-success/80">Trusted</div>
              </CardContent>
            </Card>
            <Card className="bg-danger/10 border-danger/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-danger">
                  {faces.filter((f) => !f.trusted).length}
                </div>
                <div className="text-sm text-danger/80">Blocked</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

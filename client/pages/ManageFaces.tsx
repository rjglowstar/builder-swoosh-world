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
  ChevronDown,
  ChevronUp,
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  const [selectedFace, setSelectedFace] = useState<any | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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
                  className={`w-full bg-white/60 backdrop-blur-sm border-white/20 transition-all duration-200 hover:shadow-md cursor-pointer ${
                    face.trusted
                      ? "border-l-4 border-l-success"
                      : "border-l-4 border-l-danger"
                  }`}
                  onClick={() => setSelectedFace(face)}
                >
                  <CardContent className="p-4 w-full">
                    <div className="flex items-center w-full">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="relative flex-shrink-0">
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
                        <div className="flex-1 min-w-0">
                          {editingName === face.id ? (
                            <div
                              className="flex items-center space-x-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="h-8 text-sm flex-1"
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
                              <div className="flex items-center space-x-2 flex-wrap">
                                <h3 className="font-semibold text-foreground truncate">
                                  {face.name}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className="text-xs whitespace-nowrap"
                                >
                                  {face.matchConfidence}% match
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1 flex-wrap">
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
                                <span className="text-xs text-muted-foreground ml-2 truncate">
                                  Last seen: {face.lastSeen}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground/70 mt-1">
                                Tap to view details
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div
                        className="flex-shrink-0 ml-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-8 w-8 transition-all duration-200 hover:bg-primary/10"
                          onClick={() =>
                            setExpandedCard(
                              expandedCard === face.id ? null : face.id,
                            )
                          }
                        >
                          {expandedCard === face.id ? (
                            <ChevronUp className="w-4 h-4 text-primary" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Accordion-style Action Menu */}
                    {expandedCard === face.id && (
                      <div className="border-t border-white/20 mt-4 pt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                        {/* Action Buttons Row - 3 buttons in one row */}
                        <div className="grid grid-cols-3 gap-2">
                          {/* Rename Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 text-xs"
                            onClick={() => {
                              handleStartEdit(face);
                            }}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Rename
                          </Button>

                          {/* Block/Unblock Button */}
                          {face.trusted ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 text-xs text-danger border-danger hover:bg-danger hover:text-white"
                              onClick={() => {
                                handleBlock(face.id, face.name);
                                setExpandedCard(null);
                              }}
                            >
                              <X className="w-3 h-3 mr-1" />
                              Block
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 text-xs text-success border-success hover:bg-success hover:text-white"
                              onClick={() => {
                                handleMoveToTrusted(face.id, face.name);
                                setExpandedCard(null);
                              }}
                            >
                              <UserCheck className="w-3 h-3 mr-1" />
                              Trusted
                            </Button>
                          )}

                          {/* Delete Button with Confirmation */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-9 text-xs text-danger border-danger hover:bg-danger hover:text-white"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                  <AlertCircle className="w-5 h-5 text-danger" />
                                  Delete {face.name}?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this face?
                                  This action cannot be undone and {face.name}{" "}
                                  will need to be re-added to gain access again.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    handleDelete(face.name);
                                    setExpandedCard(null);
                                  }}
                                  className="bg-danger hover:bg-danger/90"
                                >
                                  Delete Face
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>

                        {/* Detailed Information Section */}
                        <div className="space-y-3 bg-muted/30 rounded-lg p-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">
                                Match Confidence
                              </label>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 bg-muted rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${
                                      face.matchConfidence >= 90
                                        ? "bg-success"
                                        : face.matchConfidence >= 75
                                          ? "bg-warning"
                                          : "bg-danger"
                                    }`}
                                    style={{
                                      width: `${face.matchConfidence}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-sm font-bold text-primary">
                                  {face.matchConfidence}%
                                </span>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">
                                Status
                              </label>
                              <div className="flex items-center gap-1 mt-1">
                                {face.trusted ? (
                                  <>
                                    <Check className="w-4 h-4 text-success" />
                                    <span className="text-sm font-medium text-success">
                                      Trusted
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <X className="w-4 h-4 text-danger" />
                                    <span className="text-sm font-medium text-danger">
                                      Blocked
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-center gap-2 text-xs">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="font-medium">Last Seen:</span>
                              <span className="text-muted-foreground">
                                {face.lastSeen}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Smartphone className="w-3 h-3 text-muted-foreground" />
                              <span className="font-medium">Added By:</span>
                              <span className="text-muted-foreground">
                                {face.addedBy}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="font-medium">Date Added:</span>
                              <span className="text-muted-foreground">
                                {face.addedDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Cloud className="w-3 h-3 text-muted-foreground" />
                              <span className="font-medium">Sync Status:</span>
                              <span
                                className={`font-medium ${
                                  face.isSynced
                                    ? "text-success"
                                    : "text-warning"
                                }`}
                              >
                                {face.isSynced
                                  ? "✓ Synced to Cloud"
                                  : "⏳ Sync Pending"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Close button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full h-8 text-xs text-muted-foreground"
                          onClick={() => setExpandedCard(null)}
                        >
                          Close
                        </Button>
                      </div>
                    )}
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

      {/* Bottom Sheet for Face Details */}
      <Sheet
        open={!!selectedFace}
        onOpenChange={(open) => !open && setSelectedFace(null)}
      >
        <SheetContent side="bottom" className="h-[60vh]">
          {selectedFace && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3 text-left">
                  <span className="text-3xl">{selectedFace.avatar}</span>
                  <div>
                    <h2 className="text-xl font-bold">{selectedFace.name}</h2>
                    <p className="text-muted-foreground font-normal">
                      {selectedFace.trusted ? "Trusted Face" : "Blocked Face"}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Status and Confidence */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Match Confidence
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            selectedFace.matchConfidence >= 90
                              ? "bg-success"
                              : selectedFace.matchConfidence >= 75
                                ? "bg-warning"
                                : "bg-danger"
                          }`}
                          style={{ width: `${selectedFace.matchConfidence}%` }}
                        />
                      </div>
                      <span className="text-lg font-bold text-primary">
                        {selectedFace.matchConfidence}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Status
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedFace.trusted ? (
                        <>
                          <Check className="w-5 h-5 text-success" />
                          <span className="font-semibold text-success text-lg">
                            Trusted
                          </span>
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5 text-danger" />
                          <span className="font-semibold text-danger text-lg">
                            Blocked
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Last Seen</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedFace.lastSeen}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Added By Device</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedFace.addedBy}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Date Added</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedFace.addedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Cloud className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Sync Status</p>
                      <p
                        className={`text-sm font-medium ${
                          selectedFace.isSynced
                            ? "text-success"
                            : "text-warning"
                        }`}
                      >
                        {selectedFace.isSynced
                          ? "✓ Synced to Cloud"
                          : "⏳ Sync Pending"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      handleStartEdit(selectedFace);
                      setSelectedFace(null);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Rename
                  </Button>

                  {selectedFace.trusted ? (
                    <Button
                      variant="outline"
                      className="flex-1 text-danger border-danger hover:bg-danger hover:text-white"
                      onClick={() => {
                        handleBlock(selectedFace.id, selectedFace.name);
                        setSelectedFace(null);
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Block
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="flex-1 text-success border-success hover:bg-success hover:text-white"
                      onClick={() => {
                        handleMoveToTrusted(selectedFace.id, selectedFace.name);
                        setSelectedFace(null);
                      }}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Move to Trusted
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}

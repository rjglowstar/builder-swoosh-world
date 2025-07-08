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
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ManageFaces() {
  const faces = [
    { id: 1, name: "Alice", trusted: true, avatar: "👩‍💼" },
    { id: 2, name: "Bob", trusted: false, avatar: "👨‍💻" },
    { id: 3, name: "Carol", trusted: true, avatar: "👩‍🔬" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
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

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
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

            <div className="p-4 space-y-3">
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

        {/* Trusted Faces List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <span>Trusted Faces</span>
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </h2>

          <div className="space-y-3">
            {faces.map((face) => (
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
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-xl">
                        {face.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {face.name}
                        </h3>
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
                        </div>
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
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>
                          {face.trusted ? "Block" : "Unblock"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-danger">
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Face Button */}
        <Link to="/add-face">
          <Card className="bg-white/40 backdrop-blur-sm border-white/20 border-dashed border-2 hover:bg-white/60 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-full h-16 text-muted-foreground hover:text-foreground rounded-xl">
                <UserPlus className="w-6 h-6 mr-3" />
                <span className="text-lg">Add New Face</span>
              </div>
            </CardContent>
          </Card>
        </Link>

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
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ShieldX,
  Trash2,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function BlockedFaces() {
  const blockedFaces = [
    {
      id: 1,
      name: "Bob",
      avatar: "👨‍💻",
      blockedDate: "2024-01-10",
      attempts: 12,
    },
    {
      id: 2,
      name: "Eve",
      avatar: "👩‍🦰",
      blockedDate: "2024-01-08",
      attempts: 7,
    },
    {
      id: 3,
      name: "Unknown User",
      avatar: "❓",
      blockedDate: "2024-01-05",
      attempts: 3,
    },
  ];

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
              <ShieldX className="w-6 h-6 text-danger" />
              <h1 className="text-xl font-bold text-primary">Blocked Faces</h1>
            </div>
          </div>

          <Button variant="outline" size="icon" className="rounded-full">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Alert Info */}
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-danger/10 border-danger/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-danger">
                {blockedFaces.length}
              </div>
              <div className="text-sm text-danger/80">Blocked Faces</div>
            </CardContent>
          </Card>
          <Card className="bg-info/10 border-info/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-info">
                {blockedFaces.reduce((sum, face) => sum + face.attempts, 0)}
              </div>
              <div className="text-sm text-info/80">Total Attempts</div>
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
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-success border-success hover:bg-success hover:text-white"
                      >
                        <ShieldCheck className="w-4 h-4 mr-1" />
                        Unblock
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-danger border-danger hover:bg-danger hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl"
            disabled={blockedFaces.length === 0}
          >
            Clear All Blocked Faces
          </Button>
          <Link to="/manage-faces">
            <Button className="w-full h-12 rounded-xl">
              Back to Face Management
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

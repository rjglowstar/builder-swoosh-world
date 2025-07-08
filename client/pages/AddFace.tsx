import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera, UserPlus, RotateCcw, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AddFace() {
  const [faceName, setFaceName] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasSnapshot, setHasSnapshot] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    // Simulate capture process
    setTimeout(() => {
      setIsCapturing(false);
      setHasSnapshot(true);
    }, 2000);
  };

  const handleRetake = () => {
    setHasSnapshot(false);
  };

  const handleSave = () => {
    if (faceName.trim() && hasSnapshot) {
      // Save logic here
      console.log("Saving face:", faceName);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
          <Link to="/manage-faces">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <UserPlus className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Add New Face</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Instructions */}
        <Card className="bg-info/10 border-info/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Camera className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="font-semibold text-info">Face Capture</h3>
                <p className="text-sm text-info/80">
                  Position your face in the camera view and ensure good
                  lighting. Keep your eyes open and look directly at the camera.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camera Preview */}
        <Card className="overflow-hidden bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-0">
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
              {!hasSnapshot ? (
                <>
                  <Camera className="w-16 h-16 text-muted-foreground" />
                  {isCapturing && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  )}
                  <div className="absolute inset-4 border-2 border-white/60 rounded-2xl"></div>
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-white font-medium">
                        {isCapturing ? "Capturing..." : "Ready"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-2 bg-success/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm text-success font-medium">
                        Captured
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-4 space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-2">
                  {hasSnapshot ? "Preview Snapshot" : "Position Your Face"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {hasSnapshot
                    ? "Face captured successfully. Enter a name below."
                    : "Make sure your face is clearly visible and well-lit."}
                </p>
              </div>

              {!hasSnapshot ? (
                <Button
                  onClick={handleCapture}
                  disabled={isCapturing}
                  className="w-full h-14 rounded-xl text-lg font-semibold"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {isCapturing ? "Capturing..." : "Capture Face"}
                </Button>
              ) : (
                <div className="flex space-x-3">
                  <Button
                    onClick={handleRetake}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Face Name Input */}
        {hasSnapshot && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="faceName"
                  className="text-foreground font-medium"
                >
                  Person Name
                </Label>
                <Input
                  id="faceName"
                  placeholder="Enter person's name..."
                  value={faceName}
                  onChange={(e) => setFaceName(e.target.value)}
                  className="h-12 rounded-xl bg-white/80"
                />
                <p className="text-xs text-muted-foreground">
                  This name will be used to identify this person in logs and
                  notifications.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {hasSnapshot && (
          <div className="space-y-3">
            <Button
              onClick={handleSave}
              disabled={!faceName.trim()}
              className="w-full h-14 rounded-xl text-lg font-semibold"
            >
              <Check className="w-5 h-5 mr-2" />
              Save Face
            </Button>

            <Link to="/manage-faces">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl text-muted-foreground"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </Link>
          </div>
        )}

        {/* Tips */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3">
              Tips for Best Results
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <span>Ensure good lighting on your face</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <span>Look directly at the camera</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <span>Remove sunglasses or masks</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <span>Keep a neutral expression</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

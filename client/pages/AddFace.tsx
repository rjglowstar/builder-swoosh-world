import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Camera,
  UserPlus,
  RotateCcw,
  Check,
  X,
  Shield,
  Cloud,
  Calendar,
} from "lucide-react";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AddFace() {
  const { goBack } = useSmartNavigation();
  const { toast } = useToast();
  const [faceName, setFaceName] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasSnapshot, setHasSnapshot] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [syncToCloud, setSyncToCloud] = useState(true);

  const handleCapture = () => {
    setIsCapturing(true);

    // Add audio/vibration feedback
    try {
      // Subtle click sound (if supported)
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch {
      // Fallback to vibration if audio fails
      if ("vibrate" in navigator) {
        navigator.vibrate(50);
      }
    }

    // Simulate capture process
    setTimeout(() => {
      setIsCapturing(false);
      setHasSnapshot(true);

      // Success vibration
      if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }, 2000);
  };

  const handleRetake = () => {
    setHasSnapshot(false);
    setFaceName("");
  };

  const handleSave = async () => {
    if (faceName.trim() && hasSnapshot) {
      setIsSaving(true);

      try {
        // Simulate save process
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success toast
        toast({
          title: "Face saved successfully!",
          description: `${faceName} has been added to your trusted faces.`,
        });

        // Success vibration
        if ("vibrate" in navigator) {
          navigator.vibrate([200, 100, 200]);
        }

        // Navigate back after short delay
        setTimeout(() => {
          goBack();
        }, 1000);
      } catch (error) {
        toast({
          title: "Error saving face",
          description: "Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const getCurrentTimestamp = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={goBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <UserPlus className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Add New Face</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Instructions with Privacy Assurance */}
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
            <div className="mt-3 pt-3 border-t border-info/20">
              <div className="flex items-center space-x-2 text-xs text-info/70">
                <Shield className="w-4 h-4" />
                <span>No photo saved — face vectors only for security.</span>
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

            <div className="p-6 space-y-4">
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
                  placeholder="Enter name (e.g. Dad, Riya, Guest 1)"
                  value={faceName}
                  onChange={(e) => setFaceName(e.target.value)}
                  className="h-12 rounded-xl bg-white/80"
                />
                <p className="text-xs text-muted-foreground">
                  This name will be used to identify this person in logs and
                  notifications.
                </p>

                {/* Cloud Sync Option */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Cloud className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      Sync to cloud?
                    </span>
                  </div>
                  <Button
                    variant={syncToCloud ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSyncToCloud(!syncToCloud)}
                    className="h-8 px-3"
                  >
                    {syncToCloud ? "Yes" : "No"}
                  </Button>
                </div>

                {/* Timestamp Info */}
                <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-1">
                  <Calendar className="w-3 h-3" />
                  <span>Will be added on {getCurrentTimestamp()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {hasSnapshot && (
          <div className="space-y-3">
            <Button
              onClick={handleSave}
              disabled={!faceName.trim() || isSaving}
              className="w-full h-14 rounded-xl text-lg font-semibold"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Save Face
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl text-muted-foreground"
              onClick={goBack}
              disabled={isSaving}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
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

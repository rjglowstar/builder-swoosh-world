import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  Sliders,
  Eye,
  AlertTriangle,
  Save,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sensitivity() {
  const [sensitivity, setSensitivity] = useState([0.85]);
  const defaultSensitivity = 0.85;

  const getSensitivityLevel = (value: number) => {
    if (value < 0.75)
      return {
        level: "Low",
        color: "text-info",
        description: "More permissive, may allow similar faces",
      };
    if (value < 0.85)
      return {
        level: "Medium",
        color: "text-warning",
        description: "Balanced security and convenience",
      };
    if (value < 0.95)
      return {
        level: "High",
        color: "text-success",
        description: "Strict matching, very secure",
      };
    return {
      level: "Maximum",
      color: "text-danger",
      description: "Ultra-strict, may require multiple attempts",
    };
  };

  const currentLevel = getSensitivityLevel(sensitivity[0]);

  const handleSave = () => {
    console.log("Saving sensitivity:", sensitivity[0]);
  };

  const handleReset = () => {
    setSensitivity([defaultSensitivity]);
  };

  const getPreviewText = (value: number) => {
    if (value < 0.7)
      return "Very relaxed detection - May accept faces with glasses, different lighting, or similar people";
    if (value < 0.8)
      return "Relaxed detection - Accepts minor variations in appearance and lighting";
    if (value < 0.9)
      return "Balanced detection - Good mix of security and convenience for daily use";
    if (value < 0.95)
      return "Strict detection - Requires clear face visibility and good lighting conditions";
    return "Maximum security - Very strict matching, may require perfect conditions";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">
              Detection Sensitivity
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Current Settings */}
        <Card
          className={`${currentLevel.color.replace("text-", "bg-").replace("text-", "")}/10 border-${currentLevel.color.replace("text-", "")}/20`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${currentLevel.color.replace("text-", "bg-").replace("text-", "")}/20`}
                >
                  <Eye className={`w-5 h-5 ${currentLevel.color}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${currentLevel.color}`}>
                    {currentLevel.level} Sensitivity
                  </h3>
                  <p className={`text-sm ${currentLevel.color}/80`}>
                    {(sensitivity[0] * 100).toFixed(0)}% match threshold
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sensitivity Slider */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Adjust Sensitivity
                </h3>
                <span className="text-2xl font-bold text-primary">
                  {(sensitivity[0] * 100).toFixed(0)}%
                </span>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Slider
                    value={sensitivity}
                    onValueChange={setSensitivity}
                    max={0.99}
                    min={0.65}
                    step={0.01}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Low (65%)</span>
                    <span>High (99%)</span>
                  </div>
                </div>

                {/* Sensitivity Markers */}
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-info rounded-full mx-auto mb-1"></div>
                    <span className="text-info">Low</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-warning rounded-full mx-auto mb-1"></div>
                    <span className="text-warning">Medium</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-success rounded-full mx-auto mb-1"></div>
                    <span className="text-success">High</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-danger rounded-full mx-auto mb-1"></div>
                    <span className="text-danger">Max</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">
                {currentLevel.level} Security
              </h4>
              <p className="text-sm text-muted-foreground">
                {currentLevel.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Detection Preview</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-100 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {getPreviewText(sensitivity[0])}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Perfect conditions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${sensitivity[0] > 0.9 ? "bg-danger" : "bg-success"}`}
                  ></div>
                  <span>With glasses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${sensitivity[0] > 0.85 ? "bg-warning" : "bg-success"}`}
                  ></div>
                  <span>Low light</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${sensitivity[0] > 0.8 ? "bg-danger" : "bg-warning"}`}
                  ></div>
                  <span>Different angle</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-info/10 border-info/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="font-semibold text-info">Recommendation</h3>
                <p className="text-sm text-info/80">
                  {sensitivity[0] < 0.8
                    ? "Consider higher sensitivity for better security. Low settings may allow unauthorized access."
                    : sensitivity[0] > 0.93
                      ? "Very high sensitivity may cause inconvenience. Consider lowering if you experience frequent rejections."
                      : "Your current setting provides a good balance of security and usability."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Detection */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <Button variant="outline" className="w-full h-12 rounded-xl">
              <Eye className="w-4 h-4 mr-2" />
              Test Detection with Current Settings
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSave}
            className="w-full h-14 rounded-xl text-lg font-semibold"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Settings
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full h-12 rounded-xl"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default ({(defaultSensitivity * 100).toFixed(0)}%)
          </Button>
        </div>

        {/* Tips */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3">
              Optimization Tips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Higher sensitivity = better security, but may require better
                  lighting
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Lower sensitivity = easier access, but less secure against
                  similar faces
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Test different settings to find your perfect balance
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

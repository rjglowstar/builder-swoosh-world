import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Sliders,
  Eye,
  AlertTriangle,
  Save,
  RotateCcw,
  HelpCircle,
  Shield,
  Sun,
  Lightbulb,
  CheckCircle,
  XCircle,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sensitivity() {
  const [sensitivity, setSensitivity] = useState([0.85]);
  const [testResult, setTestResult] = useState<"success" | "failure" | null>(
    null,
  );
  const [isTestingInProgress, setIsTestingInProgress] = useState(false);
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

  const getConditionEmoji = (value: number, condition: string) => {
    switch (condition) {
      case "perfect":
        return "😊";
      case "glasses":
        return value > 0.9 ? "😕" : "😊";
      case "lowlight":
        return value > 0.85 ? "😐" : "😊";
      case "angle":
        return value > 0.8 ? "😕" : "😐";
      default:
        return "😊";
    }
  };

  const getSuggestedConditions = (value: number) => {
    if (value < 0.75)
      return "Works best: Any lighting, with/without accessories, various angles";
    if (value < 0.85)
      return "Works best: Normal lighting, minor accessories okay, front-facing";
    if (value < 0.95)
      return "Works best: Good lighting, minimal accessories, clear front view";
    return "Works best: Bright lighting, no accessories, direct front view";
  };

  const handleTestDetection = async () => {
    setIsTestingInProgress(true);
    setTestResult(null);

    // Simulate test detection
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate result based on sensitivity (higher sensitivity = lower success rate)
    const successRate = Math.max(0.3, 1 - (sensitivity[0] - 0.65) * 1.5);
    const isSuccess = Math.random() < successRate;

    setTestResult(isSuccess ? "success" : "failure");
    setIsTestingInProgress(false);

    // Clear result after 3 seconds
    setTimeout(() => setTestResult(null), 3000);
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
                  <div className="flex items-center space-x-2">
                    <p className={`text-sm ${currentLevel.color}/80`}>
                      {(sensitivity[0] * 100).toFixed(0)}% match threshold
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Match threshold determines how similar a face must
                            be to your registered face to unlock. Higher % =
                            stricter matching = more secure but may require
                            better conditions.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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

                {/* Live Preview Effect */}
                <div
                  className="p-3 rounded-lg border-2 border-dashed transition-all duration-300"
                  style={{
                    borderColor: currentLevel.color.includes("success")
                      ? "rgb(34 197 94)"
                      : currentLevel.color.includes("warning")
                        ? "rgb(245 158 11)"
                        : currentLevel.color.includes("danger")
                          ? "rgb(239 68 68)"
                          : "rgb(59 130 246)",
                    backgroundColor: currentLevel.color.includes("success")
                      ? "rgb(34 197 94 / 0.1)"
                      : currentLevel.color.includes("warning")
                        ? "rgb(245 158 11 / 0.1)"
                        : currentLevel.color.includes("danger")
                          ? "rgb(239 68 68 / 0.1)"
                          : "rgb(59 130 246 / 0.1)",
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {sensitivity[0] < 0.75
                        ? "😌"
                        : sensitivity[0] < 0.85
                          ? "😊"
                          : sensitivity[0] < 0.95
                            ? "🔒"
                            : "🛡️"}
                    </div>
                    <p className="text-sm font-medium">
                      {getSuggestedConditions(sensitivity[0])}
                    </p>
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
                <div className="flex items-center space-x-2 transition-all duration-300">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-lg">
                      {getConditionEmoji(sensitivity[0], "perfect")}
                    </span>
                  </div>
                  <span>Perfect conditions</span>
                </div>
                <div className="flex items-center space-x-2 transition-all duration-300">
                  <div className="flex items-center space-x-1">
                    <div
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${sensitivity[0] > 0.9 ? "bg-danger" : "bg-success"}`}
                    ></div>
                    <span className="text-lg">
                      {getConditionEmoji(sensitivity[0], "glasses")}
                    </span>
                  </div>
                  <span>With glasses</span>
                </div>
                <div className="flex items-center space-x-2 transition-all duration-300">
                  <div className="flex items-center space-x-1">
                    <div
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${sensitivity[0] > 0.85 ? "bg-warning" : "bg-success"}`}
                    ></div>
                    <span className="text-lg">
                      {getConditionEmoji(sensitivity[0], "lowlight")}
                    </span>
                  </div>
                  <span>Low light</span>
                </div>
                <div className="flex items-center space-x-2 transition-all duration-300">
                  <div className="flex items-center space-x-1">
                    <div
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${sensitivity[0] > 0.8 ? "bg-danger" : "bg-warning"}`}
                    ></div>
                    <span className="text-lg">
                      {getConditionEmoji(sensitivity[0], "angle")}
                    </span>
                  </div>
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
          <CardContent className="p-4 space-y-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl"
                    onClick={handleTestDetection}
                    disabled={isTestingInProgress}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isTestingInProgress
                      ? "Testing..."
                      : "Test Detection with Current Settings"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Try unlocking with current setting before saving</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Test Result Feedback */}
            {testResult && (
              <div
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-500 ${
                  testResult === "success"
                    ? "bg-success/10 border border-success/20"
                    : "bg-danger/10 border border-danger/20"
                }`}
              >
                {testResult === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm font-medium text-success">
                      ✅ Face match success!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-danger" />
                    <span className="text-sm font-medium text-danger">
                      ❌ Try again - consider adjusting sensitivity
                    </span>
                  </>
                )}
              </div>
            )}
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
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full flex-shrink-0">
                  <Shield className="w-4 h-4 text-success" />
                </div>
                <div>
                  <span className="font-medium text-foreground">
                    Higher sensitivity
                  </span>
                  <p className="text-xs">
                    🔒 Better security + 🌞 Requires good lighting
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-full flex-shrink-0">
                  <Target className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <span className="font-medium text-foreground">
                    Lower sensitivity
                  </span>
                  <p className="text-xs">
                    😌 Easier access + ⚠️ Less secure against similar faces
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-info/10 rounded-full flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-info" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Pro tip</span>
                  <p className="text-xs">
                    🧪 Test different settings to find your perfect balance
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

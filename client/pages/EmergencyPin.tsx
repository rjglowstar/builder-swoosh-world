import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Key,
  AlertTriangle,
  Check,
  Shield,
  HelpCircle,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppStatus } from "@/contexts/AppStatusContext";

export default function EmergencyPin() {
  const { setEmergencyPinSet } = useAppStatus();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1); // 1: enter pin, 2: confirm pin, 3: success
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Haptic feedback
      if (value && "vibrate" in navigator) {
        navigator.vibrate(10);
      }

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleConfirmPinChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...confirmPin];
      newPin[index] = value;
      setConfirmPin(newPin);

      // Haptic feedback
      if (value && "vibrate" in navigator) {
        navigator.vibrate(10);
      }

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`confirm-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    isConfirm = false,
  ) => {
    if (e.key === "Backspace" && index > 0) {
      const currentPin = isConfirm ? confirmPin : pin;
      if (!currentPin[index]) {
        const prevInput = document.getElementById(
          `${isConfirm ? "confirm" : "pin"}-${index - 1}`,
        );
        prevInput?.focus();
      }
    }
  };

  const isPinComplete = pin.every((digit) => digit !== "");
  const isConfirmComplete = confirmPin.every((digit) => digit !== "");
  const pinsMatch = pin.join("") === confirmPin.join("");

  const handleNext = () => {
    if (step === 1 && isPinComplete) {
      setStep(2);
    } else if (step === 2 && isConfirmComplete && pinsMatch) {
      setStep(3);
      // Haptic feedback for success
      if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
      // Save PIN logic here
      console.log("PIN saved:", pin.join(""));
      // Update app status context
      setEmergencyPinSet(true);
    }
  };

  const handleReset = () => {
    setPin(["", "", "", ""]);
    setConfirmPin(["", "", "", ""]);
    setStep(1);
    setShowPin(false);
    setShowConfirmPin(false);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
            <Link to="/settings">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Key className="w-6 h-6 text-success" />
              <h1 className="text-xl font-bold text-primary">Emergency PIN</h1>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-8 space-y-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-success">
                PIN Setup Complete!
              </h2>
              <p className="text-muted-foreground">
                Your emergency PIN has been saved securely
              </p>
            </div>

            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div className="space-y-1 text-left">
                    <h3 className="font-semibold text-success">
                      Important Notes
                    </h3>
                    <ul className="text-sm text-success/80 space-y-1">
                      <li>• Use this PIN to bypass face recognition</li>
                      <li>• Keep it secret and memorable</li>
                      <li>• PIN will work even during scheduled protection</li>
                      <li>
                        • Change PIN anytime from Settings → Emergency PIN
                      </li>
                      <li>
                        • Forgotten PIN? Reset via biometric + Google account
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Link to="/settings">
                <Button className="w-full h-12 rounded-xl">
                  Back to Settings
                </Button>
              </Link>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full h-10 rounded-xl"
              >
                Change PIN
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <Key className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Emergency PIN</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        {/* Alert */}
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="font-semibold text-warning">Security Backup</h3>
                <p className="text-sm text-warning/80">
                  Create a 4-digit PIN as a backup method to unlock your device
                  when face recognition fails.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PIN Entry */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-xl font-bold text-foreground">
                {step === 1 ? "Enter 4-digit PIN" : "Confirm PIN"}
              </h2>
              <p className="text-muted-foreground">
                {step === 1
                  ? "Choose a memorable 4-digit emergency PIN"
                  : "Enter your PIN again to confirm"}
              </p>

              {/* Show/Hide Toggle */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    step === 1
                      ? setShowPin(!showPin)
                      : setShowConfirmPin(!showConfirmPin)
                  }
                  className="text-xs"
                >
                  {(step === 1 ? showPin : showConfirmPin) ? (
                    <>
                      <EyeOff className="w-3 h-3 mr-1" />
                      Hide PIN
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 mr-1" />
                      Show PIN
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {(step === 1 ? pin : confirmPin).map((digit, index) => {
                const shouldShow = step === 1 ? showPin : showConfirmPin;
                return (
                  <input
                    key={index}
                    id={`${step === 1 ? "pin" : "confirm"}-${index}`}
                    type={shouldShow ? "text" : "password"}
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      step === 1
                        ? handlePinChange(index, e.target.value)
                        : handleConfirmPinChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index, step === 2)}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-border rounded-xl bg-white/80 focus:border-primary focus:outline-none transition-all duration-200"
                    style={{
                      fontSize: shouldShow ? "1.5rem" : "2rem",
                      lineHeight: shouldShow ? "1.5rem" : "2rem",
                    }}
                  />
                );
              })}
            </div>

            {step === 2 && isConfirmComplete && !pinsMatch && (
              <div className="text-center">
                <p className="text-danger text-sm">
                  PINs don't match. Please try again.
                </p>
              </div>
            )}

            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !isPinComplete) ||
                (step === 2 && (!isConfirmComplete || !pinsMatch))
              }
              className="w-full h-12 rounded-xl"
            >
              {step === 1 ? "Continue" : "Save PIN"}
            </Button>
          </CardContent>
        </Card>

        {/* Progress */}
        <div className="flex justify-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`}
          ></div>
          <div
            className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}
          ></div>
        </div>

        {/* Tips */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-foreground mb-3">
              PIN Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Avoid obvious sequences (1234, 0000)</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex items-center space-x-2">
                  <span>Don't use your phone unlock PIN</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">
                          Using the same PIN creates a security overlap risk. If
                          someone sees your phone unlock PIN, they could also
                          bypass your face recognition. Choose a different PIN
                          for better security.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Choose something memorable but unique</span>
              </li>
            </ul>

            {/* Recovery Information */}
            <Card className="bg-info/10 border-info/20">
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-info text-sm">
                      Forgot Your PIN?
                    </h4>
                    <p className="text-xs text-info/80">
                      If you forget your emergency PIN, you can reset it from
                      Settings → Emergency PIN after verifying with face
                      recognition or your Google account.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

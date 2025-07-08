import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Gift,
  Heart,
  Share2,
  Crown,
  Calendar,
  Star,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SupporterConfirmation() {
  const handleShare = () => {
    const shareText =
      "I'm supporting indie development with UnlockGuard! Check out this amazing face recognition security app.";
    if (navigator.share) {
      navigator.share({
        title: "UnlockGuard - Face Recognition Security",
        text: shareText,
        url: window.location.origin,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareText} ${window.location.origin}`);
      console.log("Shared link copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Gift className="w-6 h-6 text-success" />
            <h1 className="text-xl font-bold text-primary">Supporter Bonus</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        {/* Success Animation/Icon */}
        <div className="text-center space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-warning rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-success">
              Thank you for supporting!
            </h2>
            <p className="text-muted-foreground text-lg">
              Your support helps keep UnlockGuard independent and user-focused
            </p>
          </div>
        </div>

        {/* Plan Details */}
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 text-success" />
              <h3 className="text-xl font-bold text-success">
                Supporter Bonus Plan
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Plan:</span>
                <span className="text-success font-semibold">
                  Support Bonus (3 years)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Expires:</span>
                <span className="text-muted-foreground">08-Jul-2028</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Price:</span>
                <span className="text-success font-semibold">
                  ₹1399 (3 years)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exclusive Benefits */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center space-x-2">
              <Star className="w-5 h-5 text-warning" />
              <span>Your Exclusive Benefits</span>
            </h3>

            <div className="space-y-3">
              {[
                "All Plus features included",
                "3-year subscription at massive discount",
                "Exclusive supporter badge in app",
                "Early access to beta features",
                "Direct line to developer for feedback",
                "Custom app themes & personalization",
                "Priority support & feature requests",
                "Helping maintain indie development",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-primary">What's Next?</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    Instant Activation
                  </p>
                  <p className="text-muted-foreground">
                    All premium features are now active on your account
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    Explore Features
                  </p>
                  <p className="text-muted-foreground">
                    Try cloud sync, advanced scheduling, and sensitivity
                    controls
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="text-foreground font-medium">Stay Connected</p>
                  <p className="text-muted-foreground">
                    Check for beta features and provide feedback
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Support */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-6 space-y-4">
            <div className="text-center space-y-3">
              <Share2 className="w-8 h-8 text-primary mx-auto" />
              <h3 className="text-lg font-bold text-foreground">
                Help Us Grow
              </h3>
              <p className="text-muted-foreground text-sm">
                Share UnlockGuard with friends and family who value privacy and
                security
              </p>
            </div>

            <Button
              onClick={handleShare}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-blue-600"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share with Friends
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to="/manage-faces">
            <Button className="w-full h-14 rounded-xl text-lg font-semibold">
              Start Using Premium Features
            </Button>
          </Link>

          <Link to="/settings">
            <Button variant="outline" className="w-full h-12 rounded-xl">
              Back to Settings
            </Button>
          </Link>
        </div>

        {/* Thank You Message */}
        <Card className="bg-gradient-to-r from-success/20 to-green-100/50 border-success/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-success font-medium">
              💚 Thank you for supporting independent development and helping us
              build privacy-focused security tools!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

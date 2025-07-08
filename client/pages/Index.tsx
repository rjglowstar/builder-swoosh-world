import { Button } from "@/components/ui/button";
import { Shield, Eye, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">UnlockGuard</h1>
          <p className="text-xl text-muted-foreground font-medium">
            Protect & Relax
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Advanced face recognition security for your device. Only allow
            trusted faces to unlock your screen.
          </p>

          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-success">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Face Detection</span>
            </div>
            <div className="flex items-center space-x-2 text-info">
              <Lock className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Link to="/manage-faces" className="w-full">
            <Button
              size="lg"
              className="w-full text-lg h-14 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
            >
              Get Started
            </Button>
          </Link>

          <button className="text-muted-foreground hover:text-foreground transition-colors">
            Learn More
          </button>
        </div>

        {/* Security Badge */}
        <div className="pt-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              Privacy First • Local Processing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

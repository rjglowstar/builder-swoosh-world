import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const handleGoogleSignIn = () => {
    console.log("Google Sign-in for Premium/Sync users");
  };

  const handleDeviceLink = () => {
    console.log("Link this device with code");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">UnlockGuard</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">Secure Access</h2>
            <p className="text-muted-foreground">
              Choose your preferred way to access UnlockGuard
            </p>
          </div>
        </div>

        {/* Google Sign-in for Premium Users */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">
                Premium & Sync Users
              </h3>
              <p className="text-sm text-muted-foreground">
                Access your cloud-synced data and premium features
              </p>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              className="w-full h-14 rounded-xl bg-white text-foreground border-2 border-gray-200 hover:bg-gray-50 shadow-lg"
              variant="outline"
            >
              <div className="w-6 h-6 mr-3">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              Sign in with Google
            </Button>
          </CardContent>
        </Card>

        {/* Free User Access */}
        <div className="text-center">
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Continue as Free User
          </Link>
        </div>

        {/* Device Linking */}
        <Card className="bg-info/10 border-info/20">
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-info/20 rounded-full flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-info" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-info">Family Device</h3>
                <p className="text-sm text-info/80">
                  Link this device to your family's UnlockGuard setup
                </p>
              </div>
              <Button
                onClick={handleDeviceLink}
                variant="outline"
                className="w-full h-12 rounded-xl text-info border-info hover:bg-info hover:text-white"
              >
                Link this Device with Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Note */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">
              🔒 UnlockGuard uses Google Sign-in for secure, universal access.
              No passwords to remember or manage.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

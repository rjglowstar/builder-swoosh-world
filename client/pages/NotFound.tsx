import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );

    // Auto-redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist. Redirecting you to the
            Dashboard...
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-info">
            <div className="w-2 h-2 bg-info rounded-full animate-pulse"></div>
            <span>Auto-redirecting in 3 seconds</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link to="/dashboard">
            <Button className="rounded-xl h-12 px-6 w-full">
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard Now
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="rounded-xl h-10 px-6 w-full">
              Back to Welcome
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

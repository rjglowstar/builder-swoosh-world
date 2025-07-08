import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Crown, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Subscription() {
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
            <Crown className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Subscription</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center space-y-4">
            <Settings className="w-12 h-12 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-semibold text-foreground">
              Subscription Management
            </h2>
            <p className="text-muted-foreground">
              This screen is coming soon. You'll be able to view your current
              plan, billing history, and manage your subscription here.
            </p>
            <div className="space-y-3">
              <Link to="/pricing">
                <Button className="w-full h-12 rounded-xl">
                  View Plans & Pricing
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="outline" className="w-full h-10 rounded-xl">
                  Back to Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

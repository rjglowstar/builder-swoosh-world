import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Crown,
  Check,
  X,
  Shield,
  Zap,
  Star,
  Gift,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      period: "",
      color: "muted",
      icon: Shield,
      features: [
        { name: "Basic face recognition", included: true },
        { name: "Up to 3 trusted faces", included: true },
        { name: "Local data storage", included: true },
        { name: "Manual protection mode", included: true },
        { name: "Advanced scheduling", included: false },
        { name: "Cloud sync", included: false },
        { name: "Unlimited faces", included: false },
        { name: "Priority support", included: false },
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹299",
      period: "/year",
      color: "primary",
      icon: Crown,
      features: [
        { name: "Advanced face recognition", included: true },
        { name: "Unlimited trusted faces", included: true },
        { name: "Cloud sync & backup", included: true },
        { name: "Protection scheduling", included: true },
        { name: "Sensitivity controls", included: true },
        { name: "Detailed unlock history", included: true },
        { name: "Emergency PIN backup", included: true },
        { name: "Email support", included: true },
      ],
      popular: true,
    },
    {
      id: "plus",
      name: "Plus",
      price: "₹599",
      period: "/year",
      color: "info",
      icon: Zap,
      features: [
        { name: "Everything in Premium", included: true },
        { name: "Multi-device sync", included: true },
        { name: "Family sharing (5 devices)", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom notifications", included: true },
        { name: "API access", included: true },
        { name: "Priority support", included: true },
        { name: "Beta features access", included: true },
      ],
      popular: false,
    },
    {
      id: "supporter",
      name: "Supporter Bonus",
      price: "₹1399",
      period: "/3 years",
      color: "success",
      icon: Gift,
      features: [
        { name: "Everything in Plus", included: true },
        { name: "3-year subscription", included: true },
        { name: "Exclusive supporter badge", included: true },
        { name: "Early access to features", included: true },
        { name: "Direct developer contact", included: true },
        { name: "Custom app themes", included: true },
        { name: "Lifetime feature requests", included: true },
        { name: "Supporting indie development", included: true },
      ],
      popular: false,
      special: true,
    },
  ];

  const handleChoosePlan = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === "supporter") {
      // Redirect to supporter confirmation
      window.location.href = "/supporter-confirmation";
    } else {
      console.log("Choosing plan:", planId);
    }
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
            <Crown className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">
              Upgrade UnlockGuard
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-foreground">
            Choose Your Protection Level
          </h2>
          <p className="text-muted-foreground">
            Upgrade to unlock advanced face recognition features, cloud sync,
            and premium security controls.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="space-y-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-white/60 backdrop-blur-sm border-white/20 transition-all duration-200 hover:shadow-lg ${
                plan.popular ? "ring-2 ring-primary shadow-lg scale-105" : ""
              } ${plan.special ? "bg-gradient-to-br from-success/10 to-success/5" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {plan.special && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-success text-white px-3 py-1">
                    <Gift className="w-3 h-3 mr-1" />
                    Special Offer
                  </Badge>
                </div>
              )}

              <CardContent className="p-6 space-y-6">
                {/* Plan Header */}
                <div className="text-center space-y-3">
                  <div
                    className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center bg-${plan.color}/20`}
                  >
                    <plan.icon className={`w-6 h-6 text-${plan.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-3xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground line-through"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleChoosePlan(plan.id)}
                  className={`w-full h-12 rounded-xl font-semibold ${
                    plan.id === selectedPlan
                      ? ""
                      : plan.popular
                        ? ""
                        : "variant-outline"
                  }`}
                  variant={plan.popular || plan.special ? "default" : "outline"}
                  disabled={plan.id === "free"}
                >
                  {plan.id === "free"
                    ? "Current Plan"
                    : plan.id === "supporter"
                      ? "Support Development"
                      : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Features */}
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Shield className="w-8 h-8 text-primary mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Enterprise-Grade Security
                </h3>
                <p className="text-primary/80">
                  All plans include end-to-end encryption, local processing, and
                  privacy-first design principles.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            <Card className="bg-white/40 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Can I cancel anytime?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll
                  retain access until your current billing period ends.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/40 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Is my data secure?
                </h4>
                <p className="text-sm text-muted-foreground">
                  All face data is processed locally on your device. Cloud sync
                  uses end-to-end encryption for maximum privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Privacy First</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4" />
              <span>No Ads</span>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4" />
              <span>Premium Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

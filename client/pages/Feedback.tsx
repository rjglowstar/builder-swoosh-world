import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  MessageSquare,
  Star,
  Bug,
  Lightbulb,
  Heart,
  Send,
  Mail,
  Phone,
  Globe,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";
import { useState } from "react";

export default function Feedback() {
  const { goBack } = useSmartNavigation();
  const [feedbackType, setFeedbackType] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", {
      type: feedbackType,
      subject,
      message,
      email,
      rating,
    });
    // In real app, this would send to backend
    alert("Thank you for your feedback! We'll get back to you soon.");
  };

  const feedbackTypes = [
    { value: "bug", label: "Bug Report", icon: Bug, color: "text-danger" },
    {
      value: "feature",
      label: "Feature Request",
      icon: Lightbulb,
      color: "text-primary",
    },
    {
      value: "general",
      label: "General Feedback",
      icon: MessageSquare,
      color: "text-info",
    },
    {
      value: "compliment",
      label: "Compliment",
      icon: Heart,
      color: "text-success",
    },
  ];

  const supportOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@unlockguard.com",
      action: "Send Email",
    },
    {
      icon: Globe,
      title: "Online Documentation",
      description: "Browse our comprehensive help guides",
      contact: "docs.unlockguard.com",
      action: "View Docs",
    },
    {
      icon: MessageSquare,
      title: "Community Forum",
      description: "Connect with other users and get tips",
      contact: "community.unlockguard.com",
      action: "Visit Forum",
    },
  ];

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
            <MessageSquare className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">
              Feedback & Support
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* App Rating */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <h3 className="font-semibold text-primary">
                How's your experience?
              </h3>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? "text-yellow-400 fill-current"
                          : "text-slate-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-muted-foreground">
                  {rating >= 4
                    ? "Great! Consider leaving a review in the app store."
                    : "Thanks for the feedback. Let us know how we can improve below."}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Form */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Send Us Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="feedback-type">Feedback Type</Label>
                <Select value={feedbackType} onValueChange={setFeedbackType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    {feedbackTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className={`w-4 h-4 ${type.color}`} />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of your feedback"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Provide your email if you'd like a response
                </p>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us more about your feedback, suggestion, or issue..."
                  className="min-h-[100px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!feedbackType || !subject || !message}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Feedback Options */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Quick Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {feedbackTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setFeedbackType(type.value);
                    setSubject(type.label);
                  }}
                  className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
                >
                  <type.icon className={`w-5 h-5 ${type.color} mb-2`} />
                  <div className="text-sm font-medium text-foreground">
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Options */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Other Ways to Get Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <option.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">
                      {option.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                    <p className="text-xs text-primary mt-1">
                      {option.contact}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {option.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card className="bg-info/10 border-info/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-info mb-1">Response Times</h3>
                <div className="space-y-1 text-sm text-info/80">
                  <div>• Bug reports: Within 2 business days</div>
                  <div>• Feature requests: Within 1 week</div>
                  <div>• General inquiries: Within 24 hours</div>
                  <div>• Premium users: Priority support</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/help">
            <Button variant="outline" className="w-full h-12">
              Help & Tutorials
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" className="w-full h-12">
              About UnlockGuard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

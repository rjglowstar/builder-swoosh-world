import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  HelpCircle,
  User,
  Shield,
  Clock,
  Eye,
  Smartphone,
  Settings,
  Bell,
  Video,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSmartNavigation } from "@/hooks/useSmartNavigation";

export default function Help() {
  const { goBack } = useSmartNavigation();

  const tutorials = [
    {
      icon: User,
      title: "Setting Up Your First Face",
      description: "Learn how to add and configure trusted faces",
      steps: [
        "Go to Manage Faces",
        "Tap Add Face",
        "Position your face in the camera",
        "Enter a name",
        "Save the face profile",
      ],
      link: "/add-face",
    },
    {
      icon: Shield,
      title: "Configuring Security Settings",
      description: "Optimize your security preferences",
      steps: [
        "Access Settings",
        "Go to Security section",
        "Set Emergency PIN",
        "Configure sensitivity",
        "Enable protection schedule",
      ],
      link: "/settings",
    },
    {
      icon: Clock,
      title: "Using Guest Mode",
      description: "Temporary access for visitors",
      steps: [
        "Open Guest Mode",
        "Set time limit (or unlimited)",
        "Turn ON Guest Mode",
        "Guest can unlock with any face",
        "Turn OFF when done",
      ],
      link: "/guest-mode",
    },
    {
      icon: Eye,
      title: "Understanding Detection",
      description: "How face recognition works",
      steps: [
        "Camera detects face",
        "Compares to trusted faces",
        "Allows or blocks access",
        "Logs all attempts",
        "Shows status in Dashboard",
      ],
      link: "/unlock-history",
    },
  ];

  const quickHelp = [
    {
      icon: Bell,
      title: "Troubleshooting",
      items: [
        "Face not recognized? Try better lighting",
        "Multiple faces? Remove glasses/masks",
        "False positives? Adjust sensitivity",
        "Guest mode stuck? Check time settings",
      ],
    },
    {
      icon: Smartphone,
      title: "Device Setup",
      items: [
        "Ensure camera permissions are granted",
        "Keep camera lens clean",
        "Use good lighting conditions",
        "Position face 12-18 inches from camera",
      ],
    },
    {
      icon: Settings,
      title: "Common Settings",
      items: [
        "Emergency PIN for backup access",
        "Schedule protection hours",
        "Manage blocked faces",
        "Export unlock history",
      ],
    },
  ];

  const faqs = [
    {
      question: "Is my face data secure?",
      answer:
        "Yes! All face data is processed locally on your device. No biometric data is sent to external servers.",
    },
    {
      question: "Can I use UnlockGuard on multiple devices?",
      answer:
        "Yes, with Premium Plus you can sync settings across up to 5 devices using encrypted cloud storage.",
    },
    {
      question: "What happens if the camera can't see me?",
      answer:
        "You can always use your Emergency PIN as backup access, or temporarily disable protection.",
    },
    {
      question: "How accurate is face recognition?",
      answer:
        "Our AI achieves 99.8% accuracy under normal conditions. You can adjust sensitivity for your needs.",
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
            <HelpCircle className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Help & Tutorials</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Quick Start */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <span>Add your face in Manage Faces</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <span>Set an Emergency PIN for backup</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <span>Configure protection schedule</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <span>Test with Dashboard monitoring</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Tutorials */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Step-by-Step Tutorials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tutorials.map((tutorial, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg p-3"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <tutorial.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {tutorial.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tutorial.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 ml-11">
                    {tutorial.steps.map((step, stepIndex) => (
                      <div
                        key={stepIndex}
                        className="flex items-center space-x-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={tutorial.link} className="ml-11 mt-2 inline-block">
                    <Button variant="outline" size="sm" className="h-8">
                      Try Now
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Help */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Quick Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickHelp.map((section, index) => (
                <div key={index}>
                  <div className="flex items-center space-x-2 mb-2">
                    <section.icon className="w-4 h-4 text-primary" />
                    <h3 className="font-medium text-foreground">
                      {section.title}
                    </h3>
                  </div>
                  <div className="space-y-1 ml-6">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-start space-x-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1 h-1 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-l-2 border-primary/20 pl-4">
                  <h3 className="font-medium text-foreground mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="bg-info/10 border-info/20">
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-info" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-info mb-1">
                  Need More Help?
                </h3>
                <p className="text-sm text-info/80">
                  Can't find what you're looking for? Our support team is here
                  to help.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Bell className="w-4 h-4 mr-1" />
                  Contact Support
                </Button>
                <Link to="/about" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="w-4 h-4 mr-1" />
                    Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import "./global.css";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppStatusProvider } from "@/contexts/AppStatusContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard-2";
import ManageFaces from "./pages/ManageFaces";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import Settings from "./pages/Settings";
import BlockedFaces from "./pages/BlockedFaces";
import UnlockHistory from "./pages/UnlockHistory";
import AddFace from "./pages/AddFace";
import Schedule from "./pages/Schedule";
import EmergencyPin from "./pages/EmergencyPin";
import Pricing from "./pages/Pricing";
import SupporterConfirmation from "./pages/SupporterConfirmation";
import Sensitivity from "./pages/Sensitivity";
import SyncSetup from "./pages/SyncSetup";
import WidgetSetup from "./pages/WidgetSetup";
import Notifications from "./pages/Notifications";
import GuestMode from "./pages/GuestMode";
import DeviceManagement from "./pages/DeviceManagement";
import About from "./pages/About";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppStatusProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard2 />} />
            <Route path="/dashboard-old" element={<Dashboard />} />
            <Route path="/manage-faces" element={<ManageFaces />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/blocked-faces" element={<BlockedFaces />} />
            <Route path="/unlock-history" element={<UnlockHistory />} />
            <Route path="/add-face" element={<AddFace />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/emergency-pin" element={<EmergencyPin />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/supporter-confirmation"
              element={<SupporterConfirmation />}
            />
            <Route path="/sensitivity" element={<Sensitivity />} />
            <Route path="/sync" element={<SyncSetup />} />
            <Route path="/widget-setup" element={<WidgetSetup />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/guest-mode" element={<GuestMode />} />
            <Route path="/device-management" element={<DeviceManagement />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppStatusProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

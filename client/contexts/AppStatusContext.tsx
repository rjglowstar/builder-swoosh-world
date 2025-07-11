import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Key } from "lucide-react";

interface AppStatusContextType {
  emergencyPinSet: boolean;
  setEmergencyPinSet: (status: boolean) => void;
  faceManagementSet: boolean;
  setFaceManagementSet: (status: boolean) => void;
  trustedFaces: number;
  setTrustedFaces: (count: number) => void;
  guestModeEnabled: boolean;
  setGuestModeEnabled: (enabled: boolean) => void;
  scheduleEnabled: boolean;
  setScheduleEnabled: (enabled: boolean) => void;
  subscriptionActive: boolean;
  setSubscriptionActive: (active: boolean) => void;
  addNotification: (notification: NotificationData) => void;
  notifications: NotificationData[];
  setNotifications: (notifications: NotificationData[]) => void;
}

interface NotificationData {
  id: number;
  type: "security" | "detection" | "sync" | "subscription" | "system";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  icon: any;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  action: string;
  details?: {
    snapshot?: string;
    location?: string;
    deviceInfo?: string;
    faceName?: string;
    confidence?: number;
  };
  important?: boolean;
}

const AppStatusContext = createContext<AppStatusContextType | undefined>(
  undefined,
);

export function AppStatusProvider({ children }: { children: ReactNode }) {
  // Load initial state from localStorage
  const [emergencyPinSet, setEmergencyPinSetState] = useState(() => {
    return localStorage.getItem("emergencyPinSet") === "true";
  });

  const [faceManagementSet, setFaceManagementSetState] = useState(() => {
    return localStorage.getItem("faceManagementSet") === "true";
  });

  const [trustedFaces, setTrustedFacesState] = useState(() => {
    return parseInt(localStorage.getItem("trustedFaces") || "0");
  });

  const [guestModeEnabled, setGuestModeEnabledState] = useState(() => {
    return localStorage.getItem("guestModeEnabled") === "true";
  });

  const [scheduleEnabled, setScheduleEnabledState] = useState(() => {
    return localStorage.getItem("scheduleEnabled") === "true";
  });

  const [subscriptionActive, setSubscriptionActiveState] = useState(() => {
    return localStorage.getItem("subscriptionActive") === "true";
  });

  const [notifications, setNotifications] = useState<NotificationData[]>(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // Wrapper functions that also update localStorage
  const setEmergencyPinSet = (status: boolean) => {
    setEmergencyPinSetState(status);
    localStorage.setItem("emergencyPinSet", status.toString());

    // Add notification when Emergency PIN is set
    if (status) {
      addNotification({
        id: Date.now(),
        type: "security",
        title: "Emergency PIN Set",
        description: "Backup access method configured successfully",
        timestamp: new Date().toLocaleString(),
        read: false,
        icon: "Key",
        iconColor: "text-success",
        bgColor: "bg-success/10",
        borderColor: "border-success/20",
        action: "/emergency-pin",
        details: {
          deviceInfo: "Security enhanced with backup PIN access",
        },
      });
    }
  };

  const setFaceManagementSet = (status: boolean) => {
    setFaceManagementSetState(status);
    localStorage.setItem("faceManagementSet", status.toString());
  };

  const setTrustedFaces = (count: number) => {
    setTrustedFacesState(count);
    localStorage.setItem("trustedFaces", count.toString());
  };

  const setGuestModeEnabled = (enabled: boolean) => {
    setGuestModeEnabledState(enabled);
    localStorage.setItem("guestModeEnabled", enabled.toString());
  };

  const setScheduleEnabled = (enabled: boolean) => {
    setScheduleEnabledState(enabled);
    localStorage.setItem("scheduleEnabled", enabled.toString());
  };

  const setSubscriptionActive = (active: boolean) => {
    setSubscriptionActiveState(active);
    localStorage.setItem("subscriptionActive", active.toString());
  };

  const addNotification = (notification: NotificationData) => {
    setNotifications((prev) => {
      const updated = [notification, ...prev];
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const setNotificationsWithStorage = (
    newNotifications: NotificationData[],
  ) => {
    setNotifications(newNotifications);
    localStorage.setItem("notifications", JSON.stringify(newNotifications));
  };

  const value = {
    emergencyPinSet,
    setEmergencyPinSet,
    faceManagementSet,
    setFaceManagementSet,
    trustedFaces,
    setTrustedFaces,
    guestModeEnabled,
    setGuestModeEnabled,
    scheduleEnabled,
    setScheduleEnabled,
    subscriptionActive,
    setSubscriptionActive,
    addNotification,
    notifications,
    setNotifications: setNotificationsWithStorage,
  };

  return (
    <AppStatusContext.Provider value={value}>
      {children}
    </AppStatusContext.Provider>
  );
}

export function useAppStatus() {
  const context = useContext(AppStatusContext);
  if (context === undefined) {
    throw new Error("useAppStatus must be used within an AppStatusProvider");
  }
  return context;
}

export type { NotificationData };

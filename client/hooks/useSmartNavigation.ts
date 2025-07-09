import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export function useSmartNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const currentPath = location.pathname;

    // On initial load, initialize history from sessionStorage
    if (isInitialLoad.current) {
      const storedHistory = sessionStorage.getItem("navigationHistory");
      if (storedHistory) {
        try {
          const parsedHistory = JSON.parse(storedHistory);
          setNavigationHistory(parsedHistory);
        } catch {
          // If parsing fails, start fresh with current path
          setNavigationHistory([currentPath]);
          sessionStorage.setItem(
            "navigationHistory",
            JSON.stringify([currentPath]),
          );
        }
      } else {
        // Start fresh with current path
        setNavigationHistory([currentPath]);
        sessionStorage.setItem(
          "navigationHistory",
          JSON.stringify([currentPath]),
        );
      }
      isInitialLoad.current = false;
      return;
    }

    // Update navigation history
    setNavigationHistory((prev) => {
      // Don't add duplicate consecutive paths
      if (prev[prev.length - 1] === currentPath) {
        return prev;
      }

      // Limit history to last 10 entries to prevent memory issues
      const newHistory = [...prev, currentPath].slice(-10);
      sessionStorage.setItem("navigationHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  }, [location.pathname]);

  const goBack = () => {
    if (navigationHistory.length <= 1) {
      // If no history or only current page, go to dashboard
      navigate("/dashboard");
      return;
    }

    // Get the previous path (excluding current path)
    const currentPath = location.pathname;
    let targetPath = "/dashboard";

    // Find the last different path in history
    for (let i = navigationHistory.length - 2; i >= 0; i--) {
      if (navigationHistory[i] !== currentPath) {
        targetPath = navigationHistory[i];
        break;
      }
    }

    // Remove current path from history and update sessionStorage
    const newHistory = navigationHistory.slice(0, -1);
    setNavigationHistory(newHistory);
    sessionStorage.setItem("navigationHistory", JSON.stringify(newHistory));

    navigate(targetPath);
  };

  const navigateFrom = (path: string) => {
    navigate(path);
  };

  const clearHistory = () => {
    setNavigationHistory([location.pathname]);
    sessionStorage.setItem(
      "navigationHistory",
      JSON.stringify([location.pathname]),
    );
  };

  const getPreviousPath = () => {
    if (navigationHistory.length <= 1) return "/dashboard";

    const currentPath = location.pathname;
    // Find the last different path in history
    for (let i = navigationHistory.length - 2; i >= 0; i--) {
      if (navigationHistory[i] !== currentPath) {
        return navigationHistory[i];
      }
    }
    return "/dashboard";
  };

  return {
    goBack,
    navigateFrom,
    clearHistory,
    previousPath: getPreviousPath(),
    navigationHistory,
  };
}

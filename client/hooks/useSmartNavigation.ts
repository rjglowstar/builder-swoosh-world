import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function useSmartNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string>("/dashboard");

  useEffect(() => {
    // Store the current path as the previous path for future navigation
    const currentPath = location.pathname;

    // Get stored previous path from sessionStorage
    const storedPreviousPath = sessionStorage.getItem("previousPath");

    // If we have a stored previous path and it's different from current, use it
    if (storedPreviousPath && storedPreviousPath !== currentPath) {
      setPreviousPath(storedPreviousPath);
    }

    // Store current path for next navigation
    sessionStorage.setItem("previousPath", currentPath);
  }, [location.pathname]);

  const goBack = () => {
    // Always go back to Dashboard if coming from there, or use stored previous path
    const backPath =
      previousPath === location.pathname ? "/dashboard" : previousPath;
    navigate(backPath);
  };

  const navigateFrom = (path: string) => {
    // Store where we're navigating from
    sessionStorage.setItem("previousPath", location.pathname);
    navigate(path);
  };

  return {
    goBack,
    navigateFrom,
    previousPath,
  };
}

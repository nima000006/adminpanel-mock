import { useState, useEffect, useCallback } from "react";

import { useMediaQuery } from "usehooks-ts";

/**
 * Custom hook for managing sidebar collapse state with responsive behavior
 * Automatically collapses sidebar on small devices (< 768px)
 */
export const useSidebarState = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  useEffect(() => {
    if (isSmallDevice) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isSmallDevice]);

  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []); // Stable function - no dependencies needed

  return { collapsed, toggleSidebar };
};

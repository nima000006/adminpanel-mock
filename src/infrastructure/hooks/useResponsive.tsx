import { useEffect, useState } from "react";

/**
 * useResponsive Hook
 * Returns an object of booleans for common screen sizes.
 * Based on Ant Design / Bootstrap breakpoints.
 */
export const useResponsive = () => {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const breakpoints = {
    xs: 575,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1600,
  };

  return {
    width,
    isMobile: width <= breakpoints.xs,
    isTablet: width > breakpoints.xs && width <= breakpoints.md,
    isDesktop: width > breakpoints.md,
    isLarge: width > breakpoints.lg,
  };
};

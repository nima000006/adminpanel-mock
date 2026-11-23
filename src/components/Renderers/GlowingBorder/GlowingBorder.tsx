import { CSSProperties, ElementType, ReactNode } from "react";
import "./glowing-border.css";

interface GlowingBorderProps {
  children: ReactNode;
  /** Any valid CSS color (hex, rgb, oklch, a CSS variable, etc). */
  color?: string;
  /** Seconds per full rotation. Lower = faster spin. */
  speed?: number;
  /** Ring thickness in pixels. */
  thickness?: number;
  /** CSS blur() amount for the soft glow layer behind the ring. */
  blur?: string;
  /** Border radius - number (px) or any CSS length string. */
  radius?: number | string;
  /** Opacity (0-1) of the blurred glow layer. */
  glowOpacity?: number;
  /**
   * Background behind your content - needed so only the ring shows,
   * not the whole glow. Left undefined (transparent) by default since
   * this component can't know your app's theme colors. Either pass an
   * explicit value here, or put a theme-aware bg-* class on your own
   * content instead, so it responds correctly to light/dark mode.
   */
  contentBackground?: string;
  /** Element/component to render as the outer wrapper. */
  as?: ElementType;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
}

const GlowingBorder = ({
  children,
  color = "#ffffff",
  speed = 3,
  thickness = 1,
  blur = "1rem",
  radius = 10,
  glowOpacity = 0.5,
  contentBackground = "var(--app-bg-container)",
  as: Tag = "div",
  className = "",
  contentClassName = "",
  style,
  contentStyle,
}: GlowingBorderProps) => {
  const cssVars = {
    "--glow-color": color,
    "--glow-speed": `${speed}s`,
    "--glow-thickness": `${thickness}px`,
    "--glow-blur": blur,
    "--glow-radius": typeof radius === "number" ? `${radius}px` : radius,
    "--glow-opacity": glowOpacity,
    "--glow-content-bg": contentBackground,
  } as CSSProperties;

  return (
    <Tag className={`glow-border ${className}`} style={{ ...cssVars, ...style }}>
      <div className={`glow-border-content ${contentClassName}`} style={contentStyle}>
        {children}
      </div>
    </Tag>
  );
};

export default GlowingBorder;

/**
 * Global Color Constants
 * ─────────────────────
 * Palette tokens use CSS custom property references (var(--...))
 * so they automatically switch between light and dark mode.
 *
 * ⚠️  CSS var() strings work fine in React inline styles:
 *     style={{ color: NEUTRAL_06 }}  →  style={{ color: "var(--neutral-6)" }}
 */

// Brand Blues (static — no dark override)
export const BLUE_01 = "#0500ff";
export const BLUE_02 = "#0e81ed";
export const BLUE_03 = "#1673ff";

// Yellows / Golds
export const YELLOW_01 = "#ffd000";
export const GOLD_6 = "#FAAD14";
export const GOLD_1 = "var(--yellow-1)";
export const GOLD_7 = "#d48806";

// Surfaces
export const WHITE = "var(--neutral-1)";

// Greens
export const GREEN = "#008000";
export const GREEN_01 = "var(--green-1)";
export const GREEN_03 = "var(--green-3)";
export const GREEN_07 = "#389e0d";

// Reds / Errors
export const RED = "#ff0000";
export const RED_1 = "var(--dustred-1)";
export const RED_6 = "var(--dustred-6)";
export const RED_7 = "#cf1322";

// Neutrals — theme-aware via CSS custom properties
export const NEUTRAL_01 = "var(--neutral-1)";
export const NEUTRAL_02 = "var(--neutral-2)";
export const NEUTRAL_05 = "var(--neutral-5)";
export const NEUTRAL_06 = "var(--neutral-6)";
export const NEUTRAL_07 = "var(--neutral-7)";
export const NEUTRAL_08 = "var(--neutral-8)";
export const NEUTRAL_09 = "var(--neutral-9)";
export const NEUTRAL_10 = "var(--neutral-10)";

// Misc
export const CONTENT_CUSTOM_BACKGROUND_COLOR = "var(--neutral-3)";
export const CUSTOM_PRIMARY = "#1677ff4d";
export const GREEN_HIGHLIGHT = "#18e633";
export const PRIMARY_4 = "var(--primary-4)";
export const PRIMARY_6 = "var(--primary-6)";

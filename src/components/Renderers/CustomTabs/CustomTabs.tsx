import { forwardRef, useMemo, ReactNode, useEffect, useState, useCallback } from "react";

import { GetRef, Tabs, Badge } from "antd";

import useQueryParams from "@infra/hooks/useQueryParams";

import type { TabsProps as AntdTabsProps } from "antd";
import "./_customTabs.scss";

type TabsRef = GetRef<typeof Tabs>;
type BaseTabItem = NonNullable<AntdTabsProps["items"]>[number];

/**
 * Extended tab item with additional features (backward compatible with Ant Design)
 */
export interface CustomTabItem extends Omit<BaseTabItem, "label" | "children"> {
  /** Unique key for the tab */
  key: string;
  /** Tab label */
  label: ReactNode;
  /** Tab content */
  children?: ReactNode;
  /** Badge count shown on the tab (CustomTabs feature) */
  badgeCount?: number;
  /** Badge dot instead of count (CustomTabs feature) */
  badgeDot?: boolean;
  /** Badge status color (CustomTabs feature) */
  badgeStatus?: "success" | "processing" | "default" | "error" | "warning";
}

/** URL persistence mode for tabs */
type UrlPersistMode = "none" | "url";

export interface CustomTabsProps extends Omit<AntdTabsProps, "items"> {
  /** Array of tab items (compatible with Ant Design TabsProps["items"]) */
  items?: CustomTabItem[];
  /** Additional class name */
  className?: string;
  /** Tab bar style variant (CustomTabs feature) */
  variant?: "default" | "card" | "pills" | "underline";
  /** Whether tabs should be full width (CustomTabs feature) */
  fullWidth?: boolean;
  /**
   * URL persistence mode (CustomTabs feature):
   * - "none": No URL persistence (default)
   * - "url": Persist active tab key in URL query params
   */
  urlPersist?: UrlPersistMode;
  /** URL query parameter key for tab persistence (default: "tab") */
  urlKey?: string;
  /** Lazy load tab content - only render when tab is active (CustomTabs feature) */
  lazyLoad?: boolean;
  /** Keep tab content mounted after first render (works with lazyLoad) */
  keepMounted?: boolean;
}

/**
 * CustomTabs - Production-ready drop-in replacement for Ant Design Tabs
 *
 * Additional Features:
 * - Badge support (count or dot) via badgeCount/badgeDot properties
 * - Visual variants (default, card, pills, underline)
 * - URL persistence (sync active tab with URL query params)
 * - Lazy loading with optional keep-mounted behavior
 * - Full width tabs option
 * - 100% compatible with all Ant Design Tabs props
 *
 * @example
 * ```tsx
 * // Drop-in replacement - works exactly like Ant Design Tabs
 * const items: TabsProps["items"] = [
 *   { key: "1", label: "Tab 1", children: <div>Content 1</div> },
 *   { key: "2", label: "Tab 2", children: <div>Content 2</div> },
 * ];
 * <CustomTabs items={items} centered />
 *
 * // With badge (new feature)
 * const items: CustomTabItem[] = [
 *   { key: "1", label: "Tab 1", badgeCount: 5, children: <div>Content 1</div> },
 * ];
 * <CustomTabs items={items} variant="pills" />
 *
 * // With URL persistence
 * <CustomTabs items={items} urlPersist="url" urlKey="activeTab" />
 * ```
 */
const CustomTabs = forwardRef<TabsRef, CustomTabsProps>(
  (
    {
      items = [],
      className,
      variant = "default",
      size = "middle",
      fullWidth = false,
      onChange,
      onEdit,
      type,
      urlPersist = "none",
      urlKey = "tab",
      defaultActiveKey,
      activeKey: controlledActiveKey,
      lazyLoad = false,
      keepMounted = true,
      ...props
    },
    ref
  ) => {
    // URL persistence hook
    const { params: urlParams, setSearchParams } = useQueryParams();

    // Track which tabs have been visited (for keepMounted behavior)
    const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set());

    // Determine initial active key
    const getInitialActiveKey = useCallback(() => {
      if (controlledActiveKey) return String(controlledActiveKey);
      if (urlPersist === "url" && urlParams?.[urlKey]) return urlParams[urlKey];
      if (defaultActiveKey) return defaultActiveKey;
      return items[0]?.key || "";
    }, [controlledActiveKey, urlPersist, urlParams, urlKey, defaultActiveKey, items]);

    // Internal active key state (for uncontrolled mode with URL sync)
    const [internalActiveKey, setInternalActiveKey] =
      useState<string>(getInitialActiveKey);

    // Actual active key (controlled or internal)
    const activeKey =
      controlledActiveKey !== undefined ? String(controlledActiveKey) : internalActiveKey;

    // Sync with URL on mount and when URL changes
    useEffect(() => {
      if (
        urlPersist === "url" &&
        urlParams?.[urlKey] &&
        urlParams[urlKey] !== activeKey
      ) {
        // Validate that the URL key exists in items
        const isValidKey = items.some((item) => item.key === urlParams[urlKey]);
        if (isValidKey) {
          setInternalActiveKey(urlParams[urlKey]);
        }
      }
    }, [urlParams, urlKey, urlPersist, items, activeKey]);

    // Track visited tabs
    useEffect(() => {
      if (activeKey && !visitedTabs.has(activeKey)) {
        setVisitedTabs((prev) => new Set(prev).add(activeKey));
      }
    }, [activeKey, visitedTabs]);

    // Transform custom items to antd items with badge/icon support
    const transformedItems = useMemo(() => {
      return items.map((item) => {
        const { label, icon, badgeCount, badgeDot, badgeStatus, children, ...rest } =
          item;

        // Build the label with icon and badge
        let finalLabel: ReactNode = label;

        // Wrap with icon if provided
        if (icon) {
          finalLabel = (
            <span className="custom-tabs-label-with-icon">
              <span className="custom-tabs-icon">{icon}</span>
              <span className="custom-tabs-label-text">{finalLabel}</span>
            </span>
          );
        }

        // Wrap with badge if count or dot provided
        if (typeof badgeCount === "number" || badgeDot) {
          finalLabel = (
            <Badge
              count={badgeCount}
              dot={badgeDot}
              status={badgeStatus}
              offset={[8, 0]}
              size="small"
              className="custom-tabs-badge"
            >
              <span className="custom-tabs-badge-label">{finalLabel}</span>
            </Badge>
          );
        }

        // Handle lazy loading
        let finalChildren = children;
        if (lazyLoad) {
          const isActive = item.key === activeKey;
          const wasVisited = visitedTabs.has(item.key);

          if (!isActive && !wasVisited) {
            // Never been visited, render nothing
            finalChildren = null;
          } else if (!isActive && wasVisited && !keepMounted) {
            // Was visited but keepMounted is false, unmount
            finalChildren = null;
          }
          // Otherwise render the children (active or keepMounted)
        }

        return {
          ...rest,
          label: finalLabel,
          children: finalChildren,
        };
      });
    }, [items, activeKey, visitedTabs, lazyLoad, keepMounted]);

    // Determine the antd type based on variant
    const getType = (): AntdTabsProps["type"] => {
      if (type) return type;
      switch (variant) {
        case "card":
          return "card";
        case "pills":
          return "card";
        default:
          return "line";
      }
    };

    // Handle tab change
    const handleChange = (newActiveKey: string) => {
      // Update internal state
      setInternalActiveKey(newActiveKey);

      // Update URL if persistence is enabled
      if (urlPersist === "url") {
        const newParams: Record<string, string> = { ...(urlParams || {}) };
        newParams[urlKey] = newActiveKey;
        setSearchParams(newParams);
      }

      // Call user callback
      onChange?.(newActiveKey);
    };

    // Handle tab edit (add/remove) - just pass through to user callback
    const handleEdit: AntdTabsProps["onEdit"] = (targetKey, action) => {
      onEdit?.(targetKey, action);
    };

    // Build class names
    const classNames = [
      "custom-tabs-container",
      `custom-tabs-variant-${variant}`,
      `custom-tabs-size-${size}`,
      fullWidth && "custom-tabs-full-width",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Tabs
        ref={ref}
        className={classNames}
        items={transformedItems}
        type={getType()}
        activeKey={activeKey}
        onChange={handleChange}
        onEdit={handleEdit}
        {...props}
      />
    );
  }
);

CustomTabs.displayName = "CustomTabs";

export default CustomTabs;

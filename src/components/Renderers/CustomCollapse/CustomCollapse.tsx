import { ReactNode, useMemo } from "react";

import { GetProps, Collapse } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import "./_customCollapse.scss";

// =============================================================================
// Types
// =============================================================================

type AntdCollapseProps = GetProps<typeof Collapse>;

/**
 * Collapse variants for different visual styles
 */
export type CollapseVariant = "default" | "ghost" | "bordered" | "card";

/**
 * Expand icon position
 */
export type ExpandIconPosition = "start" | "end";

/**
 * Custom collapse item with extended properties
 */
export interface CustomCollapseItem {
  /** Unique key for the item */
  key: string | number;
  /** Header label - can be string or ReactNode */
  label: ReactNode;
  /** Content to show when expanded */
  children: ReactNode;
  /** Extra content on the right side of header */
  extra?: ReactNode;
  /** Whether item can be collapsed */
  collapsible?: "header" | "icon" | "disabled";
  /** Show arrow icon */
  showArrow?: boolean;
  /** Force render content even when collapsed (for SEO/forms) */
  forceRender?: boolean;
  /** Custom class for this item */
  className?: string;
}

/**
 * CustomCollapse Props extending antd Collapse
 */
export type CustomCollapseProps = Omit<AntdCollapseProps, "items" | "expandIcon"> & {
  /** Collapse items */
  items: CustomCollapseItem[];
  /** Visual variant */
  variant?: CollapseVariant;
  /** Position of expand icon */
  expandIconPosition?: ExpandIconPosition;
  /** Custom expand icon */
  customExpandIcon?: ReactNode | ((props: { isActive?: boolean }) => ReactNode);
  /** Whether to use animated expand icon */
  animatedIcon?: boolean;
  /** Accordion mode - only one panel open at a time */
  accordion?: boolean;
  /** Default expanded panels */
  defaultActiveKey?: string | number | (string | number)[];
  /** Controlled expanded panels */
  activeKey?: string | number | (string | number)[];
  /** Callback when panels change */
  onChange?: (key: string | string[]) => void;
  /** Remove borders */
  bordered?: boolean;
  /** Destroy inactive panels */
  destroyInactivePanel?: boolean;
  /** Additional class name */
  className?: string;
  /** Size variant */
  size?: "small" | "middle" | "large";
};

// =============================================================================
// Component
// =============================================================================

/**
 * CustomCollapse - A feature-rich collapse/accordion wrapper for antd Collapse
 *
 * Features:
 * - Multiple visual variants (default, ghost, bordered, card)
 * - Animated expand icon
 * - Customizable expand icon position
 * - Accordion mode support
 * - RTL support
 * - Size variants
 *
 * @example Basic usage
 * ```tsx
 * <CustomCollapse
 *   items={[
 *     { key: "1", label: "پنل اول", children: <div>محتوا</div> },
 *     { key: "2", label: "پنل دوم", children: <div>محتوا</div> },
 *   ]}
 * />
 * ```
 *
 * @example Ghost variant (common in project)
 * ```tsx
 * <CustomCollapse
 *   variant="ghost"
 *   items={[{ key: "1", label: "آمار", children: <Statistics /> }]}
 *   defaultActiveKey={["1"]}
 * />
 * ```
 *
 * @example Accordion mode
 * ```tsx
 * <CustomCollapse
 *   accordion
 *   variant="card"
 *   items={faqItems}
 * />
 * ```
 */
const CustomCollapse = ({
  items,
  variant = "default",
  expandIconPosition = "start",
  customExpandIcon,
  animatedIcon = true,
  accordion = false,
  defaultActiveKey,
  activeKey,
  onChange,
  bordered = true,
  destroyInactivePanel = false,
  className,
  size = "middle",
  ...restProps
}: CustomCollapseProps) => {
  // Build expand icon
  const renderExpandIcon = useMemo(() => {
    if (customExpandIcon) {
      return typeof customExpandIcon === "function"
        ? customExpandIcon
        : () => customExpandIcon;
    }

    // Default animated arrow icon
    return ({ isActive }: { isActive?: boolean }) => (
      <IoIosArrowDown
        className={`custom-collapse-expand-icon ${animatedIcon ? "animated" : ""} ${
          isActive ? "active" : ""
        }`}
      />
    );
  }, [customExpandIcon, animatedIcon]);

  // Transform items to antd format
  const collapseItems = useMemo(() => {
    return items.map((item) => ({
      key: item.key,
      label: item.label,
      children: item.children,
      extra: item.extra,
      collapsible: item.collapsible,
      showArrow: item.showArrow,
      forceRender: item.forceRender,
      className: item.className,
    }));
  }, [items]);

  // Build class names
  const collapseClassName = useMemo(() => {
    const classes = ["custom-collapse-container"];

    classes.push(`custom-collapse-variant-${variant}`);
    classes.push(`custom-collapse-size-${size}`);

    if (expandIconPosition === "end") {
      classes.push("custom-collapse-icon-end");
    }

    if (!bordered || variant === "ghost") {
      classes.push("custom-collapse-borderless");
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  }, [variant, size, expandIconPosition, bordered, className]);

  return (
    <Collapse
      items={collapseItems}
      expandIcon={renderExpandIcon}
      accordion={accordion}
      defaultActiveKey={defaultActiveKey}
      activeKey={activeKey}
      onChange={onChange}
      ghost={variant === "ghost"}
      bordered={bordered && variant !== "ghost"}
      destroyInactivePanel={destroyInactivePanel}
      className={collapseClassName}
      expandIconPosition={expandIconPosition}
      {...restProps}
    />
  );
};

CustomCollapse.displayName = "CustomCollapse";

export default CustomCollapse;

// =============================================================================
// Export types for external use
// =============================================================================

export type { AntdCollapseProps };

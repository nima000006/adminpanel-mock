import React, { useState, useCallback, useMemo, forwardRef } from "react";

import { Popover, PopoverProps, GetRef } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import "./_customPopover.scss";

// =============================================================================
// Types
// =============================================================================

type PopoverRef = GetRef<typeof Popover>;

export interface CustomPopoverProps extends Omit<PopoverProps, "title" | "content"> {
  /** The content of the popover */
  content?: React.ReactNode | ((props: { close: () => void }) => React.ReactNode);

  /** The title of the popover */
  title?: React.ReactNode;

  /** Show a close (X) button in the top corner */
  showCloseIcon?: boolean;

  /** Optional footer content */
  footer?: React.ReactNode | ((props: { close: () => void }) => React.ReactNode);

  /** Custom functionality when formatted close button is clicked */
  onCloseClick?: () => void;
}

// =============================================================================
// Component
// =============================================================================

const CustomPopover = forwardRef<PopoverRef, CustomPopoverProps>(
  (
    {
      children,
      content,
      title,
      trigger = "click",
      placement = "bottom",
      overlayClassName,
      showCloseIcon = false,
      footer,
      onOpenChange,
      open,
      defaultOpen,
      onCloseClick,
      ...restProps
    },
    ref
  ) => {
    // ==================== State Management ====================
    // Handle controllable open state to support the internal Close button
    const [internalOpen, setInternalOpen] = useState<boolean>(!!defaultOpen);

    const isControlled = open !== undefined;
    const mergedOpen = isControlled ? open : internalOpen;

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange]
    );

    const closePopover = useCallback(() => {
      handleOpenChange(false);
      onCloseClick?.();
    }, [handleOpenChange, onCloseClick]);

    // ==================== Render Helpers ====================

    /**
     * Renders the custom title with optional close icon
     */
    const renderTitle = useMemo(() => {
      if (!title && !showCloseIcon) return null;

      // If we have a title, we render a header bar
      if (title) {
        return (
          <div className="popover-header-title-wrapper">
            <span className="popover-header-title">{title}</span>
            {showCloseIcon && (
              <div
                className="popover-close-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  closePopover();
                }}
                role="button"
                tabIndex={0}
              >
                <AiOutlineClose />
              </div>
            )}
          </div>
        );
      }

      return null;
    }, [title, showCloseIcon, closePopover]);

    /**
     * Renders the main content.
     * If showCloseIcon is true but NO title exists, we place the close icon
     * absolutely inside the content wrapper.
     */
    const renderContent = useMemo(() => {
      const actualContent =
        typeof content === "function" ? content({ close: closePopover }) : content;
      const actualFooter =
        typeof footer === "function" ? footer({ close: closePopover }) : footer;

      // Close icon without title (Absolute position)
      const renderAbsoluteClose = showCloseIcon && !title && (
        <div
          className="popover-close-btn-absolute"
          onClick={(e) => {
            e.stopPropagation();
            closePopover();
          }}
        >
          <AiOutlineClose />
        </div>
      );

      return (
        <div className="custom-popover-inner-wrapper">
          {renderAbsoluteClose}
          <div className="ant-popover-inner-content">{actualContent}</div>

          {actualFooter && <div className="custom-popover-footer">{actualFooter}</div>}
        </div>
      );
    }, [content, footer, showCloseIcon, title, closePopover]);

    // ==================== Styles ====================

    const overlayCls = [
      "custom-popover-overlay",
      showCloseIcon && !title ? "has-close-no-title" : null,
      overlayClassName,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Popover
        ref={ref}
        open={mergedOpen}
        onOpenChange={handleOpenChange}
        trigger={trigger}
        placement={placement}
        overlayClassName={overlayCls}
        title={renderTitle}
        content={renderContent}
        {...restProps}
      >
        {children}
      </Popover>
    );
  }
);

CustomPopover.displayName = "CustomPopover";

export default CustomPopover;

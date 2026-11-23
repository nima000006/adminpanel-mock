import { ReactNode, useMemo } from "react";

import { GetProps, Modal, Button } from "antd";
import "./_customModal.scss";
import { MaskConfig } from "antd/es/_util/hooks";

// =============================================================================
// Types
// =============================================================================

type AntdModalProps = GetProps<typeof Modal>;

/**
 * Preset modal sizes for common use cases
 */
export type ModalSize = "small" | "medium" | "large" | "fullscreen";

/**
 * Modal variants for different use cases
 */
export type ModalVariant = "default" | "confirm" | "info" | "warning" | "danger" | "form";

/**
 * Footer button configuration
 */
export interface ModalFooterButton {
  /** Button text */
  text: string;
  /** Button type */
  type?: "primary" | "default" | "dashed" | "link" | "text";
  /** Is this button dangerous (red) */
  danger?: boolean;
  /** Button click handler */
  onClick?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** HTML type for form submission */
  htmlType?: "button" | "submit" | "reset";
  /** Custom class name */
  className?: string;
}

/**
 * Custom Modal Props extending antd Modal
 */
export type CustomModalProps = Omit<AntdModalProps, "width"> & {
  /** Preset size for the modal */
  size?: ModalSize;
  /** Custom width (overrides size) */
  width?: number | string;
  /** Modal variant for different styles */
  variant?: ModalVariant;
  /** Icon to display next to the title */
  titleIcon?: ReactNode;
  /** Custom footer buttons (overrides okText/cancelText) */
  footerButtons?: ModalFooterButton[];
  /** Show footer divider */
  showFooterDivider?: boolean;
  /** Show header divider */
  showHeaderDivider?: boolean;
  /** Custom footer content (completely overrides footer) */
  customFooter?: ReactNode;
  /** Loading state for the entire modal content */
  contentLoading?: boolean;
  /** Cancel button text (shorthand) */
  cancelText?: string;
  /** Confirm button text (shorthand) */
  confirmText?: string;
  /** Confirm button loading state */
  confirmLoading?: boolean;
  /** Confirm button disabled state */
  confirmDisabled?: boolean;
  /** On confirm handler (shorthand for ok button) */
  onConfirm?: () => void;
  /** Confirm button danger style */
  confirmDanger?: boolean;
  /** Hide cancel button */
  hideCancel?: boolean;
  /** Hide confirm button */
  hideConfirm?: boolean;
  /** Additional class name */
  className?: string;
  /** Subtitle below title */
  subtitle?: ReactNode;
  /** Alert/description above content */
  description?: ReactNode;
  /** Close modal when clicking outside */
  closeOnClickOutside?: boolean;
  /** Close modal when pressing escape */
  closeOnEscape?: boolean;
  /** Destroy modal content when closed */
  destroyOnClose?: boolean;
  /** Destroy modal content when closed */
  blur?: MaskConfig["blur"];
};

// =============================================================================
// Size configurations
// =============================================================================

const SIZE_MAP: Record<ModalSize, number | string> = {
  small: 400,
  medium: 600,
  large: 900,
  fullscreen: "100%",
};

// =============================================================================
// Component
// =============================================================================

/**
 * CustomModal - A feature-rich modal wrapper for antd Modal
 *
 * Features:
 * - Preset sizes (small, medium, large, fullscreen)
 * - Variants for different use cases (confirm, info, warning, danger, form)
 * - Title with icon support
 * - Flexible footer configuration
 * - RTL support
 * - Loading states
 * - Keyboard accessibility
 *
 * @example Basic usage
 * ```tsx
 * <CustomModal
 *   open={isOpen}
 *   onCancel={() => setIsOpen(false)}
 *   title="عنوان مودال"
 *   size="medium"
 * >
 *   محتوای مودال
 * </CustomModal>
 * ```
 *
 * @example With custom footer
 * ```tsx
 * <CustomModal
 *   open={isOpen}
 *   onCancel={() => setIsOpen(false)}
 *   title="حذف آیتم"
 *   variant="danger"
 *   confirmText="حذف"
 *   confirmDanger
 *   onConfirm={handleDelete}
 * >
 *   آیا از حذف این آیتم مطمئن هستید؟
 * </CustomModal>
 * ```
 *
 * @example Form modal
 * ```tsx
 * <CustomModal
 *   open={isOpen}
 *   onCancel={() => setIsOpen(false)}
 *   title="فرم ثبت نام"
 *   variant="form"
 *   size="large"
 *   footer={null}
 * >
 *   <Form onFinish={handleSubmit}>
 *     ...
 *   </Form>
 * </CustomModal>
 * ```
 */
const CustomModal = ({
  // Size & Layout
  size = "medium",
  width,
  variant = "default",
  centered = true,

  // Title
  title,
  titleIcon,
  subtitle,
  description,

  // Footer
  footer,
  footerButtons,
  customFooter,
  showFooterDivider = false,
  showHeaderDivider = true,

  // Button shortcuts
  cancelText = "انصراف",
  confirmText = "تایید",
  confirmLoading = false,
  confirmDisabled = false,
  onConfirm,
  confirmDanger = false,
  hideCancel = false,
  hideConfirm = false,

  // Behavior
  closeOnClickOutside = true,
  closeOnEscape = true,
  destroyOnClose = false,
  contentLoading = false,

  // Styling
  className,
  blur,

  // Rest
  children,
  onCancel,
  onOk,
  ...restProps
}: CustomModalProps) => {
  // Calculate width based on size or custom width
  const modalWidth = useMemo(() => {
    if (width !== undefined) return width;
    return SIZE_MAP[size];
  }, [size, width]);

  // Build title with icon
  const renderTitle = useMemo(() => {
    if (!title) return undefined;

    const titleContent = titleIcon ? (
      <div className="custom-modal-title-with-icon">
        <span className="custom-modal-title-icon">{titleIcon}</span>
        <span className="custom-modal-title-text">{title}</span>
      </div>
    ) : (
      title
    );

    if (subtitle) {
      return (
        <div className="custom-modal-title-wrapper">
          {titleContent}
          <div className="custom-modal-subtitle">{subtitle}</div>
        </div>
      );
    }

    return titleContent;
  }, [title, titleIcon, subtitle]);

  // Build footer
  const renderFooter = useMemo(() => {
    // If customFooter is provided, use it
    if (customFooter !== undefined) return customFooter;

    // If footer is explicitly set (including null), respect it
    if (footer !== undefined) return footer;

    // If footerButtons are provided, render them
    if (footerButtons && footerButtons.length > 0) {
      return (
        <div className="custom-modal-footer-buttons">
          {footerButtons.map((btn) => (
            <Button
              key={btn.text}
              type={btn.type || "default"}
              danger={btn.danger}
              onClick={btn.onClick}
              loading={btn.loading}
              disabled={btn.disabled}
              htmlType={btn.htmlType || "button"}
              className={btn.className}
            >
              {btn.text}
            </Button>
          ))}
        </div>
      );
    }

    // Default footer with cancel/confirm buttons
    const buttons: ReactNode[] = [];

    if (!hideCancel) {
      buttons.push(
        <Button
          key="cancel"
          onClick={onCancel as any}
          className="custom-modal-cancel-btn"
        >
          {cancelText}
        </Button>
      );
    }

    if (!hideConfirm) {
      buttons.push(
        <Button
          key="confirm"
          type="primary"
          danger={confirmDanger || variant === "danger"}
          loading={confirmLoading}
          disabled={confirmDisabled}
          onClick={onConfirm || (onOk as any)}
          className="custom-modal-confirm-btn"
        >
          {confirmText}
        </Button>
      );
    }

    if (buttons.length === 0) return null;

    return <div className="custom-modal-footer-buttons">{buttons}</div>;
  }, [
    customFooter,
    footer,
    footerButtons,
    hideCancel,
    hideConfirm,
    cancelText,
    confirmText,
    confirmLoading,
    confirmDisabled,
    confirmDanger,
    onConfirm,
    onOk,
    onCancel,
    variant,
  ]);

  // Build class names
  const modalClassName = useMemo(() => {
    const classes = ["custom-modal-container"];

    if (variant !== "default") {
      classes.push(`custom-modal-variant-${variant}`);
    }

    if (size === "fullscreen") {
      classes.push("custom-modal-fullscreen");
    }

    if (showFooterDivider) {
      classes.push("custom-modal-footer-divider");
    }

    if (showHeaderDivider) {
      classes.push("custom-modal-header-divider");
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  }, [variant, size, showFooterDivider, showHeaderDivider, className]);

  // Render content with optional loading and description
  const renderContent = useMemo(() => {
    if (contentLoading) {
      return (
        <div className="custom-modal-content-loading">
          <div className="custom-modal-spinner" />
        </div>
      );
    }

    return (
      <>
        {description && <div className="custom-modal-description">{description}</div>}
        {children}
      </>
    );
  }, [contentLoading, description, children]);

  return (
    <Modal
      title={renderTitle}
      footer={renderFooter}
      width={modalWidth}
      centered={centered}
      className={modalClassName}
      // maskClosable={closeOnClickOutside}
      mask={{ closable: closeOnClickOutside, blur }}
      keyboard={closeOnEscape}
      destroyOnHidden={destroyOnClose}
      onCancel={onCancel}
      onOk={onOk}
      {...restProps}
    >
      {renderContent}
    </Modal>
  );
};

CustomModal.displayName = "CustomModal";

export default CustomModal;

// =============================================================================
// Export types for external use
// =============================================================================

export type { AntdModalProps };

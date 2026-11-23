import { useEffect, useMemo, useCallback, ReactNode } from "react";

import { Form, GetProps, Row, Col, GetRef } from "antd";

import CustomDynamicFormRows from "./CustomDynamicFormRows/CustomDynamicFormRows";

import type { ValidateErrorEntity } from "@rc-component/form/lib/interface";

import "./_customForm.scss";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type AntdFormProps = GetProps<typeof Form>;
type AntdFormItemProps = GetProps<typeof Form.Item>;

/** Form layout preset types */
export type FormLayoutPreset = "horizontal" | "vertical" | "inline" | "compact";

/** Form variant types */
export type FormVariant = "outlined" | "borderless" | "filled" | "underlined";

/** Form size types */
export type FormSize = "small" | "middle" | "large";

/** Scroll to error configuration */
export type ScrollConfig =
  | boolean
  | { block?: ScrollLogicalPosition; behavior?: ScrollBehavior };

/** Props for CustomForm component */
export interface CustomFormProps extends Omit<AntdFormProps, "layout" | "size"> {
  /** Layout preset - 'vertical' is default for RTL support */
  layoutPreset?: FormLayoutPreset;
  /** Form size preset */
  size?: FormSize;
  /** Form variant style */
  variant?: FormVariant;
  /** If true, disables all form inputs */
  disabled?: boolean;
  /** If true, shows loading state on the form */
  loading?: boolean;
  /** Custom loading indicator */
  loadingIndicator?: ReactNode;
  /** If true, auto-scrolls to first error on validation failure */
  scrollToFirstError?: ScrollConfig;
  /** Custom class name */
  className?: string;
  /** Children elements */
  children?: ReactNode;
  /** Gap between form items (only for layoutPreset: 'compact') */
  gap?: number | [number, number];
  /** If true, preserves form values when fields are unmounted */
  preserve?: boolean;
  /** Callback when form validation fails */
  onFinishFailed?: AntdFormProps["onFinishFailed"];
  /** Callback when form is submitted successfully */
  onFinish?: AntdFormProps["onFinish"];
  /** Callback when any field value changes */
  onValuesChange?: AntdFormProps["onValuesChange"];
  /** Form instance created by Form.useForm() */
  form?: ReturnType<typeof Form.useForm>[0];
  /** Initial values for form fields */
  initialValues?: AntdFormProps["initialValues"];
  /** Custom validation messages */
  validateMessages?: AntdFormProps["validateMessages"];
  /** Required mark style */
  requiredMark?: AntdFormProps["requiredMark"];
  /** Colon after labels */
  colon?: boolean;
  /** Label alignment for horizontal layout */
  labelAlign?: "left" | "right";
  /** Label column configuration */
  labelCol?: AntdFormProps["labelCol"];
  /** Wrapper column configuration */
  wrapperCol?: AntdFormProps["wrapperCol"];
  /** If true, resets form when initialValues change */
  resetOnInitialValuesChange?: boolean;
}

/** Props for CustomFormItem component */
export interface CustomFormItemProps extends AntdFormItemProps {
  /** Field name path */
  name?: AntdFormItemProps["name"];
  /** Field label */
  label?: ReactNode;
  /** Validation rules */
  rules?: AntdFormItemProps["rules"];
  /** Dependencies for validation */
  dependencies?: AntdFormItemProps["dependencies"];
  /** Whether to show required mark */
  required?: boolean;
  /** Help text below field */
  help?: ReactNode;
  /** Extra text below field (different from help) */
  extra?: ReactNode;
  /** Custom class name */
  className?: string;
  /** Field tooltip */
  tooltip?: AntdFormItemProps["tooltip"];
  /** Whether to show feedback icon */
  hasFeedback?: boolean;
  /** Validation trigger */
  validateTrigger?: AntdFormItemProps["validateTrigger"];
  /** Whether to preserve value when unmounted */
  preserve?: boolean;
  /** Custom value prop name (for checkbox, switch, etc.) */
  valuePropName?: string;
  /** Span width (1-24) when using Row/Col layout */
  span?: number;
  /** Whether to hide label */
  noLabel?: boolean;
  /** Whether the field is hidden */
  hidden?: boolean;
  /** Children elements */
  children?: ReactNode;
}

/** Props for CustomFormList component */
export interface CustomFormListProps {
  /** Field list name */
  name: string | number | (string | number)[];
  /** Initial value for the list */
  initialValue?: any[];
  /** Rules for the entire list */
  rules?: AntdFormItemProps["rules"];
  /** Render function */
  children: (
    fields: { key: number; name: number }[],
    operations: {
      add: (defaultValue?: any, insertIndex?: number) => void;
      remove: (index: number | number[]) => void;
      move: (from: number, to: number) => void;
    },
    meta: { errors: ReactNode[]; warnings: ReactNode[] }
  ) => ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// Default Values
// ─────────────────────────────────────────────────────────────────────────────

/** Default Persian validation messages */
const DEFAULT_VALIDATE_MESSAGES: AntdFormProps["validateMessages"] = {
  required: "این فیلد ضروری است",
  types: {
    email: "ایمیل معتبر نیست",
    number: "لطفا عدد وارد کنید",
    url: "آدرس معتبر نیست",
  },
  string: {
    min: "حداقل ${min} کاراکتر وارد کنید",
    max: "حداکثر ${max} کاراکتر مجاز است",
    len: "باید دقیقا ${len} کاراکتر باشد",
  },
  number: {
    min: "عدد باید بیشتر از ${min} باشد",
    max: "عدد باید کمتر از ${max} باشد",
    range: "عدد باید بین ${min} و ${max} باشد",
  },
  pattern: {
    mismatch: "فرمت وارد شده صحیح نیست",
  },
};

/** Default scroll to error config */
const DEFAULT_SCROLL_CONFIG = {
  block: "center" as ScrollLogicalPosition,
  behavior: "smooth" as ScrollBehavior,
};

/** Layout preset configurations */
const LAYOUT_CONFIGS: Record<
  FormLayoutPreset,
  Pick<AntdFormProps, "layout" | "labelCol" | "wrapperCol">
> = {
  horizontal: {
    layout: "horizontal",
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },
  vertical: {
    layout: "vertical",
    labelCol: undefined,
    wrapperCol: undefined,
  },
  inline: {
    layout: "inline",
    labelCol: undefined,
    wrapperCol: undefined,
  },
  compact: {
    layout: "vertical",
    labelCol: undefined,
    wrapperCol: undefined,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Custom Hooks
// ─────────────────────────────────────────────────────────────────────────────

/** Re-export Form hooks for convenience */
export const useForm = Form.useForm;
export const useFormInstance = Form.useFormInstance;
export const useWatch = Form.useWatch;

/** Custom hook for form with preset defaults */
export function useCustomForm<Values = Record<string, unknown>>(
  initialValues?: Partial<Values>
): [ReturnType<typeof Form.useForm<Values>>[0], { reset: () => void }] {
  const [form] = Form.useForm<Values>();

  const reset = useCallback(() => {
    form.resetFields();
    if (initialValues) {
      form.setFieldsValue(initialValues as Parameters<typeof form.setFieldsValue>[0]);
    }
  }, [form, initialValues]);

  return [form, { reset }];
}

// ─────────────────────────────────────────────────────────────────────────────
// CustomForm Component
// ─────────────────────────────────────────────────────────────────────────────

function CustomFormComponent({
  layoutPreset = "vertical",
  size = "middle",
  variant = "outlined",
  disabled = false,
  loading = false,
  loadingIndicator,
  scrollToFirstError = true,
  className,
  children,
  gap,
  preserve = true,
  onFinishFailed,
  onFinish,
  onValuesChange,
  form,
  initialValues,
  validateMessages,
  requiredMark = true,
  colon = false,
  labelAlign = "right",
  labelCol,
  wrapperCol,
  resetOnInitialValuesChange = false,
  ...restProps
}: CustomFormProps) {
  // Get layout configuration
  const layoutConfig = useMemo(() => LAYOUT_CONFIGS[layoutPreset], [layoutPreset]);

  // Merge validation messages
  const mergedValidateMessages = useMemo(
    () => ({
      ...DEFAULT_VALIDATE_MESSAGES,
      ...validateMessages,
    }),
    [validateMessages]
  );

  // Scroll config
  const scrollConfig = useMemo(() => {
    if (scrollToFirstError === true) {
      return DEFAULT_SCROLL_CONFIG;
    }
    if (scrollToFirstError === false) {
      return false;
    }
    return { ...DEFAULT_SCROLL_CONFIG, ...scrollToFirstError };
  }, [scrollToFirstError]);

  // Reset form when initialValues change (if enabled)
  useEffect(() => {
    if (resetOnInitialValuesChange && form && initialValues) {
      form.setFieldsValue(initialValues as any);
    }
  }, [resetOnInitialValuesChange, form, initialValues]);

  // Build class name
  const formClassName = useMemo(() => {
    const classes = ["custom-form"];
    classes.push(`custom-form--layout-${layoutPreset}`);
    classes.push(`custom-form--size-${size}`);
    classes.push(`custom-form--variant-${variant}`);
    if (disabled) classes.push("custom-form--disabled");
    if (loading) classes.push("custom-form--loading");
    if (className) classes.push(className);
    return classes.join(" ");
  }, [layoutPreset, size, variant, disabled, loading, className]);

  // Handle validation failure
  const handleFinishFailed = useCallback(
    (errorInfo: ValidateErrorEntity) => {
      if (process.env.NODE_ENV === "development") {
        console.warn("[CustomForm] Validation failed:", errorInfo);
      }
      onFinishFailed?.(errorInfo);
    },
    [onFinishFailed]
  );

  // Render loading overlay if loading
  const renderLoadingOverlay = () => {
    if (!loading) return null;
    return (
      <div className="custom-form__loading-overlay">
        {loadingIndicator || <div className="custom-form__loading-spinner" />}
      </div>
    );
  };

  // Compact layout with Row/Col
  if (layoutPreset === "compact" && gap) {
    const [rowGap, colGap] = Array.isArray(gap) ? gap : [gap, gap];
    return (
      <Form
        form={form}
        layout={layoutConfig.layout}
        size={size}
        variant={variant}
        disabled={disabled || loading}
        scrollToFirstError={scrollConfig}
        className={formClassName}
        preserve={preserve}
        onFinish={onFinish}
        onFinishFailed={handleFinishFailed}
        onValuesChange={onValuesChange}
        initialValues={initialValues}
        validateMessages={mergedValidateMessages}
        requiredMark={requiredMark}
        colon={colon}
        labelAlign={labelAlign}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        {...restProps}
      >
        {renderLoadingOverlay()}
        <Row gutter={[colGap, rowGap]}>{children}</Row>
      </Form>
    );
  }

  return (
    <Form
      form={form}
      layout={layoutConfig.layout}
      labelCol={labelCol || layoutConfig.labelCol}
      wrapperCol={wrapperCol || layoutConfig.wrapperCol}
      size={size}
      variant={variant}
      disabled={disabled || loading}
      scrollToFirstError={scrollConfig}
      className={formClassName}
      preserve={preserve}
      onFinish={onFinish}
      onFinishFailed={handleFinishFailed}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
      validateMessages={mergedValidateMessages}
      requiredMark={requiredMark}
      colon={colon}
      labelAlign={labelAlign}
      {...restProps}
    >
      {renderLoadingOverlay()}
      {children}
    </Form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CustomFormItem Component
// ─────────────────────────────────────────────────────────────────────────────

function CustomFormItem({
  name,
  label,
  rules,
  dependencies,
  required = false,
  help,
  extra,
  className,
  tooltip,
  hasFeedback = false,
  validateTrigger,
  preserve,
  valuePropName,
  span,
  noLabel = false,
  hidden = false,
  children,
  ...restProps
}: CustomFormItemProps) {
  // Build rules with required
  const finalRules = useMemo(() => {
    if (required && !rules?.some((r: any) => r?.required)) {
      return [{ required: true, message: "این فیلد ضروری است" }, ...(rules || [])];
    }
    return rules;
  }, [required, rules]);

  // Build class name
  const itemClassName = useMemo(() => {
    const classes = ["custom-form-item"];
    if (noLabel) classes.push("custom-form-item--no-label");
    if (className) classes.push(className);
    return classes.join(" ");
  }, [noLabel, className]);

  const formItem = (
    <Form.Item
      name={name}
      label={noLabel ? undefined : label}
      rules={finalRules}
      dependencies={dependencies}
      help={help}
      extra={extra}
      className={itemClassName}
      tooltip={tooltip}
      hasFeedback={hasFeedback}
      validateTrigger={validateTrigger}
      preserve={preserve}
      valuePropName={valuePropName}
      hidden={hidden}
      {...restProps}
    >
      {children}
    </Form.Item>
  );

  // Wrap in Col if span is provided
  if (span) {
    return <Col span={span}>{formItem}</Col>;
  }

  return formItem;
}

// ─────────────────────────────────────────────────────────────────────────────
// CustomFormList Component
// ─────────────────────────────────────────────────────────────────────────────

function CustomFormList({ name, initialValue, rules, children }: CustomFormListProps) {
  return (
    <Form.List
      name={name}
      initialValue={initialValue}
      rules={rules as Parameters<typeof Form.List>[0]["rules"]}
    >
      {(fields, operations, meta) => children(fields, operations, meta)}
    </Form.List>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Type exports for form instance
// ─────────────────────────────────────────────────────────────────────────────

export type FormInstance<Values = Record<string, unknown>> = GetRef<typeof Form<Values>>;

// ─────────────────────────────────────────────────────────────────────────────
// Compound Component Export
// ─────────────────────────────────────────────────────────────────────────────

const CustomForm = Object.assign(CustomFormComponent, {
  Item: CustomFormItem,
  List: CustomFormList,
  DynamicRows: CustomDynamicFormRows,
  useForm,
  useFormInstance,
  useWatch,
  useCustomForm,
});

export default CustomForm;

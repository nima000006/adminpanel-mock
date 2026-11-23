import { forwardRef, useCallback, useId, useMemo } from "react";

import { Form, Select } from "antd";

import { normalizeText } from "../../../infrastructure/helpers/utils";

import type { SelectProps } from "antd";
import type { FormItemProps } from "antd/es/form";
import "./_customSelect.scss";

// Clean type separation
type SelectOnlyProps = Pick<
  SelectProps,
  | "placeholder"
  | "mode"
  | "disabled"
  | "loading"
  | "allowClear"
  | "showSearch"
  | "maxTagCount"
  | "maxTagTextLength"
  | "maxTagPlaceholder"
  | "notFoundContent"
  | "suffixIcon"
  | "removeIcon"
  | "clearIcon"
  | "menuItemSelectedIcon"
  | "dropdownRender"
  | "dropdownMatchSelectWidth"
  | "dropdownStyle"
  | "dropdownClassName"
  | "listHeight"
  | "listItemHeight"
  | "size"
  | "bordered"
  | "showArrow"
  | "virtual"
  | "onFocus"
  | "onBlur"
  | "onClear"
  | "onDeselect"
  | "onInputKeyDown"
  | "onKeyDown"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onPopupScroll"
  | "onSearch"
  | "onSelect"
  | "onDropdownVisibleChange"
  | "onClick"
>;

type FormItemOnlyProps = Pick<
  FormItemProps,
  | "label"
  | "name"
  | "rules"
  | "dependencies"
  | "validateStatus"
  | "validateFirst"
  | "validateDebounce"
  | "validateTrigger"
  | "tooltip"
  | "shouldUpdate"
  | "preserve"
  | "noStyle"
  | "messageVariables"
  | "labelCol"
  | "labelAlign"
  | "initialValue"
  | "hidden"
  | "help"
  | "hasFeedback"
  | "getValueProps"
  | "extra"
  | "getValueFromEvent"
  | "colon"
  | "valuePropName"
  | "trigger"
  | "normalize"
>;

// Enhanced option types
export interface SelectOption {
  id: number | string;
  title: string;
  disabled?: boolean;
  className?: string;
  data?: Record<string, unknown>; // For custom data
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface TransformedOption {
  label: string;
  value: string;
  disabled?: boolean;
  className?: string;
  title?: string;
  data?: Record<string, unknown>;
}

export interface CustomSelectProps extends SelectOnlyProps, FormItemOnlyProps {
  /** Array of options or option groups */
  options: SelectOption[] | SelectOptionGroup[] | undefined;
  /** Custom onChange handler */
  onChange?: (
    value: string | string[],
    option: TransformedOption | TransformedOption[]
  ) => void;
  /** Whether to display label above the select */
  hasVerticalLabel?: boolean;
  /** Custom class name for the container */
  rootClassName?: string;
  /** Whether to enable search functionality */
  searchable?: boolean;
  /** Custom filter function for search */
  filterOption?: (input: string, option: TransformedOption) => boolean;
  /** Whether options have groups */
  hasGroups?: boolean;
  /** Custom aria-label when label is not provided */
  ariaLabel?: string;
  /** Custom empty state message */
  emptyText?: string;
  /** Whether to normalize text for search (Persian/Arabic support) */
  normalizeSearch?: boolean;
  /** Auto-focus on mount */
  autoFocus?: boolean;
  /** Custom option renderer */
  optionRender?: (option: TransformedOption) => React.ReactNode;
}

/**
 * Enhanced wrapper around Ant Design's Select and Form.Item with features:
 * - Type-safe option handling
 * - Built-in search with Persian/Arabic normalization
 * - Option groups support
 * - Proper accessibility
 * - Performance optimizations
 * - Clean API without form manipulation anti-patterns
 */
const CustomSelect = forwardRef<React.ElementRef<typeof Select>, CustomSelectProps>(
  (
    {
      // Form.Item props
      label,
      name,
      rules,
      colon = false,
      dependencies,
      valuePropName,
      validateStatus,
      validateFirst = false,
      validateDebounce,
      trigger,
      validateTrigger,
      tooltip,
      shouldUpdate = false,
      preserve = true,
      noStyle = false,
      normalize,
      messageVariables,
      labelCol,
      labelAlign = "right",
      initialValue,
      hidden = false,
      help,
      hasFeedback = false,
      getValueProps,
      extra,
      getValueFromEvent,

      // Select props
      placeholder = "انتخاب کنید",
      mode,
      disabled = false,
      loading = false,
      allowClear = true,
      showSearch = true,
      maxTagCount,
      maxTagTextLength,
      maxTagPlaceholder,
      notFoundContent,
      suffixIcon,
      removeIcon,
      menuItemSelectedIcon,
      dropdownRender,
      dropdownMatchSelectWidth,
      dropdownStyle,
      listHeight,
      listItemHeight,
      size,
      bordered,
      showArrow,
      virtual,
      onFocus,
      onBlur,
      onClear,
      onDeselect,
      onInputKeyDown,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      onPopupScroll,
      onSearch,
      onSelect,
      onDropdownVisibleChange,
      onClick,

      // Custom props
      options = [],
      onChange,
      hasVerticalLabel = true,
      rootClassName,
      searchable = true,
      filterOption,
      hasGroups = false,
      ariaLabel,
      emptyText = "داده‌ای یافت نشد",
      normalizeSearch = true,
      autoFocus = false,
      optionRender,

      ...otherProps
    },
    ref
  ) => {
    const selectId = useId();
    const errorId = `${selectId}-error`;
    const loadingId = `${selectId}-loading`;

    // Transform options to AntD format with memoization
    const transformedOptions = useMemo(() => {
      if (!options?.length) return [];

      const transformOption = (option: SelectOption): TransformedOption => ({
        label: option.title,
        value: String(option.id),
        disabled: option.disabled,
        className: option.className,
        title: option.title,
        data: option.data,
      });

      // Handle grouped options
      if (hasGroups) {
        return (options as SelectOptionGroup[]).map((group) => ({
          label: group.label,
          options: group.options.map(transformOption),
        }));
      }

      // Handle flat options
      return (options as SelectOption[]).map(transformOption);
    }, [options, hasGroups]);

    // Memoized filter function with normalization support
    const memoizedFilterOption = useCallback(
      (input: string, option?: any) => {
        if (filterOption) {
          return filterOption(input, option);
        }

        if (!option?.label) return false;

        const labelText = String(option.label);
        const searchText = input;

        if (normalizeSearch) {
          const normalizedLabel = normalizeText(labelText);
          const normalizedInput = normalizeText(searchText.toLowerCase());
          return normalizedLabel?.includes(normalizedInput) ?? false;
        }

        return labelText.toLowerCase().includes(searchText.toLowerCase());
      },
      [filterOption, normalizeSearch]
    );

    // Container classes with memoization
    const containerClasses = useMemo(
      () =>
        ["custom-select-container", hasVerticalLabel && "vertical-label", rootClassName]
          .filter(Boolean)
          .join(" "),
      [hasVerticalLabel, rootClassName]
    );

    // Accessibility attributes
    const hasError = validateStatus === "error";
    const ariaDescribedBy =
      [
        hasError ? errorId : undefined,
        loading ? loadingId : undefined,
        help ? `${selectId}-help` : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    // Enhanced onChange handler
    const handleChange = useCallback(
      (value: string | string[], option: any) => {
        onChange?.(value, option);
      },
      [onChange]
    );

    // Enhanced not found content
    const notFoundContentWithAria = useMemo(
      () => (
        <div role="status" aria-live="polite">
          {notFoundContent || emptyText}
        </div>
      ),
      [notFoundContent, emptyText]
    );

    return (
      <div className={containerClasses}>
        <Form.Item
          label={label}
          htmlFor={selectId}
          name={name}
          rules={rules}
          colon={colon}
          dependencies={dependencies}
          valuePropName={valuePropName}
          validateStatus={validateStatus}
          validateFirst={validateFirst}
          validateDebounce={validateDebounce}
          trigger={trigger}
          validateTrigger={validateTrigger}
          tooltip={tooltip}
          shouldUpdate={shouldUpdate}
          preserve={preserve}
          noStyle={noStyle}
          normalize={normalize}
          messageVariables={messageVariables}
          labelCol={labelCol}
          labelAlign={labelAlign}
          initialValue={initialValue}
          hidden={hidden}
          help={help}
          hasFeedback={hasFeedback}
          getValueProps={getValueProps}
          extra={extra}
          getValueFromEvent={getValueFromEvent}
        >
          <Select
            ref={ref}
            id={selectId}
            placeholder={placeholder}
            mode={mode}
            disabled={disabled}
            loading={loading}
            allowClear={allowClear}
            showSearch={searchable && showSearch}
            maxTagCount={maxTagCount}
            maxTagTextLength={maxTagTextLength}
            maxTagPlaceholder={maxTagPlaceholder}
            notFoundContent={notFoundContentWithAria}
            suffixIcon={suffixIcon}
            removeIcon={removeIcon}
            menuItemSelectedIcon={menuItemSelectedIcon}
            dropdownRender={dropdownRender}
            dropdownMatchSelectWidth={dropdownMatchSelectWidth}
            dropdownStyle={dropdownStyle}
            listItemHeight={listItemHeight}
            size={size}
            bordered={bordered}
            showArrow={showArrow}
            virtual={virtual}
            autoFocus={autoFocus}
            // Event handlers
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onClear={onClear}
            onDeselect={onDeselect}
            onInputKeyDown={onInputKeyDown}
            onKeyDown={onKeyDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onPopupScroll={onPopupScroll}
            onSearch={onSearch}
            onSelect={onSelect}
            onDropdownVisibleChange={onDropdownVisibleChange}
            onClick={onClick}
            // Filter
            filterOption={searchable ? memoizedFilterOption : undefined}
            optionFilterProp="label"
            // Options
            options={transformedOptions}
            // Accessibility
            aria-label={label ? undefined : ariaLabel || "Select option"}
            aria-labelledby={label ? `${selectId}-label` : undefined}
            aria-invalid={hasError}
            aria-describedby={ariaDescribedBy}
            aria-busy={loading}
            {...otherProps}
          />
        </Form.Item>
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;

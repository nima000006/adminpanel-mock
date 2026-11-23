import { forwardRef } from "react";

import { Form, GetRef, Select, SelectProps } from "antd";
import { Rule } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";

import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";
import "./_customDataSelect.scss";

type CustomDataSelectProps = {
  label?: string;
  /** Supports nested paths — e.g. `[field.name, "items"]` inside `Form.List` */
  name: NamePath;
  className?: string;
  placeholder?: string;
  otherProps?: SelectProps;
  options: { value: string; label: string; key?: number; object: any }[];
  onChange?: any;
  defaultValue?: any; //string | string[] | number | number[] | LabeledValue | LabeledValue[];
  rules?: Rule[];
  isLoading?: boolean;
  onClick?: () => void;
  mode?: "multiple" | "tags";
  //   form?: FormInstance<any>;
};

const CustomDataSelect = forwardRef<GetRef<typeof Select>, CustomDataSelectProps>(
  (
    {
      label,
      name,
      className,
      options,
      onChange,
      rules,
      isLoading,
      onClick,
      placeholder,
      defaultValue,
      mode = "multiple",
      //   form,
      ...otherProps
    },
    ref
  ) => {
    return (
      <div className="custom-data-select-container">
        <Form.Item
          label={label}
          htmlFor={resolveFormFieldHtmlFor(name)}
          className={className}
          name={name}
          rules={rules}
        >
          <Select
            {...otherProps}
            onChange={onChange}
            placeholder={placeholder}
            loading={isLoading}
            onClick={onClick}
            options={options}
            defaultValue={defaultValue}
            mode={mode}
            ref={ref}
          />
        </Form.Item>
      </div>
    );
  }
);

CustomDataSelect.displayName = "CustomDataSelect";

export default CustomDataSelect;

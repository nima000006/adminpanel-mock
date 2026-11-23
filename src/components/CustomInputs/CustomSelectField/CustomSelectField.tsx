import { Select, Switch } from "antd";
import "./_customSelectField.scss";
type CustomSelectFieldProps = {
  label?: string;
  placeholder: string;
  options: { value: string | number; label: string }[];
  //Todo[atefeh]:delete after edited on room allocation and businessListModal
  // handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  hasSwitch?: boolean;
  loading?: boolean;
  name?: string;
  disabled?: boolean;
  disabledSwitch?: boolean;
};

const CustomSelectField = ({
  label,
  placeholder,
  //Todo[atefeh]:delete after edited on room allocation and businessListModal
  // handleChange,
  options,
  className,
  hasSwitch,
  loading,
  name,
  disabled,
  disabledSwitch,
  ...otherProps
}: CustomSelectFieldProps) => {
  return (
    <div className={`custom-select-field-container ${className ? className : ""}`}>
      <div className="label-container">
        {label && <label className="label">{label}</label>}
        {hasSwitch && (
          <Switch
            checkedChildren="فعال"
            unCheckedChildren="غیرفعال"
            disabled={disabledSwitch}
          />
        )}
      </div>
      <Select
        placeholder={placeholder}
        loading={loading}
        {...otherProps}
        disabled={disabled}
      >
        {options.map(({ value, label }) => (
          <Select.Option name={name} key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelectField;

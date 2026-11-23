import { Form } from "antd";

import { CustomRadioGroup } from "@components/CustomInputs";
import { AdmissionRadioCardProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionRadioCard/@types/@admissionRadioCard";

const AdmissionRadioCard = ({
  form,
  name,
  label,
  tooltip,
  rules,
  options,
  className = "",
  direction = "horizontal",
  renderAfterOption,
  disabled,
}: AdmissionRadioCardProps) => {
  const selectedValue = Form.useWatch(name, form);
  const isVertical = direction === "vertical";

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <CustomRadioGroup
        name={name}
        label={label}
        tooltip={tooltip}
        rules={rules}
        hasVerticalLabel
        className="mb-0! w-full [&_.ant-form-item-control-input]:m-0! [&_.ant-form-item-control-input]:h-0! [&_.ant-form-item-control-input]:min-h-0! [&_.ant-form-item-row]:gap-0! [&_.ant-radio-group]:hidden!"
        options={options.map((option) => {
          const isOptionDisabled = disabled || option.disabled;

          return {
            value: option.value,
            disabled: isOptionDisabled,
            label: option.title,
          };
        })}
      />

      <div
        className={`flex w-full ${
          isVertical ? "flex-col gap-3" : "flex-col gap-4 lg:flex-row"
        }`}
      >
        {options.map((option) => {
          const selected = selectedValue === option.value;
          const isOptionDisabled = Boolean(disabled || option.disabled);

          return (
            <div key={String(option.value)} className="flex w-full flex-col gap-3">
              <div
                onClick={() => {
                  if (isOptionDisabled) {
                    return;
                  }

                  form.setFieldValue(name, option.value);
                }}
                className={`flex flex-1 items-center rounded-2xl p-4 ${
                  selected
                    ? "border-primary-6 bg-neutral-1 border border-solid"
                    : "bg-neutral-2"
                } ${isOptionDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex w-full items-center gap-4">
                  <CustomRadioGroup
                    noStyle
                    disabled={isOptionDisabled}
                    value={selected ? option.value : undefined}
                    onChange={(event) => form.setFieldValue(name, event.target.value)}
                    options={[{ value: option.value, label: null }]}
                  />

                  <div className="flex min-w-0 flex-1 flex-col gap-1 text-start">
                    {option.title != null ? (
                      <span
                        className={`text-base ${
                          selected ? "text-neutral-13" : "text-neutral-6"
                        }`}
                      >
                        {option.title}
                      </span>
                    ) : null}

                    {option.description != null ? (
                      <span className="text-neutral-7 text-sm">{option.description}</span>
                    ) : null}
                  </div>
                </div>
              </div>

              {renderAfterOption?.(option, selected)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdmissionRadioCard;

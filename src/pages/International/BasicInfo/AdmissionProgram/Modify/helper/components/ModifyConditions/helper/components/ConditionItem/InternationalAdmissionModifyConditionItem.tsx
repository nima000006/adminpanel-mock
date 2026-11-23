import { useEffect, useState } from "react";

import { Col } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import "./_internationalAdmissionModifyConditionItem.scss";

const InternationalAdmissionModifyConditionItem = ({
  text,
  name,
  hasInput,
  inputLabel,
  showInputValue,
}: {
  text: string;
  name: string;
  hasInput?: boolean;
  inputLabel?: string;
  showInputValue?: boolean;
}) => {
  const [showInput, setShowInput] = useState(showInputValue);

  // //? ================================ Effects ================================
  useEffect(() => {
    setShowInput(showInputValue ?? false);
  }, [showInputValue]);

  //* ================================ Util Functions ================================
  const changeRadioHandler = (e: any) => {
    setShowInput(e?.target?.value);
  };
  return (
    <Col span={24} className="condition-item-container">
      <div className="item-text-container">
        <p className="item-text">
          {text}
          <span className="extra-text">(اختیاری)</span>
        </p>
        <CustomRadioGroup
          name={name}
          optionType="button"
          options={[
            { label: "خیر", value: true },
            { label: "بله", value: false },
          ]}
          onChange={changeRadioHandler}
        />
      </div>
      {hasInput && showInput && (
        <CustomInput
          name={`${name}Input`}
          label={inputLabel}
          placeholder="مقدار را وارد نمایید."
          rules={[REQUIRED_RULE]}
        />
      )}
    </Col>
  );
};

export default InternationalAdmissionModifyConditionItem;

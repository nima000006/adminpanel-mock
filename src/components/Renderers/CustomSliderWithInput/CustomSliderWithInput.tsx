import { useState } from "react";

import { Col, Form, Row, Slider } from "antd";

import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";

import { CustomSliderWithInputProps } from "./@types/@customSlideWithInput";
import "./_customSliderWithInput.scss";

const CustomSliderWithInput = ({
  leftSideLabel,
  rightSideLabel,
  minValue,
  maxValue,
  name,
  form,
  step = 10,
  label,
  className,
  rules,
}: CustomSliderWithInputProps) => {
  const [minNumber, setMinNumber] = useState(minValue);
  const [maxNumber, setMaxNumber] = useState(maxValue);

  const onChange = (value: number[]) => {
    setMinNumber(value[0]);
    setMaxNumber(value[1]);

    form?.setFieldValue(name, value);
  };

  return (
    <Form.Item
      label={label}
      htmlFor={name}
      className={`custom-slider-with-input-container ${className ? className : ""}`}
      name={name}
      rules={rules}
    >
      <Row gutter={[16, 10]}>
        <Col span={3}>
          <CustomInputNumber
            isPrice
            label={leftSideLabel}
            onChange={(value) => {
              setMaxNumber(value as number);
              form?.setFieldValue(name, [minValue, value]);
            }}
            value={maxNumber}
            disabled
          />
        </Col>
        <Col span={18}>
          <Slider
            range
            min={minValue}
            max={maxValue}
            onChange={onChange}
            defaultValue={[minValue, maxValue]}
            value={[minNumber, maxNumber]}
            step={step}
            className="custom-slider"
            reverse
          />
        </Col>
        <Col span={3}>
          <CustomInputNumber
            isPrice
            label={rightSideLabel}
            value={minNumber}
            onChange={(value) => {
              setMinNumber(value as number);
            }}
            disabled
            // name="max13213"
          />
        </Col>
      </Row>
    </Form.Item>
  );
};

export default CustomSliderWithInput;

//[value, maxNumber],

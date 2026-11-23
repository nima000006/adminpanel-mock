import React from "react";

import { Slider, InputNumber, Form } from "antd";

import { CustomSliderProps } from "./@types/@customSliderType";
import "./_customSlider.scss";
const CustomSlider = ({
  onChange,
  min = 0,
  max = 100000,
  labelMin = "حداقل مبلغ تراکنش (ت)",
  labelMax = "حداکثر مبلغ تراکنش (ت)",
  name,
  form,
}: CustomSliderProps) => {
  const [range, setRange] = React.useState<number[]>(
    form.getFieldValue(name) || [min, max]
  );

  React.useEffect(() => {
    // read the value once when component mounts or modal opens
    const val = form.getFieldValue(name);

    if (val && Array.isArray(val)) {
      setRange(val as [number, number]);
    } else {
      setRange([min, max]); // fallback
    }
  }, [form, name, min, max]);
  const handleMinChange = (val: number | null) => {
    if (val === null) return;
    if (val <= range[1]) {
      const newRange: [number, number] = [val, range[1]];
      setRange(newRange);
      onChange?.(newRange);

      form.setFieldsValue({ [name]: newRange });
    }
  };

  const handleMaxChange = (val: number | null) => {
    if (val === null) return;
    if (val >= range[0]) {
      const newRange: [number, number] = [range[0], val];
      setRange(newRange);
      onChange?.(newRange);
      form.setFieldsValue({ [name]: newRange });
    }
  };

  const handleSliderChange = (val: number[]) => {
    setRange(val);
    onChange?.(val);

    form.setFieldsValue({ [name]: val });
  };

  return (
    <div className="custom-slider-container">
      <Form.Item
        name={name}
        preserve={false} // important for modal/drawer resets
        initialValue={form.getFieldValue(name) || [min, max]}
      >
        <div className="flex flex-col items-center justify-between font-[DanaFaNum]">
          <span>{labelMin}</span>

          <InputNumber
            min={min}
            max={range[1]}
            value={form.getFieldValue(name)?.[0]}
            onChange={handleMinChange}
            width={100}
          />
        </div>

        <Slider
          range
          min={min}
          max={max}
          step={1}
          value={form.getFieldValue(name)}
          onChange={handleSliderChange}
        />

        <div className="flex flex-col items-center justify-between font-[DanaFaNum]">
          <span>{labelMax}</span>

          <InputNumber
            min={range[0]}
            max={max}
            value={form.getFieldValue(name)?.[1]}
            onChange={handleMaxChange}
          />
        </div>
      </Form.Item>
    </div>
  );
};

export default CustomSlider;

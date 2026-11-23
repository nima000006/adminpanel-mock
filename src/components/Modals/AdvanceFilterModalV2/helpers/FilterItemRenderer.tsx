import { Col, FormInstance } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomSlider from "@components/Renderers/CustomSlider/CustomSlider";

import { FilterItemConfig } from "../@types/@advanceFilterModalV2";

interface FilterItemRendererProps<T extends Record<string, any>> {
  data: FilterItemConfig;
  form: FormInstance<T>;
}

const FilterItemRenderer = <T extends Record<string, any>>({
  data,
  form,
}: FilterItemRendererProps<T>) => {
  const getDefaultColProps = () => {
    if (data.type === "slider") return { span: 24 };
    return { lg: 12, md: 12, xs: 24, sm: 24 };
  };

  const colProps = data.col
    ? { ...getDefaultColProps(), ...data.col }
    : getDefaultColProps();

  const renderers = {
    select: (
      <Col {...colProps}>
        <CustomSelect
          label={data.label}
          options={data.options}
          name={data.name}
          {...(data.mode && { mode: data.mode })}
          placeholder={data.placeholder ?? "انتخاب کنید"}
          onChange={data.onChange}
          loading={data.loading}
          onClick={data.onClick}
          allowClear
          form={form}
          notFoundContent={data.notFoundContent}
          disabled={data.disabled}
          rules={data.rules ?? []}
        />
      </Col>
    ),
    input: (
      <Col {...colProps}>
        <CustomInput label={data.label} name={data.name} rules={data.rules ?? []} />
      </Col>
    ),
    date: (
      <Col {...colProps}>
        <CustomDatePicker
          label={data.label}
          placeholder={data.placeholder ?? "انتخاب کنید"}
          name={data.name}
          form={form}
          rules={data.rules ?? []}
        />
      </Col>
    ),
    range: (
      <Col {...colProps}>
        <CustomRangePicker
          label={data.label}
          name={data.name}
          picker={data.picker}
          form={form}
          rules={data.rules ?? []}
        />
      </Col>
    ),
    slider: (
      <Col {...colProps}>
        <CustomSlider
          min={data.min}
          max={data.max}
          labelMin={data.labelMin}
          labelMax={data.labelMax}
          name={data.name}
          form={form}
          onChange={data.sliderOnChange}
        />
      </Col>
    ),
  };

  return renderers[data.type];
};

export default FilterItemRenderer;

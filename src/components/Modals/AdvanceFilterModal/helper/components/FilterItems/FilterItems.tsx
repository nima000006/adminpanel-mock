import { Col } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomSlider from "@components/Renderers/CustomSlider/CustomSlider";

import { FilterItemsProps } from "./@types/@filterItems";

const FilterItems = <T extends Record<string, any>>({
  data,
  form,
}: FilterItemsProps<T>) => {
  // تنظیمات پیش‌فرض برای Col
  const getDefaultColProps = () => {
    if (data.type === "slider") {
      return { span: 24 };
    }
    // پیش‌فرض برای select, input, date, range
    return { lg: 12, md: 12, xs: 24, sm: 24 };
  };

  // ترکیب تنظیمات پیش‌فرض با تنظیمات سفارشی کاربر
  const colProps = data.col
    ? { ...getDefaultColProps(), ...data.col }
    : getDefaultColProps();

  const inputRenderers = {
    divider: (
      <Col span={24}>
        <CustomDivider text={data?.label} />
      </Col>
    ),
    select: (
      <Col {...colProps}>
        <CustomSelect
          label={data.label}
          options={data.options}
          name={data.name}
          {...(data?.mode && { mode: data.mode })}
          placeholder={data?.placeHolder ? data?.placeHolder : "انتخاب کنید"}
          onChange={data?.onChange}
          loading={data?.loading}
          onClick={data?.onClick}
          allowClear
          form={form}
          notFoundContent={data?.notFoundContent}
          disabled={data?.disabled}
          rules={data?.rules ? data?.rules : []}
        />
      </Col>
    ),
    input: (
      <Col {...colProps}>
        <CustomInput
          label={data?.label}
          name={data?.name}
          rules={data?.rules ? data?.rules : []}
        />
      </Col>
    ),
    date: (
      <Col {...colProps}>
        <CustomDatePicker
          label={data.label}
          placeholder={data?.placeHolder ? data?.placeHolder : "انتخاب کنید"}
          name={data.name}
          form={form}
          rules={data?.rules ? data?.rules : []}
          disabledDate={data?.disabledDate ? data?.disabledDate : undefined}
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
          rules={data?.rules ? data?.rules : []}
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

  return <>{inputRenderers[data.type]} </>;
};

export default FilterItems;

import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { MyReportMainServiceDetailParamDtos } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { FilterFormProps } from "./@types/@FilterFormProps";

const FilterForm = ({
  paramDtos,
  selectOptions,
  form,
  onSelectChange,
  onParamDetailLoad,
  onFilterChange,
}: FilterFormProps) => {
  const formValues = Form.useWatch([], form);

  useEffect(() => {
    form.resetFields();
  }, [paramDtos, form]);

  //* ================================ Util Functions ================================

  // تابع برای بررسی اینکه آیا یک فیلتر باید disabled باشد
  const shouldDisableFilter = (item: MyReportMainServiceDetailParamDtos) => {
    // اگر این فیلتر وابسته به فیلتر دیگری است
    if (item?.paramDto?.paramId && paramDtos) {
      // پیدا کردن فیلتر والد که paramId آن با paramDto.paramId این فیلتر برابر است
      const parentItem = paramDtos.find((p) => p.paramId === item.paramDto?.paramId);

      if (parentItem && parentItem.key) {
        // استفاده از formValues برای ردیابی تغییرات reactive
        const parentValue = formValues?.[parentItem.key];
        const hasParentValue =
          parentValue !== undefined &&
          parentValue !== null &&
          parentValue !== "" &&
          !(typeof parentValue === "object" && !Object.keys(parentValue).length);

        // اگر والد مقدار نداشته باشد، این فیلتر باید disabled باشد
        return !hasParentValue;
      }
    }
    return false;
  };

  const handleSelectChange = (key: string, val: string) => {
    onSelectChange(key, val);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  if (!paramDtos || paramDtos.length === 0) {
    return null;
  }

  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        {paramDtos.map((item) => {
          if (!item?.key) return null;

          const isRequired = item?.required === true;
          const rules = isRequired ? [REQUIRED_RULE] : [];
          const isDisabled = shouldDisableFilter(item);

          if (item.paramType === 4) {
            return (
              <Col md={8} lg={6} sm={12} xs={24} key={item.key}>
                <CustomDatePicker
                  label={item.paramTitle}
                  name={item.key}
                  placeholder={item.paramTitle}
                  form={form}
                  forceRerender={true}
                  formDateFormat="YYYY-MM-DD"
                  disabled={isDisabled}
                  onChange={(value) => {
                    form.setFieldsValue({ [item.key]: value ?? undefined });
                    onFilterChange?.();
                  }}
                  rules={rules}
                />
              </Col>
            );
          }

          if (item.paramType === 3) {
            return (
              <Col md={8} lg={6} sm={12} xs={24} key={item.key}>
                <CustomDatePicker
                  label={item.paramTitle}
                  name={item.key}
                  placeholder={item.paramTitle}
                  form={form}
                  forceRerender={true}
                  disabled={isDisabled}
                  onChange={(value) => {
                    form.setFieldsValue({ [item.key]: value ?? undefined });
                    onFilterChange?.();
                  }}
                  rules={rules}
                />
              </Col>
            );
          }
          if (item.paramType === 2) {
            // Filter out invalid options to prevent crashes
            const validOptions = (selectOptions[item.key] || []).filter(
              (opt) => opt != null && opt.id != null && opt.title != null
            );

            return (
              <Col md={8} lg={6} sm={12} xs={24} key={item.key}>
                <CustomSelect
                  label={item.paramTitle}
                  name={item.key}
                  placeholder={item.paramTitle}
                  options={validOptions}
                  form={form}
                  allowClear
                  disabled={isDisabled}
                  onClick={() => (item?.paramDto ? null : onParamDetailLoad(item))}
                  onChange={(val) => {
                    handleSelectChange(item.key, val as string);
                    onFilterChange?.();
                  }}
                  rules={rules}
                />
              </Col>
            );
          }
          return null;
        })}
      </Row>
    </Form>
  );
};

export default FilterForm;

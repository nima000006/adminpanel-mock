import { Form } from "antd";
import dayjs from "dayjs";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import { MAX_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormSemesterTypeModalContentProps } from "./@types/@dormSemesterTypeModalContentProps";

const DormSemesterTypeModalContent = ({ form }: DormSemesterTypeModalContentProps) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({ title: value.trimStart() });
  };

  const handleDateRangeChange = (dates: [dayjs.Dayjs, dayjs.Dayjs] | null) => {
    form.setFieldsValue({ dateRange: dates ?? undefined });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomInput
        type="text"
        label="عنوان نوع نیمسال"
        name="title"
        placeholder="عنوان نیمسال را اینجا وارد نمایید"
        onChange={handleTitleChange}
        rules={[REQUIRED_RULE, MAX_LENGTH_RULE(32)]}
      />
      <CustomRangePicker
        label="بازه زمانی شروع و پایان نیمسال"
        name="dateRange"
        rules={[REQUIRED_RULE]}
        onChange={handleDateRangeChange}
      />
    </Form>
  );
};
export default DormSemesterTypeModalContent;

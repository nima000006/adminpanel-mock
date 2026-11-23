import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";

import { PreRegistrationDetailEditModalContentProps } from "./@types/@preRegistrationDetailEditModalContentProps";

const PreRegistrationDetailEditModalContent = ({
  form,
}: PreRegistrationDetailEditModalContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form form={form}>
      <CustomSelect
        name="reason"
        placeholder="انتخاب کنید"
        options={[]}
        form={form}
        label="دلایل اصلاح درخواست"
        // loading={}
        mode="multiple"
        rules={[
          CUSTOM_REQUIRED_RULE("لطفاً حداقل یک دلیل اصلاح درخواست را انتخاب نمایید."),
        ]}
      />
    </Form>
  );
};

export default PreRegistrationDetailEditModalContent;

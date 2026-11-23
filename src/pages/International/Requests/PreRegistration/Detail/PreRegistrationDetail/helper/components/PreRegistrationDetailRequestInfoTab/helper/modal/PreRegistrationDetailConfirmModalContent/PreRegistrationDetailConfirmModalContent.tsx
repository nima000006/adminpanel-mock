import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";

import { PreRegistrationDetailConfirmModalContentProps } from "./@types/@preRegistrationDetailConfirmModalContentProps";

const PreRegistrationDetailConfirmModalContent = ({
  form,
}: PreRegistrationDetailConfirmModalContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomSelect
        name="reason"
        placeholder="انتخاب کنید"
        options={[]}
        form={form}
        label="دلیل تایید درخواست"
        // loading={}
      />
    </Form>
  );
};

export default PreRegistrationDetailConfirmModalContent;

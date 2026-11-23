import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";

import { ApplicantsDetailEditModalContentProps } from "../@type/@applicantsDetailModalContentType";

const ApplicantsDetailConfirmModalContent = ({
  form,
}: ApplicantsDetailEditModalContentProps) => {
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

export default ApplicantsDetailConfirmModalContent;

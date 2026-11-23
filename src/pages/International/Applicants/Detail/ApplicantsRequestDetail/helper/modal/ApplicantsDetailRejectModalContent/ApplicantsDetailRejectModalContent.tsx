import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ApplicantsDetailEditModalContentProps } from "../@type/@applicantsDetailModalContentType";

const ApplicantsDetailRejectModalContent = ({
  form,
}: ApplicantsDetailEditModalContentProps) => {
  return (
    <Form form={form}>
      <CustomSelect
        name="reason"
        placeholder="انتخاب کنید"
        options={[]}
        form={form}
        label="دلایل رد درخواست"
        // loading={}
        mode="multiple"
        rules={[CUSTOM_REQUIRED_RULE("لطفاً حداقل یک دلیل رد شدن را انتخاب نمایید.")]}
        maxTagCount="responsive"
      />
    </Form>
  );
};

export default ApplicantsDetailRejectModalContent;

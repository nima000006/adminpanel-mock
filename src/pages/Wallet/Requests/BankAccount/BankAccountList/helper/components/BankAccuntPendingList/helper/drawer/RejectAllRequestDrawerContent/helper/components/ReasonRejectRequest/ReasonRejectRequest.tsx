import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ReasonRejectRequestProps } from "./@types/@reasonRejectRequestType";

const ReasonRejectRequest = ({ form, data, loading }: ReasonRejectRequestProps) => {
  return (
    <Form form={form}>
      <CustomSelect
        label="انتخاب دلیل رد درخواست"
        name="reasonReject"
        options={data}
        form={form}
        loading={loading}
        rules={[REQUIRED_RULE]}
        {...{ placeholder: "انتخاب کنید" }}
      />
      <CustomTextArea
        label="توضیحات "
        name="description"
        rules={[REQUIRED_RULE]}
        showCount
        maxLength={500}
      />
    </Form>
  );
};
export default ReasonRejectRequest;

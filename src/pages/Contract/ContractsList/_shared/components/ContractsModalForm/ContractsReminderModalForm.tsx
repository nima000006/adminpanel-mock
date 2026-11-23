import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ContractsModalFormProps } from "./@types/@ContractsModalFormProps";

const ContractsReminderModalForm = ({
  closeReminderModalHandler,
  form: externalForm,
}: ContractsModalFormProps) => {
  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm;

  return (
    <Form
      form={form}
      className="flex flex-col gap-4!"
      onFinish={() => {
        // TODO[nima]: Add API call here with selectedContractId: ${_selectedContractId}
        closeReminderModalHandler();
      }}
    >
      <CustomSelect
        name="beneficiary"
        className="m-0!"
        options={[{ title: "آفاق دانا", id: 1 }]}
        form={form}
        label="ذینفع دریافت کننده پیام"
        rules={[REQUIRED_RULE]}
        placeholder="انتخاب کنید"
      />
      <CustomInput
        name="title"
        type="text"
        label="عنوان پیام"
        rules={[REQUIRED_RULE]}
        placeholder="عنوان پیام را وارد کنید"
      />
      <CustomTextArea
        name="description"
        label="توضیحات"
        placeholder="توضیحات را وارد کنید"
        initialValue="لطفا قرارداد شماره 1403/2/2 را تا تاریخ 1403/3/3 تمدید نمایید."
      />
    </Form>
  );
};
export default ContractsReminderModalForm;

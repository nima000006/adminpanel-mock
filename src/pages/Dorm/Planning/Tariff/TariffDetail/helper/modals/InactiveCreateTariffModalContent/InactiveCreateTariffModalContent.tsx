import { Form, FormInstance } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { DormTariffModifyFormType } from "@pages/Dorm/Planning/Tariff/TariffModify/@types/@tariffModifyType";

const InactiveCreateTariffModalContent = ({
  form,
}: {
  form: FormInstance<DormTariffModifyFormType>;
}) => {
  return (
    <Form form={form} className="dorm-pricing-step-modal-content">
      <p className="modal-content-text">
        درخواست شما مبنی بر ایجاد تعرفه به مسئول مربوطه ارجاع داده می‌شود. لطفاً علت
        درخواست خود را ذکر کنید.
      </p>
      <CustomTextArea
        label="توضیحات"
        name="description"
        placeholder="توضیحات"
        rules={[
          REQUIRED_RULE,
          () => ({
            validator: (_: any, value: string) =>
              value && value.trim() !== ""
                ? Promise.resolve()
                : Promise.reject(new Error("لطفا اطلاعات معتبر وارد کنید.")),
          }),
        ]}
        maxLength={100}
        showCount
      />
    </Form>
  );
};
export default InactiveCreateTariffModalContent;

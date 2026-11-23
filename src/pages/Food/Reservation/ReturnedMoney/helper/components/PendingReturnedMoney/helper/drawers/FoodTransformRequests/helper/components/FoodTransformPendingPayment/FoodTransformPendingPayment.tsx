import { Form, FormInstance } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { REQUIRED_NO_SPACE_RULE } from "@infra/validation/validationSchema";
import "./_foodTransformPendingPayment.scss";

const FoodTransformPendingPayment = ({
  form,
}: {
  form: FormInstance<{ listName: string }>;
}) => {
  return (
    <Form form={form} className="food-transform-pending-payment-tab-container">
      <CustomAlert
        message="راهنما!"
        description="برای دسته بندی بهتر، لطفا یک نام دلخواه برای این گروه از واریزی‌ها وارد نمایید."
        type="info"
        closable
      />
      <div>
        <CustomInput
          name="listName"
          label="نام لیست در انتظار پرداخت"
          placeholder="نام لیست در انتظار پرداخت را وارد نمایید."
          rules={[REQUIRED_NO_SPACE_RULE]}
        />
        <span className="example-text">
          به عنوان مثال: لیست انتظار روز سه شنبه 24 بهمن
        </span>
      </div>
    </Form>
  );
};

export default FoodTransformPendingPayment;

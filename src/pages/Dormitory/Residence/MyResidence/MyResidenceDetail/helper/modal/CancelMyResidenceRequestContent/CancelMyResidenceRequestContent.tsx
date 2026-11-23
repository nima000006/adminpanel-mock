import { Form } from "antd";

import { CustomTextArea } from "@components/CustomInputs";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { CancelMyResidenceRequestContentProps } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/modal/@types/@cancelMyResidenceRequestContentTypes";

const CancelMyResidenceRequestContent = ({
  form,
}: CancelMyResidenceRequestContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <p>
        با لغو درخواست، پیگیری آن توسط کارشناسان متوقف می‌شود و دیگر امکان ادامه پیگیری
        وجود نخواهد داشت.
      </p>
      <CustomTextArea name="description" label="توضیحات" rules={[REQUIRED_RULE]} />
    </Form>
  );
};

export default CancelMyResidenceRequestContent;

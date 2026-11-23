import { Form } from "antd";

import { CustomTextArea } from "@components/CustomInputs";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ShopAllOrdersDetailConfirmShipModalContentProps } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/modal/ShopAllOrdersDetailConfirmShipModalContent/@types/@shopAllOrdersDetailConfirmShipModalContent";

const ShopAllOrdersDetailConfirmShipModalContent = ({
  form,
}: ShopAllOrdersDetailConfirmShipModalContentProps) => {
  return (
    <Form form={form} className="flex flex-col gap-4" layout="vertical">
      <CustomTextArea
        name="shippingDescription"
        label="توضیحات ارسال"
        placeholder="مثلاً: پست پیشتاز، کد رهگیری ۱۹۵۳۷۰۲۰۳۱۰۰۳۳۲۱۶۰۷۴۵۱۱۱"
        rules={[REQUIRED_RULE]}
        maxLength={400}
        extra="روش ارسال و کد رهگیری مرسوله را بنویسید. خریدار این توضیحات را می‌بیند."
      />
    </Form>
  );
};

export default ShopAllOrdersDetailConfirmShipModalContent;

import { Form, FormInstance } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { dataPlaceHolder } from "@infra/helpers/utils";
import InfoBoxGroup from "@pages/Finance/Requests/_shared/components/InfoBoxGroup/InfoBoxGroup";
import "./_paymentOnAccountAcceptRequestModalContent.scss";
const PaymentOnAccountAcceptRequestModalContent = ({
  form,
}: {
  form: FormInstance<any>;
}) => {
  return (
    <Form form={form} className="payment-on-account-accept-request-modal-content">
      <InfoBoxGroup
        title="مبلغ عودت درخواستی"
        value={dataPlaceHolder({
          data: "10000000",
          isPrice: true,
        })}
        isPrice={true}
      />
      <CustomAlert
        showIcon
        message="شما می‌توانید مبلغ درخواستی مورد نظر کاربر را تغییر دهید و در صورت تمایل، مبلغی کمتر یا معادل درخواست او را به‌صورت علی‌الحساب واریز کنید."
        type="info"
        className="custom-alert"
      />
      <CustomInput
        label="مبلغ قابل پرداخت"
        value={dataPlaceHolder({ data: "1000000", isPrice: true })}
        suffix="تومان"
      />
      <CustomTextArea
        label="توضیحات"
        name="description_research"
        placeholder="توضیحات را اینجا وارد نمایید."
      />
    </Form>
  );
};
export default PaymentOnAccountAcceptRequestModalContent;

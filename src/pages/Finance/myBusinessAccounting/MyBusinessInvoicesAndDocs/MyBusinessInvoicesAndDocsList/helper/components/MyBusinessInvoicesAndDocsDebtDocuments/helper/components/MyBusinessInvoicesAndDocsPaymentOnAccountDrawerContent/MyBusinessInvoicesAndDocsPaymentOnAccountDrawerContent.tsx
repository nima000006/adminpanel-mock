import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { NUMBER_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import {
  MyBusinessInvoicesAndDocsPaymentOnAccountDrawerContentPropsType,
  MyBusinessInvoicesAndDocsPaymentOnAccountDrawerFormType,
} from "./@types/@myBusinessInvoicesAndDocsPaymentOnAccountDrawerContentPropsType";
import "./_myBusinessInvoicesAndDocsPaymentOnAccountDrawerContent.scss";

const SUBMIT_PAYMENT_ON_ACCOUNT_SUCCESS_MSG = "درخواست با موفقیت ثبت شد";
const MyBusinessInvoicesAndDocsPaymentOnAccountDrawerContent = ({
  closeDrawerHandler,
}: MyBusinessInvoicesAndDocsPaymentOnAccountDrawerContentPropsType) => {
  const [form] = Form.useForm<MyBusinessInvoicesAndDocsPaymentOnAccountDrawerFormType>();
  const amount = Form.useWatch("amount", form);
  const reason = Form.useWatch("reason", form);
  const description = Form.useWatch("description", form);
  //* ================================ Util Functions ================================
  const isFormValid =
    amount &&
    !isNaN(Number(amount)) &&
    Number(amount) > 0 &&
    reason &&
    description?.trim().length > 0;
  const onSubmit = () => {
    form.validateFields().then(() => {
      closeDrawerHandler();
      toast.success(SUBMIT_PAYMENT_ON_ACCOUNT_SUCCESS_MSG, {
        toastId: SUBMIT_PAYMENT_ON_ACCOUNT_SUCCESS_MSG,
      });
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      className="my-invoices-docs-payment-account-drawer-content-container"
    >
      <CustomDrawerHeader
        title="ثبت درخواست پرداخت علی الحساب"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton type="primary" htmlType="submit" disabled={!isFormValid}>
              ثبت درخواست
            </CustomButton>
          </>
        }
      />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} xs={24}>
          <CustomInput
            name="amount"
            label="مبلغ مورد نیاز"
            rules={[REQUIRED_RULE, NUMBER_RULE]}
            suffix="تومان"
          />
        </Col>
        <Col lg={12} md={12} xs={24}>
          <CustomSelect
            name="reason"
            label="بابت سرویس"
            rules={[REQUIRED_RULE]}
            tooltip="بابت پرداخت علی الحساب در چه سرویسی این درخواست را ثبت می کنید؟"
            options={serviceOptions}
          />
        </Col>
        <Col lg={24} md={24} xs={24}>
          <CustomTextArea name="description" label="توضیحات" rules={[REQUIRED_RULE]} />
        </Col>
      </Row>
    </Form>
  );
};
export default MyBusinessInvoicesAndDocsPaymentOnAccountDrawerContent;

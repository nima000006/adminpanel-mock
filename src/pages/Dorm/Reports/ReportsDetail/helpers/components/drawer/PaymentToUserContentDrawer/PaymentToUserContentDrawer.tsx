import { useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { PaymentToUserContentDrawerType } from "../../@types/@reportDetailType";
import "./_paymentToUserContentDrawer.scss";

const mockData = {
  price: "200000",
};

const PaymentToUserContentDrawer = ({ closeDrawer }: PaymentToUserContentDrawerType) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  //* ================================ Util Functions ================================
  const registerDrawerHandler = () => {};

  // if request is success
  form.setFieldsValue({
    price: mockData?.price,
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="payment-to-user-drawer-container">
      <CustomDrawerHeader
        title="پرداخت به کاربر"
        closeDrawerHandler={closeDrawer}
        leftSideContent={
          <div className="payment-to-user-drawer-header-action-btns-container">
            <CustomButton onClick={closeDrawer} className="drawer-action-btn">
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={registerDrawerHandler}
              className="drawer-action-btn"
              htmlType="submit"
              //   loading={}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />
      <Form form={form} className="payment-to-user-content-drawer-action-btns-container">
        <Row gutter={[16, 16]}>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInputNumber
              type="text"
              label="مبلغ پرداختی به کاربر (تومان)"
              name="price"
              placeholder="مبلغ پرداختی به کاربر (تومان)"
              isPrice={true}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomDatePicker
              label="تاریخ تسویه"
              placeholder="انتخاب کنید"
              name="datePicker"
              rules={[REQUIRED_RULE]}
              form={form}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomSelect
              name="paymentMethod"
              label="روش پرداخت"
              form={form}
              options={[]}
              placeholder="انتخاب کنید"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput name="portId" label="شناسه درگاه" placeholder="شناسه درگاه" />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              name="factorNum"
              label="شماره فاکتور"
              placeholder="شماره فاکتور"
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              name="trackingNum"
              label="شماره پیگیری"
              placeholder="شماره پیگیری"
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              name="description"
              placeholder="توضیحات"
              maxLength={100}
              showCount
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <CustomUploader
            fileList={fileList}
            setFileList={setFileList}
            isReadOnly={false}
            name="attachedFile"
            uploaderText="بارگذاری تصاویر"
          />
        </Row>
      </Form>
    </div>
  );
};
export default PaymentToUserContentDrawer;

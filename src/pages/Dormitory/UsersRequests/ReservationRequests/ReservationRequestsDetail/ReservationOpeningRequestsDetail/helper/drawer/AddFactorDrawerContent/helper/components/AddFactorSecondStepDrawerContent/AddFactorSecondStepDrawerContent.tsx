import { Col, Form, Row } from "antd";

import {
  CustomDatePicker,
  CustomInputNumber,
  CustomRadioGroup,
  CustomSingleCheckbox,
} from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { AddFactorSecondStepDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/drawer/AddFactorDrawerContent/helper/components/AddFactorSecondStepDrawerContent/@types/@addFactorSecondStepDrawerContentTypes";
import "./_addFactorSecondStepDrawerContent.scss";

const PAYMENT_METHOD = {
  lumpSum: "lumpSum",
  installment: "installment",
} as const;

const PAYMENT_METHOD_OPTIONS = [
  { value: PAYMENT_METHOD.lumpSum, label: "یکجا" },
  { value: PAYMENT_METHOD.installment, label: "اقساطی" },
];

const AddFactorSecondStepDrawerContent = ({
  form,
}: AddFactorSecondStepDrawerContentProps) => {
  const paymentMethod = Form.useWatch("paymentMethod", form);
  const hasPrepayment = Form.useWatch("hasPrepayment", form) ?? false;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form form={form} className="add-factor-second-step-drawer-content flex flex-col">
      <CustomRadioGroup
        name="paymentMethod"
        label="امکان پرداخت"
        hasVerticalLabel
        rules={[REQUIRED_RULE]}
        initialValue={PAYMENT_METHOD.lumpSum}
        options={PAYMENT_METHOD_OPTIONS}
      />
      <div>
        <CustomDivider text="تنظیمات" />
        {paymentMethod === PAYMENT_METHOD.lumpSum ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <CustomDatePicker
                label="تاریخ سر رسید "
                placeholder="انتخاب کنید"
                name="appealSessionDate"
                // form={form}
                defaultValue={"2026/09/21"}
                // key={}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col span={24}>
              <CustomInputNumber
                isPrice={true}
                type="text"
                label="جریمه دیرکرد روزانه"
                name="dailyFine"
                placeholder="0.1"
                rules={[REQUIRED_RULE]}
                suffix="%"
              />
            </Col>
          </Row>
        ) : (
          <div className="flex flex-col gap-4">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <CustomInputNumber
                  isPrice={true}
                  type="text"
                  label="تعداد اقساط"
                  name="installmentCount"
                  placeholder="0.1"
                  rules={[REQUIRED_RULE]}
                  suffix="قسط"
                />
              </Col>

              <Col span={24}>
                <CustomInputNumber
                  isPrice={true}
                  type="text"
                  label="نرخ سود"
                  name="interestRate"
                  placeholder="مثلا 0.5"
                  rules={[REQUIRED_RULE]}
                  suffix="%"
                />
              </Col>

              <Col span={24}>
                <CustomInputNumber
                  isPrice={true}
                  type="text"
                  label="جریمه دیرکرد روزانه"
                  name="dailyFine"
                  placeholder="مثلا 0.25"
                  rules={[REQUIRED_RULE]}
                  suffix="%"
                />
              </Col>
            </Row>

            <CustomDivider
              text="تنظیم  هر قسط"
              extraContent={
                <CustomSingleCheckbox
                  name="hasPrepayment"
                  valuePropName="checked"
                  initialValue={false}
                >
                  دارای پیش پرداخت
                </CustomSingleCheckbox>
              }
            />
            {hasPrepayment ? (
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <SingleVerticalItem label="شماره قسط" value="قسط 1" />
                </Col>
                <Col lg={12} md={12} sm={12} xs={24}>
                  <CustomInputNumber
                    isPrice={true}
                    type="text"
                    label="درصد از مبلغ کل"
                    name="percentageOfTotalAmount"
                    placeholder="مبلغ"
                    rules={[REQUIRED_RULE]}
                    suffix={"ریال"}
                  />
                </Col>
              </Row>
            ) : null}
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <SingleVerticalItem label="شماره قسط" value="قسط 1" />
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomInputNumber
                  isPrice={true}
                  type="text"
                  label="درصد از مبلغ کل"
                  name="percentageOfTotalAmount"
                  placeholder="مبلغ"
                  rules={[REQUIRED_RULE]}
                  suffix={"ریال"}
                />
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomDatePicker
                  label="تاریخ سر رسید "
                  placeholder="انتخاب کنید"
                  name="appealSessionDate"
                  form={form}
                  defaultValue={"2026/09/21"}
                  // key={}
                  rules={[REQUIRED_RULE]}
                />
              </Col>
            </Row>
          </div>
        )}
      </div>
    </Form>
  );
};

export default AddFactorSecondStepDrawerContent;

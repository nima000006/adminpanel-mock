import { useState } from "react";

import { Col, Row } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  ChangeToPaidModalContentProps,
  RoomPaymentSelectType,
} from "./@types/@changeToPaidModalContent";
import "./_changeToPaidModalContent.scss";
const ChangeToPaidModalContent = ({
  changeToPaidModal,
  form,
}: ChangeToPaidModalContentProps) => {
  const [areFormRulesRequired, setAreFormRulesRequired] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  //* ================================ Util Functions ================================
  // onPaymentTypeChange
  const onPaymentTypeChange = (value: RoomPaymentSelectType) => {
    switch (value) {
      case "1": //"آموزشیار"
        setIsFormDisabled(false);
        setAreFormRulesRequired(false);
        break;
      case "2": //"پوز"
        setIsFormDisabled(false);
        setAreFormRulesRequired(false);
        break;
      case "3": //"واریز به حساب"
        setIsFormDisabled(false);
        setAreFormRulesRequired(true);
        break;
      case "4": //"پیمانکاری"
        setIsFormDisabled(true);
        setAreFormRulesRequired(false);
        break;
      default:
        setAreFormRulesRequired(false);
        setIsFormDisabled(false);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="change-to-paid-modal-container">
      <CustomCard>
        <Row gutter={16}>
          <SingleVerticalWithCol label="نام" value={changeToPaidModal?.name} />

          <SingleVerticalWithCol label="نام خانوادگی" value={changeToPaidModal?.family} />

          <SingleVerticalWithCol
            label="شماره ملی"
            value={changeToPaidModal?.nationalcode}
          />

          <SingleVerticalWithCol
            label="شماره دانشجویی"
            value={changeToPaidModal?.studntNumber}
          />

          <SingleVerticalWithCol label="شماره موبایل" value={changeToPaidModal?.mobile} />

          {/* 
            <SingleVerticalWithCol
              label="مبلغ(ریال)"
              value={changeToPaidModal?. }
            />
           */}
        </Row>
      </CustomCard>
      <CustomCard>
        <Row gutter={[16, 10]}>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="paymentType"
              label="روش پرداخت"
              placeholder="روش پرداخت"
              rules={[REQUIRED_RULE]}
              options={[
                { id: 1, title: "آموزشیار" },
                { id: 2, title: "پوز" },
                { id: 3, title: "واریز به حساب" },
                { id: 4, title: "پیمانکاری" },
              ]}
              onChange={(e) => {
                onPaymentTypeChange(e as RoomPaymentSelectType);
              }}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomDatePicker
              name="paymentDate"
              label="تاریخ پرداخت"
              form={form}
              rules={!areFormRulesRequired ? [] : [REQUIRED_RULE]}
              disabled={isFormDisabled}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomInput
              name="paymentReferenceNumber"
              label="شماره پیگیری پرداخت"
              placeholder="شماره پیگیری پرداخت"
              rules={!areFormRulesRequired ? [] : [REQUIRED_RULE]}
              maxLength={16}
              disabled={isFormDisabled}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomInput
              name="paymentTransactionNumber"
              label="شماره تراکنش پرداخت"
              placeholder="شماره تراکنش پرداخت"
              maxLength={16}
              rules={!areFormRulesRequired ? [] : [REQUIRED_RULE]}
              disabled={isFormDisabled}
            />
          </Col>

          <Col span={24}>
            <CustomTextArea
              name="description"
              label="توضیحات"
              placeholder="توضیحات"
              disabled={isFormDisabled}
            />
          </Col>
        </Row>
      </CustomCard>
    </div>
  );
};

export default ChangeToPaidModalContent;

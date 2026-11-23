import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import { IconHandCoins, IconMathOperations } from "@components/icons/icons";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetReasonAdditionsDeductionsQuery } from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import { ReasonAdditionsDeductionsIdTitle } from "@pages/Dorm/Habitants/Evacuation/@types/@evacuationType";
import { EvacuationSelectType } from "@pages/Dorm/Habitants/Evacuation/_shared/utils";

import { HabitantExcessDebtModalContentProps } from "../../../@types/@debtorsTab";
import "./_habitantExcessDebtModalContent.scss";

const HabitantExcessDebtModalContent = ({
  form,
  data,
}: HabitantExcessDebtModalContentProps) => {
  const [reasonAdditions, setReasonAdditions] = useState<
    ReasonAdditionsDeductionsIdTitle[]
  >([]);

  const [reasonDeductions, setReasonDeductions] = useState<
    ReasonAdditionsDeductionsIdTitle[]
  >([]);
  //? ================================  Api Calls ================================
  const [getData] = useLazyGetReasonAdditionsDeductionsQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    getData({
      maxResults: 200,
      firstResult: 0,
      type_EQ: EvacuationSelectType.Additions,
    })
      .unwrap()
      .then((value) => {
        setReasonAdditions(value.data);
      });

    getData({
      maxResults: 200,
      firstResult: 0,
      type_EQ: EvacuationSelectType.Deductions,
    })
      .unwrap()
      .then((value) => {
        setReasonDeductions(value.data);
      });
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="habitant-debtors-modal-content-container">
      <CustomAlert
        message="توجه!"
        description="با توجه به تغییر زمان تخلیه توسط شما و یا اقامت بیش از حد مجاز ساکن، ایشان دارای بدهی ناشی از اقامت مازاد می‌باشند. جهت محاسبه بدهی مازاد، فاکتور جدیدی صادر می‌شود که بایستی توسط ساکن پرداخت گردد و پس از آن امکان تخلیه تخت فراهم میگردد."
        showIcon
        type="warning"
      />

      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomInputNumber
              label="اضافات (اختیاری)"
              name="additions"
              placeholder="مبلغ اضافات را وارد نمایید."
              addonAfter="تومان"
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomInputNumber
              label="کسورات (اختیاری)"
              name="deductions"
              placeholder="مبلغ کسورات را وارد نمایید."
              addonAfter="تومان"
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              label="علت اضافات (اختیاری)"
              name="reasonAdditions"
              options={reasonAdditions}
              form={form}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              label="علت کسورات (اختیاری)"
              name="reasonDeductions"
              options={reasonDeductions}
              form={form}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomTextArea
              label="توضیحات اضافات (اختیاری)"
              name="additionsDesc"
              placeholder="توضیحات لازم را وارد نمایید."
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomTextArea
              label="توضیحات کسورات (اختیاری)"
              name="deductionsDesc"
              placeholder="توضیحات لازم را وارد نمایید."
            />
          </Col>
        </Row>
      </Form>
      <div className="alert-container">
        <CustomAlert
          description={
            <div className="alert-body">
              <div className="icon-title-container">
                <IconMathOperations viewBox="0 0 30 30" fill="#F5222D" />
                <span className="title">بدهکاری مازاد:</span>
              </div>
              <span className="value">
                {dataPlaceHolder({
                  data: data?.aAdditionalDebt?.toString(),
                  isPrice: true,
                })}{" "}
                تومان
              </span>
            </div>
          }
          type="error"
        />
        <CustomAlert
          description={
            <div className="alert-body">
              <div className="icon-title-container">
                <IconHandCoins viewBox="0 0 30 30" fill="#FAAD14" />
                <span className="title">قابل پرداخت توسط ساکن:</span>
              </div>
              <span className="value">
                {dataPlaceHolder({
                  data: data?.aAdditionalDebt?.toString(),
                  isPrice: true,
                })}{" "}
                تومان
              </span>
            </div>
          }
          type="warning"
        />
      </div>
    </div>
  );
};

export default HabitantExcessDebtModalContent;

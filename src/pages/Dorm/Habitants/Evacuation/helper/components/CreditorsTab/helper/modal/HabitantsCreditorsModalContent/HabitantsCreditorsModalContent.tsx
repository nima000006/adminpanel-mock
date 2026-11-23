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

import { HabitantsCreditorsModalContentProps } from "../../../../SettlementsTab/@types/@settlementsTab";
import "./_habitantsCreditorsModalContent.scss";

const HabitantsCreditorsModalContent = ({
  form,
  data,
}: HabitantsCreditorsModalContentProps) => {
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
    <div className="habitant-creditors-modal-content-container">
      <CustomAlert
        message="توجه!"
        description='با توجه به بستانکاری ساکن، پس از تخلیه تخت، مبلغ مورد نظر به کیف پول ساکن در اپلیکیشن "کوله" اضافه خواهد شد.'
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
                <IconMathOperations viewBox="0 0 30 30" fill="#1890FF" />
                <span className="title">بستانکاری:</span>
              </div>
              <span className="value">
                {dataPlaceHolder({ data: data?.toString(), isPrice: true })} تومان
              </span>
            </div>
          }
        />
        <CustomAlert
          description={
            <div className="alert-body">
              <div className="icon-title-container">
                <IconHandCoins viewBox="0 0 30 30" fill="#FAAD14" />
                <span className="title">قابل پرداخت به ساکن:</span>
              </div>
              <span className="value">
                {dataPlaceHolder({ data: data?.toString(), isPrice: true })} تومان
              </span>
            </div>
          }
          type="warning"
        />
      </div>
    </div>
  );
};

export default HabitantsCreditorsModalContent;

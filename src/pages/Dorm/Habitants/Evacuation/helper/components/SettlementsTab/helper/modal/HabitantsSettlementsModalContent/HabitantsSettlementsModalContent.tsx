import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { useLazyGetReasonAdditionsDeductionsQuery } from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import { ReasonAdditionsDeductionsIdTitle } from "@pages/Dorm/Habitants/Evacuation/@types/@evacuationType";
import { EvacuationSelectType } from "@pages/Dorm/Habitants/Evacuation/_shared/utils";

import { HabitantsSettlementsModalContentProps } from "../../../@types/@settlementsTab";
import "./_habitantsSettlementsModalContent.scss";

const HabitantsSettlementsModalContent = ({
  form,
}: HabitantsSettlementsModalContentProps) => {
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
    <div className="habitant-settlement-modal-content-container flex flex-col gap-10">
      <CustomAlert
        message="راهنما"
        description="در صورت تمایل می‌توانید اضافات و کسورات را به فاکتور ساکن خوابگاه اضافه نمایید."
        showIcon
        type="info"
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
              // loading={isReasonAdditionsLoading}
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
    </div>
  );
};

export default HabitantsSettlementsModalContent;

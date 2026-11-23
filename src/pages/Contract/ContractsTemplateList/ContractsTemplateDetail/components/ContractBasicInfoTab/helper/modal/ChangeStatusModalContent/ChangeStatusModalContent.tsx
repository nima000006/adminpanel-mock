import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { useLazyGetReasonChangeStatusQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ChangeStatusModalContentProps } from "./@types/@changeStatusModalContentTypes";

const ChangeStatusModalContent = ({ form }: ChangeStatusModalContentProps) => {
  //? ================================ Api ================================
  const [getStatus, { data: statusData, isLoading: statusLoading }] =
    useLazyGetReasonChangeStatusQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getStatus();
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomDatePicker
            label="تاریخ اعمال وضعیت"
            placeholder="انتخاب کنید"
            name="changeDate"
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col span={24}>
          <CustomSelect
            label="علت تغییر وضعیت"
            name="reasonChange"
            isLoading={statusLoading}
            options={statusData ?? []}
            form={form}
          />
        </Col>
        <Col span={24}>
          <CustomTextArea label="توضیحات" name="desc" placeholder="متن کاربر" />
        </Col>
      </Row>
    </Form>
  );
};
export default ChangeStatusModalContent;

import { Col, Row, Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { EditReasonDrawerContentProps } from "./@types/@editReasonDrawerContentProps";

const EditReasonDrawerContent = ({
  closeDrawerHandler,
}: EditReasonDrawerContentProps) => {
  const [form] = Form.useForm();
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form form={form}>
      <CustomDrawerHeader
        title="ویرایش دلیل"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={<CustomButton type="primary">ثبت دلیل</CustomButton>}
      />

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="نوع دلیل" value="رد" />
        <Col lg={12} md={12}>
          <CustomInput
            name="reason"
            label="عنوان دلیل"
            rules={[REQUIRED_RULE]}
            placeholder="لطفاً عنوان دلیل را وارد نمایید."
          />
        </Col>
        <Col span={24}>
          <CustomTextArea
            name="description"
            label="متن توضیحات قابل نمایش برای متقاضی"
            placeholder="لطفاً متن توضیحات را اینجا وارد نمایید."
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default EditReasonDrawerContent;

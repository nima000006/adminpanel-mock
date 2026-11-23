import { Col, Form, Row } from "antd";

import { CustomButton, CustomSelect, CustomTextArea } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { MyEstelamRejectDrawerContentProps } from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationDetail/helper/components/MyForeignNationalsRegistrationDetailWaitingReview/@types/@myForeignNationalsRegistrationDetailWaitingReviewTypes";

const MyEstelamRejectDrawerContent = ({
  closeDrawerHandler,
  form,
}: MyEstelamRejectDrawerContentProps) => {
  const reason = Form.useWatch("rejectReason", form);

  //* ================================ Util Functions ================================
  const rejectRequestHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="رد درخواست"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton type="primary" danger onClick={rejectRequestHandler}>
              ثبت دلیل رد درخواست
            </CustomButton>
          </div>
        }
      />
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <CustomSelect
              name="rejectReason"
              options={[{ id: 1, title: "سایر" }]}
              label="دلیل رد"
              rules={[REQUIRED_RULE]}
              placeholder="انتخاب کنید"
              form={form}
              loading={false}
            />
          </Col>
        </Row>
        <CustomTextArea
          label="توضیحات"
          name="description"
          placeholder="توضیحات رد درخواست را در صورت تمایل وارد نمایید."
          rules={[REQUIRED_RULE]}
          disabled={!reason?.item}
        />
      </Form>
    </div>
  );
};

export default MyEstelamRejectDrawerContent;

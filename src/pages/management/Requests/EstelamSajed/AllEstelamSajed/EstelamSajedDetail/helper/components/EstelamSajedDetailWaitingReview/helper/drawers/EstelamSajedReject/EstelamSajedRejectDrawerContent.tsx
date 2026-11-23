import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { useGetEstelamAmozeshyarRejectReasonsQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { EstelamSajedRejectDrawerContentProps } from "./@types/@estelamSajedRejectDrawerContent";

import "./_estelamSajedRejectDrawerContent.scss";

const EstelamSajedRejectDrawerContent = ({
  closeDrawerHandler,
  form,
  rejectRequestHandler,
}: EstelamSajedRejectDrawerContentProps) => {
  const reason = Form.useWatch("rejectReason", form);

  //? ================================  Api Calls ================================
  const { data: reasonList, isLoading: isGetRejectReasonsLoading } =
    useGetEstelamAmozeshyarRejectReasonsQuery();

  //* ================================ Effects  ================================
  useEffect(() => {
    if (reason?.item?.name !== "OTHER") {
      form.setFields([
        {
          name: "description",
          errors: [],
        },
      ]);
    }
  }, [reason?.item?.name, form]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="estelam-sajed-reject-drawer-container">
      <CustomDrawerHeader
        title="رد درخواست"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="action-btn-container">
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
              options={
                reasonList?.map((item) => ({
                  id: item.id,
                  title: item.reason,
                  name: item.name,
                })) || []
              }
              label="دلیل رد"
              rules={[REQUIRED_RULE]}
              placeholder="انتخاب کنید"
              form={form}
              loading={isGetRejectReasonsLoading}
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

export default EstelamSajedRejectDrawerContent;

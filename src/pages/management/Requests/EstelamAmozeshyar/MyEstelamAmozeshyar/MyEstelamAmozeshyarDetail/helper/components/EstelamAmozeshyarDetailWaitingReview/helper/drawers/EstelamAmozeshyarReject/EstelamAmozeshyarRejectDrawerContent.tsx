import { useEffect } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { useGetMyEstelamAmozeshyarRejectReasonsQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { MyEstelamAmozeshyarRejectDrawerContentProps } from "./@types/@myEstelamAmozeshyarRejectDrawerContent";
import "./_estelamAmozeshyarRejectDrawerContent.scss";

const MyEstelamAmozeshyarRejectDrawerContent = ({
  closeDrawerHandler,
  form,
  rejectRequestHandler,
}: MyEstelamAmozeshyarRejectDrawerContentProps) => {
  const reason = Form.useWatch("rejectReason", form);

  //? ================================  Api Calls ================================
  const { data: reasonList, isLoading: isGetRejectReasonsLoading } =
    useGetMyEstelamAmozeshyarRejectReasonsQuery();

  // ================================ Clear validation errors when switching away from OTHER ================================
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

  return (
    <div className="estelam-amozeshyar-reject-drawer-container">
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
        <CustomTextArea
          rules={reason?.item?.name === "OTHER" ? [REQUIRED_RULE] : []}
          label={reason?.item?.name === "OTHER" ? "توضیحات" : "توضیحات (اختیاری)"}
          name="description"
          placeholder="توضیحات رد درخواست را در صورت تمایل وارد نمایید."
        />
      </Form>
    </div>
  );
};

export default MyEstelamAmozeshyarRejectDrawerContent;

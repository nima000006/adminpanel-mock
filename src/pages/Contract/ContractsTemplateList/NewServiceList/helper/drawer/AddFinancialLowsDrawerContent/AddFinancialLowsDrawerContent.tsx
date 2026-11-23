import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { AddFinancialLowsDrawerContentProps } from "./@types/@addFinancialLowsDrawerContentType";

const AddFinancialLowsDrawerContent = ({
  closeDrawer,
  form,
}: AddFinancialLowsDrawerContentProps) => {
  //* ================================ Util Functions ================================
  const submitFinancialLowsHandler = () => {
    closeDrawer();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="افزودن قانون مالی"
        closeDrawerHandler={closeDrawer}
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton danger onClick={closeDrawer} className="drawer-action-btn">
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={submitFinancialLowsHandler}
              className="drawer-action-btn"
            >
              ثبت قانون مالی
            </CustomButton>
          </div>
        }
      />

      <Form form={form} className="flex flex-col">
        <SingleVerticalWithCol
          xl={24}
          lg={24}
          label="نوع ذینفع"
          value="حقوقی"
          className="mb-6!"
        />
        <CustomSelect
          label="کسب کار "
          name="business"
          options={[{ id: 1, title: "صمیم رایانه (دانشجویار)" }]}
          form={form}
          placeholder="انتخاب کنید"
          rules={[REQUIRED_RULE]}
        />
        <CustomSelect
          label="نوع شعبه "
          name="business"
          options={[{ id: 1, title: "مرکزی" }]}
          form={form}
          placeholder="انتخاب کنید"
          rules={[REQUIRED_RULE]}
        />
        <CustomSelect
          label=" شعبه "
          name="business"
          options={[{ id: 1, title: "صمیم رایانه (123589318)" }]}
          form={form}
          placeholder="انتخاب کنید"
          rules={[REQUIRED_RULE]}
        />
        <CustomSelect
          label=" خدمت سهام دار "
          name="business"
          options={[{ id: 1, title: "پشتیبانی ارائه بستر پلتفرم دانشجویار" }]}
          form={form}
          placeholder="انتخاب کنید"
          rules={[REQUIRED_RULE]}
        />
        <CustomInput type="text" label="سهم (درصد)" name="share" suffix={"%"} />
      </Form>
    </div>
  );
};
export default AddFinancialLowsDrawerContent;

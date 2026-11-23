import { Form, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { InternationalBranchesInternationalDetailsAddDrawerContentPropsTypes } from "./@types/InternationalBranchesInternationalDetailsAddDrawerContentPropsTypes";

const InternationalBranchesInternationalDetailsAddDrawerContent = ({
  closeDrawerAddHandler,
}: InternationalBranchesInternationalDetailsAddDrawerContentPropsTypes) => {
  const [form] = Form.useForm();
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomDrawerHeader
        title="افزودن مقطع تحصیلی"
        closeDrawerHandler={closeDrawerAddHandler}
        leftSideContent={
          <CustomButton type="primary" htmlType="submit">
            ثبت اطلاعات
          </CustomButton>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          xs={12}
          md={12}
          label="نام واحد"
          value="واحد تهران جنوب"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          xs={12}
          md={12}
          label="نام رشته"
          value="مهندسی کامپیوتر"
        />
        <CustomSelect
          options={undefined}
          label="مقطع تحصیلی"
          name="degree"
          placeholder="انتخاب کنید"
          rules={[REQUIRED_RULE]}
          mode="multiple"
        />
      </Row>
    </Form>
  );
};
export default InternationalBranchesInternationalDetailsAddDrawerContent;

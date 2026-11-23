import { Col, Form, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ModifyOrganizationUnitDrawerContentProps } from "../@types/@organizationUnitDrawerContentType";
import "./_modifyOrganizationUnitDrawerContent.scss";

const ModifyOrganizationUnitDrawerContent = ({
  closeDrawerHandler,
  isModifyDrawerOpen,
}: ModifyOrganizationUnitDrawerContentProps) => {
  //* ================================ Util Functions ================================
  const [form] = Form.useForm();

  const cancelBtnHandler = () => {
    closeDrawerHandler();
  };

  const submitNewBranchHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="modify-organization-unit-drawer-container">
      <CustomDrawerHeader
        title={
          isModifyDrawerOpen?.id != -1
            ? "ویرایش اطلاعات واحد سازمانی"
            : "افزودن اطلاعات واحد سازمانی"
        }
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="modify-organization-unit-drawer-btns-wrapper">
            <CustomButton onClick={cancelBtnHandler} title="انصراف">
              انصراف
            </CustomButton>
            <CustomButton type="primary" onClick={submitNewBranchHandler}>
              {isModifyDrawerOpen?.id != -1 ? "ثبت تغییرات" : "ثبت اطلاعات"}
            </CustomButton>
          </div>
        }
      />

      <div>
        <CustomDivider text={"اطلاعات واحد سازمانی"} />
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="branchType"
              label="نوع واحد"
              options={[]}
              placeholder="انتخاب کنید"
              form={form}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="عنوان واحد"
              name="unitTitle"
              placeholder="برای مثال شعبه مرکزی"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات (اختیاری)"
              name="desc"
              showCount
              maxLength={1024}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ModifyOrganizationUnitDrawerContent;

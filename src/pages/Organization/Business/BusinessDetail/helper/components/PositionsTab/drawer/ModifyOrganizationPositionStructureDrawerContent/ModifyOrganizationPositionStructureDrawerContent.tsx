import { Col, Form, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ModifyOrganizationPositionInfoDrawerContentProps } from "../@types/@viewOrganizationPositionInfoProps";
import "./_modifyOrganizationPositionStructureDrawerContent.scss";

const ModifyOrganizationPositionStructureDrawerContent = ({
  closeDrawerHandler,
  isModifyDrawerOpen,
}: ModifyOrganizationPositionInfoDrawerContentProps) => {
  const [form] = Form.useForm();

  const cancelBtnHandler = () => {
    closeDrawerHandler();
  };

  const submitHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="modify-organization-position-structure-drawer-content-container">
      <CustomDrawerHeader
        title={
          isModifyDrawerOpen?.id !== -1
            ? "ویرایش ساختار سمت سازمانی"
            : "ایجاد سمت سازمانی"
        }
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="drawer-btns-wrapper">
            <CustomButton onClick={cancelBtnHandler} title="انصراف">
              انصراف
            </CustomButton>
            <CustomButton type="primary" onClick={submitHandler}>
              {isModifyDrawerOpen?.id !== -1 ? "ثبت تغییرات" : "ثبت سمت سازمانی"}
            </CustomButton>
          </div>
        }
      />

      <div>
        <CustomDivider text={" سمت سازمانی"} />

        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="positionType"
              label="نوع سمت"
              form={form}
              placeholder="انتخاب کنید"
              // isLoading={}
              options={[]}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="positionTitle"
              label="عنوان سمت"
              form={form}
              placeholder="انتخاب کنید"
              // isLoading={}
              options={[]}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomSelect
              name="parentPosition"
              label="سمت والد"
              form={form}
              placeholder="انتخاب کنید"
              // isLoading={}
              options={[]}
              rules={[REQUIRED_RULE]}
              disabled={isModifyDrawerOpen?.id === -1}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات "
              placeholder="توضیحات بیشتر در مورد سمت سازمانی"
              name="desc"
              maxLength={1024}
              showCount
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ModifyOrganizationPositionStructureDrawerContent;

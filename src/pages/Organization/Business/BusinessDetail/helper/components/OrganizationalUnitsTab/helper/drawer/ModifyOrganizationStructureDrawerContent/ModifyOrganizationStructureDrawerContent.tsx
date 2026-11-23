import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";

import OrganizationUnitSection from "../../components/OrganizationUnitSection/OrganizationUnitSection";
import { ModifyOrganizationStructureDrawerContentProps } from "../@types/@organizationUnitDrawerContentType";
import "./_modifyOrganizationStructureDrawerContent.scss";

const ModifyOrganizationStructureDrawerContent = ({
  closeDrawerHandler,
  isModifyDrawerOpen,
  ModifyOrganizationMood,
}: ModifyOrganizationStructureDrawerContentProps) => {
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
        title={isModifyDrawerOpen?.id != -1 ? "ویرایش واحد سازمانی" : "ایجاد واحد جدید"}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="modify-organization-unit-drawer-btns-wrapper">
            <CustomButton onClick={cancelBtnHandler} title="انصراف">
              انصراف
            </CustomButton>
            <CustomButton type="primary" onClick={submitNewBranchHandler}>
              {isModifyDrawerOpen?.id != -1 ? "ثبت تغییرات" : "ثبت واحد"}
            </CustomButton>
          </div>
        }
      />
      <OrganizationUnitSection
        form={form}
        isModifyDrawerOpen={isModifyDrawerOpen}
        ModifyOrganizationMood={ModifyOrganizationMood}
      />
    </div>
  );
};
export default ModifyOrganizationStructureDrawerContent;

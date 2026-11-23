import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";

import OrganizationUnitSection from "../../components/OrganizationUnitSection/OrganizationUnitSection";
import { ModifyTopChartDrawerContentProps } from "../@types/@organizationUnitDrawerContentType";

const ModifyTopChartDrawerContent = ({
  closeDrawerHandler,
  isModifyDrawerOpen,
  ModifyTopChartMood,
}: ModifyTopChartDrawerContentProps) => {
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
            ? "ویرایش واحد تاپ چارت"
            : "ایجاد واحد زیر مجموعه تاپ چارت"
        }
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="modify-organization-unit-drawer-btns-wrapper">
            <CustomButton onClick={cancelBtnHandler} title="انصراف">
              انصراف
            </CustomButton>
            <CustomButton type="primary" onClick={submitNewBranchHandler}>
              {isModifyDrawerOpen?.id != -1 ? "ثبت تغییرات" : "ایجاد واحد"}
            </CustomButton>
          </div>
        }
      />
      <OrganizationUnitSection
        form={form}
        isModifyDrawerOpen={isModifyDrawerOpen}
        ModifyTopChartMood={ModifyTopChartMood}
      />
    </div>
  );
};
export default ModifyTopChartDrawerContent;

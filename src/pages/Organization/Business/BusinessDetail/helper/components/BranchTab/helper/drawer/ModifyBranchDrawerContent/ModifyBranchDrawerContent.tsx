import { useState } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import LocationInfoSection from "@pages/Organization/_shared/components/LocationInfoSection/LocationInfoSection";
import OtherDescription from "@pages/Organization/_shared/components/OtherDescription/OtherDescription";

import BranchCallInfo from "../../components/BranchCallInfo/BranchCallInfo";
import BranchInfo from "../../components/BranchInfo/BranchInfo";
import { CreateBranchDrawerContentProps } from "../@types/@createBranchDrawerContentProps";
import "./_modifyBranchDrawerContent.scss";

const ModifyBranchDrawerContent = ({
  closeDrawerHandler,
  isModifyDrawerOpen,
}: CreateBranchDrawerContentProps) => {
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [form] = Form.useForm();

  //* ================================ Util Functions ================================
  const cancelBtnHandler = () => {
    closeDrawerHandler();
  };

  const submitNewBranchHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="create-new-branch-drawer-container">
      <CustomDrawerHeader
        title={isModifyDrawerOpen?.id != -1 ? "ویرایش شعبه" : "ایجاد شعبه جدید"}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="create-new-branch-drawer-btns-wrapper">
            <CustomButton onClick={cancelBtnHandler} title="انصراف">
              انصراف
            </CustomButton>
            <CustomButton type="primary" onClick={submitNewBranchHandler}>
              {isModifyDrawerOpen?.id != -1 ? "ثبت تغییرات" : "ثبت شعبه جدید"}
            </CustomButton>
          </div>
        }
      />

      {/* BRANCH INFO SECTION */}
      <BranchInfo form={form} />

      {/* BRANCH CALL INFO SECTION */}
      <BranchCallInfo />

      {/* LOCATION */}
      <div>
        <LocationInfoSection form={form} />
        <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
      </div>

      {/* DESCRIPTION */}
      <OtherDescription form={form} />
    </div>
  );
};
export default ModifyBranchDrawerContent;

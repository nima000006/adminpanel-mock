import React from "react";

import { Tabs } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";

import RoomBasicFeatureData from "./RoomBasicFeatureData/RoomBasicFeatureData";
import { BLUE_02 } from "../../../infrastructure/VARS/globalColors/globalColors";
import {
  FONTSIZE_17,
  PADDING_12,
} from "../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../CustomCard/CustomCard";
import "./_basicRulesSection.scss";

const BasicRulesSection = () => {
  const apartmentsItems = [
    {
      label: "حال حاضر",
      children: <RoomBasicFeatureData />,
      key: "1",
    },
    {
      label: "نیمه اول ۱۴۰۱",
      children: <>{/*  */}</>,
      key: "2",
    },
    {
      label: "نیمه دوم ۱۴۰۱",
      children: <>{/*  */}</>,
      key: "3",
    },
  ];

  //* ================================ Util Functions ================================
  const onTimeTabChange = () => {};
  const onTimeTabEdit = (
    _: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      //! open modal
      //   setNewRangeModal({ isOpen: true });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard padding={PADDING_12}>
      <div className="rules-text-container">
        <div className="title">قوانین بر اساس زمان اعمال</div>
        <div className="sub-title">
          از این قسمت میتوانید مجموعه قوانین جدید ایجاد کرده و برای شروع اعمال آن تاریخ
          تعیین کنید.
        </div>
        <Tabs
          type="editable-card"
          onChange={onTimeTabChange}
          onEdit={onTimeTabEdit}
          items={apartmentsItems}
          className="rules-section-tabs-container"
          addIcon={
            <div className="rules-section-btn">
              <span className="rules-section-btn-label">بازه قانونی جدید</span>
              <span>
                <AiOutlinePlusSquare style={{ color: BLUE_02, fontSize: FONTSIZE_17 }} />
              </span>
            </div>
          }
        />
      </div>
    </CustomCard>
  );
};

export default BasicRulesSection;

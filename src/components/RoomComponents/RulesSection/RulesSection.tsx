import React from "react";

import { Tabs } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";

import RoomFeatureData from "./RoomFeatureData/RoomFeatureData";
import { BLUE_02 } from "../../../infrastructure/VARS/globalColors/globalColors";
import {
  FONTSIZE_17,
  PADDING_40,
} from "../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../CustomCard/CustomCard";
import "./_rulesSection.scss";

const RulesSection = () => {
  const apartmentsItems = [
    {
      label: "حال حاضر",
      children: <RoomFeatureData />,
      key: "1",
    },
    {
      label: "نیمه اول ۱۴۰۱",
      children: <>{/* <ApartmentDetail key="1" /> */}</>,
      key: "2",
    },
    {
      label: "نیمه دوم ۱۴۰۱",
      children: <>{/* <ApartmentDetail key="1" /> */}</>,
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
      //   setCreateApartmentModal({ isOpen: true });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard padding={PADDING_40}>
      <div className="rules-text-container">
        <div className="title">قوانین بر اساس زمان اعمال</div>
        <div className="sub-title">
          از این قسمت میتوانید مجموعه قوانین جدید ایجاد کرده و برای شروع اعمال آن تاریخ
          تعیین کنید.
        </div>
        <Tabs
          type="editable-card"
          onChange={onTimeTabChange}
          // activeKey={"1"}
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

export default RulesSection;

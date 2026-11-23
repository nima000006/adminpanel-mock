import { Tabs, TabsProps } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

import DailyDiscountTable from "./DailyDiscountTable/DailyDiscountTable";
import GroupAdjustTable from "./GroupAdjustTable/GroupAdjustTable";
import PricingBasicDetailTable from "./PricingBasicDetailTable/PricingBasicDetailTable";
import {
  BASIC_PRICE,
  DAILY_DISCOUNT,
  GROUP_ADJUSTMENT,
} from "../../../../infrastructure/models/roomPricingBasicDetail";
import { BLUE_02 } from "../../../../infrastructure/VARS/globalColors/globalColors";
import {
  FONTSIZE_16,
  FONTSIZE_17,
  PADDING_40,
} from "../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../CustomCard/CustomCard";
import "./_pricingBasicDetail.scss";

const PricingBasicDetailContent = () => {
  const secondItems: TabsProps["items"] = [
    {
      key: BASIC_PRICE,
      label: <div className="tabs-label">قیمت پایه</div>,
      children: (
        <CustomCard padding={PADDING_40} className="second-box-pricing-detail">
          <PricingBasicDetailTable />
        </CustomCard>
      ),
    },
    {
      key: DAILY_DISCOUNT,
      label: <div className="tabs-label">تخفیف روزانه</div>,
      children: (
        <CustomCard padding={PADDING_40} className="second-box-pricing-detail">
          <DailyDiscountTable />
        </CustomCard>
      ),
    },
    {
      key: GROUP_ADJUSTMENT,
      label: <div className="tabs-label">تعدیل گروهی</div>,
      children: (
        <CustomCard padding={PADDING_40} className="second-box-pricing-detail">
          <GroupAdjustTable />
        </CustomCard>
      ),
    },
  ];

  const items = [
    {
      label: "حال حاضر",
      children: (
        <>
          <div className="date-wrapper">
            <p>شروع از 02 / 02 / 1402</p>
            <AiOutlineEdit style={{ color: "#1890ff", fontSize: FONTSIZE_16 }} />
          </div>
          <Tabs
            // defaultActiveKey={DENOMINATION}
            items={secondItems}
            // onChange={(e) => onTabsChange(e as BusinessBaseTableTypes)}
            dir="rtl"
            destroyInactiveTabPane={true}
            className="mini-tab-container"
          />
        </>
      ),
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
  const onTimeTabEdit = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="pricing-basic-detail-container">
      <div className="first-box-pricing-detail">
        <div className="dorm-business-wrapper">
          <p>خوابگاه y</p>
          <span>/</span>
          <p className="business-text">بیزینس x</p>
        </div>
        <div className="room-score-rules-text-container">
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
            items={items}
            className="rules-section-tabs-container"
            addIcon={
              <div className="rules-section-btn">
                <span className="rules-section-btn-label">بازه قانونی جدید</span>
                <span>
                  <AiOutlinePlusSquare
                    style={{ color: BLUE_02, fontSize: FONTSIZE_17 }}
                  />
                </span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
export default PricingBasicDetailContent;

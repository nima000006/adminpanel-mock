import { Tabs, TabsProps } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

import { FONTSIZE_16, FONTSIZE_17 } from "@infra/VARS/globalStyles/globalStyles";

import PaymentRulesDetailContentBox from "./PaymentRulesDetailContentBox/PaymentRulesDetailContentBox";
import {
  TERMIC,
  MONTHLY,
  DAILY,
} from "../../../../infrastructure/models/roomPaymentRulesDetail";
import { BLUE_02 } from "../../../../infrastructure/VARS/globalColors/globalColors";

import "./_paymentRulesDetail.scss";

const PaymentRulesDetailContent = () => {
  const secondItems: TabsProps["items"] = [
    {
      key: TERMIC,
      label: <div className="tabs-label">ترمیک</div>,
      children: (
        <div>
          <PaymentRulesDetailContentBox />
        </div>
      ),
    },
    {
      key: MONTHLY,
      label: <div className="tabs-label">ماهانه</div>,
      children: (
        <div>
          <PaymentRulesDetailContentBox />
        </div>
      ),
    },
    {
      key: DAILY,
      label: <div className="tabs-label">روزانه</div>,
      children: (
        <div>
          <PaymentRulesDetailContentBox />
        </div>
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
            items={secondItems}
            // onChange={}
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
      children: <>{}</>,
      key: "2",
    },
    {
      label: "نیمه دوم ۱۴۰۱",
      children: <>{}</>,
      key: "3",
    },
  ];

  //* ================================ Util Functions ================================
  const onTimeTabChange = () => {};
  const onTimeTabEdit = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="payment-rules-detail-container">
      <div className="first-box-payment-detail">
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
export default PaymentRulesDetailContent;

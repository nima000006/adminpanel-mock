import { useState } from "react";

import { Col, Row } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { PiGearBold, PiInfoLight } from "react-icons/pi";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { dataPlaceHolder } from "@infra/helpers/utils";

import WalletTimeSettingSchedulingEditDrawerContent from "../../drawer/WalletTimeSettingSchedulingEditDrawerContent/WalletTimeSettingSchedulingEditDrawerContent";
import "./_walletTimeSettingSchedulingCardInfo.scss";

const mockData = [
  {
    id: 1,
    day: "شنبه ها",
    date: "2025-10-04T11:25:19.650126971",
  },
  { id: 2, day: "یکشنبه ها", date: "2025-10-04T11:25:19.650126971" },
  { id: 3, day: "دوشنبه ها", date: "2025-10-04T11:25:19.650126971" },
  { id: 4, day: "سه شنبه ها", date: "2025-10-04T11:25:19.650126971" },
  { id: 5, day: "چهارشنبه ها", date: "2025-10-04T11:25:19.650126971" },
  { id: 6, day: "پنج شنبه ها", date: "2025-10-04T11:25:19.650126971" },
];
const WalletTimeSettingSchedulingCardInfo = () => {
  const [openEditDrawer, setIsOpenEditDrawer] = useState({ isOpen: false, id: -1 });
  const editBtnHandler = () => {
    setIsOpenEditDrawer({ isOpen: true, id: -1 });
  };

  const closeDrawerHandler = () => {
    setIsOpenEditDrawer({ isOpen: false, id: -1 });
  };

  return (
    <>
      {openEditDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={openEditDrawer?.isOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <WalletTimeSettingSchedulingEditDrawerContent
              closeDrawerHandler={closeDrawerHandler}
            />
          }
        />
      )}
      <div className="wallet-time-setting-scheduling-card-info-container">
        <div className="first-box-first-row-wrapper">
          <div className="setting-title-wrapper">
            <div className="setting-icon-Wrapper">
              <PiGearBold color="#ffffff" />
            </div>
            <h3 className="title">زمان‌بندی مجاز برداشت از کیف پول</h3>
          </div>
          <PiInfoLight color="#BFBFBF" />
        </div>
        <Row gutter={[16, 16]}>
          {mockData?.map((item) => {
            return (
              <Col lg={8} md={12} sm={12} xs={24}>
                <div className="date-wrapper">
                  <span className="day">{item.day}</span>
                  <span className="day-value">
                    {dataPlaceHolder({ data: item.date, isDate: true })}
                  </span>
                </div>
              </Col>
            );
          })}
          <Col lg={8} md={12} sm={24} xs={24}>
            <div className="date-wrapper">
              <span className="day">جمعه ها</span>
              <span className="day-value">امکان انجام تراکنش وجود ندارد</span>
            </div>
          </Col>
          <Col lg={8} md={12} sm={12} xs={12}>
            <div className="date-wrapper">
              <span className="day">روز‌های تعطیل</span>
              <span className="day-value">مقدار</span>
            </div>
          </Col>
          <Col>
            <div className="date-wrapper">
              <span className="date">تاریخ و زمان آخرین تغییر</span>
              <span className="date-value">
                {dataPlaceHolder({ data: "2025-10-04T11:25:19.650126971", isDate: true })}
              </span>
            </div>
          </Col>
        </Row>
        <section className="edit-icon-wrapper">
          <div className="edit-icon-box" onClick={editBtnHandler}>
            <AiOutlineEdit color="#000000" size={18} />
          </div>
        </section>
      </div>
    </>
  );
};
export default WalletTimeSettingSchedulingCardInfo;

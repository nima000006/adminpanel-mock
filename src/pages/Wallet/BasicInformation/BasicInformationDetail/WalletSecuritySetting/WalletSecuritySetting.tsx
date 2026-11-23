import { useState } from "react";

import { Col, Row } from "antd";
import { PiGearBold, PiInfoLight } from "react-icons/pi";
import { Link } from "react-router";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { WALLET_BASIC_INFO_PAGE_ROUTE } from "@infra/router/routes/wallet";

import WalletSecuritySettingStatusModalContent from "./helper/modal/WalletSecuritySettingStatusModalContent/WalletSecuritySettingStatusModalContent";
import "./_walletSecuritySetting.scss";

const activeArray = [
  {
    id: 1,
    title: "فعال",
  },
  {
    id: 2,
    title: "غیر فعال",
  },
  {
    id: 3,
    title: "مسدود",
  },
];
const SettingTransactionWalletCardInfo = () => {
  const [switchModal, setIsSwitchModal] = useState({ isOpen: false, id: -1 });
  const [active, setActive] = useState(1);

  useTitle({
    breadcrumbItems: [
      {
        title: "کیف پول",
      },
      {
        title: <Link to={WALLET_BASIC_INFO_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "تنظیمات امنیتی کیف پول",
      },
    ],
  });

  const changeStatus = (id: number) => {
    setActive(id);
    if (active == 1 && id == 3) {
      setIsSwitchModal({ isOpen: true, id });
    }
  };

  const statusModalCloseHandler = () => {
    setIsSwitchModal({ isOpen: false, id: -1 });
  };

  return (
    <>
      {switchModal?.isOpen && (
        <ConfirmationModalWithContent
          title="تغییر وضعیت"
          isModalOpen={switchModal?.isOpen}
          confirmBtnText="تغییر وضعیت"
          closeModalHandler={statusModalCloseHandler}
          content={<WalletSecuritySettingStatusModalContent />}
        />
      )}
      <div className="wallet-security-setting-card-info-container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <CustomSelect
              options={[]}
              // loading={}
              name="businessId"
              label="کسب و کار"
              placeholder="انتخاب کسب و کار"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <CustomSelect
              options={[]}
              // loading={}
              name="wallet"
              label="کیف پول"
              placeholder="انتخاب کنید"
            />
          </Col>
        </Row>

        <Row>
          <Col
            lg={8}
            md={12}
            sm={24}
            xs={24}
            className="wallet-security-setting-card-info-wrapper"
          >
            <div className="first-box-first-row-wrapper">
              <div className="setting-title-wrapper">
                <div className="setting-icon-Wrapper">
                  <PiGearBold color="#ffffff" />
                </div>
                <h3 className="title">تغییر وضعیت کیف پول</h3>
              </div>
              <PiInfoLight color="#BFBFBF" />
            </div>

            <div className="status-wrapper">
              <span className="status">وضعیت</span>

              <CustomSelect
                options={activeArray}
                name="wallet"
                value={active}
                onChange={(e) => changeStatus(e as number)}
              />
            </div>

            <div className="date-wrapper">
              <span className="date">تاریخ و زمان آخرین تغییر</span>
              <span className="date-value">
                {dataPlaceHolder({ data: "2025-10-04T11:25:19.650126971", isDate: true })}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SettingTransactionWalletCardInfo;

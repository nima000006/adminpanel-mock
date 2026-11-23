import { useState } from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { PiGearBold, PiInfoLight } from "react-icons/pi";

import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { dataPlaceHolder } from "@infra/helpers/utils";

import WalletTimeSettingDeactivationEditDrawerContent from "../../drawer/WalletTimeSettingDeactivationEditDrawerContent/WalletTimeSettingDeactivationEditDrawerContent";
import WalletTimeSettingStatusModalContent from "../../model/WalletTimeSettingStatusModal/WalletTimeSettingStatusModalContent";
import "./_walletTimeSettingCardInfo.scss";

const WalletTimeSettingCardInfo = () => {
  const [openEditDrawer, setIsOpenEditDrawer] = useState({ isOpen: false, id: -1 });
  const [isActive, setIsActive] = useState(true);
  const [switchModal, setIsSwitchModal] = useState({ isOpen: false, id: -1 });
  const closeDrawerHandler = () => {
    setIsOpenEditDrawer({ isOpen: false, id: -1 });
  };
  const editBtnHandler = () => {
    setIsOpenEditDrawer({ isOpen: true, id: -1 });
  };

  const changeSwitchHandler = (checked: boolean) => {
    if (isActive && !checked) {
      setIsSwitchModal({ isOpen: true, id: -1 });
    }
    setIsActive(checked);
  };

  const statusModalCloseHandler = () => {
    setIsSwitchModal({ isOpen: false, id: -1 });
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
            <WalletTimeSettingDeactivationEditDrawerContent
              closeDrawerHandler={closeDrawerHandler}
            />
          }
        />
      )}

      {switchModal?.isOpen && (
        <ConfirmationModalWithContent
          title="تغییر وضعیت"
          isModalOpen={switchModal?.isOpen}
          confirmBtnText="تغییر وضعیت"
          closeModalHandler={statusModalCloseHandler}
          //   onConfirmClickHandler={}
          //   isConfirmButtonLoading={}
          content={<WalletTimeSettingStatusModalContent />}
        />
      )}

      <div className="wallet-time-setting-card-info-container">
        <div className="first-box-first-row-wrapper">
          <div className="setting-title-wrapper">
            <div className="setting-icon-Wrapper">
              <PiGearBold color="#ffffff" />
            </div>
            <h3 className="title">غیر فعال سازی خودکار</h3>
          </div>
          <PiInfoLight color="#BFBFBF" />
        </div>
        <div className="allocated-wrapper">
          <span className="allocated">وضعیت</span>
          <CustomSwitch
            defaultChecked={true}
            checkedChildren="فعال"
            unCheckedChildren="غیرفعال"
            valuePropName="active"
            onChange={changeSwitchHandler}
          />
        </div>

        <div className="allocated-wrapper">
          <span className="allocated">پس از</span>
          <div className="view-day-wrapper">
            <span className="allocated-value">{`${360} روز`}</span>
            <div className="edit-icon-box" onClick={editBtnHandler}>
              <AiOutlineEdit color="#000000" size={16} />
            </div>
          </div>
        </div>

        <div className="date-wrapper">
          <span className="date">تاریخ و زمان آخرین تغییر</span>
          <span className="date-value">
            {dataPlaceHolder({ data: "2025-10-04T11:25:19.650126971", isDate: true })}
          </span>
        </div>
      </div>
    </>
  );
};

export default WalletTimeSettingCardInfo;

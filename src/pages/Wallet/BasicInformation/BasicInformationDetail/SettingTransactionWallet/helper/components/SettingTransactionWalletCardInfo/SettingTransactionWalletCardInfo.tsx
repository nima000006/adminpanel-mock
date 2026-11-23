import { useState } from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { PiGearBold, PiInfoLight } from "react-icons/pi";

import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { SettingTransactionWalletCardInfoProps } from "./@type/@SettingTransactionWalletCardInfoType";
import FinancialSettingTransactionEditDrawerContent from "../../drawer/FinancialSettingTransactionEditDrawerContent/FinancialSettingTransactionEditDrawerContent";
import StatusModalContent from "../../modal/StatusModalContent/StatusModalContent";
import "./_settingTransactionWalletCardInfo.scss";
const SettingTransactionWalletCardInfo = ({
  id,
  title,
  maxPrice,
  countTransaction,
  dateValue,
  statusValue,
  isAllocated,
  isMaxPrice,
  isStatus,
}: SettingTransactionWalletCardInfoProps) => {
  const [openEditDrawer, setIsOpenEditDrawer] = useState({ isOpen: false, id: -1 });
  const [isActive, setIsActive] = useState(true);
  const [switchModal, setIsSwitchModal] = useState({ isOpen: false, id: -1 });

  const closeDrawerHandler = () => {
    setIsOpenEditDrawer({ isOpen: false, id: -1 });
  };
  const editBtnHandler = (id: number) => {
    setIsOpenEditDrawer({ isOpen: true, id });
  };

  const changeSwitchHandler = (checked: boolean) => {
    if (isActive && !checked) {
      setIsSwitchModal({ isOpen: true, id });
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
            <FinancialSettingTransactionEditDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              id={id}
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
          content={<StatusModalContent id={switchModal?.id} />}
          //   isConfirmButtonLoading={}
        />
      )}

      <div className="wallet-financial-setting-card-info-container">
        <section className="wallet-financial-setting-first-box">
          <div className="first-box-first-row-wrapper">
            <div className="setting-title-wrapper">
              <div className="setting-icon-Wrapper">
                <PiGearBold color="#ffffff" />
              </div>
              <h3 className="title">{dataPlaceHolder({ data: title })}</h3>
            </div>
            <PiInfoLight color="#BFBFBF" />
          </div>
          {isAllocated ? (
            <div className="allocated-wrapper">
              <span className="allocated">مقدار تخصیص داده شده</span>
              <span className="allocated-value">
                {`${dataPlaceHolder({ data: countTransaction?.toString(), isPrice: true })} تراکنش`}
              </span>
            </div>
          ) : null}
          {isMaxPrice ? (
            <div className="allocated-wrapper">
              <span className="allocated">برای مبالغ بیشتر از</span>
              <span className="allocated-value">
                {`${dataPlaceHolder({ data: maxPrice, isPrice: true })} تومان`}
              </span>
            </div>
          ) : null}
          {isStatus ? (
            <div className="allocated-wrapper">
              <span className="allocated">وضعیت</span>
              <CustomSwitch
                defaultChecked={statusValue}
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                valuePropName="active"
                onChange={changeSwitchHandler}
              />
            </div>
          ) : null}

          <div className="date-wrapper">
            <span className="date">تاریخ و زمان آخرین تغییر</span>
            <span className="date-value">
              {dataPlaceHolder({ data: dateValue, isDate: true })}
            </span>
          </div>
        </section>
        <section className="edit-icon-wrapper">
          <div className="edit-icon-box" onClick={() => editBtnHandler(id)}>
            <AiOutlineEdit color="#000000" />
          </div>
        </section>
      </div>
    </>
  );
};

export default SettingTransactionWalletCardInfo;

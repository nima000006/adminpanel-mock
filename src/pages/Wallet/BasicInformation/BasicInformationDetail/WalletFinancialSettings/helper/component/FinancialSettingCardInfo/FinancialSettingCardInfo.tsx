import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { PiGearBold, PiInfoLight } from "react-icons/pi";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { FinancialSettingCardInfoProps } from "./@types/@financialSettingCardInfoProps";
import FinancialSettingEditDrawerContent from "../../drawer/FinancialSettingEditDrawerContent/FinancialSettingEditDrawerContent";
import "./_financialSettingCardInfo.scss";
const FinancialSettingCardInfo = ({
  title,
  allocatedValue,
  dateValue,
  id,
}: FinancialSettingCardInfoProps) => {
  const [openEditDrawer, setIsOpenEditDrawer] = useState({ isOpen: false, id: -1 });

  const closeDrawerHandler = () => {
    setIsOpenEditDrawer({ isOpen: false, id: -1 });
  };
  const editBtnHandler = (id: number) => {
    setIsOpenEditDrawer({ isOpen: true, id });
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
            <FinancialSettingEditDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              id={id}
            />
          }
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

          <div className="allocated-wrapper">
            <span className="allocated">مقدار تخصیص داده شده</span>
            <span className="allocated-value">
              {`${dataPlaceHolder({ data: allocatedValue, isPrice: true })} تومان`}
            </span>
          </div>

          <div className="date-wrapper">
            <span className="date">تاریخ و زمان آخرین تغییر</span>
            <span className="date-value">
              {dataPlaceHolder({ data: dateValue, isDate: true })}
            </span>
          </div>
        </section>
        <section className="edit-icon-wrapper">
          <div
            className="edit-icon-box cursor-pointer"
            onClick={() => editBtnHandler(id)}
          >
            <AiOutlineEdit color="#000000" />
          </div>
        </section>
      </div>
    </>
  );
};

export default FinancialSettingCardInfo;

import { useState } from "react";

// import { AiOutlineDelete } from "react-icons/ai";
import { Badge, Space } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { formatByGroups } from "@infra/helpers/utils";

import { MyWalletDetailsAccountInfoProps } from "./@types/@myWalletDetailswalletAccountInfoTypes";

import "./_myWalletDetailsAccountInfo.scss";

const MyWalletDetailsAccountInfo: React.FC<MyWalletDetailsAccountInfoProps> = ({
  data,
  showServices = false,
}) => {
  const [deleteAccountModal, setDeleteAccountModal] = useState({
    isOpen: false,
    id: -1,
  });

  // MODAL HANDLER
  // const openDeleteModalHandler = () => {
  //   setDeleteAccountModal({ isOpen: true, id: -1 });
  // };
  const CloseDeleteAccountModalHandler = () => {
    setDeleteAccountModal({ isOpen: false, id: -1 });
  };

  const confirmDeleteHandler = (id: number) => {
    setDeleteAccountModal({ isOpen: false, id });
  };
  const StatusMapper = {
    ACCEPTED: {
      name: "تایید شده",
      color: "green",
    },
    REJECTED: {
      name: "رد شد",
      color: "red",
    },
    REQUESTED: {
      name: "در انتظار بررسی",
      color: "volcano",
    },
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      <ConfirmationModalWithContent
        title="حذف حساب"
        isModalOpen={deleteAccountModal?.isOpen}
        closeModalHandler={CloseDeleteAccountModalHandler}
        onConfirmClickHandler={() => confirmDeleteHandler(deleteAccountModal?.id)}
        content={<p className="modal-text">آیا از حذف حساب بانکی خود اطمینان دارید؟</p>}
        isDangerous={true}
        backBtnText="بازگشت"
        confirmBtnText="حذف"
        showIcon={false}
      />
      <Space vertical size="medium" style={{ width: "100%" }}>
        <Badge.Ribbon
          color={StatusMapper[data?.status as keyof typeof StatusMapper]?.color}
          text={StatusMapper[data?.status as keyof typeof StatusMapper]?.name}
          placement="end"
        >
          <div className="my-wallet-details-account-info-drawer-container">
            <div className="account-item-content">
              {/* //Todo[Atefeh]:uncomment when api got ready */}
              {/* <div className="bank-logo">{bankLogo}</div> */}
              {/* //Todo[Atefeh]:Mr.Jama'ati */}
              <span className="label">شماره شبا</span>
              <span className="account-number">{data?.iban}</span>
              <CustomTooltip
                title={
                  <div>
                    <div className="tooltip-item-container">
                      <span className="title">نام بانک</span>{" "}
                      <span className="value">{data?.bankName}</span>
                    </div>
                    <div className="tooltip-item-container">
                      <span className="title">شماره کارت</span> <br />
                      <span className="value">{formatByGroups(data?.cardNumber)}</span>
                    </div>
                    <div className="tooltip-item-container">
                      <span className="title">شماره شبا</span>{" "}
                      <span className="value">{data?.iban}</span>
                    </div>
                  </div>
                }
              >
                <AiOutlineInfoCircle className="info-icon" />
              </CustomTooltip>
              {showServices && data?.services?.length > 0 ? (
                <div className="account-services">
                  {data.services.map((service) => (
                    <SamimServiceTag
                      key={service?.id ?? service?.name}
                      service={service?.name}
                    />
                  ))}
                </div>
              ) : null}
            </div>
            <CustomButton
              disabled
              type="dashed"
              variant="dashed"
              danger
              className="ml-15"
            >
              <MdOutlineDelete size={20} />
            </CustomButton>
            {/* //Todo[Atefeh]:uncomment when api got ready */}
            {/* <CustomButton className="delete-icon" ghost onClick={openDeleteModalHandler}>
          <AiOutlineDelete className="icon" />
        </CustomButton> */}
          </div>
        </Badge.Ribbon>
      </Space>
    </>
  );
};

export default MyWalletDetailsAccountInfo;

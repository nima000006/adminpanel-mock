import { AiOutlineInfoCircle } from "react-icons/ai";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import { AllWalletDetailsAccountSelectItemProps } from "./@types/@allWalletDetailsAccountSelectItem";
import "./_allWalletDetailsAccountSelectItem.scss";

const AccountSelectItem: React.FC<AllWalletDetailsAccountSelectItemProps> = ({
  accountNumber,
  bankName,
  iban,
}) => {
  return (
    <div className="all-wallet-details-account-select-item-container">
      <div className="account-item-content">
        <div className="whitespace-nowrap!">{bankName}</div>
        <span className="label whitespace-nowrap!">شماره شبا</span>
        <span className="account-number">{iban}</span>
        <CustomTooltip
          title={
            <div>
              <div className="tooltip-item-container">
                <span className="title">نام بانک</span>{" "}
                <span className="value">{bankName}</span>
              </div>
              <div className="tooltip-item-container">
                <span className="title">شماره کارت</span>{" "}
                <span className="value">{accountNumber}</span>
              </div>
              <div className="tooltip-item-container">
                <span className="title">شماره شبا</span>{" "}
                <span className="value">{iban}</span>
              </div>
            </div>
          }
        >
          <AiOutlineInfoCircle className="info-icon" />
        </CustomTooltip>
      </div>
    </div>
  );
};

export default AccountSelectItem;

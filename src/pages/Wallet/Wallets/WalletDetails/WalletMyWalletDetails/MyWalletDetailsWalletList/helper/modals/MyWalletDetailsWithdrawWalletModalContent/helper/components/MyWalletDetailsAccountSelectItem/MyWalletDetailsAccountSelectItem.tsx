import { AiOutlineInfoCircle } from "react-icons/ai";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { MyWalletDetailsAccountSelectItemProps } from "./@types/@myWalletDetailsAccountSelectItemTypes";
import "./_myWalletDetailsAccountSelectItem.scss";

const MyWalletDetailsAccountSelectItem: React.FC<
  MyWalletDetailsAccountSelectItemProps
> = ({ accountNumber, bankName, iban }) => {
  return (
    <div className="my-wallet-details-account-select-item-container">
      <div className="account-item-content">
        <div className="whitespace-nowrap!">{bankName}</div>
        <span className="label whitespace-nowrap!">شماره شبا</span>
        <span className="account-number">{dataPlaceHolder({ data: iban })}</span>
        <CustomTooltip
          title={
            <div>
              <div className="tooltip-item-container">
                <span className="title">نام بانک</span>{" "}
                <span className="value">{dataPlaceHolder({ data: bankName })}</span>
              </div>
              <div className="tooltip-item-container">
                <span className="title">شماره کارت</span> <br />
                <span className="value">{dataPlaceHolder({ data: accountNumber })}</span>
              </div>
              <div className="tooltip-item-container">
                <span className="title">شماره شبا</span>{" "}
                <span className="value">{dataPlaceHolder({ data: iban })}</span>
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

export default MyWalletDetailsAccountSelectItem;

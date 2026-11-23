import { dataPlaceHolder } from "@infra/helpers/utils";

import { WalletDetailCardsProps } from "./@types/@walletDetailCards";
import "./_walletDetailCards.scss";
const WalletDetailCards = ({
  title,
  icon,
  price,
  centered,
  showCurrency = true,
  selected = false,
  className,
  onClick,
}: WalletDetailCardsProps) => {
  return (
    <div
      onClick={onClick ? () => onClick() : undefined}
      className={`wallet-detail-cards-container ${className ? className : ""} ${selected ? "wallet-selected" : ""} ${centered ? "centered" : ""}`}
    >
      <div className="title-container">
        {icon}
        <span>{dataPlaceHolder({ data: title })}</span>
      </div>
      <span className="price-text">
        {dataPlaceHolder({ data: price })} {showCurrency && "تومان"}
      </span>
    </div>
  );
};

export default WalletDetailCards;

import { AiOutlineExclamationCircle } from "react-icons/ai";

import { BusinessStatisticCardProps } from "./@types/@businessStatisticCard";
import "./_businessStatisticCard.scss";

const BusinessStatisticCard = ({
  title,
  count,
  currency,
  color,
  textColor,
}: BusinessStatisticCardProps) => {
  return (
    <div
      style={{ background: color, color: textColor }}
      className={`business-request-statistic-card-container`}
    >
      <div className="business-request-statistic-card-title-container">
        <h5>{title}</h5>
        <div className="icon-container">
          <AiOutlineExclamationCircle />
        </div>
      </div>
      <span>
        {count ? count : "-"} {currency ? currency : ""}
      </span>
    </div>
  );
};

export default BusinessStatisticCard;

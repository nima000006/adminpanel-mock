import { AiOutlineExclamationCircle } from "react-icons/ai";

import { StatisticCardProps } from "./@types/@statisticCard";
import "./_statisticCard.scss";

const StatisticCard = ({ title, count, customClass, currency }: StatisticCardProps) => {
  return (
    <div className={`dorm-residence-statistic-card-container ${customClass || ""}`}>
      <div className="icon-container">
        <AiOutlineExclamationCircle />
      </div>
      <h3 className="text text-light">{title}</h3>
      <span className="text text-dark">
        {count ? count : "-"} {currency ? currency : ""}
      </span>
    </div>
  );
};

export default StatisticCard;

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { AllWalletDetailsInfoCardProps } from "./@types/@allWalletDetailsInfoCardProps";
import "./_AllWalletDetailsInfoCard.scss";
const AllWalletDetailsInfoCard = ({
  title,
  value,
  tag,
  icon: Icon,
}: AllWalletDetailsInfoCardProps) => {
  return (
    <div className="all-wallet-details-info-card-container">
      <div className="info-card">
        <div className="info-card-icon">
          <Icon size={21} />
        </div>
        <div className="info-card-text">
          <span className="info-card-title">{title}</span>
          <div className="info-card-tag">
            <span className="info-card-value font-bold!">{value}</span>
            {tag && (
              <CustomTag color={tag.color} className="tag">
                <tag.icon size={16} />
                {dataPlaceHolder({ data: tag.text })}
              </CustomTag>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWalletDetailsInfoCard;

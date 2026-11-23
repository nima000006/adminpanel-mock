import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { MyWalletDetailsInfoCardProps } from "./@types/@myWalletDetailsInfoCardProps";
import "./_myWalletDetailsInfoCard.scss";
const MyWalletDetailsInfoCard = ({
  title,
  value,
  tag,
  icon: Icon,
}: MyWalletDetailsInfoCardProps) => {
  return (
    <div className="my-wallet-details-info-card-container">
      <div className="info-card">
        <div className="info-card-icon">
          <Icon size={21} />
        </div>
        <div className="info-card-text">
          <span className="info-card-title">{title}</span>
          <div className="info-card-tag">
            <span className="info-card-value font-bold">{value}</span>
            {tag && (
              <CustomTag color={tag.color} className="tag">
                <tag.icon size={16} />
                {dataPlaceHolder({ data: tag?.text })}
              </CustomTag>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWalletDetailsInfoCard;

import CustomSingleBadge from "@components/Renderers/CustomSingleBadge/CustomSingleBadge";

import { PreRegistrationCardProps } from "./@types/@preRegistrationCardType";
import "./_preRegistrationCard.scss";
const PreRegistrationCard = ({
  title,
  Icon,
  badge,
  badgeColor,
  badgeTitle,
  active,
  clickHandler,
}: PreRegistrationCardProps) => {
  return (
    <div className="requests-pre-registration-card-container" onClick={clickHandler}>
      <div
        className={`card-container ${active ? "active-card-container" : "inactive-card-container"}`}
      >
        {Icon ? <Icon fill={active ? "#096DD9" : "#8C8C8C"} /> : null}
        <h5 className="title">{title}</h5>
        {badge ? (
          <CustomSingleBadge status="processing" color={badgeColor} text={badgeTitle} />
        ) : null}
      </div>
    </div>
  );
};

export default PreRegistrationCard;

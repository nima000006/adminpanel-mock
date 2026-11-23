import CustomSingleBadge from "@components/Renderers/CustomSingleBadge/CustomSingleBadge";

import { DemandCardProps } from "./@types/@demandCard";

import "./_demandCard.scss";

const DemandCard = ({
  title,
  Icon,
  badge = false,
  badgeColor,
  badgeTitle,
  active,
  clickHandler,
  className,
}: DemandCardProps) => {
  return (
    <div
      className={`requests-demand-card-container ${
        active ? "text-primary-6" : "text-neutral-7"
      } ${className}`}
      onClick={clickHandler}
    >
      <div
        className={`card-container ${active ? "active-card-container" : "inactive-card-container"}`}
      >
        {Icon ? <Icon fill={active ? "#096DD9" : "#8C8C8C"} /> : null}
        <h5 className="title">{title}</h5>
        {badge ? (
          <CustomSingleBadge status="processing" color={badgeColor} text={badgeTitle} />
        ) : (
          <p className="title-without-badge">{badgeTitle}</p>
        )}
      </div>
    </div>
  );
};

export default DemandCard;

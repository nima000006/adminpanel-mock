import { ResidenceDetailMainCardProps } from "./@types/@residenceDetailMainCard";
import "./_residenceDetailMainCard.scss";

const ResidenceDetailMainCard = ({
  icon,
  text,
  active = false,
  ...props
}: ResidenceDetailMainCardProps) => {
  return (
    <div className="residence-detail-main-card-container" {...props}>
      <div className={`card ${active ? "active-mode" : "inactive-mode"}`}>
        {icon}
        <span className="title">{text}</span>
      </div>
    </div>
  );
};

export default ResidenceDetailMainCard;

import { Link } from "react-router";

import { LabelCardProps } from "./@types/@labelCardProps";
import "./_labelCard.scss";

const LabelCard = ({ title, linkLabel, to, prefix, className }: LabelCardProps) => {
  return (
    <div className={`label-card-component-container ${className}`}>
      <span className="title">{title}</span>
      <Link to={to} className="link">
        {prefix}
        {linkLabel}
      </Link>
    </div>
  );
};

export default LabelCard;

import { InfoBoxGroupProps } from "./@types/@infoBoxGroup";
import "./_infoBoxGroup.scss";
const InfoBoxGroup = ({ title, value, isPrice }: InfoBoxGroupProps) => {
  return (
    <div className="request-info-box-group">
      <div className="title">{title}</div>
      <div className="value">{isPrice ? `${value} تومان` : value}</div>
    </div>
  );
};

export default InfoBoxGroup;

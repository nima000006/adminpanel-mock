import { InfoBoxGroupProps } from "./@types/@infoBoxGroupProps";
import "./_infoBoxGroup.scss";

const InfoBoxGroup = ({ items }: InfoBoxGroupProps) => {
  return (
    <div className="accounting-info-box-group">
      <div className="accounting-info-box-group-grid">
        {items.map((item) => (
          <div key={item.title} className="accounting-info-box-group-item">
            <div className={`accounting-info-box-group-icon ${item.colorClass ?? ""}`}>
              {item.icon}
            </div>

            <span className="accounting-info-box-group-title">{item.title}</span>

            <span className="accounting-info-box-group-value">
              {typeof item.value === "number"
                ? item.value.toLocaleString("fa-IR")
                : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBoxGroup;

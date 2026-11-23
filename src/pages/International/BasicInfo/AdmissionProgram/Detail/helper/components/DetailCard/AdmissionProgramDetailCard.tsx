import { AdmissionProgramDetailCardProps } from "./@types/@admissionProgramDetailCard";
import "./_admissionProgramDetailCard.scss";

const AdmissionProgramDetailCard = ({
  title,
  Icon,
  active,
  clickHandler,
}: AdmissionProgramDetailCardProps) => {
  return (
    <div className="admission-program-detail-card-container" onClick={clickHandler}>
      <div
        className={`card-container ${active ? "active-card-container" : "inactive-card-container"}`}
      >
        <Icon fill={active ? "#096DD9" : "#8C8C8C"} />
        <h5 className="title">{title}</h5>
      </div>
    </div>
  );
};

export default AdmissionProgramDetailCard;

import BedIcon from "@assets/icons/Dorm/BedIcon";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";

import { DormBedSingleCardTitleProps } from "./@types/@dormBedSingleCardTitle";

const DormBedSingleCardTitle = ({
  title,
  statusId,
  statusTitle,
}: DormBedSingleCardTitleProps) => {
  return (
    <div className="dorm-single-card-title-container">
      <div className="header">
        <div className="icon-container">
          <BedIcon />
        </div>
        <CustomTag
          className="card-tag"
          color={statusId === 1 ? "green" : statusId === 2 ? "gold" : "red"}
        >
          {statusTitle}
        </CustomTag>
      </div>
      <h3 className="title">{title}</h3>
    </div>
  );
};

export default DormBedSingleCardTitle;

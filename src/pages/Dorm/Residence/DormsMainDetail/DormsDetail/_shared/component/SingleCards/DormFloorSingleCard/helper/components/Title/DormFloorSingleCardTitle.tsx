import FloorIcon from "@assets/icons/Dorm/FloorIcon";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";

import { DormFloorSingleCardTitleProps } from "./@types/@dormFloorSingleCardTitle";

const DormFloorSingleCardTitle = ({
  title,
  statusId,
  statusTitle,
}: DormFloorSingleCardTitleProps) => {
  return (
    <div className="dorm-single-card-title-container">
      <div className="header">
        <div className="icon-container">
          <FloorIcon />
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

export default DormFloorSingleCardTitle;

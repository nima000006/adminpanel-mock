import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";

import { DormBuildingSingleCardTitleProps } from "./@types/@dormBuildingSingleCardTitle";

const DormBuildingSingleCardTitle = ({
  title,
  statusId,
  statusTitle,
}: DormBuildingSingleCardTitleProps) => {
  return (
    <div className="dorm-single-card-title-container">
      <div className="header">
        <div className="icon-container">
          <BuildingIcon />
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

export default DormBuildingSingleCardTitle;

import RoomIcon from "@assets/icons/Dorm/RoomIcon";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";

import { DormRoomSingleCardTitleProps } from "./@types/@dormRoomSingleCardTitle";

const DormRoomSingleCardTitle = ({
  title,
  statusId,
  statusTitle,
}: DormRoomSingleCardTitleProps) => {
  return (
    <div className="dorm-single-card-title-container">
      <div className="header">
        <div className="icon-container">
          <RoomIcon />
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

export default DormRoomSingleCardTitle;

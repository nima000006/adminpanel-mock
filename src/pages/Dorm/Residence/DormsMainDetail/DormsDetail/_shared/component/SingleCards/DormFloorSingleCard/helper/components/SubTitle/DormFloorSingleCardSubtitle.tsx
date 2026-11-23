import CustomTag from "@components/Renderers/CustomTag/CustomTag";

import { DormFloorSingleCardSubTitleProps } from "./@types/@dormFloorSingleCardSubtitle";

const DormFloorSingleCardSubTitle = ({
  numberOfRooms,
  genderId,
  genderTitle,
}: DormFloorSingleCardSubTitleProps) => {
  return (
    <div className="dorm-single-card-subtitle-container">
      <div className="count-item">
        <span className="text">تعداد اتاق‌ها:</span>
        {numberOfRooms === 0 ? (
          <CustomTag color="red">تعریف نشده</CustomTag>
        ) : (
          <CustomTag>{numberOfRooms} اتاق</CustomTag>
        )}
      </div>

      <div className="count-item">
        <span className="text">جنسیت:</span>
        <CustomTag color={genderId === 1 ? "blue" : genderId === 2 ? "magenta" : ""}>
          {genderTitle}
        </CustomTag>
      </div>
    </div>
  );
};

export default DormFloorSingleCardSubTitle;

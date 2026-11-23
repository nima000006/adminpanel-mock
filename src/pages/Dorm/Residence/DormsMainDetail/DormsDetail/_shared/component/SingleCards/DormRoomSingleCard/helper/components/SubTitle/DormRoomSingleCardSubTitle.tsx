import CustomTag from "@components/Renderers/CustomTag/CustomTag";

import { DormRoomSingleCardSubTitleProps } from "./@types/@dormRoomSingleCardSubTitle";

const DormRoomSingleCardSubTitle = ({
  numberOfBeds,
  genderId,
  genderTitle,
}: DormRoomSingleCardSubTitleProps) => {
  return (
    <div className="dorm-single-card-subtitle-container">
      <div className="count-item">
        <span className="text">تعداد تخت‌ها:</span>
        {numberOfBeds === 0 ? (
          <CustomTag color="red">تعریف نشده</CustomTag>
        ) : (
          <CustomTag>{numberOfBeds} تخت</CustomTag>
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

export default DormRoomSingleCardSubTitle;

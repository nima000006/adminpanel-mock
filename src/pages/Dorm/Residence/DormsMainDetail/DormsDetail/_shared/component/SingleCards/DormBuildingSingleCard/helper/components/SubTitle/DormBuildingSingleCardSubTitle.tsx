import CustomTag from "@components/Renderers/CustomTag/CustomTag";

import { DormBuildingSingleCardSubTitleProps } from "./@types/@dormBuildingSingleCardSubTitle";

const DormBuildingSingleCardSubTitle = ({
  NumberOfFloors,
  genderId,
  genderTitle,
}: DormBuildingSingleCardSubTitleProps) => {
  return (
    <div className="dorm-single-card-subtitle-container">
      <div className="count-item">
        <span className="text">تعداد طبقات:</span>
        {NumberOfFloors === 0 ? (
          <CustomTag color="red">تعریف نشده</CustomTag>
        ) : (
          <CustomTag>{NumberOfFloors} طبقه</CustomTag>
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

export default DormBuildingSingleCardSubTitle;

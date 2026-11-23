import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";

import { DormBedSingleCardSubTitleProps } from "./@types/@dormBedSingleCardSubTitle";

const BED_RATE_CREATOR: Record<number, number> = {
  1: 3,
  2: 2,
  3: 1,
};

const DormBedSingleCardSubTitle = ({
  bedNumber,
  bedType,
  bedRate,
}: DormBedSingleCardSubTitleProps) => {
  return (
    <div className="dorm-single-card-subtitle-container">
      <div className="count-item">
        <span className="text">شماره تخت:</span>
        <span className="bed-count">{bedNumber}</span>
      </div>

      <div className="count-item">
        <span className="text">نوع تخت:</span>
        <CustomTag>{bedType}</CustomTag>
      </div>
      <div className="count-item">
        <span className="text">درجه کیفی:</span>
        <CustomRate
          allowHalf
          count={3}
          defaultValue={BED_RATE_CREATOR[bedRate]}
          disabled
        />
      </div>
    </div>
  );
};

export default DormBedSingleCardSubTitle;

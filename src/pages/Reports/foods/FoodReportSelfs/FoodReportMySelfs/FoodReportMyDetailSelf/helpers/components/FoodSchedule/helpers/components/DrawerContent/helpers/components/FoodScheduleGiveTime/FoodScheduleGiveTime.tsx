import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { MyFoodScheduleDetailData } from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesDetail/helper/components/FoodSchedule/@types/@foodScheduleTab";

const FoodScheduleGiveTime = ({ data }: { data: MyFoodScheduleDetailData | null }) => {
  return (
    <div className="time-info-row">
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="شروع تحویل (ساعت)"
          value={data?.fromDeliveryTime}
          isDate
          customDateFormat="HH:mm"
          hasSpecialTime
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="شروع تحویل (تاریخ)"
          value={data?.fromDeliveryTime}
          isDate
          hasSpecialTime
        />
      </Row>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="پایان تحویل (ساعت)"
          value={data?.toDeliveryTime}
          isDate
          customDateFormat="HH:mm"
          hasSpecialTime
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="پایان تحویل (تاریخ)"
          value={data?.toDeliveryTime}
          isDate
          hasSpecialTime
        />
      </Row>
    </div>
  );
};
export default FoodScheduleGiveTime;

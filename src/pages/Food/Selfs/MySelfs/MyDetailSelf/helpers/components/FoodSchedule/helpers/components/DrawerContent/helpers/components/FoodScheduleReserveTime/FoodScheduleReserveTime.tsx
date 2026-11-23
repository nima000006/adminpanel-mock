import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { MyFoodScheduleDetailData } from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesDetail/helper/components/FoodSchedule/@types/@foodScheduleTab";

const FoodScheduleReserveTime = ({ data }: { data: MyFoodScheduleDetailData | null }) => {
  return (
    <div className="time-info-row">
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="شروع رزرو (ساعت)"
          value={data?.startReservationDate}
          isDate
          customDateFormat="HH:mm - YYYY/M/D"
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="شروع رزرو (تاریخ)"
          value={data?.startReservationDate}
          isDate
          hasSpecialTime
        />
      </Row>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="پایان رزرو (ساعت)"
          value={data?.endReservationDate}
          isDate
          customDateFormat="HH:mm"
          hasSpecialTime
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="پایان رزرو (تاریخ)"
          value={data?.endReservationDate}
          isDate
          hasSpecialTime
        />
      </Row>
    </div>
  );
};

export default FoodScheduleReserveTime;

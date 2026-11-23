import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { FoodScheduleDetailData } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleDetail/helper/components/FoodSchedule/@types/@foodScheduleTab";

const FoodAllSelfDetailsScheduleDrawerInfoReserveTime = ({
  data,
}: {
  data: FoodScheduleDetailData | null;
}) => {
  return (
    <div className="time-info-row">
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="شروع رزرو (ساعت)"
          value={data?.startReservationDate}
          isDate
          customDateFormat="HH:mm"
          hasSpecialTime
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
export default FoodAllSelfDetailsScheduleDrawerInfoReserveTime;

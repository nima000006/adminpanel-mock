import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { FoodScheduleDetailData } from "../../../@types/@foodScheduleTab";

const AllFoodScheduleReservationTime = ({
  data,
}: {
  data: FoodScheduleDetailData | null;
}) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شروع رزرو (ساعت)"
        value={data?.startReservationDate}
        isDate
        customDateFormat="HH:mm"
        hasSpecialTime
      />

      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شروع رزرو (تاریخ)"
        value={data?.startReservationDate}
        isDate
        hasSpecialTime
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="پایان رزرو (ساعت)"
        value={data?.endReservationDate}
        isDate
        customDateFormat="HH:mm"
        hasSpecialTime
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="پایان رزرو (تاریخ)"
        value={data?.endReservationDate}
        isDate
        hasSpecialTime
      />
    </Row>
  );
};
export default AllFoodScheduleReservationTime;

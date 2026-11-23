import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { FoodScheduleDetailData } from "../../../@types/@foodScheduleTab";

const AllFoodScheduleDeliverTime = ({
  data,
}: {
  data: FoodScheduleDetailData | null;
}) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شروع تحویل (ساعت)"
        value={data?.fromDeliveryTime}
        isDate
        customDateFormat="HH:mm"
        hasSpecialTime
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شروع تحویل (تاریخ)"
        value={data?.fromDeliveryTime}
        isDate
        hasSpecialTime
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="پایان تحویل (ساعت)"
        value={data?.toDeliveryTime}
        isDate
        customDateFormat="HH:mm"
        hasSpecialTime
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="پایان تحویل (تاریخ)"
        value={data?.toDeliveryTime}
        isDate
        hasSpecialTime
      />
    </Row>
  );
};
export default AllFoodScheduleDeliverTime;

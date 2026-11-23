import { useEffect } from "react";

import { Col, Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { useLazyGetDormResidenceRoomCapacityQuery } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import StatisticCard from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/StatisticCard/StatisticCard";

const RoomStatistics = ({ id }: { id: number | undefined }) => {
  //? ================================  Api Calls ================================
  const [
    getRoomCapacity,
    { data: roomCapacityData, isFetching: isRoomCapacityDataLoading },
  ] = useLazyGetDormResidenceRoomCapacityQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getRoomCapacity({ id_EQ: id, firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      <CustomDivider text="آمار" />
      <Div loading={isRoomCapacityDataLoading}>
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <StatisticCard
              title="کل تخت‌ها"
              count={roomCapacityData?.data?.[0]?.bedCountInRoom}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <StatisticCard
              title="تخت‌های فعال"
              count={roomCapacityData?.data?.[0]?.ActiveBedsInRoom}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <StatisticCard
              title="ظرفیت رزرو شده"
              count={roomCapacityData?.data?.[0]?.fullBedsInRoom}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <StatisticCard
              title="ظرفیت قابل رزرو"
              count={roomCapacityData?.data?.[0]?.OpenBedsInRoom}
            />
          </Col>
        </Row>
      </Div>
    </>
  );
};
export default RoomStatistics;

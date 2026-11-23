import { useEffect } from "react";

import { Col, Row } from "antd";

import Div from "@components/Renderers/Div/Div";
import { useLazyGetDormResidenceFloorCapacityQuery } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import StatisticCard from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/StatisticCard/StatisticCard";

const FloorDetailStatistics = ({ id }: { id: number }) => {
  //? ================================  Api Calls ================================
  const [getStatisticsInfo, { data, isFetching }] =
    useLazyGetDormResidenceFloorCapacityQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getStatisticsInfo({ firstResult: 0, maxResults: 2000, id_EQ: id }); //we should set 0 and 2000 to get data
    }
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isFetching}>
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={12} xs={24}>
          <StatisticCard title="کل تخت‌ها" count={data?.data?.[0]?.bedCountInFloor} />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <StatisticCard
            title="تخت‌های فعال"
            count={data?.data?.[0]?.ActiveBedsInFloor}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <StatisticCard
            title="ظرفیت رزرو شده"
            count={data?.data?.[0]?.fullBedsInFloor}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <StatisticCard
            title="ظرفیت قابل رزرو"
            count={data?.data?.[0]?.OpenBedsInFloor}
          />
        </Col>
      </Row>
    </Div>
  );
};

export default FloorDetailStatistics;

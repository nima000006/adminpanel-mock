import { useEffect } from "react";

import { Col, Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { useLazyGetDormResidenceBuildingCapacityQuery } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import StatisticCard from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/StatisticCard/StatisticCard";

const BuildingDetailStatistics = ({ id }: { id: number }) => {
  //? ================================  Api Calls ================================
  const [getStatisticsInfo, { data, isFetching }] =
    useLazyGetDormResidenceBuildingCapacityQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getStatisticsInfo({ id_EQ: id, firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    }
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isFetching}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomDivider text="آمار" />
        </Col>
        <Col>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <StatisticCard
                title="کل تخت‌ها"
                count={data?.data?.[0]?.bedCountInBuilding}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <StatisticCard
                title="تخت‌های فعال"
                count={data?.data?.[0]?.ActiveBedsInBuilding}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <StatisticCard
                title="ظرفیت رزرو شده"
                count={data?.data?.[0]?.fullBedsInBuilding}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <StatisticCard
                title="ظرفیت قابل رزرو"
                count={data?.data?.[0]?.OpenBedsInBuilding}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Div>
  );
};

export default BuildingDetailStatistics;

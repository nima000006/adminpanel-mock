import { useEffect, useState } from "react";

import { Row, Col } from "antd";

import Div from "@components/Renderers/Div/Div";
import { makeSearchParams } from "@infra/helpers/utils";
import { MY_REPORT_DETAIL_PAGE_ROUTE } from "@infra/router/routes/reports";
import { useLazyMyReportAllQuery } from "@infra/states/redux/Apis/report/myReport";
import { ReportListItem } from "@pages/Reports/myReport/@types/@myReportTypes";

import MyReportStatCard from "../shared/components/MyReportStatCard/MyReportStatCard";

const MyReportDynamicReports = () => {
  const [reports, setReports] = useState<ReportListItem[]>([]);

  //? ================================ Api ================================
  const [getReports, { isLoading: isGetReportsLoading }] = useLazyMyReportAllQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getReports({ typeId: 2 }) // we need set 2 as a param for dynamic report tab
      .unwrap()
      .then((res) => setReports(res))
      .catch(() => setReports([]));
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isGetReportsLoading} className="mt-10!">
      <Row gutter={[16, 16]}>
        {reports?.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <MyReportStatCard
              title={item?.title}
              information={
                <span className="flex items-center gap-2">
                  <p>تعداد گزارشات</p>
                  <h3 className="text-xl font-bold">{item?.counts}</h3>
                </span>
              }
              link={{
                pathname: MY_REPORT_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({ id: item?.id, title: item?.title }),
              }}
            />
          </Col>
        ))}
      </Row>
    </Div>
  );
};

export default MyReportDynamicReports;

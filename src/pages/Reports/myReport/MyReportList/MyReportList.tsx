import { useState } from "react";

import { Row, Col } from "antd";
import { PiTable, PiChartLineDuotone } from "react-icons/pi";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";

import MyReportDynamicReports from "./helper/components/MyReportDynamicReports/MyReportDynamicReports";
import MyReportStatisticalReports from "./helper/components/MyReportStatisticalReports/MyReportStatisticalReports";
import "./_myReportList.scss";

const MyReportsList = () => {
  useTitle({ text: "گزارش ها" });

  const [activeTab, setActiveTab] = useState<"dynamic" | "stat">("dynamic");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="general-report-container">
      <Row gutter={[16, 16]}>
        <Col xl={12} lg={12} md={12} sm={24}>
          <DemandCard
            title="گزارشات پویا"
            Icon={PiTable}
            active={activeTab === "dynamic"}
            badge={false}
            clickHandler={() => setActiveTab("dynamic")}
          />
        </Col>
        <Col xl={12} lg={12} md={12} sm={24}>
          <DemandCard
            title="گزارشات آماری"
            Icon={PiChartLineDuotone}
            active={activeTab === "stat"}
            badge={false}
            clickHandler={() => setActiveTab("stat")}
          />
        </Col>
      </Row>
      {activeTab === "dynamic" && <MyReportDynamicReports />}
      {activeTab === "stat" && <MyReportStatisticalReports />}
    </div>
  );
};

export default MyReportsList;

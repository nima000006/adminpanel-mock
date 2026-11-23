import { useEffect, useState } from "react";

import { Col, Row } from "antd";

import Div from "@components/Renderers/Div/Div";
import {
  MY_REPORT_DORM_STATIC_PAGE_ROUTE,
  MY_REPORT_FOOD_STATIC_PAGE_ROUTE,
  MY_REPORT_MY_DOCTOR_STATIC_PAGE_ROUTE,
} from "@infra/router/routes/reports";
import { useLazyMyReportAllQuery } from "@infra/states/redux/Apis/report/myReport";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import { ReportListItem } from "@pages/Reports/myReport/@types/@myReportTypes";

import { ReportCardItem } from "./@types/ReportCardItem";
import MyReportStatCard from "../shared/components/MyReportStatCard/MyReportStatCard";

const routeMap: Record<string, string> = {
  ROOM: MY_REPORT_DORM_STATIC_PAGE_ROUTE,
  FOOD: MY_REPORT_FOOD_STATIC_PAGE_ROUTE,
  MY_DOCTOR: MY_REPORT_MY_DOCTOR_STATIC_PAGE_ROUTE,
  SURVEY: MY_REPORT_MY_DOCTOR_STATIC_PAGE_ROUTE,
};

const gradientMap: Record<string, string> = {
  purple: "bg-dormitory-gradient",
  lime: "bg-food-gradient",
  cyan: "bg-doctor-gradient",
};

const getBgClass = (color?: string) =>
  color ? gradientMap[color] || "bg-gray-400" : "bg-gray-400";
//? =======================================================================

const MyReportStatisticalReports = () => {
  const [reports, setReports] = useState<ReportListItem[]>([]);

  //? ================================  Api Calls ================================
  const [getReports, { isLoading: isGetReportsLoading }] = useLazyMyReportAllQuery();

  //? ================================  Effects ================================
  useEffect(() => {
    getReports({ typeId: 1 })
      .unwrap()
      .then(setReports)
      .catch(() => setReports([]));
  }, []);
  // ================================  Util functions ================================

  // ساخت کارت‌های تایپ‌شده
  const mergedReports: ReportCardItem[] = reports
    ?.map((item): ReportCardItem | null => {
      const service = serviceOptions.find((s) => s.value === item.service);
      if (!service) return null;

      return {
        id: item.id,
        title: service.title,
        icon: service.icon,
        isIconSvg: service.isSvg ? true : false,
        bgColor: getBgClass(service.color),
        link: routeMap[item.service] ?? "#",
        counts: item.counts,
      };
    })
    .filter((x): x is ReportCardItem => x !== null); // Type narrowing

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  return (
    <Div loading={isGetReportsLoading}>
      <Row gutter={[16, 16]} className="mt-10!">
        {mergedReports.map((card) => (
          <Col key={card.id} xs={24} sm={12} md={8} lg={6}>
            <MyReportStatCard
              title={card.title}
              icon={
                card?.isIconSvg ? (
                  <img src={card.icon as string} alt={card.title} className="h-5 w-5" />
                ) : (
                  <card.icon />
                )
              }
              bgColor={card.bgColor}
              link={card.link}
            />
          </Col>
        ))}
      </Row>
    </Div>
  );
};

export default MyReportStatisticalReports;

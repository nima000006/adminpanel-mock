import { useEffect, useMemo, useState } from "react";

import { Col, Collapse, CollapseProps, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiChartBar } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetAllBusinessRequestsQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import {
  GOLD_1,
  GOLD_7,
  GREEN_01,
  GREEN_07,
  NEUTRAL_02,
  NEUTRAL_07,
  RED_1,
  RED_7,
} from "@infra/VARS/globalColors/globalColors";

import {
  BusinessRequestTable,
  GetAllBusinessRequestsParams,
} from "./@types/@businessRequestListType";
import BusinessStatisticCard from "./helper/components/BusinessStatisticCard/BusinessStatisticCard";
import BusinessRequestsTableModel from "./helper/models/BusinessRequestsTableModel";

import "./_businessRequest.scss";

const BusinessRequests = () => {
  useTitle({ text: "درخواست ها" });
  const { params: url, setSearchParams } = useQueryParams();
  const [reports, setReports] = useState<BusinessRequestTable[]>([]);
  const rawPageSize = Number(url?.pageSize || 3);
  const pageSize = rawPageSize >= 4 ? 3 : rawPageSize;

  const pageNumber = url?.page ? Number(url.page) - 1 : 0;

  const params: GetAllBusinessRequestsParams = {
    pageNumber,
    pageSize,
  };
  //? ================================ Api ================================

  const {
    data: requestListData,
    isLoading: isRequestListDataLoading,
    isError,
  } = useGetAllBusinessRequestsQuery(params);
  //? ================================ Effects ================================
  useEffect(() => {
    if (!isRequestListDataLoading && !isError && requestListData?.content) {
      const flatData = requestListData.content.flat();
      setReports(flatData);
    }
  }, [requestListData, isRequestListDataLoading, isError]);

  // ================================ Util function ================================
  const statusCounts = useMemo(() => {
    const counts = {
      pending: 0,
      accepted: 0,
      rejected: 0,
      returned: 0,
    };

    reports.forEach((item) => {
      const status = item.status?.trim();

      switch (status) {
        case "در انتظار بررسی":
        case "در انتظار بررسی مجدد":
          counts.pending++;
          break;
        case "تأیید شده":
          counts.accepted++;
          break;
        case "رد شده":
          counts.rejected++;
          break;
        case "عودت شده":
          counts.returned++;
          break;
      }
    });

    return counts;
  }, [reports]);
  // ================================ Components ================================
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="custom-label">
          <span>آمار</span>
          <PiChartBar />
        </div>
      ),
      children: (
        <Row gutter={[16, 16]}>
          <Col lg={6} sm={8} xs={12}>
            <BusinessStatisticCard
              color={NEUTRAL_02}
              textColor={NEUTRAL_07}
              title={"در انتظار بررسی"}
              count={statusCounts.pending.toLocaleString("fa-IR")}
            />
          </Col>
          <Col lg={6} sm={8} xs={12}>
            <BusinessStatisticCard
              color={GREEN_01}
              textColor={GREEN_07}
              title={"تأیید شده"}
              count={statusCounts.accepted.toLocaleString("fa-IR")}
            />
          </Col>
          <Col lg={6} sm={8} xs={12}>
            <BusinessStatisticCard
              color={RED_1}
              textColor={RED_7}
              title={"رد شده"}
              count={statusCounts.rejected.toLocaleString("fa-IR")}
            />
          </Col>
          <Col lg={6} sm={8} xs={12}>
            <BusinessStatisticCard
              color={GOLD_1}
              textColor={GOLD_7}
              title={"عودت شده"}
              count={statusCounts.returned.toLocaleString("fa-IR")}
            />
          </Col>
        </Row>
      ),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Div className="business-request-static-collapse-container">
        <Collapse
          expandIcon={({ isActive }) => (
            <IoIosArrowDown
              rotate={isActive ? 0 : 180}
              className="business-request-static-collapse"
            />
          )}
          ghost
          items={items}
          defaultActiveKey={1}
        />
      </Div>
      <div className="business-request-static-table-container">
        <ToolBox
          className="business-request-actions-container"
          rightSide={
            <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
          }
          leftSide={<CustomButton disabled> گزارش اکسل</CustomButton>}
        />
        <CustomTable
          draggableColumns
          draggableId={ExcelCodes.BUSINESS_BUSINESS_REQUESTS_TABLE}
          loading={isRequestListDataLoading}
          dataSource={reports}
          columns={BusinessRequestsTableModel()}
          pagination={manualPaginationConfig({
            total: requestListData?.content.length,
            onChange: (page, pageSize) => {
              const safePageSize = pageSize >= 4 ? 3 : pageSize;

              setSearchParams({
                ...url,
                page: page.toString(),
                pageSize: safePageSize.toString(),
              });
            },
            pageNumber: pageNumber + 1,
            defaultPageSize: pageSize,
          })}
          rowKey="id"
          {...TABLE_PROPS(requestListData?.totalElements || 0)}
        />
      </div>
    </>
  );
};

export default BusinessRequests;

import { useEffect } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { SupplementaryPunishmentModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SupplementaryPunishment/SupplementaryPunishmentModel";
import {
  COMMITTEE_NEW_SUPPLEMENTARY_PUNISHMENT_PAGE_ROUTE,
  COMMITTEE_SUPPLEMENTARY_PUNISHMENT_TABS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetReportsAdditionalPunishmentCountQuery,
  useLazyGetReportsAdditionalPunishmentQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import "./_supplementaryPunishmentList.scss";

const SupplementaryPunishmentList = () => {
  useTitle({ text: "لیست تنبیهات تکمیلی" });

  const navigate = useNavigate();
  const title = "ایجاد تنبیه تکمیلی";

  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getReports, { data: reportsData, isFetching: isReportDataLoading }] =
    useLazyGetReportsAdditionalPunishmentQuery();

  const [
    getReportsCount,
    { data: reportsDataCount, isFetching: isReportDataCountLoading },
  ] = useLazyGetReportsAdditionalPunishmentCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getReports({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
    });
    getReportsCount(0);
  }, [url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  const viewClickHandler = (id: number) => {
    navigate(`${COMMITTEE_SUPPLEMENTARY_PUNISHMENT_TABS_PAGE_ROUTE}?id=${id}`);
  };
  const makeNewPunishmentHandler = () => {
    navigate(`${COMMITTEE_NEW_SUPPLEMENTARY_PUNISHMENT_PAGE_ROUTE}?title=${title}`);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-supplementary-punishment-container">
      <div className="btn-wrapper">
        <Button type="primary" icon={<AiOutlineFilter />} size="middle" className="btn">
          فیلتر پیشرفته
        </Button>
        <Button type="primary" ghost className="btn" onClick={makeNewPunishmentHandler}>
          ایجاد تنبیه تکمیلی جدید
        </Button>
      </div>
      <CustomTable
        loading={isReportDataLoading || isReportDataCountLoading}
        dataSource={reportsData?.data}
        columns={SupplementaryPunishmentModel({
          viewClickHandler: viewClickHandler,
        })}
        pagination={manualPaginationConfig({
          total: reportsDataCount?.data,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...url,
              page: page?.toString(),
              pageSize: pageSize?.toString(),
            });
          },
          pageNumber: url?.page ? Number(url?.page) : 1,
          defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        })}
        rowKey="id"
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(reportsData?.data?.length || 0)}
        className="supplementary-punishment-table-container"
      />
    </div>
  );
};
export default SupplementaryPunishmentList;

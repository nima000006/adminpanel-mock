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
  COMMITTEE_AGGRAVATION_CAUSE_TABS_PAGE_ROUTE,
  COMMITTEE_NEW_AGGRAVATION_CAUSE_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useGetAggravationCauseCountQuery,
  useLazyGetAggravationCauseQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import "./_aggravationCauseList.scss";

const AggravationCauseList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  const title = "ایجاد عامل تشدید جدید";
  const navigate = useNavigate();

  useTitle({ text: "لیست عوامل تشدید" });

  //? ================================  Api Calls ================================
  const [getReports, { data: reportsData, isFetching: isReportDataLoading }] =
    useLazyGetAggravationCauseQuery();

  const { data: reportsDataCount, isLoading: isReportDataCountLoading } =
    useGetAggravationCauseCountQuery(0);

  //? ================================ Effects ================================
  useEffect(() => {
    getReports({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
    });
  }, [url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  const viewClickHandler = (id: number) => {
    navigate(`${COMMITTEE_AGGRAVATION_CAUSE_TABS_PAGE_ROUTE}?id=${id}`);
  };
  const makeNewAggravationCauseHandler = () => {
    navigate(`${COMMITTEE_NEW_AGGRAVATION_CAUSE_PAGE_ROUTE}?title=${title}`);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-aggravation-cause-list-container">
      <div className="btn-wrapper">
        <Button
          type="primary"
          icon={<AiOutlineFilter />}
          size="middle"
          className="btn"
          // onClick={onClickHomeActionBarFilter}
        >
          فیلتر پیشرفته
        </Button>
        <Button
          type="primary"
          ghost
          className="btn"
          onClick={makeNewAggravationCauseHandler}
        >
          ایجاد عامل تشدید جدید
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
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(reportsData?.data?.length || 0)}
        className="aggravation-cause-list-table-container"
      />
    </div>
  );
};
export default AggravationCauseList;

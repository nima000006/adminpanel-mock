import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { TimingInfoModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/TimingInfo/TimingInfoModel";
import {
  COMMITTEE_NEW_TIMING_INFO_PAGE_ROUTE,
  COMMITTEE_TIMING_INFO_TABS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetTimingInfosListCountQuery,
  useLazyGetTimingInfosListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import "./_timingInfoList.scss";

const TimingInfoList = () => {
  const navigate = useNavigate();
  useTitle({ text: "لیست مدت های زمانی" });

  const [currentPageMode] = useState<"normal" | "filter">("normal");
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getTimingInfos,
    { data: timingInfosData, isFetching: isTimingInfosDataLoading },
  ] = useLazyGetTimingInfosListQuery();

  const [
    getTimingInfosCount,
    { data: timingInfosDataCount, isFetching: isTimingInfosDataCountLoading },
  ] = useLazyGetTimingInfosListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getTimingInfos({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
    });
    getTimingInfosCount(0);
  }, [url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const viewClickHandler = (id: number) => {
    navigate({
      pathname: COMMITTEE_TIMING_INFO_TABS_PAGE_ROUTE,
      search: makeSearchParams({ id }),
    });
  };

  const makeNewTimingInfoHandler = () => {
    navigate({
      pathname: COMMITTEE_NEW_TIMING_INFO_PAGE_ROUTE,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-timing-info-list-page-container">
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
        <Button type="primary" ghost className="btn" onClick={makeNewTimingInfoHandler}>
          ایجاد مدت زمانی جدید
        </Button>
      </div>
      <CustomTable
        loading={isTimingInfosDataLoading || isTimingInfosDataCountLoading}
        dataSource={timingInfosData?.data}
        columns={TimingInfoModel({
          viewClickHandler: viewClickHandler,
        })}
        rowKey="id"
        pagination={manualPaginationConfig({
          total:
            currentPageMode === "normal"
              ? timingInfosDataCount?.data
              : timingInfosDataCount?.data,

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
        {...TABLE_PROPS(timingInfosData?.data?.length || 0)}
        className="timing-info-list-table-container"
      />
    </div>
  );
};
export default TimingInfoList;

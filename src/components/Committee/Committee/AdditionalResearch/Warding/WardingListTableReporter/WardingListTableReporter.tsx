import { memo, useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import {} from "../../../../../../infrastructure/helpers/TableHelpers/TableHelpers";
import useQueryParams from "@infra/hooks/useQueryParams";

import manualPaginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "../../../../../../infrastructure/helpers/utils";
import { WardingListReporterModel } from "../../../../../../infrastructure/models/tableModels/CommitteeTableModel/AdditionalResearch/Warding/WardingListReporterModel";
import {
  COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_RECORD_REPORT_PAGE_ROUTE,
  COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
} from "../../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetAdditionalResearchWardingCountQuery,
  useLazyGetAdditionalResearchWardingListQuery,
} from "../../../../../../infrastructure/states/redux/Apis/committee/additionalResearch/additionalResearchApi";
import { COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REGISTERED } from "../../../../../../pages/Committee/AdditionalResearch/Warding/WardingListTabs/@types/@wardingListTabs";
import {
  AdditionalResearchWardingList,
  GetAdditionalResearchWardingListResponse,
} from "../../ResearchChancellor/ResearchChancellorListTableAccused/@types/@researchChancellorListTableAccused";

import "./_wardingListTableReporter.scss";

const WardingListTableReporter = memo(({ type }: { type: 2 | 3 }) => {
  const navigate = useNavigate();

  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<AdditionalResearchWardingList[]>([]);
  const [currentPageMode] = useState<"normal" | "filter">("normal");

  //? ================================  Api Calls ================================
  // get table content from api
  const [
    getAdditionalResearchWardingList,
    { isFetching: isAdditionalResearchWardingListLoading },
  ] = useLazyGetAdditionalResearchWardingListQuery();

  // get the count of table rows
  const [
    getAdditionalResearchWardingListCount,
    {
      data: additionalResearchWardingListCountData,
      isFetching: isAdditionalResearchWardingListCountLoading,
    },
  ] = useLazyGetAdditionalResearchWardingCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getMainData();
  }, [type, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const onGetAdditionalResearchWardingLisSuccess = async (
    values: GetAdditionalResearchWardingListResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const getMainData = () => {
    // get main list data
    getAdditionalResearchWardingList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: type,
    })
      .unwrap()
      .then(onGetAdditionalResearchWardingLisSuccess);

    // get counts
    getAdditionalResearchWardingListCount({ type: type });
  };

  // new report btn handler
  const newReportHandler = () => {
    navigate({
      pathname: COMMITTEE_ADDITIONAL_RESEARCH_WARDING_RECORD_REPORT_PAGE_ROUTE,
    });
  };

  const checkClickHandler = (value: number, isAccusation: boolean | null) => {
    if (value) {
      if (isAccusation) {
        navigate({
          pathname: COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
          search: makeSearchParams({ id: value, isFromWarding: true, type }),
        });
      } else {
        navigate({
          pathname: COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
          search: makeSearchParams({ id: value, isFromWarding: true, type }),
        });
      }
    }
  };
  const archiveView = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-additional-research-warding-list-table-reporter-container">
      <div className="btn-wrapper">
        <div className="register-archive-btn-wrapper">
          <Button type="primary" ghost onClick={newReportHandler} className="font-btn">
            ثبت گزارش جدید
          </Button>
          {type === COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REGISTERED ? (
            <Button
              type="primary"
              ghost
              onClick={archiveView}
              className="font-btn"
              disabled
            >
              مشاهده آرشیو
            </Button>
          ) : null}
        </div>
        <Button
          type="primary"
          icon={<AiOutlineFilter />}
          // onClick={advanceFilterHandler}
          className="advance-filter-btn font-btn"
        >
          فیلتر پیشرفته
        </Button>
      </div>
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        loading={
          isAdditionalResearchWardingListLoading ||
          isAdditionalResearchWardingListCountLoading
        }
        columns={WardingListReporterModel({
          checkClickHandler: checkClickHandler,
          type,
        })}
        pagination={manualPaginationConfig({
          total:
            currentPageMode === "normal"
              ? additionalResearchWardingListCountData?.data
              : additionalResearchWardingListCountData?.data,
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
        {...TABLE_PROPS(dataSource?.length)}
        className="additional-research-warding-list-table-reporter"
      />
    </div>
  );
});
WardingListTableReporter.displayName = "WardingListTableReporter";
export default WardingListTableReporter;

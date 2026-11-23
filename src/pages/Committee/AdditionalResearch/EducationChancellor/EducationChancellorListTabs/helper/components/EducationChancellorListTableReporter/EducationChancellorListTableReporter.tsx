import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import {
  AdditionalResearchWardingList,
  GetAdditionalResearchWardingListResponse,
} from "@components/Committee/Committee/AdditionalResearch/ResearchChancellor/ResearchChancellorListTableAccused/@types/@researchChancellorListTableAccused";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import { EducationListReporterModel } from "@infra/models/tableModels/CommitteeTableModel/AdditionalResearch/EducationChancellor/EducationListReporterModel";
import {
  COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
  COMMITTEE_ADDITIONAL_RESEARCH_EDUCATION_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
  COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/committee";
import {
  useLazyGetAdditionalResearchWardingCountQuery,
  useLazyGetAdditionalResearchWardingListQuery,
} from "@infra/states/redux/Apis/committee/additionalResearch/additionalResearchApi";
import { COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REGISTERED } from "@pages/Committee/AdditionalResearch/Warding/WardingListTabs/@types/@wardingListTabs";
import "./_educationChancellorListTableReporter.scss";

const EducationChancellorListTableReporter = ({ type }: { type: 2 | 3 }) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<AdditionalResearchWardingList[]>([]);
  const [currentPageMode] = useState<"normal" | "filter">("normal");

  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  // get table content
  const [
    getAdditionalResearchWardingList,
    { isFetching: isAdditionalResearchWardingListLoading },
  ] = useLazyGetAdditionalResearchWardingListQuery();

  // get the count of table rows
  const [
    getAdditionalResearchWardingListCount,
    {
      data: additionalResearchWardingListCountData,
      isLoading: isAdditionalResearchWardingListCountLoading,
    },
  ] = useLazyGetAdditionalResearchWardingCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [type, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const onGetAdditionalResearchWardingLisSuccess = async (
    values: GetAdditionalResearchWardingListResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const getListData = () => {
    getAdditionalResearchWardingList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: type,
    })
      .unwrap()
      .then(onGetAdditionalResearchWardingLisSuccess);

    // get list count
    getAdditionalResearchWardingListCount({ type: type });
  };

  // new report btn handler
  const newReportHandler = () => {
    navigate({
      pathname:
        COMMITTEE_ADDITIONAL_RESEARCH_EDUCATION_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
    });
  };

  const checkClickHandler = (value: number, isAccusation: boolean | null) => {
    if (value) {
      if (isAccusation) {
        navigate({
          pathname: COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
          search: makeSearchParams({ id: value, isEducation: true, type }),
        });
      } else {
        navigate({
          pathname: COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
          search: makeSearchParams({ id: value, isEducation: true, type }),
        });
      }
    }
  };
  const archiveView = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-additional-research-education-chancellor-list-table-reporter-container">
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
        columns={EducationListReporterModel({
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
        className="additional-research-education-chancellor-list-table-reporter"
      />
    </div>
  );
};
export default EducationChancellorListTableReporter;

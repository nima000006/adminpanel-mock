import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import manualPaginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "../../../../../../infrastructure/helpers/utils";
import { ResearchChancellorReporterModel } from "../../../../../../infrastructure/models/tableModels/CommitteeTableModel/AdditionalResearch/ResearchChancellor/ResearchChancellorReporterModel";
import {
  COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
  COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
  COMMITTEE_RESEARCH_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
} from "../../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetResearchChancellorCountQuery,
  useLazyGetResearchChancellorListQuery,
} from "../../../../../../infrastructure/states/redux/Apis/committee/additionalResearch/additionalResearchApi";
import { COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REGISTERED } from "../../../../../../pages/Committee/AdditionalResearch/Warding/WardingListTabs/@types/@wardingListTabs";
import {
  AdditionalResearchWardingList,
  GetAdditionalResearchWardingListResponse,
} from "../ResearchChancellorListTableAccused/@types/@researchChancellorListTableAccused";
import "./_researchChancellorListTableReporter.scss";

const ResearchChancellorListTableReporter = ({ type }: { type: 2 | 3 }) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<AdditionalResearchWardingList[]>([]);
  const [currentPageMode] = useState<"normal" | "filter">("normal");

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  // get table content
  const [getResearchChancellorList, { isFetching: isResearchChancellorListLoading }] =
    useLazyGetResearchChancellorListQuery();

  // get the count of table rows
  const [
    getResearchChancellorListCount,
    {
      data: researchChancellorListCountData,
      isFetching: isResearchChancellorListCountLoading,
    },
  ] = useLazyGetResearchChancellorCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [type, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  // this function runs if request is success.
  const onGetResearchChancellorLisSuccess = async (
    values: GetAdditionalResearchWardingListResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const getListData = () => {
    // get main list data
    getResearchChancellorList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: type,
    })
      .unwrap()
      .then(onGetResearchChancellorLisSuccess);

    // get list count
    getResearchChancellorListCount({ type: type });
  };

  // new report btn handler
  const newReportHandler = () => {
    navigate({
      pathname: COMMITTEE_RESEARCH_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
    });
  };

  const checkClickHandler = (value: number, isAccusation: boolean | null) => {
    if (value) {
      if (!isAccusation) {
        navigate({
          pathname: COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
          search: makeSearchParams({
            id: value,
            type,
            isResearchChancellor: true,
          }),
        });
      } else {
        navigate({
          pathname: COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
          search: makeSearchParams({
            id: value,
            type,
            isResearchChancellor: true,
          }),
        });
      }
    }
  };
  const archiveView = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-research-chancellor-list-table-reporter-container">
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
        loading={isResearchChancellorListLoading || isResearchChancellorListCountLoading}
        columns={ResearchChancellorReporterModel({
          checkClickHandler: checkClickHandler,
          type,
        })}
        pagination={manualPaginationConfig({
          total:
            currentPageMode === "normal"
              ? researchChancellorListCountData?.data
              : researchChancellorListCountData?.data,
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
        className="research-chancellor-list-table-reporter"
        draggableColumns
        draggableId={ExcelCodes.COMMITTEE_EDUCATION_CHANCELLOR_LIST_TABLE_REPORTER_TABLE}
      />
    </div>
  );
};
export default ResearchChancellorListTableReporter;

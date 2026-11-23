import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import {
  AdditionalResearchWardingList,
  GetAdditionalResearchWardingListResponse,
} from "./@types/@researchChancellorListTableAccused";
import manualPaginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "../../../../../../infrastructure/helpers/utils";
import { ResearchChancellorAccusationModel } from "../../../../../../infrastructure/models/tableModels/CommitteeTableModel/AdditionalResearch/ResearchChancellor/ResearchChancellorAccusationModel";
import {
  COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
  COMMITTEE_RESEARCH_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
  COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
} from "../../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetResearchChancellorCountQuery,
  useLazyGetResearchChancellorListQuery,
} from "../../../../../../infrastructure/states/redux/Apis/committee/additionalResearch/additionalResearchApi";
import {
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_CLOSED,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REFERRED,
} from "../../../../../../pages/Committee/AdditionalResearch/Warding/WardingListTabs/@types/@wardingListTabs";

import "./_researchChancellorListTableAccused.scss";

const ResearchChancellorListTableAccused = ({
  type,
}: {
  type: 1 | 4 | 5 | 6 | "1,2,3,4,5,6";
}) => {
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
    // get list data
    getResearchChancellorList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: type,
    })
      .unwrap()
      .then(onGetResearchChancellorLisSuccess);

    // get list counts
    getResearchChancellorListCount({ type: type });
  };

  // check btn
  const checkClickHandler = (value: number, isAccusation: boolean | null) => {
    if (value) {
      if (isAccusation) {
        navigate({
          pathname: COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
          search: makeSearchParams({
            id: value,
            type,
            isResearchChancellor: true,
          }),
        });
      } else {
        navigate({
          pathname: COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
          search: makeSearchParams({
            id: value,
            type,
            isResearchChancellor: true,
          }),
        });
      }
    }
  };

  // new report btn handler
  const newReportHandler = () => {
    navigate({
      pathname: COMMITTEE_RESEARCH_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
    });
  };
  const archiveView = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-research-chancellor-list-table-container">
      <div className="btn-wrapper">
        <div className="register-archive-btn-wrapper">
          <Button type="primary" ghost onClick={newReportHandler} className="font-btn">
            ثبت گزارش جدید
          </Button>
          {type === COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REFERRED ||
          type === COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_CLOSED ? (
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
        columns={ResearchChancellorAccusationModel({
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
        className="research-chancellor-list-table"
        draggableColumns
        draggableId={ExcelCodes.COMMITTEE_EDUCATION_CHANCELLOR_LIST_TABLE_ACCUSED_TABLE}
      />
    </div>
  );
};
export default ResearchChancellorListTableAccused;

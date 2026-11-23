import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import { EducationListAccusedModel } from "@infra/models/tableModels/CommitteeTableModel/AdditionalResearch/EducationChancellor/EducationListAccusedModel";
import {
  COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
  COMMITTEE_ADDITIONAL_RESEARCH_EDUCATION_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
  COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/committee";
import {
  useLazyGetAdditionalResearchEducationCountQuery,
  useLazyGetAdditionalResearchEducationListQuery,
} from "@infra/states/redux/Apis/committee/additionalResearch/additionalResearchApi";
import {
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_CLOSED,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REFERRED,
} from "@pages/Committee/AdditionalResearch/Warding/WardingListTabs/@types/@wardingListTabs";

import {
  GetAdditionalResearchEducationListData,
  GetAdditionalResearchEducationListResponse,
} from "./@types/@educationChancellorListTableAccused";
import "./_educationChancellorListTableAccused.scss";

const EducationChancellorListTableAccused = ({
  type,
}: {
  type: 1 | 4 | 5 | 6 | "1,2,3,4,5,6";
}) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<GetAdditionalResearchEducationListData[]>(
    []
  );
  const [currentPageMode] = useState<"normal" | "filter">("normal");

  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  // get table content
  const [
    getAdditionalResearchEducationList,
    { isFetching: isAdditionalResearchEducationListLoading },
  ] = useLazyGetAdditionalResearchEducationListQuery();

  // get the count of table rows
  const [
    getAdditionalResearchWardingListCount,
    {
      data: additionalResearchEducationListCountData,
      isFetching: isAdditionalResearchEducationListCountLoading,
    },
  ] = useLazyGetAdditionalResearchEducationCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [type, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const onGetAdditionalResearchEducationLisSuccess = async (
    values: GetAdditionalResearchEducationListResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const getListData = () => {
    // get main list data
    getAdditionalResearchEducationList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: type,
    })
      .unwrap()
      .then(onGetAdditionalResearchEducationLisSuccess);

    // get list count
    getAdditionalResearchWardingListCount({ type: type });
  };

  // check btn
  const checkClickHandler = (value: number, isAccusation: boolean | null) => {
    if (value) {
      if (isAccusation) {
        navigate({
          pathname: COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
          search: makeSearchParams({ id: value, isEducation: true, type }),
        });
      } else {
        navigate({
          pathname: COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
          search: makeSearchParams({ id: value, isEducation: true, type }),
        });
      }
    }
  };

  // new report btn handler
  const newReportHandler = () => {
    navigate({
      pathname:
        COMMITTEE_ADDITIONAL_RESEARCH_EDUCATION_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
    });
  };
  const archiveView = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-additional-research-education-chancellor-list-table-accusation-container">
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
        loading={
          isAdditionalResearchEducationListLoading ||
          isAdditionalResearchEducationListCountLoading
        }
        columns={EducationListAccusedModel({
          checkClickHandler: checkClickHandler,
          type,
        })}
        pagination={manualPaginationConfig({
          total:
            currentPageMode === "normal"
              ? additionalResearchEducationListCountData?.data
              : additionalResearchEducationListCountData?.data,

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
        className="additional-research-education-chancellor-list-table"
      />
    </div>
  );
};
export default EducationChancellorListTableAccused;

import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import {
  GetAdditionalStudentListData,
  GetAdditionalStudentListResponse,
} from "./@types/@studentChancellorListTableAccused";
import manualPaginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "../../../../../../infrastructure/helpers/utils";
import { StudentListAccusedModel } from "../../../../../../infrastructure/models/tableModels/CommitteeTableModel/AdditionalResearch/StudentChancellor/StudentListAccusedModel";
import {
  COMMITTEE_ACCUSATION_CASE_PAGE_ROUTE,
  COMMITTEE_ADDITIONAL_RESEARCH_STUDENT_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
  COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
} from "../../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetStudentChancellorCountQuery,
  useLazyGetStudentChancellorListQuery,
} from "../../../../../../infrastructure/states/redux/Apis/committee/additionalResearch/additionalResearchApi";
import {
  COMMITTEE_ADDITIONAL_STUDENT_CHANCELLOR_LIST_CLOSED,
  COMMITTEE_ADDITIONAL_STUDENT_CHANCELLOR_LIST_REFERRED,
} from "../../../../../../pages/Committee/AdditionalResearch/StudentChancellor/StudentChancellorListTabs/@types/@studentChancellorListTabs";

import "./_studentChancellorListTableAccused.scss";

const StudentChancellorListTableAccused = ({
  type,
}: {
  type: 1 | 4 | 5 | 6 | "1,2,3,4,5,6";
}) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<GetAdditionalStudentListData[]>([]);
  const [currentPageMode] = useState<"normal" | "filter">("normal");

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  // get table
  const [getStudentChancellorList, { isFetching: isStudentChancellorListLoading }] =
    useLazyGetStudentChancellorListQuery();

  // get the count of table rows
  const [
    getStudentChancellorListCount,
    {
      data: studentChancellorListCountData,
      isLoading: isStudentChancellorListCountLoading,
    },
  ] = useLazyGetStudentChancellorCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [type, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  // this function runs if request is success.
  const onGetStudentChancellorLisSuccess = async (
    values: GetAdditionalStudentListResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const getListData = () => {
    // get main list data
    getStudentChancellorList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: type,
    })
      .unwrap()
      .then(onGetStudentChancellorLisSuccess);

    // get counts
    getStudentChancellorListCount({ type: type });
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
            isStudentChancellor: true,
          }),
        });
      } else {
        navigate({
          pathname: COMMITTEE_REPORT_DETAIL_PAGE_ROUTE,
          search: makeSearchParams({
            id: value,
            type,
            isStudentChancellor: true,
          }),
        });
      }
    }
  };

  // new report btn handler
  const newReportHandler = () => {
    navigate({
      pathname: COMMITTEE_ADDITIONAL_RESEARCH_STUDENT_CHANCELLOR_RECORD_REPORT_PAGE_ROUTE,
    });
  };
  const archiveView = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-student-chancellor-list-table-container">
      <div className="btn-wrapper">
        <div className="register-archive-btn-wrapper">
          <Button type="primary" ghost onClick={newReportHandler} className="font-btn">
            ثبت گزارش جدید
          </Button>
          {type === COMMITTEE_ADDITIONAL_STUDENT_CHANCELLOR_LIST_REFERRED ||
          type === COMMITTEE_ADDITIONAL_STUDENT_CHANCELLOR_LIST_CLOSED ? (
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
        loading={isStudentChancellorListLoading || isStudentChancellorListCountLoading}
        columns={StudentListAccusedModel({
          checkClickHandler: checkClickHandler,
          type,
        })}
        pagination={manualPaginationConfig({
          total:
            currentPageMode === "normal"
              ? studentChancellorListCountData?.data
              : studentChancellorListCountData?.data,

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
        className="student-chancellor-list-table"
        draggableColumns
        draggableId={ExcelCodes.COMMITTEE_EDUCATION_CHANCELLOR_LIST_TABLE_REPORTER_TABLE}
      />
    </div>
  );
};
export default StudentChancellorListTableAccused;

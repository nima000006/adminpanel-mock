import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { CommitteeReportModel } from "@infra/models/tableModels/CommitteeTableModel/CommitteeReport/CommitteeReportModel";
import { COMMITTEE_REPORT_DETAIL_PAGE_ROUTE } from "@infra/router/routes/committee";
import {
  useLazyGetReportsCountQuery,
  useLazyGetReportsQuery,
} from "@infra/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { YOU_DONT_HAVE_ENOUGH_PERMISSION } from "@infra/VARS/globalToasts/globalToasts";

import {
  CommitteeReport,
  GetCommitteeReportResponse,
} from "./@types/@committeeReportTable";
import "./_committeeReportTable.scss";

const CommitteeReportTable = ({ reportType }: { reportType: string }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  const [dataSource, setDataSource] = useState<CommitteeReport[]>([]);
  const [currentPageMode] = useState<"normal" | "filter">("normal");

  //? ================================  Api Calls ================================
  const [getReports, { isFetching: isReportDataLoading }] = useLazyGetReportsQuery();

  // get count Request
  const [
    getReportsCount,
    { data: reportDataCount, isFetching: isReportDataCountLoading },
  ] = useLazyGetReportsCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [reportType, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const onGetReportSuccess = async (info: GetCommitteeReportResponse) => {
    if (info?.status === 200) {
      if (info?.data) {
        setDataSource(info?.data);
      } else {
        toast.error(YOU_DONT_HAVE_ENOUGH_PERMISSION, {
          toastId: YOU_DONT_HAVE_ENOUGH_PERMISSION,
        });
      }
    }
  };

  const getListData = () => {
    getReports({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: reportType,
    })
      .unwrap()
      .then(onGetReportSuccess);

    // get count data
    getReportsCount({ type: reportType });
  };

  const advanceFilterHandler = () => {};

  const checkClickHandler = (id: string) => {
    navigate(`${COMMITTEE_REPORT_DETAIL_PAGE_ROUTE}?id=${id}`);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-report-container">
      <Button
        type="primary"
        icon={<AiOutlineFilter />}
        onClick={advanceFilterHandler}
        className="advance-filter-btn"
      >
        فیلتر پیشرفته
      </Button>

      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        loading={isReportDataLoading || isReportDataCountLoading}
        columns={CommitteeReportModel({
          checkClickHandler: checkClickHandler,
          type: reportType,
        })}
        pagination={manualPaginationConfig({
          total:
            currentPageMode === "normal" ? reportDataCount?.data : reportDataCount?.data,
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
        className="committee-report-table"
      />
    </div>
  );
};
export default CommitteeReportTable;

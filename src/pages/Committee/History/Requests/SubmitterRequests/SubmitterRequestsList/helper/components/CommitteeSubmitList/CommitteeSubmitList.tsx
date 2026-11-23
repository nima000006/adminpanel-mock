import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import CommitteeHistoryRequestSubmitListTableModel from "@infra/models/tableModels/CommitteeTableModel/History/Request/CommitteeHistorySubmitListTableModel/CommitteeHistoryRequestSubmitListTableModel";
import { COMMITTEE_HISTORY_REQUESTS_SUBMITTER_DETAIL_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import {
  useLazyGetSubmitterHistoryRequestListCountQuery,
  useLazyGetSubmitterHistoryRequestListQuery,
} from "@infra/states/redux/Apis/committee/history/history";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";

import {
  CommitteeSubmitListDataSource,
  GetSubmitterHistoryRequestListResponse,
  TableType,
} from "./@types/@committeeSubmitList";

import "./_committeeSubmitList.scss";

const CommitteeSubmitList = ({ tableType }: TableType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<CommitteeSubmitListDataSource[]>([]);
  const [currentPageMode] = useState<"normal" | "filter">("normal");
  const { user } = useAuth();

  const nationalCode = user?.nationalCode;

  //? ================================  Api Calls ================================
  const [getSubmitterRequestList, { isFetching: isSubmitterRequestListLoading }] =
    useLazyGetSubmitterHistoryRequestListQuery();

  const [
    getSubmitterRequestListCount,
    { data: submitterRequestListCountData, isFetching: submitterRequestListCountLoading },
  ] = useLazyGetSubmitterHistoryRequestListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [tableType, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const getSubmitterRequestListOnSuccess = (
    value: GetSubmitterHistoryRequestListResponse
  ) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  const getListData = () => {
    // get main list data in the case of nationalCode existence
    if (nationalCode) {
      getSubmitterRequestList({
        firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
        maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
        type: tableType,
        nationalCode: nationalCode,
      })
        .unwrap()
        .then(getSubmitterRequestListOnSuccess);

      // get count
      getSubmitterRequestListCount({ type: tableType, nationalCode });
    }
    // if nationalCode did not exist on local storage
    else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  const onCheckoutClickHandler = (
    value: string,
    statusNo: number,
    nationalCode: string
  ) => {
    navigate({
      pathname: COMMITTEE_HISTORY_REQUESTS_SUBMITTER_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id: value,
        status:
          statusNo === 1
            ? "pending"
            : statusNo === 2
              ? "success"
              : statusNo === 3
                ? "rejected"
                : null,
        nationalCode,
      }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-history-report-container">
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        loading={isSubmitterRequestListLoading || submitterRequestListCountLoading}
        columns={CommitteeHistoryRequestSubmitListTableModel({ onCheckoutClickHandler })}
        pagination={manualPaginationConfig({
          total:
            currentPageMode === "normal"
              ? submitterRequestListCountData?.data
              : submitterRequestListCountData?.data,
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
        className="committee-history-report-table"
      />
    </div>
  );
};

export default CommitteeSubmitList;

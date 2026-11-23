import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import CommitteeHistorySubmitListTableModel from "@infra/models/tableModels/CommitteeTableModel/History/Request/CommitteeHistorySubmitListTableModel/CommitteeHistorySubmitListTableModel";
import {
  COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_CHECK_INQUIRY_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_REMOVE_HISTORY_PAGE_ROUTE,
} from "@infra/router/routes/committee";
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import {
  useLazyGetSubmitterRequestListCountQuery,
  useLazyGetSubmitterRequestListQuery,
} from "@infra/states/redux/Apis/committee/history/history";

import { TableType } from "./@types/@committeeConfirmerList";
import {
  GetSubmitterRequestListResponse,
  SubmitterRequest,
} from "../../../../ConfirmerRequestsDetail/RemoveHistory/helper/components/RequestDetail/@ytypes/@requestDetail";

import "./_committeeConfirmerList.scss";

const CommitteeConfirmerList = ({ tableType }: TableType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<SubmitterRequest[]>([]);
  const [currentPageMode] = useState<"normal" | "filter">("normal");
  const { user } = useAuth();

  //? ================================  Api Calls ================================
  const [getSubmitterRequestList, { isFetching: isSubmitterRequestListLoading }] =
    useLazyGetSubmitterRequestListQuery();

  const [
    getSubmitterRequestListCount,
    {
      data: submitterRequestListCountData,
      isFetching: isSubmitterRequestListCountLoading,
    },
  ] = useLazyGetSubmitterRequestListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [tableType, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const getListData = () => {
    // list of data

    getSubmitterRequestList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: tableType,
      uniCode: user?.staff?.admin?.branchId?.toString(),
    })
      .unwrap()
      .then(getSubmitterRequestListOnSuccess);

    //  count
    getSubmitterRequestListCount({
      type: tableType,
      uniCode: user?.staff?.admin?.branchId,
    });
  };

  const getSubmitterRequestListOnSuccess = async (
    value: GetSubmitterRequestListResponse
  ) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  const onCheckoutClickHandler = (value: number) => {
    navigate({
      pathname: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_CHECK_INQUIRY_PAGE_ROUTE,
      search: makeSearchParams({ id: value }),
    });
  };

  const onCheckoutDeleteHistoryClickHandler = (value: number) => {
    navigate({
      pathname: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_DETAIL_REMOVE_HISTORY_PAGE_ROUTE,
      search: makeSearchParams({ id: value }),
    });
  };

  //   const checkClickHandler = (id: string) => {
  //     navigate(`${COMMITTEE_REPORT_DETAIL_PAGE_ROUTE}?id=${id}`);
  //   };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-confirmer-submit-list-container">
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        loading={isSubmitterRequestListLoading || isSubmitterRequestListCountLoading}
        columns={
          CommitteeHistorySubmitListTableModel({
            onCheckoutClickHandler: onCheckoutClickHandler,
            onCheckoutDeleteHistoryClickHandler: onCheckoutDeleteHistoryClickHandler,
            type: tableType,
          })
          // {
          //   checkClickHandler: checkClickHandler,
          //   type: reportType,
          //   }
        }
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
        // loading={historyPaymentsIsLoading}
        className="committee-confirmer-submit-list-table"
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(dataSource?.length)}
      />
    </div>
  );
};
export default CommitteeConfirmerList;

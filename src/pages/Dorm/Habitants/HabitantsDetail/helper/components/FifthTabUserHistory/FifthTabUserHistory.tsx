import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetDormUserRecordsListCountQuery,
  useLazyGetDormUserRecordsListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  DormUserRecordsList,
  GetDormUserRecordsListResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/components/UsersRequestsDetailUserHistory/@types/@usersRequestsDetailUserHistory";

import FifthTabUserHistoryTableModel from "./helper/models/FifthTabUserHistoryTableModel/FifthTabUserHistoryTableModel";

const TABLE_DEPENDENCIES = ["dormitory", "sortings"];

const FifthTabUserHistory = () => {
  const [dataSource, setDataSource] = useState<DormUserRecordsList[]>([]);

  const { params, setSearchParams } = useQueryParams();

  const tableDeps = TABLE_DEPENDENCIES.map((key) => params?.[key]);

  //? ================================  Api Calls ================================
  const [getDormUserRecordsList, { isFetching: isDormUserRecordsListFetching }] =
    useLazyGetDormUserRecordsListQuery();

  const [
    getDormUserRecordsListCount,
    { data: dormUserRecordsListCount, isFetching: isDormUserRecordsListCountFetching },
  ] = useLazyGetDormUserRecordsListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.userNationalCode) {
      getDormUserRecordsList({
        firstResult: params?.page ? (+params.page - 1) * +params.pageSize : 0,
        maxResults: params?.pageSize ? +params.pageSize : 8,
        nationalCode: params?.userNationalCode,
        dormitory: params?.dormitory,
        sortings: params?.sortings,
      })
        .unwrap()
        .then(getDormUserRecordsListSuccess);
    }
  }, [params?.page, params?.pageSize, params?.userNationalCode, ...tableDeps]);

  useEffect(() => {
    if (params?.userNationalCode) {
      getDormUserRecordsListCount({
        nationalCode: params?.userNationalCode,
        dormitory: params?.dormitory,
        sortings: params?.sortings,
      });
    }
  }, [params?.userNationalCode, ...tableDeps]);

  //* ================================ Util Functions ================================
  const getDormUserRecordsListSuccess = async (value: GetDormUserRecordsListResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="residents-fifth-tab-user-history-container">
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        columns={FifthTabUserHistoryTableModel()}
        pagination={manualPaginationConfig({
          total: dormUserRecordsListCount?.data,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...params,
              page: page?.toString(),
              pageSize: pageSize?.toString(),
            });
          },
          pageNumber: params?.page ? Number(params?.page) : 1,
          defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
        })}
        loading={isDormUserRecordsListFetching || isDormUserRecordsListCountFetching}
        className="table w-full"
        key={`table-${params?.pageSize || "8"} `}
        {...TABLE_PROPS(dataSource.length)}
      />
    </div>
  );
};
export default FifthTabUserHistory;

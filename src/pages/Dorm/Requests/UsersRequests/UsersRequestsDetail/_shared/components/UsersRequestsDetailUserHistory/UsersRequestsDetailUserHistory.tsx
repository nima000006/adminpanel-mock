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
} from "./@types/@usersRequestsDetailUserHistory";
import UsersRequestsDetailTableModel from "./helper/models/UsersRequestsDetailTableModel/UsersRequestsDetailTableModel";

const UsersRequestsDetailUserHistory = () => {
  const [dataSource, setDataSource] = useState<DormUserRecordsList[]>([]);
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getDormUserRecordsList, { isFetching: isDormUserRecordsListFetching }] =
    useLazyGetDormUserRecordsListQuery();

  const [
    getDormUserRecordsListCount,
    { data: dormUserRecordsListCount, isFetching: isDormUserRecordsListCountFetching },
  ] = useLazyGetDormUserRecordsListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.userNationalCode) {
      getDormUserRecordsList({
        firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
        maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
        nationalCode: url?.userNationalCode,
      })
        .unwrap()
        .then(getDormUserRecordsListSuccess);
    }
  }, [url?.page, url?.pageSize, url?.userNationalCode]);

  useEffect(() => {
    if (url?.userNationalCode) {
      getDormUserRecordsListCount({ nationalCode: url?.userNationalCode });
    }
  }, [url?.userNationalCode]);

  //* ================================ Util Functions ================================
  const getDormUserRecordsListSuccess = async (value: GetDormUserRecordsListResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <CustomTable
      dataSource={dataSource}
      columns={UsersRequestsDetailTableModel()}
      pagination={manualPaginationConfig({
        total: dormUserRecordsListCount?.data,
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
      loading={isDormUserRecordsListFetching || isDormUserRecordsListCountFetching}
      rowKey="id"
      className="users-requests-table-model-container"
      {...TABLE_PROPS(dataSource?.length)}
    />
  );
};

export default UsersRequestsDetailUserHistory;

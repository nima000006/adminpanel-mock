import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyBasicInformationFormCountQuery,
  useLazyBasicInformationFormQuery,
} from "@infra/states/redux/Apis/dorm/basicInfo/dormBasicInfo";

import { DormBaseInfoData } from "./@types/@dormBasicInfoListTypes";
import DormBasicInfoTableModel from "./helper/models/DormBasicInfoTableModel/DormBasicInfoTableModel";

const TABLE_DEPENDENCIES = ["name"];

const DormBasicInfoList = () => {
  useTitle({ text: "اطلاعات پایه اقامتگاه" });

  const [data, setData] = useState<DormBaseInfoData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { params, setSearchParams } = useQueryParams();
  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;

  //? ================================ Api ================================
  const [getBaseInfo, { isFetching: isGetBaseInfoLoading }] =
    useLazyBasicInformationFormQuery();

  const [getBaseInfoCount, { isFetching: isGetBaseInfoCountLoading }] =
    useLazyBasicInformationFormCountQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    getBaseInfo({
      pageNo: currentPage - 1,
      pageSize: currentPageSize,
      name: params?.name,
    }).then((res) => {
      if ("data" in res) {
        setData(res.data?.data ?? []);
      }
    });
    // fetch total count
    getBaseInfoCount({ name: params?.name }).then((res) => {
      if ("data" in res) {
        setTotal(res.data?.count ?? 0);
      }
    });
  }, [currentPage, currentPageSize, ...TABLE_DEPENDENCIES.map((item) => params?.[item])]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <CustomTable
      rowKey="id"
      dataSource={data}
      columns={DormBasicInfoTableModel()}
      pagination={manualPaginationConfig({
        total,
        onChange: (page, pageSize) => {
          setSearchParams({
            ...params,
            page: page.toString(),
            pageSize: pageSize.toString(),
          });
        },
        pageNumber: currentPage,
        defaultPageSize: currentPageSize,
      })}
      key={`table-${currentPageSize || "8"}`}
      {...TABLE_PROPS(data.length)}
      loading={isGetBaseInfoLoading || isGetBaseInfoCountLoading}
    />
  );
};

export default DormBasicInfoList;

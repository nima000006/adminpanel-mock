import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyCancelledFoodListQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  GetMyCancelledFoodListResponse,
  MyCancelledFoodListDataType,
} from "./@types/@myFoodScheduleTab";
import MyCanceledFoodScheduleListTableModels from "./helper/models/MyCanceledFoodScheduleList/MyCanceledFoodScheduleListTableModels";
import "./_myFoodScheduleTab.scss";

const MyFoodScheduleTab = () => {
  const [dataSource, setDataSource] = useState<MyCancelledFoodListDataType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getCanceledListData, { isFetching: isCanceledListDataLoading }] =
    useLazyGetMyCancelledFoodListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [url?.planPage, url?.planPageSize]);

  //* ================================ Util Functions ================================
  const getData = () => {
    getCanceledListData({
      pageNo: url?.planPage ? Number(url?.planPage) - 1 : 0,
      pageSize: url?.planPageSize ? Number(url?.planPageSize) : 8,
    })
      .unwrap()
      .then(getCanceledListDataSuccess);
  };

  const getCanceledListDataSuccess = async (values: GetMyCancelledFoodListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data?.planDtos);
      setTotalCount(values?.data?.totalElements);
    } else {
      return toast.error((values?.data || values?.msg) as any, {
        toastId: (values?.data || values?.msg) as any,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="my-cancelled-food-schedule-list-container">
      <CustomDivider text="لیست برنامه غذایی‌های لغو شده" />

      <CustomTable
        dataSource={dataSource}
        columns={MyCanceledFoodScheduleListTableModels}
        pagination={manualPaginationConfig({
          total: totalCount,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...url,
              planPage: page?.toString(),
              planPageSize: pageSize?.toString(),
            });
          },
          pageNumber: url?.planPage ? Number(url?.planPage) : 1,
          defaultPageSize: url?.planPageSize ? Number(url?.planPageSize) : 8,
        })}
        key={`table-${url?.planPageSize || "8"}`}
        {...TABLE_PROPS(dataSource.length)}
        loading={isCanceledListDataLoading}
        rowKey="id"
        className="my-cancelled-food-schedule-table-model-container"
      />
      <CustomTotalTableItems
        totalCount={totalCount}
        label="تعداد کل برنامه غذایی‌های لغو شده"
      />
    </div>
  );
};

export default MyFoodScheduleTab;

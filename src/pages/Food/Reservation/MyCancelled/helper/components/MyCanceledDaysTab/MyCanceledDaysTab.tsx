import { useEffect, useState } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetMyHolidaysListMutation } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  GetMyHolidaysListResponse,
  MyHolidaysListTypes,
} from "./@types/@myCanceledDaysTab";
import MyCanceledDaysDetailDrawerContent from "./helper/drawers/MyCanceledDaysDetail/MyCanceledDaysDetailDrawerContent";
import MyCanceledDaysListTableModels from "./helper/models/MyCanceledDaysList/MyCanceledDaysListTableModels";
import "./_myCanceledDaysTab.scss";

const MyCanceledDaysTab = () => {
  const [dataSource, setDataSource] = useState<MyHolidaysListTypes[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [isDrawerOpen, setIsDrawerOpen] = useState({
    isOpen: false,
    id: -1,
    date: "",
  });

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getHolidaysListData, { isLoading: isHolidaysListDataLoading }] =
    useGetMyHolidaysListMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const getData = () => {
    getHolidaysListData({
      pageNo: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
    })
      .unwrap()
      .then(getCanceledListDataSuccess);
  };

  const getCanceledListDataSuccess = async (values: GetMyHolidaysListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data?.holidays);
      setTotalCount(values?.data?.totalElements);
    }
  };

  const viewClickHandler = (id: number, date: string) => {
    setIsDrawerOpen({
      id,
      isOpen: true,
      date,
    });
  };

  const closeDrawerHandler = () => {
    setIsDrawerOpen({
      id: -1,
      isOpen: false,
      date: "",
    });
  };

  return (
    <>
      {isDrawerOpen?.isOpen && (
        <CustomDrawer
          open={isDrawerOpen?.isOpen}
          onClose={closeDrawerHandler}
          content={
            <MyCanceledDaysDetailDrawerContent
              isDrawerOpen={isDrawerOpen}
              closeDrawerHandler={closeDrawerHandler}
            />
          }
          className="my-canceled-days-list-drawer"
        />
      )}

      <div className="my-canceled-days-list-container">
        <CustomDivider text="لیست روز‌های لغو شده" />

        <CustomTable<MyHolidaysListTypes>
          dataSource={dataSource}
          columns={MyCanceledDaysListTableModels({ viewClickHandler })}
          pagination={manualPaginationConfig({
            total: totalCount,
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
          {...TABLE_PROPS(dataSource.length)}
          loading={isHolidaysListDataLoading}
          rowKey="id"
          className="my-canceled-days-table-model-container"
        />
      </div>
    </>
  );
};
export default MyCanceledDaysTab;

import { useCallback, useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllRestaurantFoodScheduleListQuery } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { SelfFoodScheduleTableModel } from "@pages/Food/Selfs/helpers/models/SelfFoodScheduleTableModel/SelfFoodScheduleTableModel";

import {
  FoodSchedule,
  GetAllRestaurantFoodScheduleListResponse,
} from "./@types/@foodSchedule";
import { FoodScheduleContent } from "./helpers/components/DrawerContent/FoodScheduleContent";

import "./_foodSchedule.scss";

const AllSelfsFoodSchedule = () => {
  const [dataSource, setDataSource] = useState<FoodSchedule[] | []>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const { params: url, setSearchParams } = useQueryParams();
  //? ================================  Api Calls ================================
  const [
    getRestaurantFoodScheduleList,
    {
      data: restaurantFoodScheduleListData,
      isFetching: isRestaurantFoodScheduleListLoading,
    },
  ] = useLazyGetAllRestaurantFoodScheduleListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const onGetListDataSuccess = async (
    response: GetAllRestaurantFoodScheduleListResponse
  ) => {
    if (response?.status === 200) {
      setDataSource(response?.data?.planDtos);
    } else {
      return toast.error((response?.data || response?.msg) as any, {
        toastId: (response?.data || response?.msg) as any,
      });
    }
  };

  const getListData = () => {
    getRestaurantFoodScheduleList({
      pageNo: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      restaurantId: +url?.id,
    })
      .unwrap()
      .then(onGetListDataSuccess);
  };

  // drawer functions
  const openDrawerHandler = (id: number) => {
    setIsDrawerOpen({ isOpen: true, id });
  };

  const closeDrawerHandler = useCallback(() => {
    setIsDrawerOpen({ isOpen: false, id: -1 });
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDrawerOpen && (
        <CustomDrawer
          title="جزئیات برنامه غذایی"
          onClose={closeDrawerHandler}
          open={isDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <FoodScheduleContent
              closeDrawerHandler={closeDrawerHandler}
              id={isDrawerOpen?.id}
            />
          }
        />
      )}
      <div className="all-selfs-food-schedule-tab-container">
        <ToolBox
          rightSide={
            <CustomButton
              type="primary"
              icon={<AiOutlineFilter />}
              className="advance-filter-btn"
            >
              فیلتر پیشرفته
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={dataSource}
          columns={SelfFoodScheduleTableModel({ viewClickHandler: openDrawerHandler })}
          pagination={manualPaginationConfig({
            total: restaurantFoodScheduleListData?.data?.totalElements,
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
          rowKey="id"
          loading={isRestaurantFoodScheduleListLoading}
          className="all-selfs-food-schedule-table-model-container"
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};

export default AllSelfsFoodSchedule;

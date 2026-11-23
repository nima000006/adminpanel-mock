import { useEffect, useState } from "react";

import { Collapse } from "antd";
import { toast } from "react-toastify";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  useLazyGetAllCancelledFoodListByHolidayAndRestaurantQuery,
  useLazyGetAllRestaurantListByHolidayIdQuery,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  AllCanceledDaysDetailDrawerContentProps,
  AllCancelledFoodListByHolidayAndRestaurantTypes,
  AllCollapseDataType,
  GetAllCancelledFoodListByHolidayAndRestaurantResponse,
  GetAllRestaurantListByHolidayIdResponse,
} from "./@types/@canceledDaysDetailDrawerContent";
import AllCanceledDaysDetailTableModel from "./helper/models/AllCanceledDaysDetail/AllCanceledDaysDetailTableModel";
import "./_allCanceledDaysDetailDrawerContent.scss";

const AllCanceledDaysDetailDrawerContent = ({
  closeDrawerHandler,
  isDrawerOpen,
}: AllCanceledDaysDetailDrawerContentProps) => {
  const [restaurantData, setRestaurantData] = useState<AllCollapseDataType[]>([]);

  //? ================================  Api Calls ================================
  const [getRestaurantList, { isFetching: isRestaurantDataLoading }] =
    useLazyGetAllRestaurantListByHolidayIdQuery();

  const [getFoodsList] = useLazyGetAllCancelledFoodListByHolidayAndRestaurantQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isDrawerOpen?.id) {
      getRestaurantList({ holidayId: isDrawerOpen?.id })
        .unwrap()
        .then(getRestaurantListSuccess);
    }
  }, [isDrawerOpen?.id]);

  //* ================================ Util Functions ================================
  const getRestaurantListSuccess = async (
    values: GetAllRestaurantListByHolidayIdResponse
  ) => {
    if (values?.status === 200) {
      setRestaurantData(
        values?.data.map((item) => ({
          ...item,
          tableData: { data: [], isLoading: false },
        }))
      );
    } else {
      return toast.error((values?.data || values?.msg) as any, {
        toastId: (values?.data || values?.msg) as any,
      });
    }
  };

  const handleCollapseChange = (key: string[]) => {
    const finedItem = [...restaurantData]?.find((item) => item.id === +key[0]);
    const finedIndex = [...restaurantData]?.findIndex((item) => item.id === +key[0]);

    if (finedItem?.tableData?.data?.length === 0) {
      const tempList = [...restaurantData];
      tempList[finedIndex].tableData.isLoading = true;

      setRestaurantData(tempList);

      getFoodsList({
        holidayId: isDrawerOpen?.id,
        restaurantId: +key[0],
        pageNo: "0",
        pageSize: "100", // CTO
      })
        .unwrap()
        .then((value) => {
          if (value?.status === 200) {
            getFoodsListSuccess(value, finedIndex);
          } else {
            return toast.error((value?.data || value?.msg) as any, {
              toastId: (value?.data || value?.msg) as any,
            });
          }
        });
    }
  };

  const getFoodsListSuccess = async (
    values: GetAllCancelledFoodListByHolidayAndRestaurantResponse,
    index: number
  ) => {
    if (values?.status === 200) {
      const tempList = [...restaurantData];

      if (tempList[index].tableData.data) {
        tempList[index].tableData.data = values?.data?.planDtos;
        tempList[index].tableData.isLoading = false;
      }

      setRestaurantData(tempList);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div>
      <CustomDrawerHeader
        title="مشاهده برنامه‌غذای لغو شده"
        closeDrawerHandler={closeDrawerHandler}
      />
      <div className="drawer-body">
        <SingleVerticalWithCol label="تاریخ" isDate value={isDrawerOpen?.date} />
        <Div loading={isRestaurantDataLoading} className="collapse-data">
          {restaurantData?.map((item) => (
            <Collapse
              items={[
                {
                  key: item?.id,
                  label: item?.title,
                  children: (
                    <CustomTable<AllCancelledFoodListByHolidayAndRestaurantTypes>
                      dataSource={item?.tableData?.data}
                      columns={AllCanceledDaysDetailTableModel}
                      loading={item?.tableData?.isLoading}
                      pagination={paginationConfig}
                      rowKey="id"
                      {...TABLE_PROPS(item?.tableData?.data?.length)}
                    />
                  ),
                },
              ]}
              key={item?.id}
              onChange={handleCollapseChange}
            />
          ))}
        </Div>
      </div>
    </div>
  );
};

export default AllCanceledDaysDetailDrawerContent;

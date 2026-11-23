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
  useLazyGetMyCancelledFoodListByHolidayAndRestaurantQuery,
  useLazyGetMyRestaurantListByHolidayIdQuery,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";

import {
  GetMyCancelledFoodListByHolidayAndRestaurantResponse,
  GetMyRestaurantListByHolidayIdResponse,
  MyCanceledDaysDetailDrawerContentProps,
  MyCancelledFoodListByHolidayAndRestaurantTypes,
  MyCollapseDataType,
} from "./@types/@myCanceledDaysDetailDrawerContent";
import MyCanceledDaysDetailTableModel from "./helper/models/MyCanceledDaysDetail/MyCanceledDaysDetailTableModel";
import "./_myCanceledDaysDetailDrawerContent.scss";

const MyCanceledDaysDetailDrawerContent = ({
  closeDrawerHandler,
  isDrawerOpen,
}: MyCanceledDaysDetailDrawerContentProps) => {
  const [restaurantData, setRestaurantData] = useState<MyCollapseDataType[]>([]);

  //? ================================  Api Calls ================================
  const [getRestaurantList, { isFetching: isRestaurantDataLoading }] =
    useLazyGetMyRestaurantListByHolidayIdQuery();

  const [getFoodsList] = useLazyGetMyCancelledFoodListByHolidayAndRestaurantQuery();

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
    values: GetMyRestaurantListByHolidayIdResponse
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
    values: GetMyCancelledFoodListByHolidayAndRestaurantResponse,
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
                    <CustomTable<MyCancelledFoodListByHolidayAndRestaurantTypes>
                      dataSource={item?.tableData?.data}
                      columns={MyCanceledDaysDetailTableModel}
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

export default MyCanceledDaysDetailDrawerContent;

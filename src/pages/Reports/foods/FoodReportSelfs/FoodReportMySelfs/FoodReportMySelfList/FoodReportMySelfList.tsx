import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import { REPORT_FOOD_MY_SELF_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
import { useLazyGetMyRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { THIS_FEATURE_IS_NOT_AVAILABLE_NOW } from "@infra/VARS/globalToasts/globalToasts";
import {
  GetMyRestaurantsResponse,
  MyRestaurantType,
} from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";

import MySelfListTableModel from "./helpers/models/FoodReportMySelfListTableModel/FoodReportMySelfListTableModel";

import "./_FoodReportMySelfList.scss";

const MySelfList = () => {
  useTitle({ text: "سلف ها" });
  const [dataSource, setDataSource] = useState<MyRestaurantType[]>([]);
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getMySelfs, { isLoading: isSelfDataLoading }] = useLazyGetMyRestaurantsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getRestaurantData();
  }, []);

  //* ================================ Util Functions ================================
  const onGetSelfDataSuccess = (response: GetMyRestaurantsResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data);
    } else {
      return toast.error((response?.data || response?.msg) as any, {
        toastId: (response?.data || response?.msg) as any,
      });
    }
  };

  const getRestaurantData = () => {
    getMySelfs().unwrap().then(onGetSelfDataSuccess);
  };

  // detail handler
  const onCheckoutClickHandler = (id: number, title: string) => {
    if (id) {
      navigate({
        pathname: REPORT_FOOD_MY_SELF_DETAILS_PAGE_ROUTE,
        search: makeSearchParams({ id, title }),
      });
    }
  };

  const advanceFilterHandler = () => {
    toast.warn(THIS_FEATURE_IS_NOT_AVAILABLE_NOW, {
      toastId: THIS_FEATURE_IS_NOT_AVAILABLE_NOW,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="food-all-self-list-container">
      <ToolBox
        rightSide={
          <CustomButton
            type="primary"
            icon={<AiOutlineFilter />}
            onClick={advanceFilterHandler}
            className="advance-filter-btn"
          >
            فیلتر پیشرفته
          </CustomButton>
        }
        className="btn-wrapper"
      />
      <div className="committee-confirmer-submit-list-container">
        <CustomTable
          dataSource={dataSource}
          loading={isSelfDataLoading}
          rowKey="id"
          columns={MySelfListTableModel({
            onCheckoutClickHandler: onCheckoutClickHandler,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
          className="food-self-list-table"
        />
      </div>
      <CustomTotalTableItems totalCount={dataSource?.length} label="تعداد کل سلف ها:" />
    </div>
  );
};
export default MySelfList;

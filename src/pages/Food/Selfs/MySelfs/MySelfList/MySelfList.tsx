import { useCallback, useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { THIS_FEATURE_IS_NOT_AVAILABLE_NOW } from "@infra/VARS/globalToasts/globalToasts";
import {
  GetMyRestaurantsResponse,
  MyRestaurantType,
} from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";

import MySelfListDrawerContent from "./helpers/components/MySelfListDrawerContent/MySelfListDrawerContent";
import MySelfListTableModel from "./helpers/models/MySelfListTableModel/MySelfListTableModel";
import CustomButton from "../../../../../components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "../../../../../components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { FOOD_MY_DETAIL_SELF_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/food";
import { useLazyGetMyRestaurantsQuery } from "../../../../../infrastructure/states/redux/Apis/food/reservation/foodReservationApi";

import "./_mySelfList.scss";

const MySelfList = () => {
  useTitle({ text: "سلف ها" });
  const [isOpen, setIsOpen] = useState(false);
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

  // create new self handler
  const onNewSelfHandler = useCallback(() => {
    setIsOpen(true);
  }, []);

  // close drawer
  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  // detail handler
  const onCheckoutClickHandler = (id: number, title: string) => {
    if (id) {
      navigate({
        pathname: FOOD_MY_DETAIL_SELF_PAGE_ROUTE,
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
    <>
      {isOpen ? (
        <CustomDrawer
          title="تعریف سلف جدید"
          open={isOpen}
          onClose={onCloseDrawer}
          closeIcon={<AiOutlineClose />}
          className="food-my-self-drawer"
          content={
            <MySelfListDrawerContent
              onCloseDrawer={onCloseDrawer}
              getRestaurantData={getRestaurantData}
            />
          }
        />
      ) : null}

      <div className="food-all-self-list-container">
        <ToolBox
          leftSide={
            <CustomButton type="primary" className="back-btn" onClick={onNewSelfHandler}>
              تعریف سلف جدید
            </CustomButton>
          }
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
          <CustomTable<MyRestaurantType>
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
    </>
  );
};
export default MySelfList;

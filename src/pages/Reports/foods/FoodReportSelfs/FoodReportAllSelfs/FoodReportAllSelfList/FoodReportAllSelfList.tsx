import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import { REPORT_FOOD_ALL_SELF_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
import { useLazyGetAllRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { THIS_FEATURE_IS_NOT_AVAILABLE_NOW } from "@infra/VARS/globalToasts/globalToasts";
import {
  GetAllRestaurantsResponse,
  RestaurantType,
} from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";

import AllSelfListTableModel from "./helper/models/AllSelfListTableModel/AllSelfListTableModel";
import "./_foodReportallSelfList.scss";

const AllSelfList = () => {
  useTitle({ text: "سلف ها" });
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<RestaurantType[]>([]);
  const [isDeletedEnabled, setIsDeletedEnabled] = useState(false);
  //? ================================  Api Calls ================================
  const [getAllSelfs, { isLoading: isSelfDataLoading }] = useLazyGetAllRestaurantsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getRestaurantData();
  }, [isDeletedEnabled]);

  //* ================================ Util Functions ================================
  // onGetSelfDataSuccess
  const onGetSelfDataSuccess = async (response: GetAllRestaurantsResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data);
    } else {
      return toast.error((response?.data || response?.msg) as any, {
        toastId: (response?.data || response?.msg) as any,
      });
    }
  };

  const getRestaurantData = () => {
    getAllSelfs({ isDeleted: isDeletedEnabled }).unwrap().then(onGetSelfDataSuccess);
  };

  // detail handler
  const onCheckoutClickHandler = (id: number, title: string) => {
    if (id) {
      navigate({
        pathname: REPORT_FOOD_ALL_SELF_DETAILS_PAGE_ROUTE,
        search: makeSearchParams({ id, title }),
      });
    }
  };

  //
  const advanceFilterHandler = () => {
    toast.warn(THIS_FEATURE_IS_NOT_AVAILABLE_NOW, {
      toastId: THIS_FEATURE_IS_NOT_AVAILABLE_NOW,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="food-all-self-list-container">
      <CustomSwitch
        label="نمایش:"
        valuePropName="switch"
        unCheckedChildren="حذف شده ها"
        checkedChildren="اطلاعات فعلی"
        defaultChecked={true}
        value={!isDeletedEnabled}
        onChange={(value: boolean) => {
          setIsDeletedEnabled(!value);
        }}
      />
      <ToolBox
        rightSide={
          <CustomButton
            type="primary"
            icon={<AiOutlineFilter />}
            onClick={advanceFilterHandler}
            className="advance-filter-btn btn-wrapper"
          >
            فیلتر پیشرفته
          </CustomButton>
        }
      />
      <div className="committee-confirmer-submit-list-container">
        <CustomTable
          dataSource={dataSource}
          loading={isSelfDataLoading}
          rowKey="id"
          columns={AllSelfListTableModel({
            onCheckoutClickHandler: onCheckoutClickHandler,
            isDeletedEnabled,
          })}
          pagination={paginationConfig}
          className="food-self-list-table"
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
      <CustomTotalTableItems totalCount={dataSource?.length} label="تعداد کل سلف ها:" />
    </div>
  );
};

export default AllSelfList;

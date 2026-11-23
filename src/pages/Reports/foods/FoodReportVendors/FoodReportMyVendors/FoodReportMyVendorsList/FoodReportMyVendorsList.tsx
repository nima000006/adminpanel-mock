import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useLazyGetMyVendorListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import { THIS_FEATURE_IS_NOT_AVAILABLE_NOW } from "@infra/VARS/globalToasts/globalToasts";

import { GetVendorMyResponse, VendorMyType } from "./@types/@myVendorsList";
import MyVendorListTableModel from "./helper/models/MyVendorListTableModel/MyVendorListTableModel";

import "./_FoodReportMyVendorsList.scss";

const MyVendorList = () => {
  useTitle({ text: "تامین کننده ها" });
  const [dataSource, setDataSource] = useState<VendorMyType[]>([]);

  //? ================================  Api Calls ================================
  // get table data from api
  const [getMyVendorList, { isFetching: getMyVendorListLoading }] =
    useLazyGetMyVendorListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, []);

  //* ================================ Util Functions ================================
  const getData = () => {
    getMyVendorList().unwrap().then(onGetMyVendorListSuccess);
  };

  const onGetMyVendorListSuccess = async (value: GetVendorMyResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
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
    <div className="food-my-vendor-list-container">
      <div className="btn-wrapper">
        <ToolBox
          rightSide={
            <CustomButton
              type="primary"
              icon={<AiOutlineFilter />}
              onClick={advanceFilterHandler}
            >
              فیلتر پیشرفته
            </CustomButton>
          }
        />
      </div>

      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        loading={getMyVendorListLoading}
        columns={MyVendorListTableModel()}
        pagination={paginationConfig}
        className="food-my-vendor-list-table"
        {...TABLE_PROPS(dataSource?.length)}
      />

      <CustomTotalTableItems
        totalCount={dataSource?.length}
        label="تعداد کل تامین کننده ها:"
      />
    </div>
  );
};
export default MyVendorList;

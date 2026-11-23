import { useCallback, useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { THIS_FEATURE_IS_NOT_AVAILABLE_NOW } from "@infra/VARS/globalToasts/globalToasts";
import MyVendorListTableModel from "@pages/Food/Vendors/MyVendors/MyVendorsList/helper/models/MyVendorListTableModel/MyVendorListTableModel";

import { GetVendorMyResponse, VendorMyType } from "./@types/@myVendorsList";
import MyVendorListDrawerContent from "./helper/drawer/MyVendorListDrawerContent/MyVendorListDrawerContent";
import CustomButton from "../../../../../components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "../../../../../components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { useLazyGetMyVendorListQuery } from "../../../../../infrastructure/states/redux/Apis/food/vendor/vendorApi";

import "./_myVendorsList.scss";

const MyVendorList = () => {
  useTitle({ text: "تامین کننده ها" });
  const [isOpenNewVendorDrawer, setIsOpenNewVendorDrawer] = useState(false);
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

  const onNewVendorHandler = useCallback(() => {
    setIsOpenNewVendorDrawer(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpenNewVendorDrawer(false);
  }, []);

  const advanceFilterHandler = () => {
    toast.warn(THIS_FEATURE_IS_NOT_AVAILABLE_NOW, {
      toastId: THIS_FEATURE_IS_NOT_AVAILABLE_NOW,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenNewVendorDrawer && (
        <CustomDrawer
          title="تعریف تامین کننده جدید"
          open={isOpenNewVendorDrawer}
          onClose={onCloseDrawer}
          content={
            <MyVendorListDrawerContent
              onOpenDrawe={isOpenNewVendorDrawer}
              onCloseDrawer={onCloseDrawer}
              getData={getData}
            />
          }
          className="food-my-vendor-drawer"
        />
      )}

      <div className="food-my-vendor-list-container">
        <div className="btn-wrapper">
          <ToolBox
            leftSide={
              <CustomButton type="primary" onClick={onNewVendorHandler}>
                تعریف تامین کننده جدید
              </CustomButton>
            }
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

        <CustomTable<VendorMyType>
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
    </>
  );
};
export default MyVendorList;

import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useLazyGetAllVendorListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import { THIS_FEATURE_IS_NOT_AVAILABLE_NOW } from "@infra/VARS/globalToasts/globalToasts";

import { GetVendorAllResponse, VendorAllType } from "./@types/@allVendorList";
import AllVendorListTableModel from "./helper/models/AllVendorListTableModel/AllVendorListTableModel";
import "./_foodReportAllVendorList.scss";

const AllVendorList = () => {
  useTitle({ text: "تامین کننده ها" });
  const [dataSource, setDataSource] = useState<VendorAllType[]>([]);
  const [isDeletedEnabled, setIsDeletedEnabled] = useState(false);

  //? ================================  Api Calls ================================
  // get table data from api
  const [getVendorAllList, { isFetching: vendorAllListLoading }] =
    useLazyGetAllVendorListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [isDeletedEnabled]);

  //* ================================ Util Functions ================================
  const onGetVendorAllListSuccess = async (value: GetVendorAllResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const getData = () => {
    getVendorAllList({ isDeleted: isDeletedEnabled })
      .unwrap()
      .then(onGetVendorAllListSuccess);
  };

  const advanceFilterHandler = () => {
    toast.warn(THIS_FEATURE_IS_NOT_AVAILABLE_NOW, {
      toastId: THIS_FEATURE_IS_NOT_AVAILABLE_NOW,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="food-all-vendor-list-container">
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
        loading={vendorAllListLoading}
        columns={AllVendorListTableModel({
          isDeletedEnabled,
        })}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        className="food-all-vendor-list-table"
      />

      <div className="totals-container">
        <CustomTotalTableItems
          totalCount={dataSource?.length}
          label="تعداد کل تامین کننده ها:"
        />
      </div>
    </div>
  );
};
export default AllVendorList;

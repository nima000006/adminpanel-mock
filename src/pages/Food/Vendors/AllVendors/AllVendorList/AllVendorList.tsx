import { useCallback, useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { THIS_FEATURE_IS_NOT_AVAILABLE_NOW } from "@infra/VARS/globalToasts/globalToasts";

import { GetVendorAllResponse, VendorAllType } from "./@types/@allVendorList";
import AllVendorListDrawerContent from "./helper/drawer/AllVendorListDrawerContent/AllVendorListDrawerContent";
import DeleteModalContent from "./helper/modals/DeleteModalContent/DeleteModalContent";
import AllVendorListTableModel from "./helper/models/AllVendorListTableModel/AllVendorListTableModel";
import CustomButton from "../../../../../components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "../../../../../components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import {
  useLazyDeleteVendorWithIdQuery,
  useLazyGetAllVendorListQuery,
} from "../../../../../infrastructure/states/redux/Apis/food/vendor/vendorApi";

import "./_allVendorList.scss";

const AllVendorList = () => {
  useTitle({ text: "تامین کننده ها" });
  const [isOpenNewVendorDrawer, setIsOpenNewVendorDrawer] = useState(false);
  const [dataSource, setDataSource] = useState<VendorAllType[]>([]);
  const [isDeletedEnabled, setIsDeletedEnabled] = useState(false);
  const [deleteModalInfo, setDeleteModalInfo] = useState({
    isOpen: false,
    id: -1,
    title: "",
  });

  //? ================================  Api Calls ================================
  // get table data from api
  const [getVendorAllList, { isFetching: vendorAllListLoading }] =
    useLazyGetAllVendorListQuery();

  const [deleteVendorById, { isLoading: isVendorDeleteLoading }] =
    useLazyDeleteVendorWithIdQuery();

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

  // create new vendor handler
  const onNewVendorHandler = useCallback(() => {
    setIsOpenNewVendorDrawer(true);
  }, []);

  // close drawer
  const onCloseDrawer = useCallback(() => {
    setIsOpenNewVendorDrawer(false);
  }, []);

  const onRemoveVendorClickHandler = (id: number, title: string) => {
    setDeleteModalInfo({
      id,
      isOpen: true,
      title,
    });
  };

  const advanceFilterHandler = () => {
    toast.warn(THIS_FEATURE_IS_NOT_AVAILABLE_NOW, {
      toastId: THIS_FEATURE_IS_NOT_AVAILABLE_NOW,
    });
  };

  // onDeleteConfirm
  const onDeleteConfirm = () => {
    deleteVendorById({ vendorId: deleteModalInfo?.id?.toString() })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          getData();
          setDeleteModalInfo({ isOpen: false, id: -1, title: "" });
        } else {
          return toast.error((res?.data || res?.msg) as any, {
            toastId: (res?.data || res?.msg) as any,
          });
        }
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* DELETE MODAL */}
      {deleteModalInfo?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={deleteModalInfo?.isOpen}
          closeModalHandler={() =>
            setDeleteModalInfo({ isOpen: false, id: -1, title: "" })
          }
          content={<DeleteModalContent />}
          onConfirmClickHandler={onDeleteConfirm}
          confirmBtnText="حذف"
          backBtnText="انصراف"
          isDangerous
          title={deleteModalInfo?.title}
          isConfirmButtonLoading={isVendorDeleteLoading}
          showIcon={false}
        />
      )}
      {/* NEW VENDOR MODAL */}
      {isOpenNewVendorDrawer && (
        <CustomDrawer
          title="تعریف تامین کننده جدید"
          open={isOpenNewVendorDrawer}
          onClose={onCloseDrawer}
          content={
            <AllVendorListDrawerContent
              onOpenDrawer={isOpenNewVendorDrawer}
              onCloseDrawer={onCloseDrawer}
              getData={getData}
            />
          }
          className="food-all-vendor-drawer"
        />
      )}

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

        <CustomTable<VendorAllType>
          dataSource={dataSource}
          rowKey="id"
          loading={vendorAllListLoading}
          columns={AllVendorListTableModel({
            onRemoveVendorClickHandler,
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
    </>
  );
};
export default AllVendorList;

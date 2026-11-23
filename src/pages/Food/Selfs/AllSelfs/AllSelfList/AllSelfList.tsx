import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useLazyDeleteSelfWithIdQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import { THIS_FEATURE_IS_NOT_AVAILABLE_NOW } from "@infra/VARS/globalToasts/globalToasts";
import {
  GetAllRestaurantsResponse,
  RestaurantType,
} from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";

import AllSelfListDrawerContent from "./helper/components/AllSelfListDrawerContent/AllSelfListDrawerContent";
import SelfDeleteModalContent from "./helper/components/modals/selfDeleteModalContent/selfDeleteModalContent";
import AllSelfListTableModel from "./helper/models/AllSelfListTableModel/AllSelfListTableModel";
import CustomButton from "../../../../../components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "../../../../../components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { FOOD_ALL_DETAIL_SELF_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/food";
import { useLazyGetAllRestaurantsQuery } from "../../../../../infrastructure/states/redux/Apis/food/reservation/foodReservationApi";

import "./_allSelfList.scss";

const AllSelfList = () => {
  useTitle({ text: "سلف ها" });
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dataSource, setDataSource] = useState<RestaurantType[]>([]);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [isDeletedEnabled, setIsDeletedEnabled] = useState(false);
  const [deleteModalInfo, setDeleteModalInfo] = useState({
    isOpen: false,
    id: -1,
    title: "",
  });
  //? ================================  Api Calls ================================
  const [getAllSelfs, { isLoading: isSelfDataLoading }] = useLazyGetAllRestaurantsQuery();

  const [deleteSelfById, { isLoading: isSelfDeleteLoading }] =
    useLazyDeleteSelfWithIdQuery();

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

  const onNewSelfHandler = () => {
    setIsOpen(true);
  };
  // close drawer
  const onCloseDrawer = () => {
    setIsOpen(false);
    setIsModalClosed(true);
  };

  // detail handler
  const onCheckoutClickHandler = (id: number, title: string) => {
    if (id) {
      navigate({
        pathname: FOOD_ALL_DETAIL_SELF_PAGE_ROUTE,
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

  // onDeleteConfirm
  const onDeleteConfirm = () => {
    deleteSelfById({ restaurantId: deleteModalInfo?.id?.toString() })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          getRestaurantData();
          setDeleteModalInfo({ isOpen: false, id: -1, title: "" });
        } else {
          return toast.error((res?.data || res?.msg) as any, {
            toastId: (res?.data || res?.msg) as any,
          });
        }
      });
  };

  //
  const onRemoveSelfClickHandler = (id: number, title: string) => {
    setDeleteModalInfo({
      id,
      isOpen: true,
      title,
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
          content={<SelfDeleteModalContent />}
          onConfirmClickHandler={onDeleteConfirm}
          confirmBtnText="حذف"
          backBtnText="انصراف"
          isDangerous
          title={deleteModalInfo?.title}
          isConfirmButtonLoading={isSelfDeleteLoading}
          showIcon={false}
        />
      )}

      {isOpen && (
        <CustomDrawer
          title="تعریف سلف جدید"
          open={isOpen}
          onClose={onCloseDrawer}
          closeIcon={<AiOutlineClose />}
          className="food-all-self-drawer"
          content={
            <AllSelfListDrawerContent
              onCloseDrawer={onCloseDrawer}
              getRestaurantData={getRestaurantData}
              isModalClosed={isModalClosed}
            />
          }
        />
      )}

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
          className="btn-wrapper"
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
          leftSide={
            <CustomButton type="primary" className="back-btn" onClick={onNewSelfHandler}>
              تعریف سلف جدید
            </CustomButton>
          }
        />
        <div className="committee-confirmer-submit-list-container">
          <CustomTable<RestaurantType>
            dataSource={dataSource}
            loading={isSelfDataLoading}
            rowKey="id"
            columns={AllSelfListTableModel({
              onCheckoutClickHandler: onCheckoutClickHandler,
              onRemoveSelfClickHandler: onRemoveSelfClickHandler,
              isDeletedEnabled,
            })}
            pagination={paginationConfig}
            className="food-self-list-table"
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
        <CustomTotalTableItems totalCount={dataSource?.length} label="تعداد کل سلف ها:" />
      </div>
    </>
  );
};

export default AllSelfList;

import { useCallback, useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

// import FoodFilterChips from "./helpers/components/FoodFilterChips/FoodFilterChips";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { FoodType } from "./@types/allFoodsList";
import AllFoodsAddSchedulesDrawerContent from "./helpers/components/AllFoodsAddSchedulesDrawerContent/AllFoodsAddSchedulesDrawerContent";
import AllFoodsListDrawerContent from "./helpers/components/AllFoodsListDrawerContent/AllFoodsListDrawerContent";
import FoodDeleteModalContent from "./helpers/components/modals/FoodDeleteModalContent/FoodDeleteModalContent";
import AllFoodListTableModel from "./helpers/models/AllFoodListTableModel/AllFoodListTableModel";
import useAllFoodAdvanceFilter from "./helpers/utils/useAllFoodAdvanceFilter";
import CustomButton from "../../../../../components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "../../../../../components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import {
  useLazyGetAllFoodByFilterQuery,
  useLazyRemoveFoodByIdQuery,
} from "../../../../../infrastructure/states/redux/Apis/food/foods/foodApis";
import "./_allFoodsList.scss";

const FILTER_DEPENDENCIES = [
  "contractId",
  "maxPrice",
  "minPrice",
  "branchCodeId",
  "productTitle",
  "selfId",
  "vendorId",
];

const AllFoodsList = () => {
  useTitle({ text: "غذاها" });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddSchedules, setIsOpenAddSchedules] = useState(false);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const [dataSource, setDataSource] = useState<FoodType[]>([]);
  const [isDeletedEnabled, setIsDeletedEnabled] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const [deleteModalInfo, setDeleteModalInfo] = useState({
    isOpen: false,
    id: -1,
    title: "",
  });
  const [form] = Form.useForm<any>();
  const [selectedFoodData, setSelectedFoodData] = useState<{
    contractRestaurantTitle: string;
    contractTitle: string;
    title: string;
    id: number;
  } | null>(null);
  const { params, setSearchParams } = useQueryParams();

  const { filterItemsList, fetchInitialData } = useAllFoodAdvanceFilter(form);

  //? ================================  Api Calls ================================
  const [getAllFoodByFilter, { isFetching: isGetAllFoodFetching }] =
    useLazyGetAllFoodByFilterQuery();

  const [removeFoodById, { isFetching: isRemovedFoodLoading }] =
    useLazyRemoveFoodByIdQuery();
  //? ================================ Effects ================================

  useEffect(() => {
    getData();
  }, [
    isDeletedEnabled,
    params?.pageNo,
    params?.pageSize,
    ...FILTER_DEPENDENCIES.map((key) => params?.[key]),
  ]);

  useEffect(
    () => {
      const activeFilters = FILTER_DEPENDENCIES.filter((key) => params?.[key]).length;
      setBadgeCount(activeFilters);
    },
    FILTER_DEPENDENCIES.map((key) => params?.[key])
  );
  //* ================================ Util Functions ================================
  const getData = () => {
    //! V2 with Filter

    getAllFoodByFilter({
      pageNo: params?.pageNo === "0" ? "0" : params?.pageNo,
      pageSize: params?.pageSize ? params?.pageSize : "8",
      restaurantId: params?.selfId,
      contractId: params?.contractId,
      vendorId: params?.vendorId,
      branchCode: params?.branchCodeId,
      //table column
      isDeleted: isDeletedEnabled ? "true" : "false",
      productTitle: params?.productTitle,
      maxPrice: params?.maxPrice,
      minPrice: params?.minPrice,
    })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          setTotalPages(res?.data?.totalElements);
          setDataSource(res?.data?.productDtos);
          // setIsFilterModalOpen(false);
        } else {
          return toast.error((res?.data || res?.msg) as any, {
            toastId: (res?.data || res?.msg) as any,
          });
        }
      });
  };
  // close drawer
  const onCloseDrawerHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onCloseAddSchedulesDrawerHandler = useCallback(() => {
    setIsOpenAddSchedules(false);
  }, []);

  // create new food handler
  const onNewFoodHandler = useCallback(() => {
    setIsOpen(true);
  }, []);

  // add to food schedule handler
  const onAddMenuClickHandler = (record: FoodType) => {
    if (!record?.contractRestaurantTitle || !record?.contractTitle) {
      const title = "مقادیر مناسب یافت نشد";
      return toast.warning(title, { toastId: title });
    }
    setSelectedFoodData({
      contractRestaurantTitle: record?.contractRestaurantTitle,
      contractTitle: record?.contractTitle,
      title: record?.title,
      id: record?.id,
    });
    setIsOpenAddSchedules(true);
  };
  // removing food
  const onRemoveFoodClickHandler = (id: number, title: string) => {
    setDeleteModalInfo({
      id,
      isOpen: true,
      title,
    });
  };

  // confirmation of deleting
  const onDeleteConfirm = () => {
    removeFoodById({ productId: deleteModalInfo?.id?.toString() })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          getData();
          setDeleteModalInfo({ isOpen: false, id: -1, title: "" });
        } else {
          return toast.error(res?.data as any, { toastId: res?.data as any });
        }
      });
  };

  // submitting filters
  // const onAdvancedFilterSubmit = ({
  //   contract,
  //   food,
  //   self,
  //   vendor,
  //   slider,
  // }: AdvancedFilterFormType) => {
  //   const filteredParams = {
  //     isFiltered: "1",
  //     pageNo: "0",
  //     pageSize: params?.pageSize?.toString(),

  //     ...(food?.value && { foodId: food?.value }),
  //     ...(food?.value && { foodName: food?.title }),
  //     ...(self?.value && { selfId: self?.value }),
  //     ...(self?.value && { selfName: self?.title }),
  //     ...(vendor?.value && { vendorId: vendor?.value }),
  //     ...(vendor?.value && { vendorName: vendor?.title }),
  //     ...(contract?.value && { contractId: contract?.value }),
  //     ...(contract?.value && { contractName: contract?.title }),
  //     ...(slider?.[0] && { minUrlValue: slider?.[0]?.toString() }),
  //     ...(slider?.[1] && { maxUrlValue: slider?.[1]?.toString() }),
  //   };
  //   setSearchParams(filteredParams);

  //   // Close the modal in any case
  //   setIsFilterModalOpen(false);
  // };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADVANCED FILTER MODAL*/}
      {/* {isFilterModalOpen ? (
        <FoodAdvancedModal
          isModalOpen={isFilterModalOpen}
          closeModalHandler={() => setIsFilterModalOpen(false)}
          onSubmit={onAdvancedFilterSubmit}
          form={advancedFilterForm}
          pageType="admin"
        />
      ) : null} */}
      {/* DELETE MODAL */}
      {deleteModalInfo?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={deleteModalInfo?.isOpen}
          closeModalHandler={() =>
            setDeleteModalInfo({ isOpen: false, id: -1, title: "" })
          }
          content={<FoodDeleteModalContent />}
          onConfirmClickHandler={onDeleteConfirm}
          confirmBtnText="حذف"
          backBtnText="انصراف"
          isDangerous
          title={deleteModalInfo?.title}
          isConfirmButtonLoading={isRemovedFoodLoading}
          showIcon={false}
        />
      )}
      {isOpen && (
        <CustomDrawer
          open={isOpen}
          onClose={onCloseDrawerHandler}
          className="food-all-foods-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <AllFoodsListDrawerContent
              open={isOpen}
              getData={getData}
              onCloseDrawerHandler={onCloseDrawerHandler}
            />
          }
        />
      )}
      {isOpenAddSchedules && (
        <CustomDrawer
          open={isOpenAddSchedules}
          onClose={onCloseAddSchedulesDrawerHandler}
          className="food-all-foods-drawer add-schedules-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <AllFoodsAddSchedulesDrawerContent
              closeDrawerHandler={onCloseAddSchedulesDrawerHandler}
              foodData={selectedFoodData}
            />
          }
        />
      )}
      <div className="food-all-foods-list-container">
        <CustomSwitch
          label="نمایش:"
          valuePropName="switch"
          unCheckedChildren="حذف شده ها"
          checkedChildren="اطلاعات فعلی"
          defaultChecked={true}
          value={!isDeletedEnabled}
          onChange={(value: boolean) => {
            setSearchParams({});
            setIsDeletedEnabled(!value);
          }}
        />
        <ToolBox
          className="btn-wrapper"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                type="primary"
                icon={<AiOutlineFilter />}
                onClick={() => {
                  setAdvanceModalOpen(true);
                  fetchInitialData();
                }}
                className="advance-filter-btn"
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <CustomButton type="primary" className="back-btn" onClick={onNewFoodHandler}>
              تعریف غذای جدید
            </CustomButton>
          }
        />
        {/* {badgeCount > 0 && (
          <div className="custom-all-foods-chips-container">
            <FoodFilterChips />
          </div>
        )} */}
        <div className="food-all-foods-table-list-container">
          <CustomTable<FoodType>
            dataSource={dataSource}
            rowKey="id"
            loading={isGetAllFoodFetching}
            columns={AllFoodListTableModel({
              onAddMenuClickHandler: onAddMenuClickHandler,
              onRemoveFoodClickHandler: onRemoveFoodClickHandler,
              isDeletedEnabled,
              isFromAdmin: true,
            })}
            pagination={manualPaginationConfig({
              total: totalPages,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...params,
                  pageNo: (page - 1)?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: params?.pageNo ? Number(params?.pageNo) + 1 : 1,
              defaultPageSize: params?.pageSize ? +params?.pageSize : 8,
            })}
            className="food-all-foods-list-table"
            {...TABLE_PROPS(dataSource?.length)}
            draggableColumns
            draggableId={ExcelCodes.FOOD_ALL_FOODS_LIST_TABLE}
            key={`table-${params?.pageSize || "8"}`}
          />
        </div>
        <CustomTotalTableItems
          totalCount={totalPages}
          label="تعداد کل غذاها"
          className="food-counter-items"
        />
      </div>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={() => {
            setAdvanceModalOpen(false);
            form.resetFields();
          }}
          filterItemsList={filterItemsList}
          form={form}
          // badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={params}
        />
      )}
    </>
  );
};

export default AllFoodsList;

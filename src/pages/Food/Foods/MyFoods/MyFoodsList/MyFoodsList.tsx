import { useCallback, useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MyFoodDetailDataType } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@myContractFoodDetailDrawerContent";
import MyFoodListTableModel from "@pages/Food/Foods/MyFoods/MyFoodsList/helpers/models/MyFoodListTableModel/MyFoodListTableModel";

import MyFoodsAddSchedulesDrawerContent from "./helpers/components/MyFoodsAddSchedulesDrawerContent/MyFoodsAddSchedulesDrawerContent";
import MyFoodsListDrawerContent from "./helpers/components/MyFoodsListDrawerContent/MyFoodsListDrawerContent";
import useMyFoodAdvanceFilter from "./helpers/utils/useMyFoodAdvanceFilter";
import CustomButton from "../../../../../components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "../../../../../components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { useLazyGetMyFoodByFilterQuery } from "../../../../../infrastructure/states/redux/Apis/food/foods/foodApis";

import "./_myFoodsList.scss";

const FILTER_DEPENDENCIES = [
  "statusId",
  "contractId",
  "maxPrice",
  "minPrice",
  "branchCodeId",
  "productTitle",
  "selfId",
  "vendorId",
];

const MyFoodsList = () => {
  useTitle({ text: "غذاها" });
  const [isOpen, setIsOpen] = useState(false);
  const [openAddSchedules, setOpenAddSchedules] = useState(false);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [dataSource, setDataSource] = useState<MyFoodDetailDataType[]>([]);
  const [badgeCount, setBadgeCount] = useState(0);
  const [selectedFoodData, setSelectedFoodData] = useState<{
    contractRestaurantTitle: string;
    contractTitle: string;
    title: string;
    id: number;
  } | null>(null);
  const [form] = Form.useForm<any>();
  const { params, setSearchParams } = useQueryParams();

  const { filterItemsList, fetchInitialData } = useMyFoodAdvanceFilter(form);
  //? ================================  Api Calls ================================
  // get table list
  // const [getFoodsList, { isFetching: isFoodsListLoading }] = useLazyGetMyFoodsListQuery();
  const [getMyFoodByFilter, { isFetching: isGetAllFoodFetching }] =
    useLazyGetMyFoodByFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [
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

    getMyFoodByFilter({
      pageNo: params?.pageNo === "0" ? "0" : params?.pageNo,
      pageSize: params?.pageSize ? params?.pageSize : "8",
      restaurantId: params?.selfId,
      contractId: params?.contractId,
      vendorId: params?.vendorId,
      branchCode: params?.branchCodeId,

      //table column
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
          return toast.error(res?.data as any, { toastId: res?.data as any });
        }
      });
  };

  // close drawer
  const onCloseDrawerHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onCloseAddSchedulesDrawerHandler = useCallback(() => {
    setOpenAddSchedules(false);
  }, []);

  // create new food handler
  const onNewFoodHandler = useCallback(() => {
    setIsOpen(true);
  }, []);

  // add to food schedule handler
  const onAddMenuClickHandler = (record: MyFoodDetailDataType) => {
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
    setOpenAddSchedules(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpen && (
        <CustomDrawer
          open={isOpen}
          onClose={onCloseDrawerHandler}
          className="food-my-foods-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <MyFoodsListDrawerContent
              open={isOpen}
              getData={getData}
              onCloseDrawerHandler={onCloseDrawerHandler}
            />
          }
        />
      )}
      {openAddSchedules && (
        <CustomDrawer
          open={openAddSchedules}
          onClose={onCloseAddSchedulesDrawerHandler}
          className="food-my-foods-drawer add-schedules-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <MyFoodsAddSchedulesDrawerContent
              closeDrawerHandler={onCloseAddSchedulesDrawerHandler}
              foodData={selectedFoodData}
            />
          }
        />
      )}
      <div className="food-my-foods-list-container">
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
        <div className="food-my-foods-table-list-container">
          <CustomTable<MyFoodDetailDataType>
            dataSource={dataSource}
            rowKey="id"
            loading={isGetAllFoodFetching}
            columns={MyFoodListTableModel({
              onAddMenuClickHandler: onAddMenuClickHandler,
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
            className="food-my-foods-list-table"
            {...TABLE_PROPS(dataSource?.length)}
            key={`table-${params?.pageSize || "8"}`}
            draggableColumns
            draggableId={ExcelCodes.FOOD_MY_FOODS_LIST_TABLE}
          />
        </div>
        <CustomTotalTableItems totalCount={totalPages} label="تعداد کل غذاها" />
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

export default MyFoodsList;

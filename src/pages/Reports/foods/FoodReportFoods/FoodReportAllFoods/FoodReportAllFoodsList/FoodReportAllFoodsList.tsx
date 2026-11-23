import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllFoodByFilterQuery } from "@infra/states/redux/Apis/food/foods/foodApis";
import useAllFoodAdvanceFilter from "@pages/Food/Foods/AllFoods/AllFoodsList/helpers/utils/useAllFoodAdvanceFilter";

import { AdvancedFilterFormType, FoodType } from "./@types/allFoodsList";
import FoodAdvancedModal from "./helpers/components/modals/FoodAdvancedModal/FoodAdvancedModal";
import AllFoodListTableModel from "./helpers/models/AllFoodListTableModel/AllFoodListTableModel";
import "./_FoodReportAllFoodsList.scss";

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

const AllFoodsList = () => {
  useTitle({ text: "غذاها" });
  const [advancedFilterForm] = Form.useForm<AdvancedFilterFormType>();
  const [dataSource, setDataSource] = useState<FoodType[]>([]);
  const [isDeletedEnabled, setIsDeletedEnabled] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const { params, setSearchParams } = useQueryParams();
  const [form] = Form.useForm<any>();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const { filterItemsList, fetchInitialData } = useAllFoodAdvanceFilter(form);
  //? ================================  Api Calls ================================
  const [getAllFoodByFilter, { isFetching: isGetAllFoodFetching }] =
    useLazyGetAllFoodByFilterQuery();
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

  // submitting filters
  const onAdvancedFilterSubmit = ({
    contract,
    food,
    self,
    vendor,
    slider,
  }: AdvancedFilterFormType) => {
    const filteredParams = {
      isFiltered: "1",
      pageNo: "0",
      pageSize: params?.pageSize ? params?.pageSize?.toString() : "8",

      ...(food?.value && { foodId: food?.value }),
      ...(food?.value && { foodName: food?.title }),
      ...(self?.value && { selfId: self?.value }),
      ...(self?.value && { selfName: self?.title }),
      ...(vendor?.value && { vendorId: vendor?.value }),
      ...(vendor?.value && { vendorName: vendor?.title }),
      ...(contract?.value && { contractId: contract?.value }),
      ...(contract?.value && { contractName: contract?.title }),
      ...(slider?.[0] && { minUrlValue: slider?.[0]?.toString() }),
      ...(slider?.[1] && { maxUrlValue: slider?.[1]?.toString() }),
    };
    setSearchParams(filteredParams);

    // Close the modal in any case
    setIsFilterModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADVANCED FILTER MODAL*/}
      {isFilterModalOpen ? (
        <FoodAdvancedModal
          isModalOpen={isFilterModalOpen}
          closeModalHandler={() => setIsFilterModalOpen(false)}
          onSubmit={onAdvancedFilterSubmit}
          form={advancedFilterForm}
          pageType="admin"
        />
      ) : null}

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
        />

        <div className="food-all-foods-table-list-container">
          <CustomTable
            dataSource={dataSource}
            rowKey="id"
            loading={isGetAllFoodFetching}
            columns={AllFoodListTableModel({
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
          badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={params}
        />
      )}
    </>
  );
};

export default AllFoodsList;

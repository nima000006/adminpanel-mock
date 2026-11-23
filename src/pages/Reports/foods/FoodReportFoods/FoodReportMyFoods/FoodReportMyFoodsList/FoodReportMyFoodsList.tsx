import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyFoodByFilterQuery } from "@infra/states/redux/Apis/food/foods/foodApis";
import { MyFoodDetailDataType } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@myContractFoodDetailDrawerContent";
import useMyFoodAdvanceFilter from "@pages/Food/Foods/MyFoods/MyFoodsList/helpers/utils/useMyFoodAdvanceFilter";

import ReportMyFoodListTableModel from "./helpers/models/MyFoodListTableModel/MyFoodListTableModel";
import "./_FoodReportMyFoodsList.scss";

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
  const [dataSource, setDataSource] = useState<MyFoodDetailDataType[]>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const [form] = Form.useForm<any>();
  const { params, setSearchParams } = useQueryParams();

  const { filterItemsList, fetchInitialData } = useMyFoodAdvanceFilter(form);
  //? ================================  Api Calls ================================
  // get table list
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
      pageSize: params?.pageSize ? params?.pageSize?.toString() : "8",
      restaurantId: params?.selfId,
      contractId: params?.contractId,
      vendorId: params?.vendorId,
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
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
        />
        <div className="food-my-foods-table-list-container">
          <CustomTable
            dataSource={dataSource}
            rowKey="id"
            loading={isGetAllFoodFetching}
            columns={ReportMyFoodListTableModel()}
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
          />
        </div>
        <CustomTotalTableItems totalCount={totalPages} label="تعداد کل غذاها" />
      </div>
    </>
  );
};

export default MyFoodsList;

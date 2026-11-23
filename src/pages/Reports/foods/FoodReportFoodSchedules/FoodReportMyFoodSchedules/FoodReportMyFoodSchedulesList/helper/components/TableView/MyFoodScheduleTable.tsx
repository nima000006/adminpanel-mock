import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams, nonNullValues } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetMangerFoodScheduleWithFilterQuery,
  useLazyGetMyFoodScheduleListQuery,
} from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { AdvancedFilterFormFoodSchedule } from "@pages/Reports/foods/FoodReportFoodSchedules/_shared/AdvanceFilterModal/@types/@foodSchedulefilterModal";
import FoodScheduleAdvanceFilterModal from "@pages/Reports/foods/FoodReportFoodSchedules/_shared/AdvanceFilterModal/FoodScheduleAdvanceFilterModal";
import CustomFoodScheduleSearchChips from "@pages/Reports/foods/FoodReportFoodSchedules/_shared/CustomFoodScheduleSearchChips/CustomFoodScheduleSearchChips";
import {
  FoodScheduleWithFilterPlanDTO,
  GetFoodScheduleWithFilterResponse,
} from "@pages/Reports/foods/FoodReportSelfs/FoodReportMySelfs/FoodReportMyDetailSelf/helpers/components/FoodSchedule/@types/foodSchedule";

import { FoodSchedule } from "../../../@types/@myFoodSchedulesList";
import MyFoodScheduleListTableModel from "../../models/MyFoodScheduleListTableModel/MyFoodScheduleListTableModel";

import "./_myFoodSchedulesTable.scss";

const MyFoodScheduleTable = () => {
  const [dataSource, setDataSource] = useState<
    FoodScheduleWithFilterPlanDTO[] | FoodSchedule[] | []
  >([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const [advancedFilterForm] = Form.useForm<AdvancedFilterFormFoodSchedule>();
  const { params: params, setSearchParams } = useQueryParams();

  const {
    pageNo = 0,
    pageSize = 8,
    date,
    foodId,
    foodName,
    contractId,
    contractName,
    mealId,
    mealName,
    selfId,
    selfName,
    requestTypeId,
    requestTypeName,
    statusId,
    statusName,
    isFiltered,
  } = params;

  //? ================================  Api Calls ================================
  const [getFoodSchedule, { isFetching: isFoodScheduleLoading }] =
    useLazyGetMangerFoodScheduleWithFilterQuery();

  const [getAllFoodSchedule, { isFetching: isGetAllScheduleLoading }] =
    useLazyGetMyFoodScheduleListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [
    pageNo,
    pageSize,
    date,
    foodId,
    foodName,
    contractId,
    contractName,
    mealId,
    mealName,
    selfId,
    selfName,
    requestTypeId,
    requestTypeName,
    statusId,
    statusName,
    isFiltered,
  ]);

  // resets the header to minimum url if badgeCount < 1
  useEffect(() => {
    if (badgeCount < 1) {
      setSearchParams({
        pageNo: pageNo === 0 ? "0" : pageNo,
        pageSize: pageSize?.toString(),
      });
    }
  }, [badgeCount]);

  //* ================================ Util Functions ================================

  const getListData = () => {
    const isOnFiltered = isFiltered === "1";

    if (isOnFiltered) {
      //! with Filter
      const queryArg = makeSearchParams({
        pageNo: pageNo === 0 ? "0" : pageNo,
        pageSize,
        //
        reserveDate: date,
        productId: foodId,
        contractId,
        mealId,
        restaurantId: selfId,
        requestType: requestTypeId,
        active: statusId === "1" ? "true" : statusId === "2" ? "false" : null,
      });

      const filteredParams = {
        isFiltered: "1",
        pageNo: pageNo === 0 ? "0" : pageNo,
        pageSize: pageSize?.toString(),
        ...(date && { date: date?.split("T")[0] }),
        ...(foodId && { foodId }),
        ...(foodName && { foodName }),
        ...(contractId && { contractId }),
        ...(contractName && { contractName }),
        ...(mealId && { mealId }),
        ...(mealName && { mealName }),
        ...(selfId && { selfId }),
        ...(selfName && { selfName }),
        ...(requestTypeId && { requestTypeId }),
        ...(requestTypeName && { requestTypeName }),
        ...(statusId && { statusId }),
        ...(statusName && { statusName }),
      };

      setSearchParams(filteredParams);

      //! new version
      // filterOrders({ queryString: queryArg })
      getFoodSchedule({
        query: queryArg,
      })
        .unwrap()
        .then(onGetFoodScheduleSuccess);
      return;
    }
    getAllFoodSchedule({
      pageNo: pageNo === 0 ? "0" : pageNo,
      pageSize: pageSize ? pageSize?.toString() : "8",
    })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          setTotalPages(res?.data?.totalElements);
          setDataSource(res?.data?.planDtos);
        } else {
          return toast.error((res?.data || res?.msg) as any, {
            toastId: (res?.data || res?.msg) as any,
          });
        }
      });
  };

  // onAdvancedFilterSubmit
  const onAdvancedFilterSubmit = ({
    contract,
    date,
    food,
    meal,
    requestType,
    self,
    status,
  }: AdvancedFilterFormFoodSchedule) => {
    // create filter params
    const filteredParams = {
      isFiltered: "1",
      pageNo: "0",
      pageSize: pageSize?.toString(),
      ...(date && { date: date?.split("T")[0] }),

      ...(food?.value && { foodId: food?.value }),
      ...(food?.value && { foodName: food?.title }),
      ...(meal?.value && { mealId: meal?.value }),
      ...(meal?.value && { mealName: meal?.title }),
      ...(self?.value && { selfId: self?.value }),
      ...(self?.value && { selfName: self?.title }),
      ...(contract?.value && { contractId: contract?.value }),
      ...(contract?.value && { contractName: contract?.title }),
      ...(requestType?.value && { requestTypeId: requestType?.value }),
      ...(requestType?.value && { requestTypeName: requestType?.title }),
      ...(status?.value && { statusId: status?.value }),
      ...(status?.value && { statusName: status?.title }),
    };

    setSearchParams(filteredParams);

    // Close the modal in any case
    setIsFilterModalOpen(false);
  };

  // onGetFoodScheduleSuccess
  const onGetFoodScheduleSuccess = (res: GetFoodScheduleWithFilterResponse) => {
    if (res?.status === 200) {
      const count = nonNullValues({
        date,
        selfId,
        mealId,
        statusId,
        requestTypeId,
        foodId,
        contractId,
      }).length;
      // You can set the badge count here if needed
      setBadgeCount(count);
      setTotalPages(res?.data?.totalElements);
      setDataSource(res?.data?.planDtos);
      setIsFilterModalOpen(false);
    } else {
      return toast.error((res?.data || res?.msg) as any, {
        toastId: (res?.data || res?.msg) as any,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADVANCED FILTER MODAL*/}
      {isFilterModalOpen && (
        <FoodScheduleAdvanceFilterModal
          isModalOpen={isFilterModalOpen}
          closeModalHandler={() => setIsFilterModalOpen(false)}
          onSubmit={onAdvancedFilterSubmit}
          form={advancedFilterForm}
          pageType="manager"
        />
      )}
      <div className="my-food-schedule-list-page-container">
        <div className="btn-wrapper">
          <CustomBadge count={badgeCount}>
            <CustomButton
              type="primary"
              icon={<AiOutlineFilter />}
              onClick={() => setIsFilterModalOpen(true)}
              className="btn-text"
            >
              فیلتر پیشرفته
            </CustomButton>
          </CustomBadge>
        </div>
        {badgeCount > 0 && (
          <div className="custom-reserve-chips-container">
            <CustomFoodScheduleSearchChips />
          </div>
        )}
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          loading={isFoodScheduleLoading || isGetAllScheduleLoading}
          columns={MyFoodScheduleListTableModel()}
          pagination={manualPaginationConfig({
            total: totalPages,
            onChange: (page, pageSize) => {
              setSearchParams({
                isFiltered: isFiltered === "1" ? "1" : "false",
                pageNo: (page - 1)?.toString(),
                pageSize: pageSize?.toString(),
                ...(date && { date: date?.split("T")[0] }),
                ...(foodId && { foodId }),
                ...(foodName && { foodName }),
                ...(contractId && { contractId }),
                ...(contractName && { contractName }),
                ...(mealId && { mealId }),
                ...(mealName && { mealName }),
                ...(selfId && { selfId }),
                ...(selfName && { selfName }),
                ...(requestTypeId && { requestTypeId }),
                ...(requestTypeName && { requestTypeName }),
                ...(statusId && { statusId }),
                ...(statusName && { statusName }),
              });
            },
            pageNumber: +pageNo === 0 ? 1 : Number(pageNo) + 1,
            defaultPageSize: +pageSize,
          })}
          className="my-food-schedule-list-table"
          key={`table-${pageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
        />
        <CustomTotalTableItems
          totalCount={totalPages}
          label="تعداد کل برنامه های غذایی:"
        />
      </div>
    </>
  );
};

export default MyFoodScheduleTable;

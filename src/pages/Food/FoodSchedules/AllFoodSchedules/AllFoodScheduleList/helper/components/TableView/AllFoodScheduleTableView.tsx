import { useCallback, useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams, nonNullValues } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllFoodScheduleListQuery,
  useLazyGetFoodScheduleWithFilterQuery,
} from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { AdvancedFilterFormFoodSchedule } from "@pages/Food/FoodSchedules/_shared/AdvanceFilterModal/@types/@foodSchedulefilterModal";
import FoodScheduleAdvanceFilterModal from "@pages/Food/FoodSchedules/_shared/AdvanceFilterModal/FoodScheduleAdvanceFilterModal";
import CustomFoodScheduleSearchChips from "@pages/Food/FoodSchedules/_shared/CustomFoodScheduleSearchChips/CustomFoodScheduleSearchChips";
import GroupDefineFoodSchedulesModalContent from "@pages/Food/FoodSchedules/_shared/GroupDefineFoodSchedulesModal/GroupDefineFoodSchedulesModalContent";
import AllSingleFoodScheduleListDrawerContent from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllSingleFoodScheduleListDrawerContent/AllSingleFoodScheduleListDrawerContent";
import {
  FoodScheduleWithFilterPlanDTO,
  GetFoodScheduleWithFilterResponse,
} from "@pages/Food/Selfs/MySelfs/MyDetailSelf/helpers/components/FoodSchedule/@types/foodSchedule";

import {
  FoodSchedule,
  GetAllFoodScheduleListResponse,
} from "../../../@types/@allFoodScheduleList";
import AllMultiFoodMultiDayScheduleListDrawerContent from "../../drawer/AllMultiFoodMultiDayScheduleListDrawerContent/AllMultiFoodMultiDayScheduleListDrawerContent";
import AllOneFoodMultiDayScheduleListDrawerContent from "../../drawer/AllOneFoodMultiDayScheduleListDrawerContent/AllOneFoodMultiDayScheduleListDrawerContent";
import AllFoodScheduleListTableModel from "../../models/AllFoodScheduleListTableModel/AllFoodScheduleListTableModel";
import "./_allFoodScheduleTableView.scss";

const AllFoodScheduleTableView = () => {
  const [isSingleDrawerOpen, setIsSingleDrawerOpen] = useState(false);
  const [isOneFoodMultiDayFoodScheduleOpen, setIsOneFoodMultiDayFoodScheduleOpen] =
    useState(false);
  const [isMultiFoodMultiDayFoodScheduleOpen, setIsMultiFoodMultiDayFoodScheduleOpen] =
    useState(false);
  const [dataSource, setDataSource] = useState<
    FoodScheduleWithFilterPlanDTO[] | FoodSchedule[]
  >([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const [isGroupDefineFoodSchedulesOpen, setIsGroupDefineFoodSchedulesOpen] =
    useState(false);
  const [hasGroupDefineFoodSchedulesError, setHasGroupDefineFoodSchedulesError] =
    useState(false);
  const [advancedFilterForm] = Form.useForm<AdvancedFilterFormFoodSchedule>();
  const [multiSelectForm] = Form.useForm<{ multiSelect: number }>();

  const { params: Params, setSearchParams } = useQueryParams();
  const {
    pageNo = 0,
    pageSize = 8,
    date,
    isFiltered,
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
    branchCodeId,
    branchCodeName,
  } = Params;

  //? ================================  Api Calls ================================

  const [getFoodSchedule, { isLoading: isFoodScheduleLoading }] =
    useLazyGetFoodScheduleWithFilterQuery();

  const [getAllFoodScheduleList, { isLoading: isGetAllFoodScheduleLoading }] =
    useLazyGetAllFoodScheduleListQuery();

  //? ================================ Effects ================================

  // if any url dependency changes below happens
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
    branchCodeId,
    branchCodeName,
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

  useEffect(() => {
    countHandler();
  }, [branchCodeId, date, selfId, mealId, statusId, requestTypeId, foodId, contractId]);

  //* ================================ Util Functions ================================

  const getListData = () => {
    const isOnFiltered = isFiltered === "1";

    if (isOnFiltered) {
      //! V2 with Filter
      const queryArg = makeSearchParams({
        pageNo: pageNo === 0 ? "0" : pageNo,
        pageSize,
        //
        reserveDate: date,
        branchCode: branchCodeId,
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
        ...(branchCodeId && { branchCodeId }),
        ...(branchCodeName && { branchCodeName }),
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
    getAllFoodScheduleList({
      pageNo: pageNo === 0 ? "0" : pageNo,
      pageSize: pageSize ? pageSize?.toString() : "8",
    })
      .unwrap()
      .then((res: GetAllFoodScheduleListResponse) => {
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

  // Other functions
  const openSingleFoodScheduleDrawerHandler = useCallback(() => {
    setIsSingleDrawerOpen(true);
  }, []);

  const closeSingleFoodScheduleDrawerHandler = useCallback(() => {
    setIsSingleDrawerOpen(false);
  }, []);

  const openOneFoodMultiDayFoodScheduleDrawerHandler = useCallback(() => {
    setIsOneFoodMultiDayFoodScheduleOpen(true);
  }, []);

  const closeOneFoodMultiDayFoodScheduleDrawerHandler = useCallback(() => {
    setIsOneFoodMultiDayFoodScheduleOpen(false);
  }, []);

  const openMultiFoodMultiDayFoodScheduleDrawerHandler = useCallback(() => {
    setIsMultiFoodMultiDayFoodScheduleOpen(true);
  }, []);

  const closeMultiFoodMultiDayFoodScheduleDrawerHandler = useCallback(() => {
    setIsMultiFoodMultiDayFoodScheduleOpen(false);
  }, []);

  const openGroupDefineFoodSchedulesModalHandler = useCallback(() => {
    setIsGroupDefineFoodSchedulesOpen(true);
  }, []);

  const closeGroupDefineFoodSchedulesModalHandler = useCallback(() => {
    setIsGroupDefineFoodSchedulesOpen(false);
  }, []);

  const multiSelectHandler = () => {
    multiSelectForm.submit();
    multiSelectForm.validateFields().then((value) => {
      if (!value?.multiSelect) {
        setHasGroupDefineFoodSchedulesError(true);
      } else {
        if (value?.multiSelect === 1) {
          // یک غذا، چند روز
          openOneFoodMultiDayFoodScheduleDrawerHandler();
        } else {
          openMultiFoodMultiDayFoodScheduleDrawerHandler();
        }
        closeGroupDefineFoodSchedulesModalHandler();
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
    branchCode,
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
      ...(branchCode?.value && { branchCodeId: branchCode?.value }),
      ...(branchCode?.value && { branchCodeName: branchCode?.title }),
    };

    setSearchParams(filteredParams);

    // Close the modal in any case
    setIsFilterModalOpen(false);
  };

  const countHandler = () => {
    const count = nonNullValues({
      branchCodeId,
      date,
      selfId,
      mealId,
      statusId,
      requestTypeId,
      foodId,
      contractId,
    }).length;
    // if (count < 1) {
    //   setSearchParams({});
    // }
    // You can set the badge count here if needed
    setBadgeCount(count);
  };

  // onGetFoodScheduleSuccess
  const onGetFoodScheduleSuccess = (res: GetFoodScheduleWithFilterResponse) => {
    if (res?.status === 200) {
      countHandler();
      setTotalPages(res?.data?.totalElements);
      setDataSource(res?.data?.planDtos);
      setIsFilterModalOpen(false);
    } else {
      return toast.error((res?.data || res?.msg) as any, {
        toastId: (res?.data || res?.msg) as any,
      });
    }
  };
  return (
    <div>
      {/* ADVANCED FILTER MODAL*/}
      {isFilterModalOpen && (
        <FoodScheduleAdvanceFilterModal
          isModalOpen={isFilterModalOpen}
          closeModalHandler={() => setIsFilterModalOpen(false)}
          onSubmit={onAdvancedFilterSubmit}
          form={advancedFilterForm}
          pageType="admin"
        />
      )}

      {/* MULTIPLE SELECT */}
      {isGroupDefineFoodSchedulesOpen && (
        <ConfirmationModalWithContent
          title="تعریف گروهی برنامه غذایی"
          isModalOpen={isGroupDefineFoodSchedulesOpen}
          confirmBtnText="ادامه"
          backBtnText="انصراف"
          closeModalHandler={closeGroupDefineFoodSchedulesModalHandler}
          onConfirmClickHandler={multiSelectHandler}
          content={
            <GroupDefineFoodSchedulesModalContent
              form={multiSelectForm}
              hasAlert={hasGroupDefineFoodSchedulesError}
            />
          }
        />
      )}

      {/* ONE FOOD MULTI DAY SELECT DRAWER MODAL*/}
      {isOneFoodMultiDayFoodScheduleOpen && (
        <CustomDrawer
          // onClose={closeOneFoodMultiDayFoodScheduleDrawerHandler}
          open={isOneFoodMultiDayFoodScheduleOpen}
          className="all-food-schedule-list-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <AllOneFoodMultiDayScheduleListDrawerContent
              closeDrawerHandler={closeOneFoodMultiDayFoodScheduleDrawerHandler}
              getListData={getListData}
            />
          }
        />
      )}

      {/* MULTI FOOD MULTI DAY SELECT DRAWER MODAL*/}
      {isMultiFoodMultiDayFoodScheduleOpen && (
        <CustomDrawer
          //todo[saman]:line below commented out as user dont want the drawer to be closed by clicking else where
          // onClose={closeMultiFoodMultiDayFoodScheduleDrawerHandler}
          open={isMultiFoodMultiDayFoodScheduleOpen}
          className="all-multi-food-multi-day-food-schedule-list-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <AllMultiFoodMultiDayScheduleListDrawerContent
              closeDrawerHandler={closeMultiFoodMultiDayFoodScheduleDrawerHandler}
              getListData={getListData}
            />
          }
        />
      )}

      {/* SINGLE SELECT DRAWER MODAL*/}
      {isSingleDrawerOpen && (
        <CustomDrawer
          // onClose={closeSingleFoodScheduleDrawerHandler}
          open={isSingleDrawerOpen}
          className="all-food-schedule-list-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <AllSingleFoodScheduleListDrawerContent
              closeDrawerHandler={closeSingleFoodScheduleDrawerHandler}
              getListData={getListData}
            />
          }
        />
      )}
      <div className="all-food-schedule-list-page-container">
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
          <div className="action-btn-wrapper">
            <CustomButton
              type="primary"
              ghost
              className="btn-text"
              onClick={openGroupDefineFoodSchedulesModalHandler}
            >
              تعریف گروهی
            </CustomButton>
            <CustomButton
              type="primary"
              className="btn-text"
              onClick={openSingleFoodScheduleDrawerHandler}
            >
              تعریف برنامه غذایی جدید
            </CustomButton>
          </div>
        </div>
        {badgeCount > 0 && (
          <div className="custom-reserve-chips-container">
            <CustomFoodScheduleSearchChips />
          </div>
        )}

        <CustomTable<FoodScheduleWithFilterPlanDTO | FoodSchedule>
          dataSource={dataSource}
          rowKey="id"
          loading={isFoodScheduleLoading || isGetAllFoodScheduleLoading}
          columns={AllFoodScheduleListTableModel()}
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
                ...(branchCodeId && { branchCodeId }),
                ...(branchCodeName && { branchCodeName }),
              });
            },
            pageNumber: +pageNo === 0 ? 1 : Number(pageNo) + 1,
            defaultPageSize: +pageSize,
          })}
          className="all-food-schedule-list-table"
          {...TABLE_PROPS(dataSource?.length)}
        />
        <CustomTotalTableItems
          totalCount={totalPages}
          label="تعداد کل برنامه های غذایی:"
        />
      </div>
    </div>
  );
};

export default AllFoodScheduleTableView;

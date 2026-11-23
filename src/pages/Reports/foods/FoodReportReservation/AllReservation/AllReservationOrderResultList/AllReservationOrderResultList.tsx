import { useEffect, useMemo, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { AiOutlineFilter } from "react-icons/ai";
import { AiFillFileExcel } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import ExcelModal from "@components/Modals/GeneralModals/ExcelModal/ExcelModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useChangeStatusToDeliveredMutation,
  useLazyFilterAdminReservationsQuery,
  useLazyGetAdminAllBasketDataQuery,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { valueCounter } from "@pages/Food/_shared/utils/sharedFoodUtils";

import {
  AdminBasketType,
  AllReservationExcelFormType,
  GetAdminAllBasketDataResponse,
} from "./@types/@allReservationOrderResultList";
import { FOOD_ORDER_DELIVERY_MESSAGE } from "../../utils/ReservationUtils";
import { AllFoodDeliverModalContent } from "./helper/modals/AllFoodDeliverModalContent/AllFoodDeliverModalContent";
import AllFoodReservationOrderModel from "./helper/models/AllFoodReservationOrderModel/AllFoodReservationOrderModel";
import CustomReservationChip from "../../helpers/CustomChip/CustomReservationChip";
import { AdvancedFilterForm } from "../../helpers/modals/FoodReservationAdvancedModal/@types/@foodReservationAdvancedModal";
import FoodReservationAdvancedModal from "../../helpers/modals/FoodReservationAdvancedModal/FoodReservationAdvancedModal";
import {
  allFoodExcelDownload,
  foodExcelDownload,
} from "../../MyReservation/MyReservationOrderResultList/helper/utils/foodOrderExcel";
import { GetBasketPlanByDateAndIdAndMealResponse } from "../AllReservationOrderSearch/@types/@reservationOrderSearch";
import "./_allReservationOrderResultList.scss";

const AllReservationOrderResultList = () => {
  const {
    params: {
      pageNo = 0,
      pageSize = 8,
      lastName,
      firstName,
      username,
      studentNumber,
      branchCode,
      branchName,
      mealId,
      mealName,
      restaurantId,
      restaurantName,
      requestType,
      requestName,
      fromDate,
      toDate,
      deliveryType,
      deliveryName,
      isFiltered,
    },
    setSearchParams,
  } = useQueryParams();

  const [dataSource, setDataSource] = useState<AdminBasketType[]>();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCustomExcelModalOpen, setIsCustomExcelModalOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [isCustomExcelDownloadLinkLoading, setIsCustomExcelDownloadLinkLoading] =
    useState(false);
  const [isExcelDownloadLinkLoading, setIsExcelDownloadLinkLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);

  const [excelForm] = Form.useForm<AllReservationExcelFormType>();
  const [advancedFilterForm] = Form.useForm<AdvancedFilterForm>();

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  useTitle({
    breadcrumbItems: [{ title: "سفارشات" }],
  });

  //? ================================  Api Calls ================================
  const [changeStatusToDelivered, { isLoading: isChangeStatusLoading }] =
    useChangeStatusToDeliveredMutation();

  const [filterOrders, { isFetching: isFilterOrderDataLoading }] =
    useLazyFilterAdminReservationsQuery();

  const [getAllOrders, { isFetching: isGetAllOrdersLoading }] =
    useLazyGetAdminAllBasketDataQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    updateBadgeCount();
    getAllBasketDataHandler();
  }, [
    pageNo,
    pageSize,
    lastName,
    firstName,
    username,
    fromDate,
    toDate,
    studentNumber,
    branchCode,
    branchName,
    mealId,
    mealName,
    restaurantId,
    restaurantName,
    requestType,
    requestName,
    deliveryType,
    deliveryName,
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
  // Update badge count
  const updateBadgeCount = () => {
    const count = valueCounter({
      branchCode,
      fromDate,
      toDate,
      lastName,
      mealId,
      firstName,
      restaurantId,
      studentNumber,
      requestType,
      username,
      deliveryName,
    });

    setBadgeCount(count);
    return count;
  };

  const onChangesStatusError = async () => {
    toast.error(FOOD_ORDER_DELIVERY_MESSAGE.DELIVERY_ISSUE, {
      toastId: FOOD_ORDER_DELIVERY_MESSAGE.DELIVERY_ISSUE,
    });
    setIsConfirmationModalOpen({ isOpen: false, id: -1 });
  };

  //
  const getAllBasketDataHandler = () => {
    const isOnFiltered = isFiltered === "1";

    if (isOnFiltered) {
      const queryArg = makeSearchParams({
        pageNo: pageNo === 0 ? "0" : pageNo,
        pageSize,
        fromDate,
        toDate,
        lastName,
        firstName,
        username,
        studentNumber,
        branchCode,
        mealId,
        restaurantId,
        requestType,
        delivered: deliveryType === "0" ? "true" : deliveryType === "1" ? "false" : false,
      });

      const filteredParams = {
        isFiltered: "1",
        pageNo: pageNo === 0 ? "0" : pageNo,
        pageSize: pageSize?.toString(),
        ...(fromDate && { fromDate }),
        ...(toDate && { toDate }),
        ...(lastName && { lastName }),
        ...(firstName && { firstName }),
        ...(username && { username }),
        ...(studentNumber && { studentNumber }),
        ...(branchCode && { branchCode }),
        ...(branchName && { branchName }),
        ...(mealId && { mealId }),
        ...(mealName && { mealName }),
        ...(restaurantId && { restaurantId }),
        ...(restaurantName && { restaurantName }),
        ...(requestType && { requestType }),
        ...(requestName && { requestName }),
        ...(deliveryType && { deliveryType }),
        ...(deliveryName && { deliveryName }),
      };

      setSearchParams(filteredParams);

      //! new version
      filterOrders({ queryString: queryArg }).unwrap().then(onFilterOrderSuccess);
      return;
    }

    // If nothing is filtered
    getAllOrders({ pageNo: pageNo?.toString(), pageSize: pageSize?.toString() })
      .unwrap()
      .then(onFilterOrderSuccess);
  };

  const onChangesStatusSuccess = async (
    response: GetBasketPlanByDateAndIdAndMealResponse
  ) => {
    if (response?.status === 200) {
      setIsConfirmationModalOpen({ isOpen: false, id: -1 });
      toast.success(FOOD_ORDER_DELIVERY_MESSAGE.DELIVERY_SUCCESS, {
        toastId: FOOD_ORDER_DELIVERY_MESSAGE.DELIVERY_SUCCESS,
      });
      getAllBasketDataHandler();
    }
  };

  // onConfirmToDeliverClickHandler
  const onConfirmToDeliverClickHandler = () => {
    changeStatusToDelivered({ basketPlanId: isConfirmationModalOpen?.id })
      .unwrap()
      .then(onChangesStatusSuccess)
      .catch(onChangesStatusError);
  };
  // onExcelBtnClickHandler
  const onExcelBtnClickHandler = () => {
    setIsExcelModalOpen(true);
  };

  // onExcelBtnClickHandler
  const onCustomExcelBtnClickHandler = () => {
    setIsCustomExcelModalOpen(true);
  };

  // onConfirmCustomExcelModalClickHandler
  const onConfirmCustomExcelModalClickHandler = async ({
    count,
    totalItems,
  }: {
    count?: string;
    totalItems?: ["all"];
  }) => {
    const isTotalOnly = !!totalItems?.includes("all");
    const queryArg = makeSearchParams({
      fromDate,
      toDate,
      lastName,
      firstName,
      username,
      studentNumber,
      branchCode,
      mealId,
      restaurantId,
      requestType,
      delivered: deliveryType === "0" ? "true" : deliveryType === "1" ? "false" : false,
    });

    const convertedQueryArgs = isTotalOnly ? queryArg : queryArg?.replace("?", "&");

    await foodExcelDownload({
      setIsDownloadLinkLoading: setIsCustomExcelDownloadLinkLoading,
      role: "admin",
      isTotalOnly,
      count,
      queryArg: convertedQueryArgs,
    });
    // RESET LOGIC
    setIsCustomExcelModalOpen(false);
    excelForm?.resetFields();
  };

  // onConfirmExcelModalClickHandler
  const onConfirmExcelModalClickHandler = async ({
    count,
    totalItems,
  }: {
    count?: string;
    totalItems?: ["all"];
  }) => {
    const isTotalOnly = !!totalItems?.includes("all");
    await allFoodExcelDownload({
      setIsDownloadLinkLoading: setIsExcelDownloadLinkLoading,
      role: "admin",
      isTotalOnly,
      count,
    });

    // RESET LOGIC
    setIsExcelModalOpen(false);
    excelForm?.resetFields();
  };

  // onFilterModalClickHandler
  const onFilterModalClickHandler = () => {
    setIsFilterModalOpen(true);
  };

  //onFilterOrderSuccess
  const onFilterOrderSuccess = async (res: GetAdminAllBasketDataResponse) => {
    if (res?.status === 200) {
      // update badge
      updateBadgeCount();

      setTotalPages(res?.data?.totalElements);
      setDataSource(res?.data?.basketPlansDtos);
      setIsFilterModalOpen(false);
    } else {
      return toast.error((res?.data || res?.msg) as any, {
        toastId: (res?.data || res?.msg) as any,
      });
    }
  };

  // onAdvancedFilterSubmit
  const onAdvancedFilterSubmit = ({
    branchCode,
    date,
    lastName,
    firstName,
    username,
    restaurantId,
    mealId,
    studentNumber,
    requestType,
    delivery,
  }: AdvancedFilterForm) => {
    const fromDate = dayjs(date?.[0]).utcOffset(0).startOf("day").toISOString();
    const toDate = dayjs(date?.[1]).utcOffset(0).endOf("day").toISOString();

    const filteredParams = {
      isFiltered: "1",
      pageNo: "0",
      pageSize: pageSize?.toString(),
      ...(date && { fromDate }),
      ...(date && { toDate }),
      ...(lastName && { lastName }),
      ...(firstName && { firstName }),
      ...(username && { username }),
      ...(studentNumber && { studentNumber }),
      ...(branchCode && { branchCode: branchCode?.value }),
      ...(branchCode && { branchName: branchCode?.title }),
      ...(mealId && { mealId: mealId?.value }),
      ...(mealId && { mealName: mealId?.title }),
      ...(restaurantId && { restaurantId: restaurantId?.value }),
      ...(restaurantId && { restaurantName: restaurantId?.title }),
      ...(requestType && { requestType: requestType?.value }),
      ...(requestType && { requestName: requestType?.title }),
      ...(delivery && { deliveryType: delivery?.value }),
      ...(delivery && { deliveryName: delivery?.title }),
    };

    setSearchParams(filteredParams);

    // Close the modal in any case
    setIsFilterModalOpen(false);
  };

  const memoizedFoodDeliverModalContent = useMemo(
    () => <AllFoodDeliverModalContent />,
    []
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADVANCED FILTER MODAL*/}
      {isFilterModalOpen ? (
        <FoodReservationAdvancedModal
          isModalOpen={isFilterModalOpen}
          closeModalHandler={() => setIsFilterModalOpen(false)}
          onSubmit={onAdvancedFilterSubmit}
          isConfirmButtonLoading={isChangeStatusLoading}
          form={advancedFilterForm}
          pageType="admin"
        />
      ) : null}

      {/* DELIVER MODAL*/}
      {isConfirmationModalOpen?.isOpen ? (
        <ConfirmationModalWithContent
          isModalOpen={isConfirmationModalOpen?.isOpen}
          confirmBtnText="تحویل غذا"
          backBtnText="انصراف"
          content={memoizedFoodDeliverModalContent}
          closeModalHandler={() => setIsConfirmationModalOpen({ isOpen: false, id: -1 })}
          onConfirmClickHandler={onConfirmToDeliverClickHandler}
          isConfirmButtonLoading={isChangeStatusLoading}
          showIcon={false}
        />
      ) : null}

      {/* EXCEl MODAL  سفارشی*/}
      {isCustomExcelModalOpen ? (
        <ExcelModal
          closeModalHandler={() => setIsCustomExcelModalOpen(false)}
          onExcelSubmit={onConfirmCustomExcelModalClickHandler}
          form={excelForm}
          isModalOpen={isCustomExcelModalOpen}
          isConfirmButtonLoading={isCustomExcelDownloadLinkLoading}
        />
      ) : null}
      {/* EXCEl MODAL کل */}
      {isExcelModalOpen ? (
        <ExcelModal
          closeModalHandler={() => setIsExcelModalOpen(false)}
          onExcelSubmit={onConfirmExcelModalClickHandler}
          form={excelForm}
          isModalOpen={isExcelModalOpen}
          isConfirmButtonLoading={isExcelDownloadLinkLoading}
        />
      ) : null}
      <div className="all-reservation-order-result-list-container">
        <ToolBox
          leftSide={
            <>
              <CustomButton
                onClick={onCustomExcelBtnClickHandler}
                icon={<AiFillFileExcel />}
                iconPlacement="end"
                type="dashed"
                disabled={badgeCount < 1}
              >
                گزارش سفارشی اکسل
              </CustomButton>
              <CustomButton
                onClick={onExcelBtnClickHandler}
                icon={<AiFillFileExcel />}
                iconPlacement="end"
                type="dashed"
              >
                گزارش اکسل
              </CustomButton>
            </>
          }
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                type="primary"
                onClick={onFilterModalClickHandler}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
        />
        {badgeCount > 0 && (
          <div className="custom-reserve-chips-container">
            <CustomReservationChip />
          </div>
        )}

        <CustomTable
          dataSource={dataSource}
          columns={AllFoodReservationOrderModel()}
          loading={
            isChangeStatusLoading || isFilterOrderDataLoading || isGetAllOrdersLoading
          }
          pagination={manualPaginationConfig({
            total: totalPages,
            onChange: (page, pageSize) => {
              setSearchParams({
                isFiltered: isFiltered === "1" ? "1" : "false",
                pageNo: (page - 1)?.toString(),
                pageSize: pageSize?.toString(),
                ...(fromDate && { fromDate }),
                ...(toDate && { toDate }),
                ...(lastName && { lastName }),
                ...(firstName && { firstName }),
                ...(username && { username }),
                ...(studentNumber && { studentNumber }),
                ...(branchCode && { branchCode: branchCode }),
                ...(branchName && { branchName: branchName }),
                ...(mealId && { mealId: mealId }),
                ...(mealName && { mealName: mealName }),
                ...(restaurantId && { restaurantId: restaurantId }),
                ...(restaurantName && { restaurantName: restaurantName }),
                ...(requestType && { requestType: requestType }),
                ...(requestName && { requestName: requestName }),
                ...(deliveryType && { deliveryType }),
                ...(deliveryName && { deliveryName }),
              });
            },
            pageNumber: +pageNo === 0 ? 1 : Number(pageNo) + 1,
            defaultPageSize: +pageSize,
          })}
          rowKey="id"
          {...TABLE_PROPS(dataSource?.length || 0)}
        />
        <CustomTotalTableItems totalCount={totalPages} label="تعداد کل سفارشات:" />
      </div>
    </>
  );
};

export default AllReservationOrderResultList;

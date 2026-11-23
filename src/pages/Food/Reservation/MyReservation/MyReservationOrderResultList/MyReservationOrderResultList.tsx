import { useEffect, useMemo, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { AiOutlineFilter } from "react-icons/ai";
import { AiFillFileExcel } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import ExcelModal from "@components/Modals/GeneralModals/ExcelModal/ExcelModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyFilterMangerReservationsQuery,
  useLazyGetManagerAllBasketDataQuery,
  useMyChangeStatusToDeliveredMutation,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";

import FoodClosingRegistrationDrawerContent from "./helper/drawers/FoodClosingRegistration/FoodClosingRegistrationDrawerContent";
import { allFoodExcelDownload, foodExcelDownload } from "./helper/utils/foodOrderExcel";
import {
  AdminBasketType,
  GetAdminAllBasketDataResponse,
} from "../../AllReservation/AllReservationOrderResultList/@types/@allReservationOrderResultList";
import CustomReservationChip from "../../helpers/CustomChip/CustomReservationChip";
import {
  FOOD_ORDER_DELIVERY_MESSAGE,
  foodDeliveryStatus,
} from "../../utils/ReservationUtils";
import { MyReservationExcelFormType } from "../@types/@myReservationOrderResultList";
import { GetMyBasketPlanByDateAndIdAndMealResponse } from "../MyReservationOrderSearch/@types/@myReservationOrderSearch";
import useMyReservationOrderResultAdvanceFilter from "./helper/modals/AdvanceFilter/useMyReservationOrderResultAdvanceFilter";
import { MyFoodDeliverModalContent } from "./helper/modals/MyReservationOrderResultList/MyFoodDeliverModalContent";
import MyFoodReservationOrderModel from "./helper/models/MyFoodReservationOrderModel/MyFoodReservationOrderModel";
import { AdvancedFilterForm } from "../../helpers/modals/FoodReservationAdvancedModal/@types/@foodReservationAdvancedModal";

import "./_myReservationOrderResultList.scss";

const FILTER_DEPENDENCIES = [
  "dateDateStart",
  "dateDateEnd",
  "firstNameTitle",
  "lastNameTitle",
  "usernameTitle",
  "studentNumberTitle",
  "branchCodeId",
  "restaurantIdId",
  "requestTypeId",
  "mealIdId",
  "deliveryId",
];

const MyReservationOrderResultList = () => {
  const { params, setSearchParams } = useQueryParams();

  const [excelForm] = Form.useForm<MyReservationExcelFormType>();
  const [advancedFilterForm] = Form.useForm<AdvancedFilterForm>();
  const [isExcelDownloadLinkLoading, setIsExcelDownloadLinkLoading] = useState(false);
  const [isCustomExcelModalOpen, setIsCustomExcelModalOpen] = useState(false);
  const [isCustomExcelDownloadLinkLoading, setIsCustomExcelDownloadLinkLoading] =
    useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState({
    isOpen: false,
    id: -1,
    status: -1,
  });
  const [dataSource, setDataSource] = useState<AdminBasketType[]>();
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);
  const [isClosingRegistrationOpen, setIsClosingRegistrationOpen] = useState(false);

  useTitle({
    breadcrumbItems: [{ title: "سفارشات من" }],
  });

  const { filterItemsList } = useMyReservationOrderResultAdvanceFilter();

  //? ================================  Api Calls ================================
  const [changeStatusToDelivered, { isLoading: isChangeStatusLoading }] =
    useMyChangeStatusToDeliveredMutation();

  const [filterOrders, { isFetching: isFilterOrderDataLoading, isError: isOrderError }] =
    useLazyFilterMangerReservationsQuery();

  const [getAllOrders, { isFetching: isGetAllOrdersLoading }] =
    useLazyGetManagerAllBasketDataQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllBasketDataHandler();
  }, [
    params?.pageNo,
    params?.pageSize,
    ...FILTER_DEPENDENCIES.map((key) => params?.[key]),
  ]);

  useEffect(() => {
    if (isOrderError) {
      setTotalPages(0);
      setDataSource([]);
    }
  }, [isOrderError]);

  useEffect(() => {
    const activeFilters = FILTER_DEPENDENCIES.filter((key) => params?.[key]).length;
    setBadgeCount(activeFilters);
  }, [...FILTER_DEPENDENCIES.map((key) => params?.[key])]);

  //* ================================ Util Functions ================================
  const onChangesStatusError = async () => {
    toast.error(FOOD_ORDER_DELIVERY_MESSAGE.DELIVERY_ISSUE, {
      toastId: FOOD_ORDER_DELIVERY_MESSAGE.DELIVERY_ISSUE,
    });
    setIsConfirmationModalOpen({ isOpen: false, id: -1, status: -1 });
  };

  const onCustomExcelBtnClickHandler = () => {
    setIsCustomExcelModalOpen(true);
  };

  //
  const getAllBasketDataHandler = () => {
    if (hasActiveKey(params, FILTER_DEPENDENCIES)) {
      const queryArg = makeSearchParams({
        pageNo: params?.pageNo ? (+params?.pageNo - 1)?.toString() : "0",
        pageSize: params?.pageSize ? params?.pageSize?.toString() : "8",
        ...(params?.dateDateStart && {
          fromDate: dayjs(params?.dateDateStart)
            .utcOffset(0)
            .startOf("day")
            .toISOString(),
        }),
        ...(params?.dateDateEnd && {
          toDate: dayjs(params?.dateDateEnd).utcOffset(0).endOf("day").toISOString(),
        }),
        lastName: params?.lastNameTitle,
        firstName: params?.firstNameTitle,
        username: params?.usernameTitle,
        studentNumber: params?.studentNumberTitle,
        branchCode: params?.branchCodeId,
        mealId: params?.mealIdId,
        restaurantId: params?.restaurantIdId,
        requestType: params?.requestTypeId,
        deliveryStatus: params?.deliveryId,
      });

      filterOrders({ queryString: queryArg }).unwrap().then(onFilterOrderSuccess);
    } else {
      getAllOrders({
        pageNo: params?.pageNo ? (+params?.pageNo - 1)?.toString() : "0",
        pageSize: params?.pageSize ? params?.pageSize?.toString() : "8",
      })
        .unwrap()
        .then(onFilterOrderSuccess);
    }
  };

  const onChangesStatusSuccess = async (
    response: GetMyBasketPlanByDateAndIdAndMealResponse
  ) => {
    if (response?.status === 200) {
      setIsConfirmationModalOpen({ isOpen: false, id: -1, status: -1 });
      toast.success(FOOD_ORDER_DELIVERY_MESSAGE.DELIVERY_SUCCESS, {
        toastId: FOOD_ORDER_DELIVERY_MESSAGE.DELIVERY_SUCCESS,
      });
      getAllBasketDataHandler();
    }
  };

  // onConfirmToDeliverClickHandler
  const onConfirmToDeliverClickHandler = () => {
    changeStatusToDelivered({
      basketPlanId: isConfirmationModalOpen?.id,
      deliveryStatus: isConfirmationModalOpen?.status,
    })
      .unwrap()
      .then(onChangesStatusSuccess)
      .catch(onChangesStatusError);
  };

  // onClickDelivered
  const onClickDelivered = (id: number, status: number) => {
    setIsConfirmationModalOpen({ isOpen: true, id, status });
  };

  // onExcelBtnClickHandler
  const onExcelBtnClickHandler = () => {
    setIsExcelModalOpen(true);
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

    const fromDate = dayjs(params?.dateDateStart)
      .utcOffset(0)
      .startOf("day")
      .toISOString();

    const toDate = dayjs(params?.dateDateEnd).utcOffset(0).endOf("day").toISOString();

    const queryArg = makeSearchParams({
      fromDate,
      toDate,
      lastName: params?.lastNameTitle,
      firstName: params?.firstNameTitle,
      username: params?.usernameTitle,
      studentNumber: params?.studentNumberTitle,
      branchCode: params?.branchCodeId,
      mealId: params?.mealIdId,
      restaurantId: params?.restaurantIdId,
      requestType: params?.requestTypeId,
      deliveryStatus: params?.deliveryId,
    });

    const convertedQueryArgs = isTotalOnly ? queryArg : queryArg?.replace("?", "&");

    await foodExcelDownload({
      setIsDownloadLinkLoading: setIsCustomExcelDownloadLinkLoading,
      role: "manager",
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
      role: "manager",
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
      setTotalPages(res?.data?.totalElements);
      setDataSource(res?.data?.basketPlansDtos);
      setIsFilterModalOpen(false);
    } else {
      setDataSource([]);
      return toast.error((res?.data || res?.msg) as any, {
        toastId: (res?.data || res?.msg) as any,
      });
    }
  };

  const memoizedMyFoodDeliverModalContent = useMemo(
    () => (
      <MyFoodDeliverModalContent
        title={
          isConfirmationModalOpen?.status === foodDeliveryStatus.delivered
            ? "تحویل غذا"
            : "عدم مراجعه"
        }
        subTitle={
          isConfirmationModalOpen?.status === foodDeliveryStatus.delivered
            ? "آیا از تحویل غذا اطمینان دارید؟"
            : "آیا از عدم مراجعه اطمینان دارید؟"
        }
      />
    ),
    [isConfirmationModalOpen?.isOpen, isConfirmationModalOpen?.status]
  );

  const onClosingRegistrationOpenHandler = () => {
    setIsClosingRegistrationOpen(true);
  };
  const onClosingRegistrationCloseHandler = () => {
    setIsClosingRegistrationOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isFilterModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isFilterModalOpen}
          closeModalHandler={() => setIsFilterModalOpen(false)}
          filterItemsList={filterItemsList}
          form={advancedFilterForm}
          badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={{ ...params }}
        />
      )}

      {/* DELIVER MODAL*/}
      {isConfirmationModalOpen?.isOpen ? (
        <ConfirmationModalWithContent
          isModalOpen={isConfirmationModalOpen?.isOpen}
          confirmBtnText={
            isConfirmationModalOpen?.status === foodDeliveryStatus.delivered
              ? "تحویل غذا"
              : "عدم مراجعه"
          }
          backBtnText="انصراف"
          content={memoizedMyFoodDeliverModalContent}
          closeModalHandler={() =>
            setIsConfirmationModalOpen({ isOpen: false, id: -1, status: -1 })
          }
          isDangerous={isConfirmationModalOpen?.status === foodDeliveryStatus.noShow}
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

      {/* CLOSING REGISTRATION DRAWER */}
      {isClosingRegistrationOpen && (
        <CustomDrawer
          title="ثبت تعطیلی"
          open={isClosingRegistrationOpen}
          onClose={onClosingRegistrationCloseHandler}
          content={
            <FoodClosingRegistrationDrawerContent
              onCloseDrawer={onClosingRegistrationCloseHandler}
            />
          }
          className="my-food-closing-registration-drawer-content"
        />
      )}
      <div className="my-reservation-order-result-list-container">
        <ToolBox
          leftSide={
            <div className="tool-box-left-side">
              <CustomButton onClick={onClosingRegistrationOpenHandler}>
                ثبت تعطیلی
              </CustomButton>
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
            </div>
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
          className="tool-box-wrapper"
        />
        {badgeCount > 0 && (
          <div className="custom-reserve-chips-container">
            <CustomReservationChip />
          </div>
        )}
        <CustomTable<AdminBasketType>
          dataSource={dataSource}
          columns={MyFoodReservationOrderModel({ onClickDelivered })}
          loading={
            isChangeStatusLoading || isFilterOrderDataLoading || isGetAllOrdersLoading
          }
          pagination={manualPaginationConfig({
            total: totalPages,
            onChange: (page, pageSize) => {
              setSearchParams({
                pageNo: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: +params?.pageNo ? Number(params?.pageNo) : 1,
            defaultPageSize: params?.pageSize ? +params?.pageSize : 8,
          })}
          rowKey="id"
          {...TABLE_PROPS(dataSource?.length || 0)}
        />
        <CustomTotalTableItems totalCount={totalPages} label="تعداد کل سفارشات:" />
      </div>
    </>
  );
};

export default MyReservationOrderResultList;

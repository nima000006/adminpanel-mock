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
  useChangeStatusToDeliveredMutation,
  useLazyFilterAdminReservationsQuery,
  useLazyGetAdminAllBasketDataQuery,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";

import {
  AdminBasketType,
  AllReservationExcelFormType,
  GetAdminAllBasketDataResponse,
} from "./@types/@allReservationOrderResultList";
import AllFoodClosingRegistrationDrawerContent from "./helper/drawers/AllFoodClosingRegistration/AllFoodClosingRegistrationDrawerContent";
import useAllReservationOrderResultAdvanceFilter from "./helper/modals/AdvanceFilter/useAllReservationOrderResultAdvanceFilter";
import { AdvancedFilterForm } from "../../helpers/modals/FoodReservationAdvancedModal/@types/@foodReservationAdvancedModal";
import {
  allFoodExcelDownload,
  foodExcelDownload,
} from "../../MyReservation/MyReservationOrderResultList/helper/utils/foodOrderExcel";
import {
  FOOD_ORDER_DELIVERY_MESSAGE,
  foodDeliveryStatus,
} from "../../utils/ReservationUtils";
import { GetBasketPlanByDateAndIdAndMealResponse } from "../AllReservationOrderSearch/@types/@reservationOrderSearch";
import { AllFoodDeliverModalContent } from "./helper/modals/AllFoodDeliverModalContent/AllFoodDeliverModalContent";
import AllFoodReservationOrderModel from "./helper/models/AllFoodReservationOrderModel/AllFoodReservationOrderModel";

import "./_allReservationOrderResultList.scss";

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

const AllReservationOrderResultList = () => {
  const { params, setSearchParams } = useQueryParams();

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
    status: -1,
  });

  const [isClosingRegistrationOpen, setIsClosingRegistrationOpen] = useState(false);

  useTitle({
    breadcrumbItems: [{ title: "سفارشات" }],
  });

  const { filterItemsList } = useAllReservationOrderResultAdvanceFilter();

  //? ================================  Api Calls ================================
  const [changeStatusToDelivered, { isLoading: isChangeStatusLoading }] =
    useChangeStatusToDeliveredMutation();

  const [filterOrders, { isFetching: isFilterOrderDataLoading, isError: isOrderError }] =
    useLazyFilterAdminReservationsQuery();

  const [getAllOrders, { isFetching: isGetAllOrdersLoading }] =
    useLazyGetAdminAllBasketDataQuery();

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
    response: GetBasketPlanByDateAndIdAndMealResponse
  ) => {
    if (response?.status === 200) {
      setIsConfirmationModalOpen({ isOpen: false, id: -1, status: -1 });
      toast.success(FOOD_ORDER_DELIVERY_MESSAGE.DELIVERY_SUCCESS, {
        toastId: FOOD_ORDER_DELIVERY_MESSAGE.DELIVERY_SUCCESS,
      });
      // getListData();
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

  const memoizedFoodDeliverModalContent = useMemo(
    () => (
      <AllFoodDeliverModalContent
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
          content={memoizedFoodDeliverModalContent}
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
            <AllFoodClosingRegistrationDrawerContent
              onCloseDrawer={onClosingRegistrationCloseHandler}
            />
          }
          className="food-closing-registration-drawer-content"
        />
      )}

      <div className="all-reservation-order-result-list-container">
        {/* <div className="search-box-container">
          <div className="search-box">
            <CustomInput
              label="جستجو براساس کد ملی: "
              prefix={<AiOutlineSearch  className="search-icon" />}
              onKeyDown={({ code, currentTarget }) => {
                if (code === "Enter" || code === "NumpadEnter") {
                  getFilteredList(currentTarget?.value);
                }
              }}
              placeholder="کد ملی را وارد کنید"
              hasVerticalLabel={false}
              allowClear={
                isFilteredMode && {
                  clearIcon: (
                    <AiOutlineClose  className="cross-icon" onClick={getUnFilteredList} />
                  ),
                }
              }
            />
          </div>
          <CustomButton type="primary" onClick={onGoBackToSearchScreenHandler}>
            جستجوی مجدد
          </CustomButton>
        </div> */}
        <ToolBox
          leftSide={
            <div className="button-container">
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
        />

        <CustomTable<AdminBasketType>
          dataSource={dataSource}
          columns={AllFoodReservationOrderModel({ onClickDelivered })}
          loading={
            isChangeStatusLoading || isFilterOrderDataLoading || isGetAllOrdersLoading
          }
          pagination={manualPaginationConfig({
            total: totalPages,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...params,
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

export default AllReservationOrderResultList;

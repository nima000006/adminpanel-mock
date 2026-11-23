import { useEffect, useState } from "react";

import { Form } from "antd";
import moment from "jalali-moment";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { downloadCateringMyVendorOrdersListExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetMyCancelledOrdersFilterMutation,
  useMyBasketPlanFilterAnalyticsMutation,
} from "@infra/states/redux/Apis/catering/orders/ordersApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_ORDER_STATUS_FILTER } from "@pages/Catering/Orders/_shared/utils";
import {
  GetMyCancelledOrdersFilterRequest,
  GetMyCancelledOrdersFilterResponse,
} from "@pages/Catering/Orders/CancelledOrders/MyCancelledOrders/MyCancelledOrdersList/@types/@myCancelledOrdersList";
import {
  formatVendorOrdersCountCardValue,
  getVendorOrdersPeriodDateFilter,
  VENDOR_ORDERS_PERIOD_TABS,
} from "@pages/Catering/Orders/VendorOrders/_shared/utils";
import {
  MyBasketPlanFilterAnalyticsRequest,
  MyBasketPlanFilterAnalyticsResponse,
  MyVendorOrdersListAnalyticsType,
  MyVendorOrdersListRecordType,
  MyVendorOrdersListUpcomingAdvanceFilterFormType,
} from "@pages/Catering/Orders/VendorOrders/MyVendorOrders/@types/@myVendorOrdersList";
import MyVendorOrdersClosingRegistrationDrawerContent from "@pages/Catering/Orders/VendorOrders/MyVendorOrders/helper/drawers/MyVendorOrdersClosingRegistration/MyVendorOrdersClosingRegistrationDrawerContent";
import CountsDetailCard from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/CountsDetailCard/CountsDetailCard";

import useMyVendorOrdersListUpcomingAdvanceFilter from "./helper/modals/advanceFilterModals/myVendorOrdersListUpcomingAdvanceFilter";
import MyVendorOrdersListUpcomingTableModel from "./helper/models/MyVendorOrdersListUpcoming/MyVendorOrdersListUpcomingTableModel";

const COLUMN_FILTER_ITEMS = [
  "branchId",
  "selfId",
  "foodScheduleDateTitle",
  "educationLevelId",
  "fieldOfStudyId",
  "foodId",
  "mealId",
  "foodProgramTypeId",
  "deliveryStatusId",
  "sideDishesId",
  // column
  "firstName",
  "lastName",
  "userName",
  "studentNumber",
  "mobile",
  "basketPlanIds",
];

const MyVendorOrdersListUpcoming = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<GetMyCancelledOrdersFilterResponse | null>(
    null
  );
  const [amountAnalytics, setAmountAnalytics] =
    useState<MyVendorOrdersListAnalyticsType | null>(null);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isClosingRegistrationOpen, setIsClosingRegistrationOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [form] = Form.useForm<MyVendorOrdersListUpcomingAdvanceFilterFormType>();

  const { filterItemsList } = useMyVendorOrdersListUpcomingAdvanceFilter({
    advanceModalOpen: isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getMyCancelledOrdersFilter, { isLoading: isGetMyCancelledOrdersFilterLoading }] =
    useGetMyCancelledOrdersFilterMutation();

  const [
    myBasketPlanFilterAnalytics,
    { isLoading: isMyBasketPlanFilterAnalyticsLoading },
  ] = useMyBasketPlanFilterAnalyticsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.period !== VENDOR_ORDERS_PERIOD_TABS.UPCOMING) {
      return;
    }

    fetchMyVendorOrdersList();
  }, [
    url?.period,
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  useEffect(() => {
    if (url?.period !== VENDOR_ORDERS_PERIOD_TABS.UPCOMING) {
      return;
    }

    fetchMyVendorOrdersAnalytics();
  }, [url?.period, ...COLUMN_FILTER_ITEMS.map((key) => url?.[key])]);

  const resetAdvanceFilterForm = () => {
    form.resetFields();
  };

  //* ================================ Util Functions ================================
  const mapMyVendorOrdersAnalytics = (
    res: MyBasketPlanFilterAnalyticsResponse
  ): MyVendorOrdersListAnalyticsType => {
    const total = res.totalQuantity ?? 0;
    const toPercentage = (count: number) =>
      total > 0 ? Math.round((count / total) * 100) : null;

    return {
      totalQuantity: res.totalQuantity,
      pendingQuantity: res.notDeliveredCounts,
      pendingPercentage: toPercentage(res.notDeliveredCounts),
      deliveredQuantity: res.deliveredCounts,
      deliveredPercentage: toPercentage(res.deliveredCounts),
      notDeliveredQuantity: res.noShowCounts,
      notDeliveredPercentage: toPercentage(res.noShowCounts),
    };
  };

  const buildMyVendorOrdersFilterBody = (): MyBasketPlanFilterAnalyticsRequest => {
    const periodDates = getVendorOrdersPeriodDateFilter(
      VENDOR_ORDERS_PERIOD_TABS.UPCOMING
    );
    const fromDate = periodDates.fromDate;
    const toDate = url?.foodScheduleDateTitle
      ? moment(url.foodScheduleDateTitle).format("YYYY-MM-DD")
      : periodDates.toDate;

    return {
      cancelStatus: [...CATERING_ORDER_STATUS_FILTER],
      ...(url?.branchId && {
        branchCodes: url.branchId.split(",").map(Number),
      }),
      ...(url?.selfId && {
        restaurantIds: url.selfId.split(",").map(Number),
      }),
      ...(url?.basketPlanIds && {
        basketPlanIds: url.basketPlanIds.split(",").map(Number),
      }),
      ...(fromDate && { fromDate }),
      ...(toDate && { toDate }),
      ...(url?.educationLevelId && {
        levelIds: url.educationLevelId.split(",").map(Number),
      }),
      ...(url?.fieldOfStudyId && {
        fieldIds: url.fieldOfStudyId.split(",").map(Number),
      }),
      ...(url?.foodId && {
        productIds: url.foodId.split(",").map(Number),
      }),
      ...(url?.mealId && {
        mealIds: url.mealId.split(",").map(Number),
      }),
      ...(url?.foodProgramTypeId && {
        requestTypes: url.foodProgramTypeId.split(",").map(Number),
      }),
      ...(url?.deliveryStatusId && {
        deliveryStatus: Number(url.deliveryStatusId),
      }),
      ...(url?.sideDishesId && {
        sideProductIds: url.sideDishesId.split(",").map(Number),
      }),
      ...(url?.firstName && { firstName: url.firstName }),
      ...(url?.lastName && { lastName: url.lastName }),
      ...(url?.userName && { username: url.userName }),
      ...(url?.studentNumber && { studentNumber: url.studentNumber }),
      ...(url?.mobile && { mobile: url.mobile }),
    };
  };

  const buildMyVendorOrdersListRequest = (): GetMyCancelledOrdersFilterRequest => {
    const filterBody = buildMyVendorOrdersFilterBody();
    const { sideProductIds, ...restBody } = filterBody;

    const request: GetMyCancelledOrdersFilterRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        ...restBody,
        ...(sideProductIds && { sidePlanProductIds: sideProductIds }),
      },
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        request.params.sortBy = sorting.sortBy;
      }

      if (sorting?.sortOrder) {
        request.params.sortDirection = sorting.sortOrder?.toUpperCase();
      }
    }

    return request;
  };

  const fetchMyVendorOrdersList = () => {
    getMyCancelledOrdersFilter(buildMyVendorOrdersListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const fetchMyVendorOrdersAnalytics = () => {
    myBasketPlanFilterAnalytics(buildMyVendorOrdersFilterBody())
      .unwrap()
      .then((res) => {
        setAmountAnalytics(mapMyVendorOrdersAnalytics(res));
      });
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildMyVendorOrdersListRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringMyVendorOrdersListExcel({ params, body })
      .then((downloadLink) => {
        if (downloadLink?.length) {
          toast.success(DOWNLOAD_LINK_SUCCESS, { toastId: DOWNLOAD_LINK_SUCCESS });
        } else {
          toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
        }
      })
      .catch(() => {
        toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
      })
      .finally(() => {
        setIsDownloadLinkLoading(false);
      });
  };

  const onClosingRegistrationOpenHandler = () => {
    setIsClosingRegistrationOpen(true);
  };

  const onClosingRegistrationCloseHandler = () => {
    setIsClosingRegistrationOpen(false);
  };

  const onClosingRegistrationSuccessHandler = () => {
    fetchMyVendorOrdersList();
    fetchMyVendorOrdersAnalytics();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={() => {
            setIsAdvanceModalOpen(false);
            resetAdvanceFilterForm();
          }}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={url}
        />
      )}

      {isClosingRegistrationOpen && (
        <CustomDrawer
          title="ثبت تعطیلی"
          open={isClosingRegistrationOpen}
          onClose={onClosingRegistrationCloseHandler}
          content={
            <MyVendorOrdersClosingRegistrationDrawerContent
              onCloseDrawer={onClosingRegistrationCloseHandler}
              onSuccess={onClosingRegistrationSuccessHandler}
            />
          }
        />
      )}

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CountsDetailCard
            title="همه سفارشات"
            isPrice={false}
            value={formatVendorOrdersCountCardValue({
              quantity: amountAnalytics?.totalQuantity,
              isLoading: isMyBasketPlanFilterAnalyticsLoading,
            })}
          />
          <CountsDetailCard
            title="در انتظار تحویل"
            isPrice={false}
            value={formatVendorOrdersCountCardValue({
              quantity: amountAnalytics?.pendingQuantity,
              percentage: amountAnalytics?.pendingPercentage,
              isLoading: isMyBasketPlanFilterAnalyticsLoading,
            })}
          />
          <CountsDetailCard
            title="تحویل داده شده"
            isPrice={false}
            value={formatVendorOrdersCountCardValue({
              quantity: amountAnalytics?.deliveredQuantity,
              percentage: amountAnalytics?.deliveredPercentage,
              isLoading: isMyBasketPlanFilterAnalyticsLoading,
            })}
          />
          <CountsDetailCard
            title="تحویل داده نشده"
            isPrice={false}
            value={formatVendorOrdersCountCardValue({
              quantity: amountAnalytics?.notDeliveredQuantity,
              percentage: amountAnalytics?.notDeliveredPercentage,
              isLoading: isMyBasketPlanFilterAnalyticsLoading,
            })}
          />
        </div>

        <div className="flex flex-col gap-4">
          <ToolBox
            className="btn-wrapper"
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton
                  icon={<AiOutlineFilter />}
                  onClick={() => setIsAdvanceModalOpen(true)}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            }
            leftSide={
              <>
                <CustomButton onClick={onClosingRegistrationOpenHandler}>
                  ثبت تعطیلی
                </CustomButton>
                <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
                  خروجی
                </CustomButton>
              </>
            }
          />
          <CustomTable<MyVendorOrdersListRecordType>
            dataSource={dataSource?.content ?? []}
            loading={isGetMyCancelledOrdersFilterLoading}
            rowKey="id"
            columns={MyVendorOrdersListUpcomingTableModel()}
            pagination={manualPaginationConfig({
              total: dataSource?.totalElements ?? 0,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...url,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.page ? Number(url.page) : 1,
              defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
            })}
            draggableColumns
            draggableId={ExcelCodes.CATERING_MY_VENDOR_ORDERS_LIST_UPCOMING_TABLE}
          />
        </div>
      </div>
    </>
  );
};

export default MyVendorOrdersListUpcoming;

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
import { downloadCateringAllVendorOrdersListExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useAllBasketPlanFilterAnalyticsMutation,
  useGetAllCancelledOrdersFilterMutation,
} from "@infra/states/redux/Apis/catering/orders/ordersApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_ORDER_STATUS_FILTER } from "@pages/Catering/Orders/_shared/utils";
import {
  GetAllCancelledOrdersFilterRequest,
  GetAllCancelledOrdersFilterResponse,
} from "@pages/Catering/Orders/CancelledOrders/AllCancelledOrders/AllCancelledOrdersList/@types/@allCancelledOrdersList";
import {
  formatVendorOrdersCountCardValue,
  VENDOR_ORDERS_PERIOD_TABS,
} from "@pages/Catering/Orders/VendorOrders/_shared/utils";
import {
  AllBasketPlanFilterAnalyticsRequest,
  AllBasketPlanFilterAnalyticsResponse,
  AllVendorOrdersListAllAdvanceFilterFormType,
  AllVendorOrdersListAnalyticsType,
  AllVendorOrdersListRecordType,
} from "@pages/Catering/Orders/VendorOrders/AllVendorOrders/@types/@allVendorOrdersList";
import AllVendorOrdersClosingRegistrationDrawerContent from "@pages/Catering/Orders/VendorOrders/AllVendorOrders/helper/drawers/AllVendorOrdersClosingRegistration/AllVendorOrdersClosingRegistrationDrawerContent";
import CountsDetailCard from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/CountsDetailCard/CountsDetailCard";

import useAllVendorOrdersListAllAdvanceFilter from "./helper/modals/advanceFilterModals/allVendorOrdersListAllAdvanceFilter";
import AllVendorOrdersListAllTableModel from "./helper/models/AllVendorOrdersListAll/AllVendorOrdersListAllTableModel";

const COLUMN_FILTER_ITEMS = [
  "branchId",
  "selfId",
  "foodScheduleDateDateStart",
  "foodScheduleDateDateEnd",
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

const AllVendorOrdersListAll = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] =
    useState<GetAllCancelledOrdersFilterResponse | null>(null);
  const [amountAnalytics, setAmountAnalytics] =
    useState<AllVendorOrdersListAnalyticsType | null>(null);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isClosingRegistrationOpen, setIsClosingRegistrationOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [form] = Form.useForm<AllVendorOrdersListAllAdvanceFilterFormType>();

  const { filterItemsList } = useAllVendorOrdersListAllAdvanceFilter({
    advanceModalOpen: isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [
    getAllCancelledOrdersFilter,
    { isLoading: isGetAllCancelledOrdersFilterLoading },
  ] = useGetAllCancelledOrdersFilterMutation();

  const [
    allBasketPlanFilterAnalytics,
    { isLoading: isAllBasketPlanFilterAnalyticsLoading },
  ] = useAllBasketPlanFilterAnalyticsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.period !== VENDOR_ORDERS_PERIOD_TABS.ALL) {
      return;
    }

    fetchAllVendorOrdersList();
  }, [
    url?.period,
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  useEffect(() => {
    if (url?.period !== VENDOR_ORDERS_PERIOD_TABS.ALL) {
      return;
    }

    fetchAllVendorOrdersAnalytics();
  }, [url?.period, ...COLUMN_FILTER_ITEMS.map((key) => url?.[key])]);

  //* ================================ Util Functions ================================
  const mapAllVendorOrdersAnalytics = (
    res: AllBasketPlanFilterAnalyticsResponse
  ): AllVendorOrdersListAnalyticsType => {
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

  const buildAllVendorOrdersFilterBody = (): AllBasketPlanFilterAnalyticsRequest => {
    const fromDate = url?.foodScheduleDateDateStart
      ? moment(url.foodScheduleDateDateStart).format("YYYY-MM-DD")
      : undefined;
    const toDate = url?.foodScheduleDateDateEnd
      ? moment(url.foodScheduleDateDateEnd).format("YYYY-MM-DD")
      : undefined;

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

  const buildAllVendorOrdersListRequest = (): GetAllCancelledOrdersFilterRequest => {
    const filterBody = buildAllVendorOrdersFilterBody();
    const { sideProductIds, ...restBody } = filterBody;

    const request: GetAllCancelledOrdersFilterRequest = {
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

  const fetchAllVendorOrdersList = () => {
    getAllCancelledOrdersFilter(buildAllVendorOrdersListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const fetchAllVendorOrdersAnalytics = () => {
    allBasketPlanFilterAnalytics(buildAllVendorOrdersFilterBody())
      .unwrap()
      .then((res) => {
        setAmountAnalytics(mapAllVendorOrdersAnalytics(res));
      });
  };

  const onDeliverOrderHandler = (_record: AllVendorOrdersListRecordType) => {
    // TODO: open deliver-order flow when API is ready
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildAllVendorOrdersListRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringAllVendorOrdersListExcel({ params, body })
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
    fetchAllVendorOrdersList();
    fetchAllVendorOrdersAnalytics();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={() => {
            setIsAdvanceModalOpen(false);
            form.resetFields();
          }}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...url }}
        />
      )}

      {isClosingRegistrationOpen && (
        <CustomDrawer
          title="ثبت تعطیلی"
          open={isClosingRegistrationOpen}
          onClose={onClosingRegistrationCloseHandler}
          content={
            <AllVendorOrdersClosingRegistrationDrawerContent
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
              isLoading: isAllBasketPlanFilterAnalyticsLoading,
            })}
          />
          <CountsDetailCard
            title="در انتظار تحویل"
            isPrice={false}
            value={formatVendorOrdersCountCardValue({
              quantity: amountAnalytics?.pendingQuantity,
              percentage: amountAnalytics?.pendingPercentage,
              isLoading: isAllBasketPlanFilterAnalyticsLoading,
            })}
          />
          <CountsDetailCard
            title="تحویل داده شده"
            isPrice={false}
            value={formatVendorOrdersCountCardValue({
              quantity: amountAnalytics?.deliveredQuantity,
              percentage: amountAnalytics?.deliveredPercentage,
              isLoading: isAllBasketPlanFilterAnalyticsLoading,
            })}
          />
          <CountsDetailCard
            title="تحویل داده نشده"
            isPrice={false}
            value={formatVendorOrdersCountCardValue({
              quantity: amountAnalytics?.notDeliveredQuantity,
              percentage: amountAnalytics?.notDeliveredPercentage,
              isLoading: isAllBasketPlanFilterAnalyticsLoading,
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
          <CustomTable<AllVendorOrdersListRecordType>
            dataSource={dataSource?.content ?? []}
            loading={isGetAllCancelledOrdersFilterLoading}
            rowKey="id"
            columns={AllVendorOrdersListAllTableModel({
              onDeliverOrder: onDeliverOrderHandler,
            })}
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
            draggableId={ExcelCodes.CATERING_ALL_VENDOR_ORDERS_LIST_ALL_TABLE}
          />
        </div>
      </div>
    </>
  );
};

export default AllVendorOrdersListAll;

import { useEffect, useState } from "react";

import { Form } from "antd";
import moment from "jalali-moment";
import { AiOutlineFilter } from "react-icons/ai";
import { Link } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { downloadCateringMyCancelledOrdersListExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_MY_VENDOR_ORDERS_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import {
  useGetMyCancelledOrdersAmountAnalyticsMutation,
  useGetMyCancelledOrdersFilterMutation,
} from "@infra/states/redux/Apis/catering/orders/ordersApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_ORDER_CANCEL_STATUS_FILTER } from "@pages/Catering/Orders/_shared/utils";
import {
  GetMyCancelledOrdersAmountAnalyticsRequest,
  GetMyCancelledOrdersAmountAnalyticsResponse,
  GetMyCancelledOrdersFilterRequest,
  GetMyCancelledOrdersFilterResponse,
  MyCancelledOrdersListAdvanceFilterFormType,
  MyCancelledOrdersListRecordType,
} from "@pages/Catering/Orders/CancelledOrders/MyCancelledOrders/MyCancelledOrdersList/@types/@myCancelledOrdersList";
import MyCancelledOrdersClosingRegistrationDrawerContent from "@pages/Catering/Orders/CancelledOrders/MyCancelledOrders/MyCancelledOrdersList/helper/drawers/MyCancelledOrdersClosingRegistration/MyCancelledOrdersClosingRegistrationDrawerContent";
import useMyCancelledOrdersListAdvanceFilter from "@pages/Catering/Orders/CancelledOrders/MyCancelledOrders/MyCancelledOrdersList/helper/modals/advanceFilterModals/myCancelledOrdersListAdvanceFilter";
import MyCancelledOrdersListTableModel from "@pages/Catering/Orders/CancelledOrders/MyCancelledOrders/MyCancelledOrdersList/helper/models/MyCancelledOrdersList/MyCancelledOrdersListTableModel";
import CountsDetailCard from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/CountsDetailCard/CountsDetailCard";

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
  "sideDishesId",
  // column
  // todo[nima] add these filter when api will be ready
  // "غذا",
  "basketPlanIds",
  "firstName",
  "lastName",
  "userName",
  "studentNumber",
  "mobile",
];

const MyCancelledOrdersList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "تغذیه",
      },
      {
        title: <Link to={CATERING_MY_VENDOR_ORDERS_LIST_PAGE_ROUTE}>سفارشات</Link>,
      },
      {
        title: "لغو شده های من",
      },
    ],
  });

  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<GetMyCancelledOrdersFilterResponse | null>(
    null
  );
  const [amountAnalytics, setAmountAnalytics] =
    useState<GetMyCancelledOrdersAmountAnalyticsResponse | null>(null);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isClosingRegistrationOpen, setIsClosingRegistrationOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [form] = Form.useForm<MyCancelledOrdersListAdvanceFilterFormType>();

  const { filterItemsList } = useMyCancelledOrdersListAdvanceFilter({
    advanceModalOpen: isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getMyCancelledOrdersFilter, { isLoading: isGetMyCancelledOrdersFilterLoading }] =
    useGetMyCancelledOrdersFilterMutation();

  const [
    getMyCancelledOrdersAmountAnalytics,
    { isLoading: isGetMyCancelledOrdersAmountAnalyticsLoading },
  ] = useGetMyCancelledOrdersAmountAnalyticsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchMyCancelledOrdersList();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  useEffect(() => {
    fetchMyCancelledOrdersAmountAnalytics();
  }, [...COLUMN_FILTER_ITEMS.map((key) => url?.[key])]);

  //* ================================ Util Functions ================================
  const buildMyCancelledOrdersFilterBody =
    (): GetMyCancelledOrdersAmountAnalyticsRequest => {
      const fromDate = url?.foodScheduleDateDateStart
        ? moment(url.foodScheduleDateDateStart).format("YYYY-MM-DD")
        : undefined;
      const toDate = url?.foodScheduleDateDateEnd
        ? moment(url.foodScheduleDateDateEnd).format("YYYY-MM-DD")
        : undefined;

      return {
        cancelStatus: [...CATERING_ORDER_CANCEL_STATUS_FILTER],
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

  const buildMyCancelledOrdersListRequest = (): GetMyCancelledOrdersFilterRequest => {
    const filterBody = buildMyCancelledOrdersFilterBody();
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

  const fetchMyCancelledOrdersList = () => {
    getMyCancelledOrdersFilter(buildMyCancelledOrdersListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const fetchMyCancelledOrdersAmountAnalytics = () => {
    getMyCancelledOrdersAmountAnalytics(buildMyCancelledOrdersFilterBody())
      .unwrap()
      .then((res) => {
        setAmountAnalytics(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildMyCancelledOrdersListRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringMyCancelledOrdersListExcel({ params, body })
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
    fetchMyCancelledOrdersList();
    fetchMyCancelledOrdersAmountAnalytics();
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
            <MyCancelledOrdersClosingRegistrationDrawerContent
              onCloseDrawer={onClosingRegistrationCloseHandler}
              onSuccess={onClosingRegistrationSuccessHandler}
            />
          }
        />
      )}

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CountsDetailCard
            title="سفارشات لغو شده"
            isPrice={false}
            value={
              isGetMyCancelledOrdersAmountAnalyticsLoading
                ? "-"
                : (amountAnalytics?.totalQuantity?.toString() ?? "-")
            }
          />
          <CountsDetailCard
            title="مبالغ عودت داده شده"
            isRial
            currency={{ isAvailable: true, type: "تومان" }}
            value={
              isGetMyCancelledOrdersAmountAnalyticsLoading
                ? "-"
                : (amountAnalytics?.totalAmount?.toString() ?? "-")
            }
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
          <CustomTable<MyCancelledOrdersListRecordType>
            dataSource={dataSource?.content ?? []}
            loading={isGetMyCancelledOrdersFilterLoading}
            rowKey="id"
            columns={MyCancelledOrdersListTableModel()}
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
            draggableId={ExcelCodes.CATERING_MY_CANCELLED_ORDERS_LIST_TABLE}
          />
        </div>
      </div>
    </>
  );
};

export default MyCancelledOrdersList;

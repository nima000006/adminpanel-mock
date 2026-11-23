import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { downloadCateringMyFoodListExcel, makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_MY_FOOD_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_MY_FOOD_DETAILS_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import { useDeactiveMyFoodMutation } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import { useGetDetailMySelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  CATERING_PRODUCT_CATEGORIES,
  CATERING_STATUS_TYPES,
  CATERING_STATUS_TYPES_MAIN_LIST,
} from "@pages/Catering/_shared/utils";
import {
  CateringMyFoodListAdvanceFilterFormType,
  DeactiveMyFoodRequest,
} from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/@types/@cateringMyFoodList";
import { CateringMyFoodListDeactivateModalFormType } from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/helper/components/CateringMyFoodListDeactivateModal/@types/@cateringMyFoodListDeactivateModal";
import CateringMyFoodListDeactivateModal from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/helper/components/CateringMyFoodListDeactivateModal/CateringMyFoodListDeactivateModal";
import { CateringMyFoodListCreateDrawerState } from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/helper/drawer/CateringMyFoodListCreateDrawer/@types/@cateringMyFoodListCreateDrawer";
import CateringMyFoodListCreateDrawer from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/helper/drawer/CateringMyFoodListCreateDrawer/CateringMyFoodListCreateDrawer";
import CateringMyFoodListTableModel from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/helper/models/CateringMyFoodListTableModel/CateringMyFoodListTableModel";
import {
  GetDetailMySelfsProductsContent,
  GetDetailMySelfsProductsRequest,
  GetDetailMySelfsProductsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

import useCateringMyFoodListAdvanceFilter from "./helper/hooks/useCateringMyFoodListAdvanceFilter/useCateringMyFoodListAdvanceFilter";

const COLUMN_FILTER_ITEMS = [
  "baseProductId",
  "contractId",
  "restaurantId",
  "vendorId",
  // column
  "title",
];

const DEACTIVATE_FOOD_SUCCESS_MSG = "غذا با موفقیت غیرفعال شد.";

const CateringMyFoodList = () => {
  useTitle({ text: "غذاهای من" });
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState<GetDetailMySelfsProductsResponse | null>(
    null
  );
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [drawerState, setDrawerState] = useState<CateringMyFoodListCreateDrawerState>({
    open: false,
    mode: "create",
    foodId: null,
  });
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<GetDetailMySelfsProductsContent | null>(null);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [form] = Form.useForm<CateringMyFoodListAdvanceFilterFormType>();
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

  const { filterItemsList } = useCateringMyFoodListAdvanceFilter({ advanceModalOpen });

  //? ================================  Api Calls ================================
  const [getDetailMySelfsProducts, { isLoading: isGetDetailMySelfsProductsLoading }] =
    useGetDetailMySelfsProductsMutation();
  const [deactiveMyFood, { isLoading: isDeactiveMyFoodLoading }] =
    useDeactiveMyFoodMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchMyFoodList();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onViewHandler = (id: number) => {
    navigate({
      pathname: CATERING_MY_FOOD_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: id.toString() }),
    });
  };

  const onEditHandler = (record: GetDetailMySelfsProductsContent) => {
    setDrawerState({ open: true, mode: "edit", foodId: record.id });
  };

  const onDeActiveHandler = (record: GetDetailMySelfsProductsContent) => {
    setSelectedRecord(record);
    setDeactivateModalOpen(true);
  };

  const onCloseDeactivateModalHandler = () => {
    setDeactivateModalOpen(false);
    setSelectedRecord(null);
  };

  const openCreateDrawerHandler = () => {
    setDrawerState({ open: true, mode: "create", foodId: null });
  };

  const closeDrawerHandler = () => {
    setDrawerState({ open: false, mode: "create", foodId: null });
  };

  const onDeactivateSuccess = () => {
    toast.success(DEACTIVATE_FOOD_SUCCESS_MSG, {
      toastId: DEACTIVATE_FOOD_SUCCESS_MSG,
    });
    onCloseDeactivateModalHandler();
    fetchMyFoodList();
  };

  const onConfirmDeactivateHandler = (
    values: CateringMyFoodListDeactivateModalFormType
  ) => {
    if (!selectedRecord) return;

    const request: DeactiveMyFoodRequest = {
      id: selectedRecord.id,
      statusType: CATERING_STATUS_TYPES.DE_ACTIVE_NOT_SHOW,
      deActiveReason: values.deActiveReason?.item?.id,
    };

    deactiveMyFood(request).unwrap().then(onDeactivateSuccess);
  };

  const buildMyFoodListRequest = (): GetDetailMySelfsProductsRequest => {
    const request: GetDetailMySelfsProductsRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        productCategories: [CATERING_PRODUCT_CATEGORIES.MAIN_FOOD],
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        ...(url?.baseProductId && {
          baseProductIds: url.baseProductId.split(",").map(Number),
        }),
        ...(url?.contractId && {
          contractIds: url.contractId.split(",").map(Number),
        }),
        ...(url?.restaurantId && {
          restaurantIds: url.restaurantId.split(",").map(Number),
        }),
        ...(url?.vendorId && {
          vendorIds: url.vendorId.split(",").map(Number),
        }),
        ...(url?.title && { title: url.title }),
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

  const fetchMyFoodList = () => {
    getDetailMySelfsProducts(buildMyFoodListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildMyFoodListRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringMyFoodListExcel({ params, body })
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
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={url}
        />
      )}
      {drawerState.open && (
        <CateringMyFoodListCreateDrawer
          open={drawerState.open}
          onClose={closeDrawerHandler}
          onSuccess={fetchMyFoodList}
          mode={drawerState.mode}
          foodId={drawerState.foodId}
        />
      )}
      {deactivateModalOpen && (
        <CateringMyFoodListDeactivateModal
          open={deactivateModalOpen}
          record={selectedRecord}
          confirmLoading={isDeactiveMyFoodLoading}
          onCancel={onCloseDeactivateModalHandler}
          onConfirm={onConfirmDeactivateHandler}
        />
      )}
      <div className="flex flex-col gap-6">
        <ToolBox
          className="btn-wrapper"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex gap-2">
              <Link to={CATERING_MY_FOOD_ARCHIEVE_LIST_PAGE_ROUTE}>
                <CustomButton type="default" icon={<FiArchive />}>
                  آرشیو
                </CustomButton>
              </Link>

              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={openCreateDrawerHandler}
              >
                ایجاد غذا
              </CustomButton>
              <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
                خروجی
              </CustomButton>
            </div>
          }
        />
        <div>
          <CustomTable<GetDetailMySelfsProductsContent>
            dataSource={dataSource?.content}
            loading={isGetDetailMySelfsProductsLoading}
            rowKey="id"
            columns={CateringMyFoodListTableModel({
              onView: onViewHandler,
              onEdit: onEditHandler,
              onDeActive: onDeActiveHandler,
            })}
            pagination={manualPaginationConfig({
              total: dataSource?.totalElements || 0,
              onChange: (page: number, pageSize: number) => {
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
            draggableId={ExcelCodes.CATERING_MY_FOOD_LIST_TABLE}
          />
        </div>
        <CustomTotalTableItems
          totalCount={dataSource?.totalElements || 0}
          label="تعداد کل غذاها:"
        />
      </div>
    </>
  );
};

export default CateringMyFoodList;

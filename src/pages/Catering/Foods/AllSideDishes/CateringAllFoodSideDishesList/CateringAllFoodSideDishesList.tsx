import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineClose, AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";
import { Link } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { downloadCateringAllFoodListExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_ALL_FOOD_SIDE_DISHES_ARCHIVE_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useDeactiveAllFoodMutation } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import { useGetDetailAllSelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  CATERING_PRODUCT_CATEGORIES,
  CATERING_STATUS_TYPES,
  CATERING_STATUS_TYPES_MAIN_LIST,
} from "@pages/Catering/_shared/utils";
import { CateringAllFoodSideDishesListAdvanceFilterFormType } from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/@types/@cateringAllFoodSideDishesList";
import CateringAllFoodSideDishesCreateDrawerContent from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/drawer/CateringAllFoodSideDishesListCreateDrawerContent/CateringAllFoodSideDishesListCreateDrawerContent";
import CateringAllFoodSideDishesEditDrawerContent from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/drawer/CateringAllFoodSideDishesListEditDrawerContent/CateringAllFoodSideDishesListEditDrawerContent";
import CateringAllFoodSideDishesListViewDrawerContent from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/drawer/CateringAllFoodSideDishesListViewDrawerContent/CateringAllFoodSideDishesListViewDrawerContent";
import useCateringAllFoodSideDishesListAdvanceFilter from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/hooks/useCateringAllFoodSideDishesListAdvanceFilter/useCateringAllFoodSideDishesListAdvanceFilter";
import { CateringAllFoodSideDishesListDeactivateModalFormType } from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/modal/CateringAllFoodSideDishesListDeactivateModalContent/@types/@cateringAllFoodSideDishesListDeactivateModalContent";
import CateringAllFoodSideDishesListDeactivateModalContent from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/modal/CateringAllFoodSideDishesListDeactivateModalContent/CateringAllFoodSideDishesListDeactivateModalContent";
import CateringAllFoodSideDishesListTableModel from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/model/CateringAllFoodSideDishesListTableModel";
import CateringAllFoodHistoryDrawer from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodDetail/helper/components/CateringAllFoodHistory/helper/components/CateringAllFoodHistoryDrawer/CateringAllFoodHistoryDrawer";
import { DeactiveAllFoodRequest } from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/@types/@cateringAllFoodList";
import {
  GetDetailAllSelfsProductsContent,
  GetDetailAllSelfsProductsRequest,
  GetDetailAllSelfsProductsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

const COLUMN_FILTER_ITEMS = [
  "baseProductId",
  "contractId",
  "restaurantId",
  "vendorId",
  // column
  "title",
];

const DEACTIVATE_SIDE_DISH_SUCCESS_MSG = "مخلفات با موفقیت غیرفعال شد.";

const CateringAllFoodSideDishesList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "تغذیه",
      },
      {
        title: "غذا‌ و مخلفات",
      },
      {
        title: "مخلفات",
      },
    ],
  });
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<GetDetailAllSelfsProductsResponse | null>(
    null
  );
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState({ isOpen: false, id: -1 });
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState({ isOpen: false, id: -1 });
  const [isHistoryDetailDrawerOpen, setIsHistoryDetailDrawerOpen] = useState<{
    isOpen: boolean;
    foodId: number;
    revisionNumber: number | null;
  }>({ isOpen: false, foodId: -1, revisionNumber: null });
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [form] = Form.useForm<CateringAllFoodSideDishesListAdvanceFilterFormType>();
  const [deactivateForm] =
    Form.useForm<CateringAllFoodSideDishesListDeactivateModalFormType>();
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

  const { filterItemsList } = useCateringAllFoodSideDishesListAdvanceFilter({
    advanceModalOpen,
  });

  //? ================================  Api Calls ================================
  const [getDetailAllSelfsProducts, { isLoading: isGetDetailAllSelfsProductsLoading }] =
    useGetDetailAllSelfsProductsMutation();
  const [deactiveAllFood, { isLoading: isDeactiveAllFoodLoading }] =
    useDeactiveAllFoodMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchAllFoodSideDishesList();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onViewHandler = (id: number) => {
    setIsViewDrawerOpen({ isOpen: true, id });
  };

  const onEditHandler = (id: number) => {
    setIsEditDrawerOpen({ isOpen: true, id });
  };

  const onDeActiveHandler = (id: number) => {
    setIsDeactivateModalOpen({ isOpen: true, id });
  };

  const openCreateDrawerHandler = () => {
    setIsCreateDrawerOpen(true);
  };

  const closeCreateDrawerHandler = () => {
    setIsCreateDrawerOpen(false);
  };

  const closeEditDrawerHandler = () => {
    setIsEditDrawerOpen({ isOpen: false, id: -1 });
  };

  const closeViewDrawerHandler = () => {
    setIsViewDrawerOpen({ isOpen: false, id: -1 });
  };

  const openHistoryDetailHandler = (revisionNumber: number) => {
    setIsViewDrawerOpen((prev) => ({ ...prev, isOpen: false }));
    setIsHistoryDetailDrawerOpen({
      isOpen: true,
      foodId: isViewDrawerOpen.id,
      revisionNumber,
    });
  };

  const closeHistoryDetailHandler = () => {
    const foodId = isHistoryDetailDrawerOpen.foodId;
    setIsHistoryDetailDrawerOpen({ isOpen: false, foodId: -1, revisionNumber: null });
    setIsViewDrawerOpen({ isOpen: true, id: foodId });
  };

  const closeDeactivateModalHandler = () => {
    setIsDeactivateModalOpen({ isOpen: false, id: -1 });
    deactivateForm.resetFields();
  };

  const onDeactivateSuccess = () => {
    toast.success(DEACTIVATE_SIDE_DISH_SUCCESS_MSG, {
      toastId: DEACTIVATE_SIDE_DISH_SUCCESS_MSG,
    });
    closeDeactivateModalHandler();
    fetchAllFoodSideDishesList();
  };

  const confirmDeactivateHandler = () => {
    deactivateForm
      .validateFields()
      .then((values: CateringAllFoodSideDishesListDeactivateModalFormType) => {
        if (!isDeactivateModalOpen.id || isDeactivateModalOpen.id < 0) return;

        const request: DeactiveAllFoodRequest = {
          id: isDeactivateModalOpen.id,
          statusType: CATERING_STATUS_TYPES.DE_ACTIVE_NOT_SHOW,
          deActiveReason: values.deActiveReason?.item?.id,
        };

        deactiveAllFood(request).unwrap().then(onDeactivateSuccess);
      });
  };

  const deactivateModalRecord =
    dataSource?.content?.find((item) => item.id === isDeactivateModalOpen.id) ?? null;

  const buildAllFoodSideDishesListRequest = (): GetDetailAllSelfsProductsRequest => {
    const request: GetDetailAllSelfsProductsRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        productCategories: [CATERING_PRODUCT_CATEGORIES.SIDE_DISH],
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

      // history-table sort key stays in URL only; list payload must not send it
      if (sorting?.sortBy && sorting.sortBy !== "modifiedDateDate") {
        request.params.sortBy = sorting.sortBy;
      }

      if (sorting?.sortOrder && sorting.sortBy !== "modifiedDateDate") {
        request.params.sortDirection = sorting.sortOrder?.toUpperCase();
      }
    }

    return request;
  };

  const fetchAllFoodSideDishesList = () => {
    getDetailAllSelfsProducts(buildAllFoodSideDishesListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildAllFoodSideDishesListRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringAllFoodListExcel({ params, body }, "لیست مخلفات")
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

      {/* Create Drawer */}
      {isCreateDrawerOpen && (
        <CustomDrawer
          open={isCreateDrawerOpen}
          onClose={closeCreateDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <CateringAllFoodSideDishesCreateDrawerContent
              closeDrawerHandler={closeCreateDrawerHandler}
              onSuccess={fetchAllFoodSideDishesList}
            />
          }
        />
      )}

      {/* Edit Drawer */}
      {isEditDrawerOpen?.isOpen && (
        <CustomDrawer
          open={isEditDrawerOpen?.isOpen}
          onClose={closeEditDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <CateringAllFoodSideDishesEditDrawerContent
              closeDrawerHandler={closeEditDrawerHandler}
              id={isEditDrawerOpen?.id}
              onSuccess={fetchAllFoodSideDishesList}
            />
          }
        />
      )}

      {/* View Drawer */}
      {isViewDrawerOpen?.isOpen && (
        <CustomDrawer
          open={isViewDrawerOpen?.isOpen}
          onClose={closeViewDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <CateringAllFoodSideDishesListViewDrawerContent
              closeDrawerHandler={closeViewDrawerHandler}
              id={isViewDrawerOpen?.id}
              onOpenHistoryDetail={openHistoryDetailHandler}
            />
          }
        />
      )}

      <CateringAllFoodHistoryDrawer
        open={isHistoryDetailDrawerOpen.isOpen}
        onClose={closeHistoryDetailHandler}
        foodId={isHistoryDetailDrawerOpen.foodId}
        revisionNumber={isHistoryDetailDrawerOpen.revisionNumber}
      />

      {/* Deactivate Modal */}
      {isDeactivateModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="غیر فعال کردن"
          isModalOpen={isDeactivateModalOpen.isOpen}
          confirmBtnText="تایید و غیرفعال سازی"
          backBtnText="انصراف"
          isDangerous
          showIcon
          isFormSensitive
          form={deactivateForm}
          isConfirmButtonLoading={isDeactiveAllFoodLoading}
          closeModalHandler={closeDeactivateModalHandler}
          onConfirmClickHandler={confirmDeactivateHandler}
          content={
            <CateringAllFoodSideDishesListDeactivateModalContent
              id={isDeactivateModalOpen.id}
              record={deactivateModalRecord}
              form={deactivateForm}
            />
          }
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
              <Link to={CATERING_ALL_FOOD_SIDE_DISHES_ARCHIVE_PAGE_ROUTE}>
                <CustomButton type="default" icon={<FiArchive />}>
                  آرشیو
                </CustomButton>
              </Link>
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={openCreateDrawerHandler}
              >
                افزودن مخلفات
              </CustomButton>
              <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
                خروجی
              </CustomButton>
            </div>
          }
        />
        <div>
          <CustomTable<GetDetailAllSelfsProductsContent>
            dataSource={dataSource?.content}
            loading={isGetDetailAllSelfsProductsLoading}
            rowKey="id"
            columns={CateringAllFoodSideDishesListTableModel({
              onView: onViewHandler,
              onEdit: onEditHandler,
              onDeActive: onDeActiveHandler,
            })}
            pagination={manualPaginationConfig({
              total: dataSource?.totalElements || 0,
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
            draggableId={ExcelCodes.CATERING_ALL_FOOD_SIDE_DISHES_LIST_TABLE}
          />
        </div>
      </div>
    </>
  );
};

export default CateringAllFoodSideDishesList;

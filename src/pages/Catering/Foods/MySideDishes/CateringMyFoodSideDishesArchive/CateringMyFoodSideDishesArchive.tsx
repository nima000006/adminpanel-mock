import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
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
import { downloadCateringMyFoodListExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_MY_FOOD_SIDE_DISHES_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetDetailMySelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  CATERING_STATUS_TYPES_ARCHIVE_LIST,
  CATERING_PRODUCT_CATEGORIES,
} from "@pages/Catering/_shared/utils";
import CateringMyFoodHistoryDrawer from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/helper/components/CateringMyFoodHistory/helper/components/CateringMyFoodHistoryDrawer/CateringMyFoodHistoryDrawer";
import { CateringMyFoodSideDishesArchiveAdvanceFilterFormType } from "@pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesArchive/@types/@cateringMyFoodSideDishesArchive";
import useCateringMyFoodSideDishesArchiveAdvanceFilter from "@pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesArchive/helper/hooks/useCateringMyFoodSideDishesArchiveAdvanceFilter/useCateringMyFoodSideDishesArchiveAdvanceFilter";
import CateringMyFoodSideDishesArchiveTableModel from "@pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesArchive/helper/model/CateringMyFoodSideDishesArchiveTableModel";
import CateringMyFoodSideDishesListViewDrawerContent from "@pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesList/helper/drawer/CateringMyFoodSideDishesListViewDrawerContent/CateringMyFoodSideDishesListViewDrawerContent";
import {
  GetDetailMySelfsProductsContent,
  GetDetailMySelfsProductsRequest,
  GetDetailMySelfsProductsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const COLUMN_FILTER_ITEMS = [
  "baseProductId",
  "contractId",
  "restaurantId",
  "vendorId",
  // column
  "title",
];

const CateringMyFoodSideDishesArchive = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "تغذیه",
      },
      {
        title: "غذا‌ و مخلفات",
      },
      {
        title: <Link to={CATERING_MY_FOOD_SIDE_DISHES_PAGE_ROUTE}>مخلفات</Link>,
      },
      {
        title: "آرشیو",
      },
    ],
  });
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<GetDetailMySelfsProductsResponse | null>(
    null
  );
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState({ isOpen: false, id: -1 });
  const [isHistoryDetailDrawerOpen, setIsHistoryDetailDrawerOpen] = useState<{
    isOpen: boolean;
    foodId: number;
    revisionNumber: number | null;
  }>({ isOpen: false, foodId: -1, revisionNumber: null });
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [form] = Form.useForm<CateringMyFoodSideDishesArchiveAdvanceFilterFormType>();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

  const { filterItemsList } = useCateringMyFoodSideDishesArchiveAdvanceFilter({
    advanceModalOpen,
  });

  //? ================================  Api Calls ================================
  const [getDetailMySelfsProducts, { isLoading: isGetDetailMySelfsProductsLoading }] =
    useGetDetailMySelfsProductsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchMyFoodSideDishesArchive();
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

  const buildMyFoodSideDishesArchiveRequest = (): GetDetailMySelfsProductsRequest => {
    const request: GetDetailMySelfsProductsRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "createdDate",
        sortDirection: "ASC",
      },
      body: {
        productCategories: [CATERING_PRODUCT_CATEGORIES.SIDE_DISH],
        statusType: CATERING_STATUS_TYPES_ARCHIVE_LIST,
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

  const fetchMyFoodSideDishesArchive = () => {
    getDetailMySelfsProducts(buildMyFoodSideDishesArchiveRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildMyFoodSideDishesArchiveRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringMyFoodListExcel({ params, body }, "آرشیو مخلفات")
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

      {/* View Drawer */}
      {isViewDrawerOpen?.isOpen && (
        <CustomDrawer
          open={isViewDrawerOpen?.isOpen}
          onClose={closeViewDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <CateringMyFoodSideDishesListViewDrawerContent
              closeDrawerHandler={closeViewDrawerHandler}
              id={isViewDrawerOpen?.id}
              onOpenHistoryDetail={openHistoryDetailHandler}
            />
          }
        />
      )}

      <CateringMyFoodHistoryDrawer
        open={isHistoryDetailDrawerOpen.isOpen}
        onClose={closeHistoryDetailHandler}
        foodId={isHistoryDetailDrawerOpen.foodId}
        revisionNumber={isHistoryDetailDrawerOpen.revisionNumber}
      />

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
            columns={CateringMyFoodSideDishesArchiveTableModel({
              onView: onViewHandler,
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
            draggableId={ExcelCodes.CATERING_MY_FOOD_SIDE_DISHES_ARCHIVE_TABLE}
          />
        </div>
      </div>
    </>
  );
};

export default CateringMyFoodSideDishesArchive;

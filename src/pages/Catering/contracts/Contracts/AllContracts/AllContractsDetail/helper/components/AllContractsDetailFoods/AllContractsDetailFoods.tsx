import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { downloadCateringAllFoodListExcel, makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_ALL_FOOD_DETAILS_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetDetailAllSelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import AllContractsDetailFoodsTableModel from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailFoods/helper/models/AllContractsDetailFoods/AllContractsDetailFoodsTableModel";
import AllContractsListContractsAddFoodMenuButton from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsAddFoodMenuButton/AllContractsListContractsAddFoodMenuButton";
import AllContractsListContractsCreateDrawerAddFood from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddFood/AllContractsListContractsCreateDrawerAddFood";
import AllContractsListContractsCreateDrawerAddSideDish from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddSideDish/AllContractsListContractsCreateDrawerAddSideDish";
import { CateringAllFoodListAdvanceFilterFormType } from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/@types/@cateringAllFoodList";
import useCateringAllFoodListAdvanceFilter from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/helper/hooks/useCateringAllFoodListAdvanceFilter/useCateringAllFoodListAdvanceFilter";
import {
  GetDetailAllSelfsProductsContent,
  GetDetailAllSelfsProductsRequest,
  GetDetailAllSelfsProductsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

const COLUMN_FILTER_ITEMS = [
  "baseProductId",
  "restaurantId",
  "vendorId",
  // column
  "title",
];

const AllContractsDetailFoods = () => {
  const navigate = useNavigate();
  const { params: url, setSearchParams } = useQueryParams();
  const contractId = url?.id ? Number(url.id) : null;

  const [dataSource, setDataSource] = useState<GetDetailAllSelfsProductsResponse | null>(
    null
  );
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isAddSideDishDrawerOpen, setIsAddSideDishDrawerOpen] = useState(false);
  const [form] = Form.useForm<CateringAllFoodListAdvanceFilterFormType>();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  const { filterItemsList: foodListFilterItems } = useCateringAllFoodListAdvanceFilter({
    advanceModalOpen,
  });
  const filterItemsList = foodListFilterItems.filter((item) => item.name !== "contract");

  //? ================================  Api Calls ================================
  const [getDetailAllSelfsProducts, { isLoading: isGetDetailAllSelfsProductsLoading }] =
    useGetDetailAllSelfsProductsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!contractId) return;

    fetchAllFoodList();
  }, [
    contractId,
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onViewHandler = (id: number) => {
    navigate({
      pathname: CATERING_ALL_FOOD_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: id.toString() }),
    });
  };

  const openCreateDrawerHandler = () => {
    setIsCreateDrawerOpen(true);
  };

  const closeDrawerHandler = () => {
    setIsCreateDrawerOpen(false);
  };

  const openAddSideDishDrawerHandler = () => {
    setIsAddSideDishDrawerOpen(true);
  };

  const closeAddSideDishDrawerHandler = () => {
    setIsAddSideDishDrawerOpen(false);
  };

  const fetchAllFoodList = () => {
    if (!contractId) return;

    const request: GetDetailAllSelfsProductsRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        contractIds: [contractId],
        ...(url?.baseProductId && {
          baseProductIds: url.baseProductId.split(",").map(Number),
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

    getDetailAllSelfsProducts(request)
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    if (!contractId) {
      return;
    }

    const params: GetDetailAllSelfsProductsRequest["params"] = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      sortBy: "createdDate",
      sortDirection: "DESC",
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        params.sortBy = sorting.sortBy;
      }

      if (sorting?.sortOrder) {
        params.sortDirection = sorting.sortOrder?.toUpperCase();
      }
    }

    setIsDownloadLinkLoading(true);
    downloadCateringAllFoodListExcel({
      params,
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        contractIds: [contractId],
        ...(url?.baseProductId && {
          baseProductIds: url.baseProductId.split(",").map(Number),
        }),
        ...(url?.restaurantId && {
          restaurantIds: url.restaurantId.split(",").map(Number),
        }),
        ...(url?.vendorId && {
          vendorIds: url.vendorId.split(",").map(Number),
        }),
        ...(url?.title && { title: url.title }),
      },
    })
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
      {isCreateDrawerOpen && (
        <AllContractsListContractsCreateDrawerAddFood
          open={isCreateDrawerOpen}
          contractId={contractId}
          onClose={closeDrawerHandler}
          onSuccess={fetchAllFoodList}
        />
      )}
      {isAddSideDishDrawerOpen && (
        <AllContractsListContractsCreateDrawerAddSideDish
          open={isAddSideDishDrawerOpen}
          contractId={contractId}
          onClose={closeAddSideDishDrawerHandler}
          onSuccess={fetchAllFoodList}
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
              <AllContractsListContractsAddFoodMenuButton
                onAddMainFood={openCreateDrawerHandler}
                onAddSideDish={openAddSideDishDrawerHandler}
                disabled={!contractId}
              />
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
            columns={AllContractsDetailFoodsTableModel({
              onView: onViewHandler,
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
            draggableId={ExcelCodes.CATERING_ALL_CONTRACTS_DETAIL_FOODS_TABLE}
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

export default AllContractsDetailFoods;

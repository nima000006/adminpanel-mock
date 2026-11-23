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
import { downloadCateringMyFoodListExcel, makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_MY_FOOD_DETAILS_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetDetailMySelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import MyContractsDetailFoodsTableModel from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailFoods/helper/models/MyContractsDetailFoods/MyContractsDetailFoodsTableModel";
import MyContractsListContractsAddFoodMenuButton from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsAddFoodMenuButton/MyContractsListContractsAddFoodMenuButton";
import MyContractsListContractsCreateDrawerAddFood from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddFood/MyContractsListContractsCreateDrawerAddFood";
import MyContractsListContractsCreateDrawerAddSideDish from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddSideDish/MyContractsListContractsCreateDrawerAddSideDish";
import { CateringMyFoodListAdvanceFilterFormType } from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/@types/@cateringMyFoodList";
import useCateringMyFoodListAdvanceFilter from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/helper/hooks/useCateringMyFoodListAdvanceFilter/useCateringMyFoodListAdvanceFilter";
import {
  GetDetailMySelfsProductsContent,
  GetDetailMySelfsProductsRequest,
  GetDetailMySelfsProductsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const COLUMN_FILTER_ITEMS = [
  "baseProductId",
  "restaurantId",
  "vendorId",
  // column
  "title",
];

const MyContractsDetailFoods = () => {
  const navigate = useNavigate();
  const { params: url, setSearchParams } = useQueryParams();
  const contractId = url?.id ? Number(url.id) : null;

  const [dataSource, setDataSource] = useState<GetDetailMySelfsProductsResponse | null>(
    null
  );
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isAddSideDishDrawerOpen, setIsAddSideDishDrawerOpen] = useState(false);
  const [form] = Form.useForm<CateringMyFoodListAdvanceFilterFormType>();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  const { filterItemsList: foodListFilterItems } = useCateringMyFoodListAdvanceFilter({
    advanceModalOpen,
  });
  const filterItemsList = foodListFilterItems.filter((item) => item.name !== "contract");

  //? ================================  Api Calls ================================
  const [getDetailMySelfsProducts, { isLoading: isGetDetailMySelfsProductsLoading }] =
    useGetDetailMySelfsProductsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!contractId) return;

    fetchMyFoodList();
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
      pathname: CATERING_MY_FOOD_DETAILS_PAGE_ROUTE,
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

  const fetchMyFoodList = () => {
    if (!contractId) return;

    const request: GetDetailMySelfsProductsRequest = {
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

    getDetailMySelfsProducts(request)
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    if (!contractId) {
      return;
    }

    const params: GetDetailMySelfsProductsRequest["params"] = {
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
    downloadCateringMyFoodListExcel({
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
        <MyContractsListContractsCreateDrawerAddFood
          open={isCreateDrawerOpen}
          contractId={contractId}
          onClose={closeDrawerHandler}
          onSuccess={fetchMyFoodList}
        />
      )}
      {isAddSideDishDrawerOpen && (
        <MyContractsListContractsCreateDrawerAddSideDish
          open={isAddSideDishDrawerOpen}
          contractId={contractId}
          onClose={closeAddSideDishDrawerHandler}
          onSuccess={fetchMyFoodList}
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
              <MyContractsListContractsAddFoodMenuButton
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
          <CustomTable<GetDetailMySelfsProductsContent>
            dataSource={dataSource?.content}
            loading={isGetDetailMySelfsProductsLoading}
            rowKey="id"
            columns={MyContractsDetailFoodsTableModel({
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
            draggableId={ExcelCodes.CATERING_MY_CONTRACTS_DETAIL_FOODS_TABLE}
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

export default MyContractsDetailFoods;

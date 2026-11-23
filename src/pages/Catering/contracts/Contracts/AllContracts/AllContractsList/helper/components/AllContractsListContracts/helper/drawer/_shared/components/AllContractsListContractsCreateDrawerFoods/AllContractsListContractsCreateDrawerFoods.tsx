import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useDeleteAllRequestContractProductMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useGetDetailAllSelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { AllContractsListContractsCreateDrawerFoodsProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerFoods/@types/@allContractsListContractsCreateDrawerFoods";
import AllContractsListContractsCreateDrawerFoodsTableModel from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerFoods/helper/models/AllContractsListContractsCreateDrawerFoodsTableModel/AllContractsListContractsCreateDrawerFoodsTableModel";
import DeleteFoodModalContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentFoods/helper/components/DeleteFoodModalContent/DeleteFoodModalContent";
import {
  GetDetailAllSelfsProductsContent,
  GetDetailAllSelfsProductsRequest,
  GetDetailAllSelfsProductsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

const DELETE_FOOD_SUCCESS_MSG = "غذا با موفقیت از قرارداد حذف شد.";
const DEFAULT_PAGE_NUMBER = 1; // First page in URL pagination (1-based).
const API_FIRST_PAGE_INDEX = 0; // Backend pagination is 0-based.
const DEFAULT_PAGE_SIZE = 10; // Default table page size.
const EMPTY_TOTAL = 0; // No foods attached to the contract yet.

const AllContractsListContractsCreateDrawerFoods = ({
  contractId,
  refreshKey,
  onEditPrice,
}: AllContractsListContractsCreateDrawerFoodsProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<GetDetailAllSelfsProductsContent[]>([]);
  const [total, setTotal] = useState(EMPTY_TOTAL);
  const [deleteModalInfo, setDeleteModalInfo] = useState<{
    isOpen: boolean;
    id: number | null;
    title?: string;
  }>({ isOpen: false, id: null });

  //? ================================  Api Calls ================================
  const [getDetailAllSelfsProducts, { isLoading: isGetDetailAllSelfsProductsLoading }] =
    useGetDetailAllSelfsProductsMutation();
  const [
    deleteAllRequestContractProduct,
    { isLoading: isDeleteAllRequestContractProductLoading },
  ] = useDeleteAllRequestContractProductMutation();

  //* ================================ Util Functions ================================
  const onGetDetailAllSelfsProductsSuccess = (res: GetDetailAllSelfsProductsResponse) => {
    const content = res?.content ?? [];
    setDataSource(content);
    setTotal(res?.totalElements ?? content.length);
  };

  const fetchFoodsList = () => {
    if (!contractId) return;

    const request: GetDetailAllSelfsProductsRequest = {
      params: {
        pageNumber: url?.createFoodsPage
          ? Number(url.createFoodsPage) - DEFAULT_PAGE_NUMBER
          : API_FIRST_PAGE_INDEX,
        pageSize: url?.createFoodsPageSize
          ? Number(url.createFoodsPageSize)
          : DEFAULT_PAGE_SIZE,
      },
      body: {
        contractIds: [contractId],
        ...(url?.viewTitle && { title: url.viewTitle }),
      },
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        request.params.sortBy = sorting?.sortBy;
      }

      if (sorting?.sortOrder) {
        request.params.sortDirection = sorting?.sortOrder?.toUpperCase();
      }
    }

    getDetailAllSelfsProducts(request).unwrap().then(onGetDetailAllSelfsProductsSuccess);
  };

  const openDeleteModalHandler = (id: number) => {
    const product = dataSource.find((item) => item.id === id);
    setDeleteModalInfo({ isOpen: true, id, title: product?.title });
  };

  const closeDeleteModalHandler = () => {
    setDeleteModalInfo({ isOpen: false, id: null });
  };

  const onDeleteSuccess = () => {
    toast.success(DELETE_FOOD_SUCCESS_MSG, {
      toastId: DELETE_FOOD_SUCCESS_MSG,
    });
    closeDeleteModalHandler();
    fetchFoodsList();
  };

  const confirmDeleteHandler = () => {
    if (deleteModalInfo.id == null) return;

    deleteAllRequestContractProduct({ id: deleteModalInfo.id })
      .unwrap()
      .then(onDeleteSuccess);
  };

  //* ================================ Effects  ================================
  useEffect(() => {
    fetchFoodsList();
  }, [
    contractId,
    refreshKey,
    url?.createFoodsPage,
    url?.createFoodsPageSize,
    url?.sortings,
    url?.viewTitle,
  ]);

  // Keep column hooks stable across empty/table renders (GetServerColumnSearchProps uses hooks)
  const columns = AllContractsListContractsCreateDrawerFoodsTableModel({
    onEditPrice,
    onRemoveFromContract: openDeleteModalHandler,
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {deleteModalInfo.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={deleteModalInfo.isOpen}
          title="حذف از قرارداد"
          closeModalHandler={closeDeleteModalHandler}
          content={<DeleteFoodModalContent title={deleteModalInfo.title} />}
          onConfirmClickHandler={confirmDeleteHandler}
          isDangerous
          showIcon={false}
          confirmBtnText="حذف"
          backBtnText="انصراف"
          isConfirmButtonLoading={isDeleteAllRequestContractProductLoading}
        />
      )}

      <div className="mt-4 flex flex-col gap-4">
        <p className="text-neutral-12 m-0 text-sm font-medium">
          {`غذاهای قرارداد (${total})`}
        </p>

        {!isGetDetailAllSelfsProductsLoading && total === EMPTY_TOTAL ? (
          <CustomEmpty description="هنوز غذایی به قرارداد اضافه نکرده اید." />
        ) : (
          <CustomTable<GetDetailAllSelfsProductsContent>
            dataSource={dataSource}
            loading={isGetDetailAllSelfsProductsLoading}
            columns={columns}
            rowKey="id"
            pagination={manualPaginationConfig({
              total,
              onChange: (page: number, pageSize: number) => {
                setSearchParams({
                  ...url,
                  createFoodsPage: page?.toString(),
                  createFoodsPageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.createFoodsPage
                ? Number(url.createFoodsPage)
                : DEFAULT_PAGE_NUMBER,
              defaultPageSize: url?.createFoodsPageSize
                ? Number(url.createFoodsPageSize)
                : DEFAULT_PAGE_SIZE,
            })}
          />
        )}
      </div>
    </>
  );
};

export default AllContractsListContractsCreateDrawerFoods;

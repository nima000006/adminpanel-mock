import { useEffect, useState } from "react";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useDeleteAllRequestContractProductMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useGetDetailAllSelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { RequestsContractsListWaitedCreatedDrawerContentFoodsProps } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentFoods/@types/@requestsContractsListWaitedCreatedDrawerContentFoods";
import DeleteFoodModalContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentFoods/helper/components/DeleteFoodModalContent/DeleteFoodModalContent";
import RequestsContractsListWaitedCreatedDrawerContentFoodsTableModel from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentFoods/helper/models/RequestsContractsListWaitedCreatedDrawerContentFoodsTableModel/RequestsContractsListWaitedCreatedDrawerContentFoodsTableModel";
import {
  GetDetailAllSelfsProductsContent,
  GetDetailAllSelfsProductsRequest,
  GetDetailAllSelfsProductsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

function RequestsContractsListWaitedCreatedDrawerContentFoods({
  contractId,
  onEditPriceClick,
}: RequestsContractsListWaitedCreatedDrawerContentFoodsProps) {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<GetDetailAllSelfsProductsContent[]>([]);
  const [total, setTotal] = useState(0);
  const [deleteModalInfo, setDeleteModalInfo] = useState<{
    isOpen: boolean;
    id: number | null;
    title?: string;
  }>({ isOpen: false, id: null });

  //? ================================ Api Calls ================================
  const [getDetailAllSelfsProducts, { isLoading: isGetDetailAllSelfsProductsLoading }] =
    useGetDetailAllSelfsProductsMutation();
  const [
    deleteAllRequestContractProduct,
    { isLoading: isDeleteAllRequestContractProductLoading },
  ] = useDeleteAllRequestContractProductMutation();

  //* ================================ Util Functions ================================
  const onGetDetailAllSelfsProductsSuccess = (res: GetDetailAllSelfsProductsResponse) => {
    const content = res?.content ?? [];
    const totalElements = res?.totalElements ?? content.length;
    setDataSource(content);
    setTotal(totalElements);
  };

  const fetchFoodsList = () => {
    if (!contractId) return;

    const request: GetDetailAllSelfsProductsRequest = {
      params: {
        pageNumber: url?.foodsPage ? Number(url.foodsPage) - 1 : 0,
        pageSize: url?.foodsPageSize ? Number(url.foodsPageSize) : 8,
      },
      body: {
        contractIds: [contractId],
        // todo[nima]: uncomment this when the API is ready
        // ...(url?.baseProductTitle && { baseProductTitle: url.baseProductTitle }),
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

  const editPriceClickHandler = (record: GetDetailAllSelfsProductsContent) => {
    onEditPriceClick?.(record);
  };

  const openDeleteModalHandler = (id: number) => {
    const product = dataSource.find((item) => item.id === id);
    setDeleteModalInfo({ isOpen: true, id, title: product?.title });
  };

  const closeDeleteModalHandler = () => {
    setDeleteModalInfo({ isOpen: false, id: null });
  };

  const onDeleteAllRequestContractProductSuccess = () => {
    closeDeleteModalHandler();
    fetchFoodsList();
  };

  const confirmDeleteHandler = () => {
    if (deleteModalInfo.id == null) return;

    deleteAllRequestContractProduct({ id: deleteModalInfo.id })
      .unwrap()
      .then(onDeleteAllRequestContractProductSuccess);
  };

  //? ================================ Effects ================================
  useEffect(() => {
    if (!contractId) {
      setDataSource([]);
      setTotal(0);
      return;
    }

    const request: GetDetailAllSelfsProductsRequest = {
      params: {
        pageNumber: url?.foodsPage ? Number(url.foodsPage) - 1 : 0,
        pageSize: url?.foodsPageSize ? Number(url.foodsPageSize) : 8,
      },
      body: {
        contractIds: [contractId],
        // todo[nima]: uncomment this when the API is ready
        // ...(url?.baseProductTitle && { baseProductTitle: url.baseProductTitle }),
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
  }, [
    contractId,
    getDetailAllSelfsProducts,
    url?.foodsPage,
    url?.foodsPageSize,
    url?.sortings,
    url?.viewTitle,
  ]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {deleteModalInfo.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={deleteModalInfo.isOpen}
          title="حذف از قرارداد"
          closeModalHandler={closeDeleteModalHandler}
          content={<DeleteFoodModalContent title={deleteModalInfo.title} />}
          onConfirmClickHandler={confirmDeleteHandler}
          confirmBtnText="حذف"
          backBtnText="انصراف"
          isDangerous
          showIcon={false}
          isConfirmButtonLoading={isDeleteAllRequestContractProductLoading}
        />
      )}
      <div className="mt-5!">
        <CustomTable<GetDetailAllSelfsProductsContent>
          dataSource={dataSource}
          rowKey="id"
          loading={isGetDetailAllSelfsProductsLoading}
          columns={RequestsContractsListWaitedCreatedDrawerContentFoodsTableModel({
            editPriceClickHandler,
            removeFromContractClickHandler: openDeleteModalHandler,
          })}
          pagination={manualPaginationConfig({
            total,
            onChange: (page: number, pageSize: number) => {
              setSearchParams({
                ...url,
                foodsPage: page?.toString(),
                foodsPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.foodsPage ? Number(url.foodsPage) : 1,
            defaultPageSize: url?.foodsPageSize ? Number(url.foodsPageSize) : 8,
          })}
        />
      </div>
    </>
  );
}

export default RequestsContractsListWaitedCreatedDrawerContentFoods;

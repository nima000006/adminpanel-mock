import { useEffect, useState } from "react";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useDeleteMyRequestContractProductMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useGetDetailMySelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { RequestMyContractsListWaitedCreatedDrawerContentFoodsProps } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/helper/components/RequestMyContractsListWaitedCreatedDrawerContentFoods/@types/@requestMyContractsListWaitedCreatedDrawerContentFoods";
import DeleteMyFoodModalContent from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/helper/components/RequestMyContractsListWaitedCreatedDrawerContentFoods/helper/components/DeleteMyFoodModalContent/DeleteMyFoodModalContent";
import RequestMyContractsListWaitedCreatedDrawerContentFoodsTableModel from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/helper/components/RequestMyContractsListWaitedCreatedDrawerContentFoods/helper/models/RequestMyContractsListWaitedCreatedDrawerContentFoodsTableModel/RequestMyContractsListWaitedCreatedDrawerContentFoodsTableModel";
import {
  GetDetailMySelfsProductsContent,
  GetDetailMySelfsProductsRequest,
  GetDetailMySelfsProductsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

function RequestMyContractsListWaitedCreatedDrawerContentFoods({
  contractId,
  onEditPriceClick,
}: RequestMyContractsListWaitedCreatedDrawerContentFoodsProps) {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<GetDetailMySelfsProductsContent[]>([]);
  const [total, setTotal] = useState(0);
  const [deleteModalInfo, setDeleteModalInfo] = useState<{
    isOpen: boolean;
    id: number | null;
    title?: string;
  }>({ isOpen: false, id: null });

  //? ================================ Api Calls ================================
  const [getDetailMySelfsProducts, { isLoading: isGetDetailMySelfsProductsLoading }] =
    useGetDetailMySelfsProductsMutation();
  const [
    deleteMyRequestContractProduct,
    { isLoading: isDeleteMyRequestContractProductLoading },
  ] = useDeleteMyRequestContractProductMutation();

  //* ================================ Util Functions ================================
  const onGetDetailMySelfsProductsSuccess = (res: GetDetailMySelfsProductsResponse) => {
    const content = res?.content ?? [];
    const totalElements = res?.totalElements ?? content.length;
    setDataSource(content);
    setTotal(totalElements);
  };

  const fetchFoodsList = () => {
    if (!contractId) return;

    const request: GetDetailMySelfsProductsRequest = {
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

    getDetailMySelfsProducts(request).unwrap().then(onGetDetailMySelfsProductsSuccess);
  };

  const editPriceClickHandler = (record: GetDetailMySelfsProductsContent) => {
    onEditPriceClick?.(record);
  };

  const openDeleteModalHandler = (id: number) => {
    const product = dataSource.find((item) => item.id === id);
    setDeleteModalInfo({ isOpen: true, id, title: product?.title });
  };

  const closeDeleteModalHandler = () => {
    setDeleteModalInfo({ isOpen: false, id: null });
  };

  const onDeleteMyRequestContractProductSuccess = () => {
    closeDeleteModalHandler();
    fetchFoodsList();
  };

  const confirmDeleteHandler = () => {
    if (deleteModalInfo.id == null) return;

    deleteMyRequestContractProduct({ id: deleteModalInfo.id })
      .unwrap()
      .then(onDeleteMyRequestContractProductSuccess);
  };

  //? ================================ Effects ================================
  useEffect(() => {
    if (!contractId) {
      setDataSource([]);
      setTotal(0);
      return;
    }

    const request: GetDetailMySelfsProductsRequest = {
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

    getDetailMySelfsProducts(request).unwrap().then(onGetDetailMySelfsProductsSuccess);
  }, [
    contractId,
    getDetailMySelfsProducts,
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
          content={<DeleteMyFoodModalContent title={deleteModalInfo.title} />}
          onConfirmClickHandler={confirmDeleteHandler}
          confirmBtnText="حذف"
          backBtnText="انصراف"
          isDangerous
          showIcon={false}
          isConfirmButtonLoading={isDeleteMyRequestContractProductLoading}
        />
      )}
      <div className="mt-5!">
        <CustomTable<GetDetailMySelfsProductsContent>
          dataSource={dataSource}
          rowKey="id"
          loading={isGetDetailMySelfsProductsLoading}
          columns={RequestMyContractsListWaitedCreatedDrawerContentFoodsTableModel({
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

export default RequestMyContractsListWaitedCreatedDrawerContentFoods;

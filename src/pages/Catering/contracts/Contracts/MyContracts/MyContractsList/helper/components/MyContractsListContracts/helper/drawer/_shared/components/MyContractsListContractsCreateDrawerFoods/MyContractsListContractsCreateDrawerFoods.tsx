import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useDeleteMyRequestContractProductMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useGetDetailMySelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { MyContractsListContractsCreateDrawerFoodsProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerFoods/@types/@myContractsListContractsCreateDrawerFoods";
import MyContractsListContractsCreateDrawerFoodsTableModel from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerFoods/helper/models/MyContractsListContractsCreateDrawerFoodsTableModel/MyContractsListContractsCreateDrawerFoodsTableModel";
import DeleteMyFoodModalContent from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/helper/components/RequestMyContractsListWaitedCreatedDrawerContentFoods/helper/components/DeleteMyFoodModalContent/DeleteMyFoodModalContent";
import {
  GetDetailMySelfsProductsContent,
  GetDetailMySelfsProductsRequest,
  GetDetailMySelfsProductsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const DELETE_FOOD_SUCCESS_MSG = "غذا با موفقیت از قرارداد حذف شد.";
const DEFAULT_PAGE_NUMBER = 1; // First page in URL pagination (1-based).
const API_FIRST_PAGE_INDEX = 0; // Backend pagination is 0-based.
const DEFAULT_PAGE_SIZE = 10; // Default table page size.
const EMPTY_TOTAL = 0; // No foods attached to the contract yet.

const MyContractsListContractsCreateDrawerFoods = ({
  contractId,
  refreshKey,
  onEditPrice,
}: MyContractsListContractsCreateDrawerFoodsProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<GetDetailMySelfsProductsContent[]>([]);
  const [total, setTotal] = useState(EMPTY_TOTAL);
  const [deleteModalInfo, setDeleteModalInfo] = useState<{
    isOpen: boolean;
    id: number | null;
    title?: string;
  }>({ isOpen: false, id: null });

  //? ================================  Api Calls ================================
  const [getDetailMySelfsProducts, { isLoading: isGetDetailMySelfsProductsLoading }] =
    useGetDetailMySelfsProductsMutation();
  const [
    deleteMyRequestContractProduct,
    { isLoading: isDeleteMyRequestContractProductLoading },
  ] = useDeleteMyRequestContractProductMutation();

  //* ================================ Util Functions ================================
  const onGetDetailMySelfsProductsSuccess = (res: GetDetailMySelfsProductsResponse) => {
    const content = res?.content ?? [];
    setDataSource(content);
    setTotal(res?.totalElements ?? content.length);
  };

  const fetchFoodsList = () => {
    if (!contractId) return;

    const request: GetDetailMySelfsProductsRequest = {
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

    getDetailMySelfsProducts(request).unwrap().then(onGetDetailMySelfsProductsSuccess);
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

    deleteMyRequestContractProduct({ id: deleteModalInfo.id })
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
  const columns = MyContractsListContractsCreateDrawerFoodsTableModel({
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
          content={<DeleteMyFoodModalContent title={deleteModalInfo.title} />}
          onConfirmClickHandler={confirmDeleteHandler}
          isDangerous
          showIcon={false}
          confirmBtnText="حذف"
          backBtnText="انصراف"
          isConfirmButtonLoading={isDeleteMyRequestContractProductLoading}
        />
      )}

      <div className="mt-4 flex flex-col gap-4">
        <p className="text-neutral-12 m-0 text-sm font-medium">
          {`غذاهای قرارداد (${total})`}
        </p>

        {!isGetDetailMySelfsProductsLoading && total === EMPTY_TOTAL ? (
          <CustomEmpty description="هنوز غذایی به قرارداد اضافه نکرده اید." />
        ) : (
          <CustomTable<GetDetailMySelfsProductsContent>
            dataSource={dataSource}
            loading={isGetDetailMySelfsProductsLoading}
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

export default MyContractsListContractsCreateDrawerFoods;

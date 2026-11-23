import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetAllRequestContractsViewQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import AllContractsListContractsCreateDrawerAddFood from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddFood/AllContractsListContractsCreateDrawerAddFood";
import AllContractsListContractsCreateDrawerEditFoodPrice from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerEditFoodPrice/AllContractsListContractsCreateDrawerEditFoodPrice";
import { AllContractsListContractsCopyDrawerProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsCopyDrawer/@types/@allContractsListContractsCopyDrawer";
import AllContractsListContractsCopyDrawerContent from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsCopyDrawer/helper/components/AllContractsListContractsCopyDrawerContent/AllContractsListContractsCopyDrawerContent";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

const CONTRACT_FOODS_STEP = 1;

const AllContractsListContractsCopyDrawer = ({
  open,
  record,
  onClose,
  onSuccess,
  initialStep = 0,
}: AllContractsListContractsCopyDrawerProps) => {
  const [isParentVisible, setIsParentVisible] = useState(true);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [copiedContractId, setCopiedContractId] = useState<number | null>(null);
  const [editFoodProduct, setEditFoodProduct] =
    useState<GetDetailAllSelfsProductsContent | null>(null);
  const [foodsRefreshKey, setFoodsRefreshKey] = useState(0);

  //? ================================  Api Calls ================================
  const {
    data: getAllRequestContractsViewData,
    isFetching: isGetAllRequestContractsViewLoading,
  } = useGetAllRequestContractsViewQuery(
    { id: Number(record?.id) },
    {
      skip: !open || !record?.id,
      refetchOnMountOrArgChange: true,
    }
  );

  //* ================================ Effects  ================================
  useEffect(() => {
    if (open) {
      setIsParentVisible(true);
      setIsAddFoodOpen(false);
      setCopiedContractId(
        initialStep === CONTRACT_FOODS_STEP && record?.id != null ? record.id : null
      );
      setEditFoodProduct(null);
      setFoodsRefreshKey(0);
    }
  }, [open, initialStep, record?.id]);

  //* ================================ Util Functions ================================
  const closeAddFoodHandler = () => {
    setIsAddFoodOpen(false);
    setIsParentVisible(true);
  };

  const closeEditFoodPriceHandler = () => {
    setEditFoodProduct(null);
  };

  const onChildFoodSuccess = () => {
    setFoodsRefreshKey((prev) => prev + 1);
  };

  if (!open || !record) {
    return null;
  }

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <CustomDrawer
        open={isParentVisible}
        onClose={onClose}
        closeIcon={<AiOutlineClose />}
        destroyOnHidden={false}
        content={
          <AllContractsListContractsCopyDrawerContent
            contractId={record.id}
            data={getAllRequestContractsViewData}
            isLoading={isGetAllRequestContractsViewLoading}
            onCloseDrawer={onClose}
            onSuccess={onSuccess}
            foodsRefreshKey={foodsRefreshKey}
            initialStep={initialStep}
            onOpenAddFood={(contractId) => {
              setCopiedContractId(contractId);
              setIsAddFoodOpen(true);
              setIsParentVisible(false);
            }}
            onOpenEditFood={(product) => {
              setEditFoodProduct(product);
            }}
            onContractCopied={setCopiedContractId}
          />
        }
      />

      <AllContractsListContractsCreateDrawerAddFood
        open={isAddFoodOpen}
        contractId={copiedContractId}
        onClose={closeAddFoodHandler}
        onSuccess={onChildFoodSuccess}
      />

      <AllContractsListContractsCreateDrawerEditFoodPrice
        open={Boolean(editFoodProduct)}
        product={editFoodProduct}
        onClose={closeEditFoodPriceHandler}
        onSuccess={onChildFoodSuccess}
      />
    </>
  );
};

export default AllContractsListContractsCopyDrawer;

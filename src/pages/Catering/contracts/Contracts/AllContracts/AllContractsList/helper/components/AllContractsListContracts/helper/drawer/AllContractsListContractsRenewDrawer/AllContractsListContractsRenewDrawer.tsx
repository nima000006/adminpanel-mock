import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetAllRequestContractsViewQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import AllContractsListContractsCreateDrawerAddFood from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddFood/AllContractsListContractsCreateDrawerAddFood";
import AllContractsListContractsCreateDrawerAddSideDish from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddSideDish/AllContractsListContractsCreateDrawerAddSideDish";
import AllContractsListContractsCreateDrawerEditFoodPrice from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerEditFoodPrice/AllContractsListContractsCreateDrawerEditFoodPrice";
import { AllContractsListContractsRenewDrawerProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsRenewDrawer/@types/@allContractsListContractsRenewDrawer";
import AllContractsListContractsRenewDrawerContent from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsRenewDrawer/helper/components/AllContractsListContractsRenewDrawerContent/AllContractsListContractsRenewDrawerContent";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

const CONTRACT_FOODS_STEP = 1;

const AllContractsListContractsRenewDrawer = ({
  open,
  record,
  onClose,
  onSuccess,
  initialStep = 0,
}: AllContractsListContractsRenewDrawerProps) => {
  const [isParentVisible, setIsParentVisible] = useState(true);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isAddSideDishOpen, setIsAddSideDishOpen] = useState(false);
  const [extendedContractId, setExtendedContractId] = useState<number | null>(null);
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
      setIsAddSideDishOpen(false);
      setExtendedContractId(
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

  const closeAddSideDishHandler = () => {
    setIsAddSideDishOpen(false);
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
          <AllContractsListContractsRenewDrawerContent
            contractId={record.id}
            data={getAllRequestContractsViewData}
            isLoading={isGetAllRequestContractsViewLoading}
            onCloseDrawer={onClose}
            onSuccess={onSuccess}
            foodsRefreshKey={foodsRefreshKey}
            initialStep={initialStep}
            onOpenAddFood={(contractId) => {
              setExtendedContractId(contractId);
              setIsAddFoodOpen(true);
              setIsParentVisible(false);
            }}
            onOpenAddSideDish={(contractId) => {
              setExtendedContractId(contractId);
              setIsAddSideDishOpen(true);
              setIsParentVisible(false);
            }}
            onOpenEditFood={(product) => {
              setEditFoodProduct(product);
            }}
            onContractExtended={setExtendedContractId}
          />
        }
      />

      <AllContractsListContractsCreateDrawerAddFood
        open={isAddFoodOpen}
        contractId={extendedContractId}
        onClose={closeAddFoodHandler}
        onSuccess={onChildFoodSuccess}
      />

      <AllContractsListContractsCreateDrawerAddSideDish
        open={isAddSideDishOpen}
        contractId={extendedContractId}
        onClose={closeAddSideDishHandler}
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

export default AllContractsListContractsRenewDrawer;

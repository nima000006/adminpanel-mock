import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import AllContractsListContractsCreateDrawerAddFood from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddFood/AllContractsListContractsCreateDrawerAddFood";
import AllContractsListContractsCreateDrawerAddSideDish from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddSideDish/AllContractsListContractsCreateDrawerAddSideDish";
import AllContractsListContractsCreateDrawerEditFoodPrice from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerEditFoodPrice/AllContractsListContractsCreateDrawerEditFoodPrice";
import { AllContractsListContractsCreateDrawerProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsCreateDrawer/@types/@allContractsListContractsCreateDrawer";
import AllContractsListContractsCreateDrawerContent from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsCreateDrawer/helper/components/AllContractsListContractsCreateDrawerContent/AllContractsListContractsCreateDrawerContent";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

const AllContractsListContractsCreateDrawer = ({
  open,
  onClose,
  onSuccess,
  resumeContractId = null,
}: AllContractsListContractsCreateDrawerProps) => {
  const [isParentVisible, setIsParentVisible] = useState(true);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isAddSideDishOpen, setIsAddSideDishOpen] = useState(false);
  const [createdContractId, setCreatedContractId] = useState<number | null>(null);
  const [editFoodProduct, setEditFoodProduct] =
    useState<GetDetailAllSelfsProductsContent | null>(null);
  const [foodsRefreshKey, setFoodsRefreshKey] = useState(0);

  //* ================================ Effects  ================================
  useEffect(() => {
    if (open) {
      setIsParentVisible(true);
      setIsAddFoodOpen(false);
      setIsAddSideDishOpen(false);
      setCreatedContractId(resumeContractId ?? null);
      setEditFoodProduct(null);
      setFoodsRefreshKey(0);
    }
  }, [open, resumeContractId]);

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

  if (!open) {
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
          <AllContractsListContractsCreateDrawerContent
            onCloseDrawer={onClose}
            onSuccess={onSuccess}
            foodsRefreshKey={foodsRefreshKey}
            resumeContractId={resumeContractId}
            onOpenAddFood={(contractId) => {
              setCreatedContractId(contractId);
              setIsAddFoodOpen(true);
              setIsParentVisible(false);
            }}
            onOpenAddSideDish={(contractId) => {
              setCreatedContractId(contractId);
              setIsAddSideDishOpen(true);
              setIsParentVisible(false);
            }}
            onOpenEditFood={(product) => {
              setEditFoodProduct(product);
            }}
            onContractCreated={setCreatedContractId}
          />
        }
      />

      <AllContractsListContractsCreateDrawerAddFood
        open={isAddFoodOpen}
        contractId={createdContractId}
        onClose={closeAddFoodHandler}
        onSuccess={onChildFoodSuccess}
      />

      <AllContractsListContractsCreateDrawerAddSideDish
        open={isAddSideDishOpen}
        contractId={createdContractId}
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

export default AllContractsListContractsCreateDrawer;

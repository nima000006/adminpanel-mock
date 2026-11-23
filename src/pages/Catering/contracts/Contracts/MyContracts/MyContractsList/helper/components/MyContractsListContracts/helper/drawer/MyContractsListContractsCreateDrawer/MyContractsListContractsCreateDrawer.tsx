import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import MyContractsListContractsCreateDrawerAddFood from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddFood/MyContractsListContractsCreateDrawerAddFood";
import MyContractsListContractsCreateDrawerAddSideDish from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddSideDish/MyContractsListContractsCreateDrawerAddSideDish";
import MyContractsListContractsCreateDrawerEditFoodPrice from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerEditFoodPrice/MyContractsListContractsCreateDrawerEditFoodPrice";
import { MyContractsListContractsCreateDrawerProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCreateDrawer/@types/@myContractsListContractsCreateDrawer";
import MyContractsListContractsCreateDrawerContent from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCreateDrawer/helper/components/MyContractsListContractsCreateDrawerContent/MyContractsListContractsCreateDrawerContent";
import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const MyContractsListContractsCreateDrawer = ({
  open,
  onClose,
  onSuccess,
  resumeContractId = null,
}: MyContractsListContractsCreateDrawerProps) => {
  const [isParentVisible, setIsParentVisible] = useState(true);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isAddSideDishOpen, setIsAddSideDishOpen] = useState(false);
  const [createdContractId, setCreatedContractId] = useState<number | null>(null);
  const [editFoodProduct, setEditFoodProduct] =
    useState<GetDetailMySelfsProductsContent | null>(null);
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
          <MyContractsListContractsCreateDrawerContent
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

      <MyContractsListContractsCreateDrawerAddFood
        open={isAddFoodOpen}
        contractId={createdContractId}
        onClose={closeAddFoodHandler}
        onSuccess={onChildFoodSuccess}
      />

      <MyContractsListContractsCreateDrawerAddSideDish
        open={isAddSideDishOpen}
        contractId={createdContractId}
        onClose={closeAddSideDishHandler}
        onSuccess={onChildFoodSuccess}
      />

      <MyContractsListContractsCreateDrawerEditFoodPrice
        open={Boolean(editFoodProduct)}
        product={editFoodProduct}
        onClose={closeEditFoodPriceHandler}
        onSuccess={onChildFoodSuccess}
      />
    </>
  );
};

export default MyContractsListContractsCreateDrawer;

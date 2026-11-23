import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetMyRequestContractsViewQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import MyContractsListContractsCreateDrawerAddFood from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddFood/MyContractsListContractsCreateDrawerAddFood";
import MyContractsListContractsCreateDrawerAddSideDish from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddSideDish/MyContractsListContractsCreateDrawerAddSideDish";
import MyContractsListContractsCreateDrawerEditFoodPrice from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerEditFoodPrice/MyContractsListContractsCreateDrawerEditFoodPrice";
import { MyContractsListContractsRenewDrawerProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsRenewDrawer/@types/@myContractsListContractsRenewDrawer";
import MyContractsListContractsRenewDrawerContent from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsRenewDrawer/helper/components/MyContractsListContractsRenewDrawerContent/MyContractsListContractsRenewDrawerContent";
import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const CONTRACT_FOODS_STEP = 1;

const MyContractsListContractsRenewDrawer = ({
  open,
  record,
  onClose,
  onSuccess,
  initialStep = 0,
}: MyContractsListContractsRenewDrawerProps) => {
  const [isParentVisible, setIsParentVisible] = useState(true);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isAddSideDishOpen, setIsAddSideDishOpen] = useState(false);
  const [extendedContractId, setExtendedContractId] = useState<number | null>(null);
  const [editFoodProduct, setEditFoodProduct] =
    useState<GetDetailMySelfsProductsContent | null>(null);
  const [foodsRefreshKey, setFoodsRefreshKey] = useState(0);

  //? ================================  Api Calls ================================
  const {
    data: getMyRequestContractsViewData,
    isFetching: isGetMyRequestContractsViewLoading,
  } = useGetMyRequestContractsViewQuery(
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
          <MyContractsListContractsRenewDrawerContent
            contractId={record.id}
            data={getMyRequestContractsViewData}
            isLoading={isGetMyRequestContractsViewLoading}
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

      <MyContractsListContractsCreateDrawerAddFood
        open={isAddFoodOpen}
        contractId={extendedContractId}
        onClose={closeAddFoodHandler}
        onSuccess={onChildFoodSuccess}
      />

      <MyContractsListContractsCreateDrawerAddSideDish
        open={isAddSideDishOpen}
        contractId={extendedContractId}
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

export default MyContractsListContractsRenewDrawer;

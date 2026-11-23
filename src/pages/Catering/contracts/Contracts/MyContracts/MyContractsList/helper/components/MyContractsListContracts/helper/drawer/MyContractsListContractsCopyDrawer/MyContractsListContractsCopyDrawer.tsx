import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetMyRequestContractsViewQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import MyContractsListContractsCreateDrawerAddFood from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddFood/MyContractsListContractsCreateDrawerAddFood";
import MyContractsListContractsCreateDrawerEditFoodPrice from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerEditFoodPrice/MyContractsListContractsCreateDrawerEditFoodPrice";
import { MyContractsListContractsCopyDrawerProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCopyDrawer/@types/@myContractsListContractsCopyDrawer";
import MyContractsListContractsCopyDrawerContent from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCopyDrawer/helper/components/MyContractsListContractsCopyDrawerContent/MyContractsListContractsCopyDrawerContent";
import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

const CONTRACT_FOODS_STEP = 1;

const MyContractsListContractsCopyDrawer = ({
  open,
  record,
  onClose,
  onSuccess,
  initialStep = 0,
}: MyContractsListContractsCopyDrawerProps) => {
  const [isParentVisible, setIsParentVisible] = useState(true);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [copiedContractId, setCopiedContractId] = useState<number | null>(null);
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
          <MyContractsListContractsCopyDrawerContent
            contractId={record.id}
            data={getMyRequestContractsViewData}
            isLoading={isGetMyRequestContractsViewLoading}
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

      <MyContractsListContractsCreateDrawerAddFood
        open={isAddFoodOpen}
        contractId={copiedContractId}
        onClose={closeAddFoodHandler}
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

export default MyContractsListContractsCopyDrawer;

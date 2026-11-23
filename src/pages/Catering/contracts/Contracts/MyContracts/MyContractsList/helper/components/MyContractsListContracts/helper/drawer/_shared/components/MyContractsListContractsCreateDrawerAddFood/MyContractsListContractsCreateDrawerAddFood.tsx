import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { MyContractsListContractsCreateDrawerAddFoodProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddFood/@types/@myContractsListContractsCreateDrawerAddFood";
import MyContractsListContractsCreateDrawerAddFoodContent from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddFood/helper/components/MyContractsListContractsCreateDrawerAddFoodContent/MyContractsListContractsCreateDrawerAddFoodContent";

import "./_myContractsListContractsCreateDrawerAddFood.scss";

const MyContractsListContractsCreateDrawerAddFood = ({
  open,
  contractId,
  onClose,
  onSuccess,
}: MyContractsListContractsCreateDrawerAddFoodProps) => {
  if (!open) {
    return null;
  }

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomDrawer
      open={open}
      onClose={onClose}
      closeIcon={<AiOutlineClose />}
      content={
        <MyContractsListContractsCreateDrawerAddFoodContent
          contractId={contractId}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      }
    />
  );
};

export default MyContractsListContractsCreateDrawerAddFood;

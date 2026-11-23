import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { AllContractsListContractsCreateDrawerAddFoodProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddFood/@types/@allContractsListContractsCreateDrawerAddFood";
import AllContractsListContractsCreateDrawerAddFoodContent from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddFood/helper/components/AllContractsListContractsCreateDrawerAddFoodContent/AllContractsListContractsCreateDrawerAddFoodContent";

import "./_allContractsListContractsCreateDrawerAddFood.scss";

const AllContractsListContractsCreateDrawerAddFood = ({
  open,
  contractId,
  onClose,
  onSuccess,
}: AllContractsListContractsCreateDrawerAddFoodProps) => {
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
        <AllContractsListContractsCreateDrawerAddFoodContent
          contractId={contractId}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      }
    />
  );
};

export default AllContractsListContractsCreateDrawerAddFood;

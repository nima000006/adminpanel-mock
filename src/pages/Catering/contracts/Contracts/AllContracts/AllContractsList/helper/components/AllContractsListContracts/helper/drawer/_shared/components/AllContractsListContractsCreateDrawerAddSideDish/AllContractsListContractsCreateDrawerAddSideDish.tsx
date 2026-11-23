import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { AllContractsListContractsCreateDrawerAddSideDishProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddSideDish/@types/@allContractsListContractsCreateDrawerAddSideDish";
import AllContractsListContractsCreateDrawerAddSideDishContent from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddSideDish/helper/components/AllContractsListContractsCreateDrawerAddSideDishContent/AllContractsListContractsCreateDrawerAddSideDishContent";

const AllContractsListContractsCreateDrawerAddSideDish = ({
  open,
  contractId,
  onClose,
  onSuccess,
}: AllContractsListContractsCreateDrawerAddSideDishProps) => {
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
        <AllContractsListContractsCreateDrawerAddSideDishContent
          contractId={contractId}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      }
    />
  );
};

export default AllContractsListContractsCreateDrawerAddSideDish;

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { MyContractsListContractsCreateDrawerAddSideDishProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddSideDish/@types/@myContractsListContractsCreateDrawerAddSideDish";
import MyContractsListContractsCreateDrawerAddSideDishContent from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerAddSideDish/helper/components/MyContractsListContractsCreateDrawerAddSideDishContent/MyContractsListContractsCreateDrawerAddSideDishContent";

const MyContractsListContractsCreateDrawerAddSideDish = ({
  open,
  contractId,
  onClose,
  onSuccess,
}: MyContractsListContractsCreateDrawerAddSideDishProps) => {
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
        <MyContractsListContractsCreateDrawerAddSideDishContent
          contractId={contractId}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      }
    />
  );
};

export default MyContractsListContractsCreateDrawerAddSideDish;

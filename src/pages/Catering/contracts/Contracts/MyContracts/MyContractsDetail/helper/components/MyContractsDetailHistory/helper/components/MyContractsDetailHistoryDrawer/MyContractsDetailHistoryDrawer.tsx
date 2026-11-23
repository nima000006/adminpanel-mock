import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetMyContractHistoryDetailQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import ContractsDetailHistoryDrawerContent from "@pages/Catering/contracts/_shared/helper/components/ContractsDetailHistory/helper/ContractsDetailHistoryDrawerContent/ContractsDetailHistoryDrawerContent";
import { MyContractsDetailHistoryDrawerProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailHistory/helper/components/MyContractsDetailHistoryDrawer/@types/@myContractsDetailHistoryDrawer";

const MyContractsDetailHistoryDrawer = ({
  open,
  onClose,
  contractId,
  revisionNumber,
}: MyContractsDetailHistoryDrawerProps) => {
  //? ================================  Api Calls ================================
  const { data, isFetching: isGetMyContractHistoryDetailLoading } =
    useGetMyContractHistoryDetailQuery(
      {
        id: Number(contractId),
        revisionNumber: Number(revisionNumber),
      },
      {
        skip: !open || !contractId || revisionNumber == null,
        refetchOnMountOrArgChange: true,
      }
    );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  if (!open) {
    return null;
  }

  return (
    <CustomDrawer
      open={open}
      onClose={onClose}
      closeIcon={<AiOutlineClose />}
      content={
        <ContractsDetailHistoryDrawerContent
          data={data}
          isLoading={isGetMyContractHistoryDetailLoading}
          onClose={onClose}
        />
      }
    />
  );
};

export default MyContractsDetailHistoryDrawer;

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetAllContractHistoryDetailQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import ContractsDetailHistoryDrawerContent from "@pages/Catering/contracts/_shared/helper/components/ContractsDetailHistory/helper/ContractsDetailHistoryDrawerContent/ContractsDetailHistoryDrawerContent";
import { AllContractsDetailHistoryDrawerProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailHistory/helper/components/AllContractsDetailHistoryDrawer/@types/@allContractsDetailHistoryDrawer";

const AllContractsDetailHistoryDrawer = ({
  open,
  onClose,
  contractId,
  revisionNumber,
}: AllContractsDetailHistoryDrawerProps) => {
  //? ================================  Api Calls ================================
  const { data, isFetching: isGetAllContractHistoryDetailLoading } =
    useGetAllContractHistoryDetailQuery(
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
          isLoading={isGetAllContractHistoryDetailLoading}
          onClose={onClose}
        />
      }
    />
  );
};

export default AllContractsDetailHistoryDrawer;

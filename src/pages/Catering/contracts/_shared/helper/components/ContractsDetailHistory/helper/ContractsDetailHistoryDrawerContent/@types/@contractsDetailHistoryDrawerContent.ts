import { GetAllContractHistoryDetailResponse } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailHistory/@types/@allContractsDetailHistory";
import { GetMyContractHistoryDetailResponse } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailHistory/@types/@myContractsDetailHistory";

export type ContractsDetailHistoryDrawerContentData =
  GetAllContractHistoryDetailResponse | GetMyContractHistoryDetailResponse;

export type ContractsDetailHistoryDrawerContentProps = {
  data?: ContractsDetailHistoryDrawerContentData;
  isLoading?: boolean;
  onClose: () => void;
};

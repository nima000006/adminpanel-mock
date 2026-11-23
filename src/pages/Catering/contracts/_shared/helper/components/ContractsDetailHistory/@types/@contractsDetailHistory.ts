import {
  GetAllContractHistoryContent,
  GetAllContractHistoryResponse,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailHistory/@types/@allContractsDetailHistory";
import {
  GetMyContractHistoryContent,
  GetMyContractHistoryResponse,
} from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailHistory/@types/@myContractsDetailHistory";

export type ContractsDetailHistoryData =
  GetAllContractHistoryResponse | GetMyContractHistoryResponse;

export type ContractsDetailHistoryRecordType =
  GetAllContractHistoryContent | GetMyContractHistoryContent;

export type ContractsDetailHistoryProps = {
  data?: ContractsDetailHistoryData;
  isLoading?: boolean;
  onViewHandler?: (record: ContractsDetailHistoryRecordType) => void;
};

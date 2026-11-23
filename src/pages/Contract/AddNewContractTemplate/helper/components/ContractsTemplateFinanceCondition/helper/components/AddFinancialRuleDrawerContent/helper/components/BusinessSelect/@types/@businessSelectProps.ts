import { GetContractPartiesResponse } from "@pages/Contract/ContractsTemplateList/ContractsTemplateList/@types/ContractsTemplateListTypes";

export type BusinessSelectProps = {
  options?: GetContractPartiesResponse;
  loading?: boolean;
  onChange?: (value: unknown) => void;
};

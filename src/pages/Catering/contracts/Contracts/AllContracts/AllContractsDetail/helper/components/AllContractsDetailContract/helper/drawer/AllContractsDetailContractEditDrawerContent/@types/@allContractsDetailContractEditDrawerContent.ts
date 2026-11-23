import { GetAllRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/@types/@requestsContractsListWaited";

export type AllContractsDetailContractEditDrawerContentFormType = {
  contractTitle: string;
  vendorTitle: string;
  selfTitle: string;
  contractNo: string;
  contractDateRange: [string, string];
  vendorPercentage: number | string;
  providerPercentage: number | string;
  restaurantPercentage: number | string;
  contractDescription: string;
  firstImage?: string;
  secondImage?: string;
  thirdImage?: string;
  fourthImage?: string;
};

export type AllContractsDetailContractEditDrawerContentProps = {
  contractDetail: GetAllRequestContractsViewResponse;
  onCloseDrawer: () => void;
  onSuccess: () => void;
};

export type ContractDocumentImageField =
  "firstImage" | "secondImage" | "thirdImage" | "fourthImage";

export type UpdateAllContractRequest = {
  id: number;
  title: string;
  description: string;
  restaurantId: number;
  vendorId: number;
  startedDate: string;
  endDate: string;
  contractUUID: string;
  file1: string;
  file2: string;
  file3: string | null;
  file4: string | null;
  providerPercentage: number;
  restaurantPercentage: number;
  vendorPercentage: number;
};

export type UpdateAllContractResponse = number;

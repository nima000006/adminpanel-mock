import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetAllRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/@types/@requestsContractsListWaited";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type RequestsContractsListWaitedCreatedDrawerContentFormTypes = {
  contractTitle: string;
  supplierName: SelectType<IdTitle>;
  selfName: SelectType<IdTitle>;
  contractNumber: string;
  contractDateRange: [string, string];
  supplierSharePercentage: string;
  studentSharePercentage: string;
  universitySharePercentage: string;
  contractDescription: string;
};

export type RequestsContractsListWaitedCreatedDrawerContentProps = {
  onClose: () => void;
  form: FormInstance<RequestsContractsListWaitedCreatedDrawerContentFormTypes>;
  data?: GetAllRequestContractsViewResponse;
  isLoading?: boolean;
  onAcceptSuccess?: () => void;
  onRejectSuccess?: () => void;
  onEditPriceClick?: (product: GetDetailAllSelfsProductsContent) => void;
};

export type AcceptAllRequestContractRequest = {
  id: number;
  title: string;
  description: string;
  restaurantId: number;
  vendorId: number;
  startedDate: string;
  endDate: string;
  contractUUID: string;
  file1Title: string;
  file2Title: string;
  file3Title: string;
  file4Title: string;
  providerPercentage: number;
  restaurantPercentage: number;
  vendorPercentage: number;
};

export type AcceptAllRequestContractResponse = number;

export type RejectAllRequestContractRequest = {
  id: number;
  rejectReasonId: number;
  description: string;
};

export type RejectAllRequestContractResponse = number;

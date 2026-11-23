import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetDetailAllSelfsContractsContent,
  GetDetailAllSelfsContractsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";

export type AllContractsListContractsRecordType = GetDetailAllSelfsContractsContent;
export type AllContractsListContractsResponse = GetDetailAllSelfsContractsResponse;

export type AllContractsListContractsAdvanceFilterFormType = {
  branch: SelectType<IdTitle>[];
  self: SelectType<IdTitle>[];
  supplier: SelectType<IdTitle>[];
  startedDate: string;
  endDate: string;
  restaurantProvince: SelectType<IdTitle>[];
  restaurantCity: SelectType<IdTitle>[];
  vendorProvince: SelectType<IdTitle>[];
  vendorCity: SelectType<IdTitle>[];
};

export type AllContractsListContractsTableModelProps = {
  onView: (record: AllContractsListContractsRecordType) => void;
  onRenew: (record: AllContractsListContractsRecordType) => void;
  onCopy: (record: AllContractsListContractsRecordType) => void;
  onDeActive: (record: AllContractsListContractsRecordType) => void;
};

export type ExtendAllContractRequest = {
  contractId: number;
  title: string;
  description: string;
  contractUUID: string;
  startedDate: string;
  endDate: string;
  file1: string | null;
  file2: string | null;
  file3: string | null;
  file4: string | null;
  productIds: number[];
};

export type ExtendAllContractResponse = number;

export type CopyAllContractRequest = {
  contractId: number;
  startedDate: string;
  endDate: string;
  createdDate: string;
};

export type CopyAllContractResponse = number;

export type UpdateAllContractStatusRequest = {
  id: number;
  statusType: number;
  deActiveReason?: number;
};

export type UpdateAllContractStatusResponse = void;

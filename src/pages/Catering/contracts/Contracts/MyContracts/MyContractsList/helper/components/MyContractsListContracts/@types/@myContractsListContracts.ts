import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetDetailMySelfsContractsContent,
  GetDetailMySelfsContractsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

export type MyContractsListContractsRecordType = GetDetailMySelfsContractsContent;
export type MyContractsListContractsResponse = GetDetailMySelfsContractsResponse;

export type MyContractsListContractsAdvanceFilterFormType = {
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

export type MyContractsListContractsTableModelProps = {
  onView: (record: MyContractsListContractsRecordType) => void;
  onRenew: (record: MyContractsListContractsRecordType) => void;
  onCopy: (record: MyContractsListContractsRecordType) => void;
  onDeActive: (record: MyContractsListContractsRecordType) => void;
};

export type ExtendMyContractRequest = {
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

export type ExtendMyContractResponse = number;

export type CopyMyContractRequest = {
  contractId: number;
  startedDate: string;
  endDate: string;
  createdDate: string;
};

export type CopyMyContractResponse = number;

export type UpdateMyContractStatusRequest = {
  id: number;
  statusType: number;
  deActiveReason?: number;
};

export type UpdateMyContractStatusResponse = void;

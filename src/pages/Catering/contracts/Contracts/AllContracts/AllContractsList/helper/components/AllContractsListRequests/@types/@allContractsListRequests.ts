import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetDetailAllSelfsContractsContent,
  GetDetailAllSelfsContractsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";

export type AllContractsListRequestsRecordType = GetDetailAllSelfsContractsContent;
export type AllContractsListRequestsResponse = GetDetailAllSelfsContractsResponse;

export type AllContractsListRequestsAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  supplier: SelectType<IdTitle>[];
  requestType: SelectType<IdTitle>[];
  requestStatus: SelectType<IdTitle>[];
};

export type AllContractsListRequestsOpenDrawerState = {
  isOpen: boolean;
  record: AllContractsListRequestsRecordType | null;
};

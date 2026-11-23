import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetDetailMySelfsContractsContent,
  GetDetailMySelfsContractsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

export type MyContractsListRequestsRecordType = GetDetailMySelfsContractsContent;
export type MyContractsListRequestsResponse = GetDetailMySelfsContractsResponse;

export type MyContractsListRequestsAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  supplier: SelectType<IdTitle>[];
  requestType: SelectType<IdTitle>[];
  requestStatus: SelectType<IdTitle>[];
};

export type MyContractsListRequestsOpenDrawerState = {
  isOpen: boolean;
  record: MyContractsListRequestsRecordType | null;
};

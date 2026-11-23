import {
  GetDetailAllSelfsContractsContent,
  GetDetailAllSelfsContractsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";
import {
  GetDetailMySelfsContractsContent,
  GetDetailMySelfsContractsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

export type CateringVendorContractsData =
  GetDetailAllSelfsContractsResponse | GetDetailMySelfsContractsResponse;

export type CateringVendorContractsRecordType =
  GetDetailAllSelfsContractsContent | GetDetailMySelfsContractsContent;

export type CateringVendorContractsProps = {
  data?: CateringVendorContractsData;
  isLoading?: boolean;
};

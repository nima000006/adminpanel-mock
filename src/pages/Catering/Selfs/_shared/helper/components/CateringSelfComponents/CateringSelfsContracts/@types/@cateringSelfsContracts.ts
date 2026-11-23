import {
  GetDetailAllSelfsContractsContent,
  GetDetailAllSelfsContractsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";
import {
  GetDetailMySelfsContractsContent,
  GetDetailMySelfsContractsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

export type CateringSelfsContractsData =
  GetDetailAllSelfsContractsResponse | GetDetailMySelfsContractsResponse;

export type CateringSelfsContractsRecordType =
  GetDetailAllSelfsContractsContent | GetDetailMySelfsContractsContent;

export type CateringSelfsContractsStatusType = {
  id: number;
  title: string;
  faTitle: string;
};

export type CateringSelfsContractsProps = {
  data?: CateringSelfsContractsData;
  isLoading?: boolean;
};

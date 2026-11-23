import {
  GetAllVendorHistoryContent,
  GetAllVendorHistoryResponse,
} from "@pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/components/CateringAllVendorHistory/@types/@cateringAllVendorHistory";
import {
  GetMyVendorHistoryContent,
  GetMyVendorHistoryResponse,
} from "@pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/components/CateringMyVendorHistory/@types/@cateringMyVendorHistory";

export type CateringVendorHistoryData =
  GetAllVendorHistoryResponse | GetMyVendorHistoryResponse;

export type CateringVendorHistoryRecordType =
  GetAllVendorHistoryContent | GetMyVendorHistoryContent;

export type CateringVendorHistoryProps = {
  data?: CateringVendorHistoryData;
  isLoading?: boolean;
  onViewHandler?: (record: CateringVendorHistoryRecordType) => void;
};

import { GetAllVendorHistoryDetailResponse } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/components/CateringAllVendorHistory/@types/@cateringAllVendorHistory";
import { GetMyVendorHistoryDetailResponse } from "@pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/components/CateringMyVendorHistory/@types/@cateringMyVendorHistory";

export type CateringVendorHistoryDrawerContentData =
  GetAllVendorHistoryDetailResponse | GetMyVendorHistoryDetailResponse;

export type CateringVendorHistoryDrawerContentProps = {
  data?: CateringVendorHistoryDrawerContentData;
  isLoading?: boolean;
  onClose: () => void;
};

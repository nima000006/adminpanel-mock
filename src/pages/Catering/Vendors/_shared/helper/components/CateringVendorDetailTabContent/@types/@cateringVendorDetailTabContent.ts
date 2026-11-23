import { GetAllVendorListContent } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/@types/@cateringAllVendorList";
import { GetMyVendorListContent } from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/@types/@cateringMyVendorList";

export type CateringVendorDetailTabContentProps = {
  data?: GetAllVendorListContent | GetMyVendorListContent;
  isLoading?: boolean;
  onEdit?: () => void;
};

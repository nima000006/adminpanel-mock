import { GetAllVendorListContent } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/@types/@cateringAllVendorList";
import { GetMyVendorListContent } from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/@types/@cateringMyVendorList";

export type ContractsDetailVendorContentData =
  GetAllVendorListContent | GetMyVendorListContent;

export type ContractsDetailVendorContentProps = {
  data?: ContractsDetailVendorContentData;
  isLoading?: boolean;
};

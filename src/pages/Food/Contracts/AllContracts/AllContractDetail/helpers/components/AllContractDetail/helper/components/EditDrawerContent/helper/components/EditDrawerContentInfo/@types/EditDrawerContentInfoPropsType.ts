import { FormInstance } from "antd";

import { RestaurantType } from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";
import { VendorAllType } from "@pages/Food/Vendors/AllVendors/AllVendorList/@types/@allVendorList";

import { ContractEditFormType } from "../../../../../../../@types/@allContractDetailTab";

export type EditDrawerContentInfoPropsType = {
  vendorData: [] | VendorAllType[];
  isAllVendorListListLoading: boolean;
  restaurantData: [] | RestaurantType[];
  isAllRestaurantDataLoading: boolean;
  form: FormInstance<ContractEditFormType>;
};

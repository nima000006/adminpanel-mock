import { FormInstance } from "antd";
import dayjs from "dayjs";

import { MyRestaurantType } from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";
import { VendorMyType } from "@pages/Food/Vendors/MyVendors/MyVendorsList/@types/@myVendorsList";

export type myContractListDrawerContentInfoTypes = {
  isMyVendorListListLoading: boolean;
  isMyRestaurantDataLoading: boolean;
  form: FormInstance;
  vendorData: [] | VendorMyType[];
  restaurantData: [] | MyRestaurantType[];
  contractStartDate: dayjs.Dayjs | null;
  setContractStartDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
};

export type ManagementMyAddressInfoAddress = {
  id: number;
  cityId: number;
  cityTitle: string;
  zipCode: string;
  address: string;
  latitude: number;
  longitude: number;
  defaultAddress: boolean;
  province: string;
  unitNumber: string;
  buildingNumber: string;
  faTitle: string;
};

// If you want the array type explicitly:
export type ManagementMyAddressInfoResponse = ManagementMyAddressInfoAddress[];

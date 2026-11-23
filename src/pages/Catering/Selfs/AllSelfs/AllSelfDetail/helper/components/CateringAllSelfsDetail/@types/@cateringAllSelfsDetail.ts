export type getDetailAllSelfRequest = {
  id: number;
};

export type getDetailAllSelfResponse = {
  id: number;
  title: string;
  description: string;
  rules: string;
  ownerBranchCodeBranchCode: number;
  ownerBranchCodeBranchName: string;
  genderType: number;
  logoName: string;
  coverName: string;
  logoTitle: string;
  coverTitle: string;
  phone: string;
  managerUserName: string;
  managerFirstName: string;
  managerLastName: string;
  managerUserId: number;
  latitude: number;
  longitude: number;
  score: number;
  modifiedDate: string;
  createdDate: string;
  statusType: {
    id: number;
    title: string;
    faTitle: string;
  };
  status: number;
  capacity: number;
  branchDtos: {
    branchCode: number;
    branchName: string;
  }[];
  restaurantPhone: string;
  restaurantPhone2: string;
  provinceName: string;
  provinceId: number;
  cityName: string;
  cityId: number;
  address: string;
  postalCode: string;
  modifiedByUsername: string;
  modifiedBy: string;
  private: boolean;
};

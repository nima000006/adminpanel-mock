export type CateringAllSelfsHistoryDrawerProps = {
  open: boolean;
  onClose: () => void;
  restaurantId?: number;
  revisionNumber?: number | null;
};

export type GetDetailAllSelfsHistoryDetailRequest = {
  id: number;
  revisionNumber: number;
};

export type GetDetailAllSelfsHistoryDetailResponse = {
  revisionNumber: number;
  revisionDate: string;
  revisionType: string;
  id: number;
  title: string;
  description: string;
  rules: string;
  ownerBranchCode: number;
  ownerBranchName: string;
  genderType: number;
  logoName: string;
  coverName: string;
  phone: string;
  restaurantPhone2: string;
  managerUserName: string;
  managerFirstName: string;
  managerLastName: string;
  managerUserId: number;
  latitude: number;
  longitude: number;
  provinceId: number;
  cityId: number;
  provinceTitle: string;
  cityTitle: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedBy: string;
  statusType: {
    id: number;
    title: string;
    faTitle: string;
  };
  capacity: number;
  address: string;
  postalCode: string;
  restaurantPhone: string;
  branchCodes: number[];
};

type BaseSelectItem = {
  id: number;
  title: string;
  description?: string;
};

type SelectType<T = BaseSelectItem> = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: T;
  code: number;
};

type SelfItem = {
  id: number;
  title: string;
  description?: string;
  rules: string;
  ownerBranchCodeBranchCode: number;
  ownerBranchCodeBranchName: string;
  genderType: number;
  logoName: string | null;
  coverName: string | null;
  logoTitle: string | null;
  coverTitle: string | null;
  phone: string;
  managerUserName: string;
  managerFirstName: string;
  managerLastName: string;
  managerUserId: number | null;
  latitude: number;
  longitude: number;
  score: number | null;
  modifiedDate: string | null;
  createdDate: string | null;
  deleted: boolean;
  status: string | null;
  capacity: number;
  branchDtos: null;
  restaurantPhone: string;
  provinceName: string;
  provinceId: number;
  provinceStateName: string;
  provinceStateId: number;
  address: string;
  postalCode: string;
  active: boolean;
  private: boolean;
};

export type FormType = {
  unit: SelectType;
  closingDate: string;
  reason: SelectType<BaseSelectItem>;
  self: SelectType<SelfItem> | null;
  meal: SelectType<BaseSelectItem>;
  foods: null | SelectType | SelectType[];
};

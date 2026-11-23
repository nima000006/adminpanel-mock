/** Shared create/update/upload contracts for catering selfs (admin + manager). */

export type cateringUploadFileResponse = string;

export type createCateringRestaurantResponse = number;

export type createCateringRestaurantRequest = {
  title: string;
  description: string;
  rules: string;
  ownerBranchCode: number;
  ownerBranchName: string;
  genderType: number;
  logoName?: string | null;
  coverName?: string | null;
  phone?: string;
  restaurantPhone2?: string;
  managerUserName?: string;
  managerFirstName?: string;
  managerLastName?: string;
  latitude: number;
  longitude: number;
  score?: number;
  branchIds: number[];
  cityId: number;
  capacity: number;
  restaurantPhone: string;
  address: string;
  postalCode: string;
  statusType: string;
};

export type updateCateringRestaurantResponse = number;

export type updateCateringRestaurantRequest = {
  id: number;
  title: string;
  description: string;
  rules: string;
  ownerBranchCode: number;
  ownerBranchName: string;
  genderType: number;
  logoName?: string | null;
  coverName?: string | null;
  phone?: string;
  restaurantPhone2?: string;
  managerUserName?: string;
  managerFirstName?: string;
  managerLastName?: string;
  latitude: number;
  longitude: number;
  branchIds: number[];
  cityId: number;
  capacity: number;
  restaurantPhone: string;
  address: string;
  postalCode: string;
  statusType: string;
  modifiedDate?: string;
};

/** Manager ("my") create/update — branch/unit is not collected or submitted */
export type CreateCateringMyRestaurantRequest = Omit<
  createCateringRestaurantRequest,
  "ownerBranchCode" | "ownerBranchName" | "branchIds"
>;
export type CreateCateringMyRestaurantResponse = createCateringRestaurantResponse;

export type UpdateCateringMyRestaurantRequest = Omit<
  updateCateringRestaurantRequest,
  "ownerBranchCode" | "ownerBranchName" | "branchIds"
>;

export type UpdateCateringMyRestaurantResponse = updateCateringRestaurantResponse;

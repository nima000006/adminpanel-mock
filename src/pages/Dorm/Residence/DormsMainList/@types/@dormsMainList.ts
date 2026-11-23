import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type getDormType = {
  updateDate: string;
  AssociationAccommodationType_title: string;
  nominalCapacity: number;
  updateTime: string;
  cityId: number;
  title: string;
  provinceId: number;
  AssociationActiveStatus_title: string;
  isDormitoryActive: number;
  bookableCapacity: number;
  accommodationTypeId: number;
  id: number;
  qualityId: number;
  AssociationRecordStatus_title: string;
  AssociationStatus_title: string;
  percentFull: number;
  AssociationGender_title: string;
  OpenBed: number;
  createDate: string;
  branchId: number;
  AssociationBranch_title: string;
  // AssociationRegion_AssociationRegionType_title: "منطقه 1";
  genderId: number;
  CreatingUser: string;
  AssociationRegion_regionTypeId: number;
  AssociationRegion_name: string;
  recordStatus: number;
  statusId: number;
  regionId: number;
  createTime: string;
  editingUser: string;
  requestTypeId: number;
  AssociationUserStaffNew_AssociationCustomerUser_firstName: string;
  AssociationUserStaffNew_AssociationCustomerUser_lastName: string;
  AssociationEditUserStaffNew_AssociationCustomerUser_firstName: string;
  AssociationEditUserStaffNew_AssociationCustomerUser_lastName: string;
  AssociationQuality_title: string;
};
export type getAllDormsResponse = GENERAL_RESPONSE<getDormType[]>;
export type getAllDormsRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_IN?: string;
  AssociationRegion_parentId_IN?: string;
  regionId_IN?: string;
  branchId_IN?: string;
  accommodationTypeId_IN?: string;
  genderId_IN?: string;
  qualityId_IN?: string;
  statusId_EQ?: string;
  requestTypeId_IN?: string;
  sortings?: string | undefined;
  title_LIKE?: string;
};

export type getAllDormsCountRequest = {
  recordStatus_IN?: string;
  AssociationRegion_parentId_IN?: string;
  regionId_IN?: string;
  branchId_IN?: string;
  accommodationTypeId_IN?: string;
  genderId_IN?: string;
  qualityId_IN?: string;
  statusId_EQ?: string;
  requestTypeId_IN?: string;
  sortings?: string | undefined;
  title_LIKE?: string;
};

export type GetAllDormsParams = {
  firstResult: number;
  maxResults: number;
  statusId_EQ?: string;
  sortings?: string | undefined;
  title_LIKE?: string;
};

// export type DormMainTableListProps = {
//   onGoToDetailClickHandler: (id: number) => void;
// };

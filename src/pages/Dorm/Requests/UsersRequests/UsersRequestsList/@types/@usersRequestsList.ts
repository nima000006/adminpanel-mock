import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type DormUsersListRequestsType = {
  updateDate: string;
  deliverPlanId: number;
  AssociationCategoryDeliverPlan_title: string;
  AssociationCategoryRequestType_id: number;
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title: string;
  AssociationCustomer_userGroupID: null;
  AssociationCategoryRequestType_title: string;
  amountPayable: number;
  AssociationCategoryStatus_title: string;
  AssociationCustomer_AssociationCustomerUser_lastName: string;
  AssociationCustomer_AssociationCustomerUser_AssociationGender_title: string;
  cancellationRequestStatus: number;
  amountPaid: number;
  AssociationCategoryDeliverPlan_AssociationDormitory_title: string;
  AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title: string;
  id: number;
  AssociationCategoryDeliverPlan_dormitoryId: number;
  paymentTime: string;
  deliveryDate: string;
  AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title: string;
  AssociationCustomer_AssociationCustomerUser_nationalCode: null;
  createDate: string;
  cancellationDate: string;
  AssociationCustomer_AssociationCustomerUser_genderId: number;
  AssociationCategoryDeliverPlan_reservationTypeId: number;
  AssociationCategoryDeliverPlan_schedulingId: number;
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_branchCode: null;
  updateTime: string;
  AssociationCustomer_AssociationStudent_studentNumber: null;
  AssociationCustomer_AssociationUserGroup_title: string;
  AssociationCustomer_AssociationCustomerUser_firstName: string;
  statusId: number;
  createTime: string;
  paymentDate: string;
  AssociationCategoryDeliverPlan_priceListId: number;
  AssociationBed_roomId: number;
  bedId: number;
  paymentModel: string | number;
};

export type GetDormUsersRequestsListResponse = BPMS_API_RESPONSE<
  DormUsersListRequestsType[]
>;

export type GetDormUsersRequestsListRequests = {
  firstResult: number;
  maxResults: number;
  deliverPlanId?: number;
  statusId?: number | string;
  cancellationStatus?: string;
  requestTypeId?: string;
  genderId?: string;
  userGroupId?: string;
  schedulingId?: string;
  provinceId?: string;
  cityId?: string;
  branchId?: string;
  reservationTypeId?: string;
  waitingTimeId?: { queryParam: string; value: string };
  dormitoryId?: string;
  createDate_BTW?: string;
  name?: string;
  sortings?: string | undefined;
  lastName?: string;
  deliverPlanTitle?: string;
  studentNumber?: string;
  dormitory?: string;
  nationalCode?: string;
};

export type GetDormUsersRequestsListCountRequests = {
  deliverPlanId?: number;
  statusId?: number | string;
  cancellationStatus?: string;
  requestTypeId?: string;
  genderId?: string;
  userGroupId?: string;
  schedulingId?: string;
  provinceId?: string;
  cityId?: string;
  branchId?: string;
  reservationTypeId?: string;
  waitingTimeId?: { queryParam: string; value: string };
  dormitoryId?: string;
  createDate_BTW?: string;
  name?: string;
  sortings?: string | undefined;
  lastName?: string;
  deliverPlanTitle?: string;
  studentNumber?: string;
  dormitory?: string;
  nationalCode?: string;
};

export type AdmissionProgramListType = {
  branchId: number;
  dormitoryId: number;
  id: number;
  title: string;
  priceListId: number; // تعرفه شناسه
  schedulingId: number; // نوع رزرو
  appliedStartDate: string;
  appliedEndDate: string;
};
export type GetAdmissionProgramResponse = BPMS_API_RESPONSE<AdmissionProgramListType[]>;

export type GetAdmissionProgramRequests = {
  branchId: string;
};
export type AdmissionFormFields = {
  admissionSchedule: AdmissionProgramListType | undefined;
};

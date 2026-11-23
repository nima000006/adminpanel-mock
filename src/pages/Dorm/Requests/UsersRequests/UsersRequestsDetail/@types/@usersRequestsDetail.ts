import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
// tab 1
export type DormRequestInformationType = {
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title: string;
  residenceEndDate: string;
  AssociationCustomer_AssociationCustomerUser_lastName: string;
  AssociationCustomer_AssociationCustomerUser_AssociationGender_title: string;
  AssociationCustomer_AssociationCustomerUser_mobile: string;
  AssociationCustomer_AssociationStudent_fieldId: string;
  AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title: string;
  id: number;
  descCancellationRequest: string;
  deliveryDate: string;
  AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title: string;
  residenceStartDate: string;
  AssociationCustomer_AssociationCustomerUser_nationalCode: string;
  createDate: string;
  cancellationDate: string;
  reservationRequestReviewDate: string;
  AssociationCustomer_AssociationStudent_gradeId: number;
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_branchCode: number;
  AssociationCustomer_AssociationStudent_studentNumber: string;
  AssociationCustomer_AssociationUserGroup_title: string;
  AssociationCustomer_AssociationStudent_enCode: string;
  AssociationCustomer_AssociationCustomerUser_firstName: string;
  AssociationCategoryDeliverPlan_AssociationRequestType_title: string;
  descDisplacementRequest: string;
  createTime: string;
  paymentDate: string;
  cancellationRequestReviewDate: string;
  AssociationCustomer_AssociationStudent_fieldTitle: string;
  AssociationCustomer_AssociationUserGroup_id: number;
  AssociationCategoryRequestType_title: string;
  AssociationCustomer_AssociationCustomerUser_birthDate: string;
  AssociationCustomer_AssociationStudent_AssociationGrade_title: string;
  AssociationCustomer_AssociationCustomerUser_nationalityId: string;
};

export type GetDormRequestInformationResponse = BPMS_API_RESPONSE<
  DormRequestInformationType[]
>;

// tab 2
export type DormRequestRoomListType = {
  floorid: number;
  tarefe: number;
  price: number;
  freebed: number;
  id: number;
  activebed: number;
  title: string;
};
export type GetDormRequestRoomListResponse = BPMS_API_RESPONSE<DormRequestRoomListType[]>;

export type GetDormRequestRoomListRequests = {
  floorId: number;
  tariffId: number;
  maxResults: number;
  firstResult: number;
};

export type GetDormRequestRoomListCountRequests = {
  floorId: number;
  tariffId: number;
};

export type DormRequestResidenceInfo = {
  AssociationBed_AssociationCategoryFloor_title: string;
  AssociationBed_AssociationCategorRoom_AssociationGender_title: string;
  AssociationBed_AssociationCategoryBuliding_title: string;
  AssociationCategoryDeliverPlan_AssociationDormitory_title: string;
  AssociationBed_AssociationCategorRoom_title: string;
  CountActiveBeds: number;
  id: number;
  AssociationBed_dormitoryid: number;
  AssociationBed_AssociationCategorRoom_numberStandardBedInRoom: number;
  CountOpenBeds: number;
  AssociationBed_roomId: number;
  AssociationBed_floorId: number;
  bedId: number;
  AssociationBed_title: string;
};

export type GetDormRequestResidenceInfoResponse = BPMS_API_RESPONSE<
  DormRequestResidenceInfo[]
>;

export type RoomOtherRequestListType = {
  deliverPlanId: number;
  updateDate: string;
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title: string;
  requestTypeId: number;
  AssociationCategoryDeliverPlan_AssociationCategoryReservationType_id: number;
  AssociationCategoryRequestType_title: string;
  AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_id: number;
  AssociationCustomer_AssociationCustomerUser_lastName: string;
  AssociationCustomer_AssociationCustomerUser_AssociationGender_title: string;
  AssociationCustomer_AssociationStudent_fieldId: number;
  AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title: string;
  id: number;
  AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title: string;
  AssociationCustomer_AssociationCustomerUser_nationalCode: string;
  createDate: string;
  AssociationCustomer_AssociationCustomerUser_genderId: number;
  AssociationCustomer_AssociationStudent_gradeId: number;
  AssociationBed_roomId: number;
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_branchCode: number;
  updateTime: string;
  AssociationCustomer_AssociationStudent_studentNumber: string;
  AssociationCustomer_AssociationUserGroup_title: string;
  AssociationCustomer_AssociationStudent_enCode: string;
  AssociationCustomer_AssociationCustomerUser_firstName: string;
  createTime: string;
  AssociationCustomer_AssociationStudent_fieldTitle: string;
  AssociationCategoryDeliverPlan_priceListId: number;
  AssociationBed_AssociationCategoryDormitory_title: string;
  AssociationCustomer_AssociationUserGroup_id: number;
  AssociationCustomer_AssociationStudent_AssociationGrade_title: string;
};

export type GetDormRequestRoomOtherRequestListResponse = BPMS_API_RESPONSE<
  RoomOtherRequestListType[]
>;
export type GetDormRequestRoomOtherRequestListRequests = {
  maxResults: number;
  firstResult: number;
  admissionId: string;
  roomId: number;
  name?: string;
  sortings?: string | undefined;
  lastName?: string;
  deliverPlanTitle?: string;
  studentNumber?: string;
  dormitory?: string;
};
export type GetDormRequestRoomOtherRequestListCountRequests = {
  admissionId: string;
  roomId: number;
  name?: string;
  sortings?: string | undefined;
  lastName?: string;
  deliverPlanTitle?: string;
  studentNumber?: string;
  dormitory?: string;
};

//! ACTIONS
// room deliver
export type DormRequestsDeliverRoomResponse = BPMS_API_RESPONSE<null>;
export type DormRequestsDeliverRoomRequest = {
  form: "BedDelivery";
  data: {
    id: number;
    fatherName: string;
    fatherFamily: string;
    fatherPhone: string;
    motherName: string;
    motherFamily: string;
    motherPhone: string;
    wifeName: string;
    wifeFamily: string;
    wifePhone: string;
    relativesName: string;
    relativesFamily: string;
    relativesPhone: string;
    homePhone: string;
    maritalStatus: string;
    AssociationfileRequest: {
      uploadFileId: string;
    }[];
    descDeliveryRoom: string;
    kinship?: string;
  };
};

//status
type StatusRequest = {
  processVariables: [{ name: "id"; operator: "eq"; value: number }];
  taskVariables: [];
  firstResult: 0;
  maxResults: 15;
  sorting: [{ sortBy: "created"; sortOrder: "desc" }];
  active: true;
  readStatus: true;
};

type StatusResponse = {
  id: string;
};

//pending review در انتظار بررسی
export type GetDormPendingReviewStatusResponse = BPMS_API_RESPONSE<StatusResponse[]>;
export type GetDormPendingReviewStatusRequest = StatusRequest;

type PendingReviewBedAllocation = {
  variables: {
    resultReview: {
      value: "1";
    };
    descAdmin: {
      value: string;
    };
  };
};

type PendingReviewAnotherRoomAllocation = {
  variables: {
    resultReview: {
      value: "2";
    };
    descAdmin: {
      value: string;
    };
    bedId: {
      value: string;
    };
  };
};

type PendingReviewDormReservationBedAllocation = {
  variables: {
    resultReview: {
      value: "1";
    };
    descAdmin: {
      value: string;
    };
    bedId: {
      value: string;
    };
    paymentMethod: {
      value: string;
    };
  };
};

type PendingReviewRejectRequest = {
  variables: {
    resultReview: {
      value: "3";
    };
    descAdmin: {
      value: string;
    };
  };
};

// pending payment در انتظار پرداخت
export type GetDormPendingPaymentStatusResponse = BPMS_API_RESPONSE<StatusResponse[]>;
export type GetDormPendingPaymentStatusRequest = StatusRequest;

type PendingPaymentRejectRequest = {
  variables: {
    actionResult: {
      value: "3";
    };
    descAdmin: {
      value: string;
    };
  };
};

// cancellation درخواست کنسلی
export type GetDormCancellationStatusResponse = BPMS_API_RESPONSE<StatusResponse[]>;
export type GetDormCancellationStatusRequest = StatusRequest;

export type DormRequestsStatusResponse = BPMS_API_RESPONSE<null>;

type RejectAndAcceptRequest = {
  variables: {
    validation: {
      value: string;
    };
    adminDescCancellationRequest: {
      value: string;
    };
  };
};

export type DormRequestsStatusRequest = {
  body:
    | RejectAndAcceptRequest
    | PendingReviewBedAllocation
    | PendingReviewAnotherRoomAllocation
    | PendingReviewDormReservationBedAllocation
    | PendingReviewRejectRequest
    | PendingPaymentRejectRequest;

  statusCode: string;
};

export type GetDormRequestBedList = {
  customerFieldName: string;
  deliverPlanId: number;
  customerFirstname: string;
  id: number;
  bedTitle: string;
  customerLastname: string;
  bedTypeTitle: string;
  roomId: number;
  customerBranchName: string;
  customerLevelName: string;
  bedTypeId: number;
  bedNumber: number;
  bedStateId: number;
  customerEnterTermYear: string;
  customerEnterTerm: string;
  bedStateTitle: string;
};

export type GetDormRequestBedListResponse = BPMS_API_RESPONSE<GetDormRequestBedList[]>;

export type DormRequestPaymentInvoiceInfo = {
  AssociationRequest_AssociationCategoryDeliverPlan_maxNumberInstallmentForDebt: number;
  AssociationRequest_paymentMethod: 1 | 2;
  invoiceId: string;
  id: number;
  dormitoryRequestId: number;
  AssociationRequest_AssociationCategoryDeliverPlan_maxDebt: number;
  AssociationRequest_AssociationCategoryDeliverPlan_canDebt: number;
  createDate: string;
  amountPaidSoFar: number;
};

export type GetDormRequestPaymentInvoiceInfoResponse = BPMS_API_RESPONSE<
  DormRequestPaymentInvoiceInfo[]
>;

export type GetDormRequestPaymentInvoiceTable = {
  AssociationCategoryDeliverPlan_AssociationPriceList_toll: number;
  AssociationBed_AssociationCategorRoom_AssociationRoomTypee_title: string;
  AssociationCategoryDeliverPlan_percentDiscount: number;
  AssociationCategoryDeliverPlan_fixedDiscount: number;
  AssociationCategoryRequestType_title: string;
  amountPayable: number;
  AssociationCategoryDeliverPlan_AssociationPriceList_tax: number;
  id: number;
  AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title: string;
  parentId: number;
  paymentStatus: number;
  bankCardId: number;
  requestTypeId: number;
  AssociationCategoryDeliverPlan_schedulingId: number;
};

export type GetDormRequestPaymentInvoiceTableResponse = BPMS_API_RESPONSE<
  GetDormRequestPaymentInvoiceTable[]
>;

export type GetDormRequestPaymentInvoicePaymentStatus = {
  amount: number;
  statusNumber: number;
  trackNumber: number;
  dueDate: string;
  invoiceId: string;
  id: number;
  dormitoryRequestId: number;
  paymentDate: string;
  paymentPlanId: number;
  paymentType: string;
};

export type GetDormRequestPaymentInvoicePaymentStatusResponse = BPMS_API_RESPONSE<
  GetDormRequestPaymentInvoicePaymentStatus[]
>;

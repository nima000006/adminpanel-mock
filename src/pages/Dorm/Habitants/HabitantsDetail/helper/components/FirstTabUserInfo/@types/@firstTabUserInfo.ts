//! GENERAL
//! LAYOUT

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type HabitantUserInfoData = {
  AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title: string;
  residenceEndDate: string;
  AssociationCustomer_AssociationCustomerUser_fatherName: string;
  AssociationCustomer_AssociationStudent_AssociationGrade_title: string;
  AssociationCustomer_AssociationCustomerUser_lastName: string;
  AssociationCustomer_AssociationStudent_studentNumber: string;
  AssociationCustomer_AssociationUserGroup_title: string;
  AssociationCustomer_AssociationCustomerUser_nationalityId: string;
  AssociationBed_AssociationCategoryDormitory_title: string;
  AssociationCustomer_AssociationStudent_enCode: string;
  AssociationBed_AssociationCategoryFloor_title: string;
  AssociationCustomer_AssociationCustomerUser_firstName: string;
  AssociationCustomer_AssociationCustomerUser_AssociationGender_title: string;
  AssociationCustomer_AssociationCustomerUser_birthDate: string;
  AssociationBed_AssociationCategoryBuliding_title: string;
  AssociationCustomer_AssociationCustomerUser_mobile: string;
  AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title: string;
  AssociationBed_AssociationCategorRoom_title: string;
  id: number;
  AssociationCustomer_AssociationStudent_fieldTitle: string;
  AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title: string;
  residenceStartDate: string;
  AssociationCustomer_AssociationCustomerUser_nationalCode: string;
  AssociationBed_title: string;
  deliveryDate: string;
};

export type GetHabitantUserInfoResponse = BPMS_API_RESPONSE<HabitantUserInfoData[]>;
export type GetHabitantUserInfoRequest = {
  maxResults: number;
  firstResult: number;
  id_EQ: number;
};

export type AssociationInfoForEssentialConditionType = {
  wifeName: string;
  fatherName: string;
  motherPhone: string;
  wifePhone: string;
  homePhone: string;
  motherName: string;
  wifeFamily: string;
  relativesFamily: string;
  fatherPhone: string;
  relativesPhone: string;
  id: 7;
  motherFamily: string;
  relativesName: string;
  fatherFamily: string;
  maritalStatus: 1;
};

export type GetHabitantExtraUserInformationResponse = BPMS_API_RESPONSE<{
  AssociationInfoForEssentialCondition: AssociationInfoForEssentialConditionType[];
  id: number;
  AssociationfileRequest: {
    UploadFiles: {
      originalName: string;
      tenant_id: null;
      uid: string;
      extension: string;
      size: number;
      data: {
        originalName: string;
        tenant_id: null;
        uid: string;
        extension: string;
        size: number;
        createTime: string;
        name: string;
        id: number;
        relativeUrl: string;
        fileType: string;
      };
      createTime: string;
      name: string;
      id: number;
      relativeUrl: string;
      fileType: string;
    };
    id: number;
  }[];
}>;

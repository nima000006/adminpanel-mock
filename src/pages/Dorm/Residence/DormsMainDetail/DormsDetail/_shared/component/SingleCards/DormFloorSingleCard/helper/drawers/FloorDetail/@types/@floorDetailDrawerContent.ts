import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type FloorDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number;
};

//! APIs
export type FloorInfoIdTitleType = {
  title: string;
  id: number;
};

export type AssociationFacilityFloorType = {
  title: string;
  id: number;
  AssociationCategoryFacilityType: FloorInfoIdTitleType;
};

export type ResidenceFloorInfoType = {
  AssociationActiveStatus: FloorInfoIdTitleType;
  updateDate: string;
  AssociationQuality: FloorInfoIdTitleType;
  AssociationBuilding: {
    AssociationCategoryDormitory: FloorInfoIdTitleType;
    id: number;
    title: string;
    AssociationGender: FloorInfoIdTitleType;
  };
  createTime: string;
  updateByUserID: string;
  description: string;
  updateTime: string;
  id: number;
  title: string;
  AssociationFacilityFloor: AssociationFacilityFloorType[];
  createDate: string;
  AssociationEditUserStaffNew: {
    AssociationCustomerUser: {
      firstName: string;
      lastName: string;
      id: number;
    };
    id: number;
  };
};

export type GetResidenceFloorInfoResponse = BPMS_API_RESPONSE<ResidenceFloorInfoType>;

export type GetResidenceFloorInfoRequest = {
  body: {
    _data_: {
      id: string;
    };
  };
  params: {
    relation: string;
  };
};

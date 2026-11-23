import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type BuildingDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number;
};

//! APIs
type TitleId = {
  title: string;
  id: number;
};

export type AssociationCategoryFacilityTypes = {
  title: string;
  id: number;
  AssociationCategoryFacilityType: TitleId;
};

export type AssociationScopeOfUseOfFacilityType = {
  updateDate: string;
  unit: string;
  amount: number;
  AssociationCategoryFacility: AssociationCategoryFacilityTypes;
  createTime: string;
  updateByUserId: string;
  updateTime: string;
  id: number;
  createByUserId: string;
  createDate: string;
};

export type AssociationGeneralBuildingType = {
  typeId: number;
  id: number;
  title: string;
};

export type ResidenceBuildingInfoType = {
  zipCode: string;
  updateDate: string;
  address: string;
  AssociationGender: TitleId;
  AssociationfileBuilding: {
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
  latitude: number;
  sizeOfBuilding: number;
  description: string;
  updateTime: string;
  AssociationScopeOfUseOfFacility: AssociationScopeOfUseOfFacilityType[];
  title: string;
  AssociationGeneralBuilding: AssociationGeneralBuildingType[];
  AssociationActiveStatus: TitleId;
  AssociationQuality: TitleId;
  AssociationCategoryDormitory: TitleId;
  phoneNumber: string;
  createTime: string;
  updateByUserID: string;
  id: number;
  AssociationRegion: {
    title: string;
    AssociationRegionType: TitleId;
    id: number;
  };
  createDate: string;
  longitude: number;
  AssociationEditUserStaffNew: {
    AssociationCustomerUser: {
      firstName: string;
      lastName: string;
      id: number;
    };
    id: number;
  };
};

export type GetResidenceBuildingInfoResponse =
  BPMS_API_RESPONSE<ResidenceBuildingInfoType>;

export type GetResidenceBuildingInfoRequest = {
  body: {
    _data_: {
      id: string;
    };
  };
  params: {
    relation: string;
  };
};

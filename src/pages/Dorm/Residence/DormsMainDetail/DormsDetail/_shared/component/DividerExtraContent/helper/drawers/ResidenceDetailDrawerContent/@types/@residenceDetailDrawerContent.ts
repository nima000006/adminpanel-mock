import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type ResidenceDetailDrawerContentProps = {
  onCloseDrawer: () => void;
};

//! APIs
type TitleIdType = {
  title: string;
  id: number;
};
export type ResidenceDetailInfoType = {
  zipCode: string;
  updateDate: string;
  address: string;
  AssociationGender: TitleIdType;
  latitude: number;
  nominalCapacity: number;
  description: string;
  updateTime: string;
  AssociationRecordStatus: TitleIdType;
  title: string;
  AssociationAccommodationType: TitleIdType;
  AssociationPlacesAndDormitories: {
    description: string;
    AssociationCategoryPlaces: TitleIdType;
    id: number;
  }[];
  AssociationQuality: TitleIdType;
  phoneNumber: string;
  AssociationBranch: TitleIdType;
  createTime: string;
  updateByUserID: string;
  id: number;
  AssociationRegion: {
    title: string;
    AssociationRegionType: TitleIdType;
    id: number;
  };
  createDate: string;
  longitude: number;
  sizeOfDormitory: number;
  sizeOfGreenSpace: number;
  AssociationEditUserStaffNew: {
    AssociationCustomerUser: {
      firstName: string;
      lastName: string;
      id: number;
    };
    id: number;
  };
};
export type GetResidenceDetailInfoResponse = BPMS_API_RESPONSE<ResidenceDetailInfoType>;

export type GetResidenceDetailInfoRequest = {
  body: {
    _data_: {
      id: string;
    };
  };
  params: {
    relation: string;
  };
};

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type BedDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number;
};

//! APIs
type BedIdTitleType = {
  title: string;
  id: number;
};

export type GetResidenceBedInfoResponse = BPMS_API_RESPONSE<{
  isExtraBed: number;
  description: string;
  AssociationCategoryRecordStatus: BedIdTitleType;
  title: string;
  AssociationCategoryBuliding: BedIdTitleType;
  flatFloor: number;
  updeteTime: string;
  AssetTag: string;
  AssociationCategoryDormitory: BedIdTitleType;
  AssociationCategoryQuality: BedIdTitleType;
  createTime: string;
  updateByUserId: string;
  updeteDate: string;
  AssociationCategorRoom: BedIdTitleType;
  AssociationCategoryFloor: BedIdTitleType;
  AssociationCategoryBedType: BedIdTitleType;
  id: number;
  bedNumber: number;
  createDate: string;
  AssociationEditUserStaffNew: {
    AssociationCustomerUser: {
      firstName: string;
      lastName: string;
      id: number;
    };
    id: number;
  };
}>;

export type GetResidenceBedInfoRequest = {
  body: {
    _data_: {
      id: string;
    };
  };
  params: {
    relation: string;
  };
};

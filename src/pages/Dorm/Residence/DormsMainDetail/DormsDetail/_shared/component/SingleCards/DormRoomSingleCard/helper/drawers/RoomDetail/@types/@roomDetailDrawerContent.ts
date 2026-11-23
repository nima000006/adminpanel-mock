import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type RoomDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number;
};

//! APIs
export type DormResidenceRoomCapacity = {
  AssociationFloor_id: number;
  fullBedsInRoom: number;
  id: number;
  OpenBedsInRoom: number;
  ActiveBedsInRoom: number;
  bedCountInRoom: number;
};
export type GetDormResidenceRoomCapacityRequest = {
  maxResults: number;
  firstResult: number;
  id_EQ: number;
};
export type GetDormResidenceRoomCapacityResponse = BPMS_API_RESPONSE<
  DormResidenceRoomCapacity[]
>;

type RoomIdTitleType = {
  title: string;
  id: number;
};

export type ResidenceRoomInfoType = {
  area: number;
  updateDate: string;
  AssociationFileRoom: {
    tenant_id: null;
    updateDate: null;
    createTime: string;
    updateByUserId: null;
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
    updateTime: null;
    id: number;
    createByUserId: string;
    uploadFileId: number;
    roomId: number;
    createDate: string;
  }[];
  description: string;
  updateTime: string;
  AssociationRecordStatus: RoomIdTitleType;
  title: string;
  AssociationQuality: RoomIdTitleType;
  AssociationRoom: RoomIdTitleType;
  AssociationRoomType: RoomIdTitleType;
  createTime: string;
  updateByUserId: string;
  AssociationFloor: {
    title: string;
    AssociationBuilding: {
      AssociationCategoryDormitory: RoomIdTitleType;
      id: number;
      title: string;
      AssociationGender: RoomIdTitleType;
    };
    id: number;
  };
  id: number;
  numberStandardBedInRoom: number;
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

export type GetResidenceRoomInfoResponse = BPMS_API_RESPONSE<ResidenceRoomInfoType>;

export type GetResidenceRoomInfoRequest = {
  body: {
    _data_: {
      id: string;
    };
  };
  params: {
    relation: string;
  };
};

export type ResidenceUploadFileRequest = FormData;

export type ResidenceUploadFileResponse = {
  uuid: string;
};

export type onUploadFileSuccess = {
  response: ResidenceUploadFileResponse;
};

export type CreateRoomAmenityBody = {
  templateUuid: string;
  quantity: number;
  faDescription: string;
  enDescription?: string;
  arDescription?: string;
};

export type CreateRoomRequest = {
  uuid: string;
  body: {
    uploadFileUuids: string[];
    faTitle: string;
    enTitle?: string;
    arTitle?: string;
    roomType: string;
    qualityGradeUuid?: string;
    capacity: number;
    areaSquareMeters?: number;
    faDescription?: string;
    enDescription?: string;
    arDescription?: string;
    amenities: CreateRoomAmenityBody[];
  };
};

export type CreateRoomResponse = string;

export type EditUnitAmenityBody = {
  templateUuid?: string;
  quantity: number;
  faDescription: string;
  enDescription?: string;
  arDescription?: string;
  uuid?: string;
};

export type EditUnitRequest = {
  uuid: string;
  body: {
    uploadFileUuids: string[];
    faTitle: string;
    enTitle?: string;
    arTitle?: string;
    roomType: string;
    qualityGradeUuid?: string;
    capacity: number;
    areaSquareMeters?: number;
    faDescription?: string;
    enDescription?: string;
    arDescription?: string;
    amenities: EditUnitAmenityBody[];
  };
};

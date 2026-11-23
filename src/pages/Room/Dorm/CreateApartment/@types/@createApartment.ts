//! APIs
export type GetBuildingInformationResponse = {
  status: number;
  msg: string;
  data: {
    id: number;
    name: string;
    phone: string;
    postalcode: string;
    adress: string;
    des: string;
    policy: string;
    lat: string;
    long: string;
    modifiedDate: string;
    createdDate: string;
    isshow: boolean;
    isactive: boolean;
    d_Id: number;
    about: string;
    buildingTypeOfAccommentationId: number;
    levelId: number;
    rezerveTypeId: number;
    managerTypeId: number;
  };
};

//! APIs
export type CreateFloorResponse = {
  status: number;
  msg: string;
  data: number;
};

export type CreateFloorRequest = {
  IsShow: boolean;
  IsActive: boolean;
  Name: string;
  PhoneNumber: string;
  BuildingId: number;
};

export type EditFloorRequest = {
  FloorId: number;
  IsShow: boolean;
  IsActive: boolean;
  Name: string;
  PhoneNumber: string;
  BuildingId: number;
};

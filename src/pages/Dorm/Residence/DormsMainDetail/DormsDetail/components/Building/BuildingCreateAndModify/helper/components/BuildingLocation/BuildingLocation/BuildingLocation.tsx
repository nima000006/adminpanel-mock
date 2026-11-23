import { FormInstance } from "antd";

import { CreateBuildingFormTypes } from "../../../../@types/@buildingCreateAndModify";

export type BuildingLocationProps = {
  buildingForm: FormInstance<CreateBuildingFormTypes>;
  activeCity: boolean;
  setActiveCity: React.Dispatch<React.SetStateAction<boolean>>;
  mapData: {
    lat: number;
    setLat: React.Dispatch<React.SetStateAction<number>>;
    lng: number;
    setLng: React.Dispatch<React.SetStateAction<number>>;
  };
};

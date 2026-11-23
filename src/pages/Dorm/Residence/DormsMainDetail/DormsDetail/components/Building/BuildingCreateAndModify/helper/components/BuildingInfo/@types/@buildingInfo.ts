import { FormInstance } from "antd";

import { CreateBuildingFormTypes } from "../../../../@types/@buildingCreateAndModify";

export type BuildingInfoProps = {
  residenceTitle: string;
  buildingForm: FormInstance<CreateBuildingFormTypes>;
};

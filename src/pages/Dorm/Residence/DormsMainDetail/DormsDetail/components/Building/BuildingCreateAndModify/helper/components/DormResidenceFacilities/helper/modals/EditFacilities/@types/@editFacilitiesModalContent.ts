import { DormFacilitiesType } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";

import {
  modifyDormFacilityForm,
  DormResidenceFacilityTypes,
} from "../../../../@types/@dormResidenceFacilities";

export type EditFacilitiesModalContentProps = {
  form: modifyDormFacilityForm;
  facilityTypeData: DormResidenceFacilityTypes[];
  facilityData: DormFacilitiesType | null;
};

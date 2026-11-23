import {
  DormResidenceFacilityTypes,
  modifyDormFacilityForm,
} from "../../../../@types/@dormResidenceFacilities";

export type AddFacilitiesModalContentProps = {
  form: modifyDormFacilityForm;
  facilityTypeData: DormResidenceFacilityTypes[];
};

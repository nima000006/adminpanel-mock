import { GetDormResidenceFloorListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataFloor/@types/@residenceCardsDataFloor";

import { MainFormDataType } from "../../../../@types/@manualRegistrationResidenceInfoStep";

//! LAYOUTs
export type ResidenceInfoStepFloorInfoProps = {
  floorData: GetDormResidenceFloorListTypes;
  tariffId: number | null;
  mainFormData: MainFormDataType;
};

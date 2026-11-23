import { GetResidenceDataResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ModifyBuildingDrawerContent/@types/@modifyBuildingDrawerContentTypes";

export type CreateResidenceDrawerContentProps = {
  closeDrawerHandler: () => void;
  variant: string;
  dataSource?: GetResidenceDataResponse;
  getResidenceDataHandler?: () => void;
};

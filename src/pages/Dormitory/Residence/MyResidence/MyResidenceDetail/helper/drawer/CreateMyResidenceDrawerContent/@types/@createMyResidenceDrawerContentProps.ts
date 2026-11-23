import { GetMyResidenceDataResponse } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/@types/@myResidenceDetail";

export type CreateMyResidenceDrawerContentProps = {
  closeDrawerHandler: () => void;
  variant: string;
  dataSource?: GetMyResidenceDataResponse;
  getResidenceDataHandler?: () => void;
};

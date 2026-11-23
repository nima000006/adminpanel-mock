import { GetDemandListByStatusAndSemesterResponse } from "../../../../@types/@demandsList";

export type DemandNeedEditListProps = {
  data: GetDemandListByStatusAndSemesterResponse | null;
  loading: boolean;
};

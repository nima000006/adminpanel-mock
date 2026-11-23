import { GetDemandListByStatusAndSemesterResponse } from "../../../../@types/@demandsList";

export type DemandPendingListProps = {
  data: GetDemandListByStatusAndSemesterResponse | null;
  loading: boolean;
};

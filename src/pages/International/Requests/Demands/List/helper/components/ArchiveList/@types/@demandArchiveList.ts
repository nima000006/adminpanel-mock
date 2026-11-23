import { GetDemandListByStatusAndSemesterResponse } from "../../../../@types/@demandsList";

export type DemandArchiveListProps = {
  data: GetDemandListByStatusAndSemesterResponse | null;
  loading: boolean;
  status: string;
};

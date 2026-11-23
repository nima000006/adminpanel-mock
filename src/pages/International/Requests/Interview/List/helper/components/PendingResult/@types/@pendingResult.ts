import { GetInterviewListByStatusResponse } from "../../../../@types/@interviewList";

export type PendingResultProps = {
  data: GetInterviewListByStatusResponse | null;
  loading: boolean;
};

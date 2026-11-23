import { GetInterviewListByStatusResponse } from "../../../../@types/@interviewList";

export type PendingHoldProps = {
  data: GetInterviewListByStatusResponse | null;
  loading: boolean;
};

import { GetInterviewListByStatusResponse } from "../../../../@types/@interviewList";

export type InterviewArchiveListProps = {
  data: GetInterviewListByStatusResponse | null;
  loading: boolean;
  status: string;
};

import { FormInstance } from "antd";

export type InterviewDetailEditModalContentProps = {
  form: FormInstance<any>;
  id: number;
};

// API
export type InterviewerListType = {
  title: string;
  id: number;
};

export type GetInterviewerListResponse = InterviewerListType[];

export type GetInterviewDurationListResponse = InterviewerListType[];

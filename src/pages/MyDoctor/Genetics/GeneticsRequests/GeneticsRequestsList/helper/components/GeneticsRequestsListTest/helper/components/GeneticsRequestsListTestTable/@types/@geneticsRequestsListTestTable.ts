import { FormInstance } from "antd";

type SelectType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
    name?: string;
  };
  code: number;
};

export type GeneticsRequestsListTestTableProps = {
  surveyId: number;
  testId?: number;
  statusId?: number;
};

export type GeneticsRequestsListTestTableAdvanceFilterFormType = {
  branch: SelectType[];
  province: SelectType[];
  city: SelectType[];
  createDate: string[];
  participantDate: string[];
  lab: SelectType[];
};

export type GeneticsRequestsListTestTableAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<GeneticsRequestsListTestTableAdvanceFilterFormType>;
  testId?: number;
};

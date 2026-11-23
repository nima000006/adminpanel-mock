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

export type GeneticsRequestsListFreeConsultationTableProps = {
  surveyId: number;
  testId?: number;
  statusId?: number;
};

export type GeneticsRequestsListFreeConsultationTableAdvanceFilterFormType = {
  //todo[nima] implement filters when api will be implemented
  province: SelectType[];
  city: SelectType[];
  branch: SelectType[];
  //todo[nima] implement waitingDay options when api will be implemented
  waitingDay: SelectType;
  createDate: string[];
  participantDate: string[];
};

export type GeneticsRequestsListFreeConsultationTableAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<GeneticsRequestsListFreeConsultationTableAdvanceFilterFormType>;
};

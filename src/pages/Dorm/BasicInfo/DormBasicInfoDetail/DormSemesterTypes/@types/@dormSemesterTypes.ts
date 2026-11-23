import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

export type DormSemesterData = {
  id: number;
  title: string;
  fromDate: string;
  toDate: string;
  daysBetween: number;
  recordStatus: number;
  IsActive: null;
};

export type DormSemesterResponse = BPMS_API_RESPONSE<DormSemesterData[]>;
export type DormSemesterRequest = {
  maxResults: number;
  firstResult: number;
  title_LIKE?: string;
  sortings?: string | undefined;
  recordStatus_EQ?: string;
};

export type DormSemesterCountResponse = {
  count: number;
};
export type DormSemesterCountRequest = {
  title_LIKE?: string;
  sortings?: string | undefined;
  recordStatus_EQ?: string;
};

export type CreateDormSemesterTypesResponse = BPMS_API_RESPONSE<
  {
    id: string;
    definitionId: string;
    businessKey: string | null;
    caseInstanceId: string | null;
    ended: boolean;
    suspended: boolean;
    tenantId: string | null;
    links: any[];
  }[]
>;

export type CreateDormSemesterTypesRequest = {
  form: "semesterRegistration";
  data: {
    id?: string;
    title?: string;
    fromDate: string;
    toDate: string;
    recordStatus: "1" | "3";
  };
};

export type UpdateDormSemesterTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormSemesterTypesRequest = {
  form: "semester";
  id: "c3d0ba0e7539440db3b09e0a845cb7d4";
  data: {
    title?: string;
    recordStatus?: "1" | "3";
    id: number;
  };
};

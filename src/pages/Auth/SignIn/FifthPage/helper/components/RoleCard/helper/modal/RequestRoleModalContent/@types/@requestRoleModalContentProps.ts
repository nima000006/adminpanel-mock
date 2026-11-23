import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type RequestRoleModalContentProps = {
  title: string;
  personalNumber: string;
  branchName: string;
  form: FormInstance<{ description: string; staff: SelectType<IdTitle> }>;
  id: number;
  segmentStatus?: number;
};

export type GetRolesStaffListResponse = {
  id: number;
  employeeId: number;
  employeeCode: string;
  businessId: number;
  branch: {
    id: number;
    title: string;
  };
}[];

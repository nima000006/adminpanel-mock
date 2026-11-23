import { JSX } from "react";

export type RoleCardProps = {
  key?: number;
  id: number;
  title: string;
  personalNumber: string;
  isActive: boolean;
  popoverContent: JSX.Element;
  value: string | number;
  branchName: string;
  segmentStatus: number;
  recordStatusId?: number;
  requestId?: number;
  getAdminStaff?: (arg: { status: number }) => void;
};
export type CreateRoleRequest = {
  staffId: number;
  message: string;
};

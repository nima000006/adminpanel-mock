import { roleRecordStatus } from "../roleRecordStatus";

export type ManagementRole = {
  id: number;
  name: string;
  description: string | null;
  title: string | null;
  serviceName: string;
  recordStatus: keyof typeof roleRecordStatus;
  status: boolean;
};

export interface Staff {
  staffType: "STUDENT" | "EMPLOYEE" | "ADMIN";
  position: string;
  branchTitle: string;
  isManual: boolean;
  recordStatus: 1 | 2; // 1: Active, 2: Inactive
  lastModified: string;
  staffId: number;
}
export type ManagementMyListsOfStaffResponse = Staff[];

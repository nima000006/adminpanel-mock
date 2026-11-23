//! LAYOUTs
export type AllRoleRequestConfirmedDrawerContentProps = {
  closeDrawerHandler: () => void;
  adminStaffId: number | undefined;
};

//! APIs
export type ManagementRoleAccessRequestBody = {
  roles?: string[];
  statusId: number;
  requestId: number;
  rejectReason?: string;
  description?: string;
};

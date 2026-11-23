//! LAYOUTs
export type MyRoleRequestConfirmedDrawerContentProps = {
  closeDrawerHandler: () => void;
  adminStaffId: number | undefined;
};

//! APIs
export type ManagementMyRoleAccessRequestBody = {
  roles?: string[];
  statusId: number;
  requestId: number;
  rejectReason?: string;
  description?: string;
};

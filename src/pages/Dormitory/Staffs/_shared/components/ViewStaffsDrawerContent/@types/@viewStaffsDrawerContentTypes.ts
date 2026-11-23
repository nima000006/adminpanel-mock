export type ViewStaffsDrawerContentProps = {
  closeViewStaffsDrawerHandler: () => void;
  isAllStaffs?: boolean;
};

export type ViewStaffsDrawerStaffInfoType = {
  fullName: string;
  username: string;
  position: string;
  business: string;
  branch: string;
  personnelCode: string;
  mobile: string;
};

export type ViewStaffsResidenceAccessTableRowType = {
  id: number;
  residenceName: string;
  creatorName: string;
  createdAt: string;
};

//! LAYOUTs
export type MyRoleRequestRejectDrawerContentProps = {
  closeDrawerHandler: () => void;
};

export type MyRoleRequestRejectDrawerFormDataType = {
  rejectReason: {
    label: string;
    title: string;
    value: string;
    key: number;
    item: {
      id: number;
      title: string;
      name: string;
    };
    code: number;
  };
  description?: string;
};

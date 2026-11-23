export type AllRoleRequestRejectDrawerContentProps = {
  closeDrawerHandler: () => void;
};

export type AllRoleRequestRejectDrawerFormDataType = {
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

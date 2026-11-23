export type FormTypeWalletRequestRejectedDrawer = {
  reason: {
    label: string;
    value: string;
    key: number;
    code: number;
    children: string;
    item: {
      id: number;
      title: string;
    };
  };
  description: string;
};

export type DetailItemType = {
  label: string;
  data: string | undefined;
  isDate?: boolean;
  isPrice?: boolean;
  isTime?: boolean;
};

export type AllVendorContractsContentProps = {
  id: number;
  closeDrawerHandler: () => void;
};

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyContractsListContractsCreateDrawerAddSideDishFormType = {
  sideDish: SelectType<IdTitle>;
  adminDisplayTitle: string;
  userDisplayTitle: string;
  price: number;
  description?: string;
};

export type MyContractsListContractsCreateDrawerAddSideDishProps = {
  open: boolean;
  contractId: number | null;
  onClose: () => void;
  onSuccess: () => void;
};

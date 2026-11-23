import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AllContractsListContractsCreateDrawerAddSideDishFormType = {
  sideDish: SelectType<IdTitle>;
  adminDisplayTitle: string;
  userDisplayTitle: string;
  price: number;
  description?: string;
};

export type AllContractsListContractsCreateDrawerAddSideDishProps = {
  open: boolean;
  contractId: number | null;
  onClose: () => void;
  onSuccess: () => void;
};

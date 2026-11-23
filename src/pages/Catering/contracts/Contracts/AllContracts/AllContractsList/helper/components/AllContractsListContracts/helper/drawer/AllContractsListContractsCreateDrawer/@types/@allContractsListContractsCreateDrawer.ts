export type AllContractsListContractsCreateDrawerProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  /** When set, drawer opens on foods step (step 2) with this contract id. */
  resumeContractId?: number | null;
};

export type AllContractsDetailHistoryDrawerProps = {
  open: boolean;
  onClose: () => void;
  contractId?: number;
  revisionNumber?: number | null;
};

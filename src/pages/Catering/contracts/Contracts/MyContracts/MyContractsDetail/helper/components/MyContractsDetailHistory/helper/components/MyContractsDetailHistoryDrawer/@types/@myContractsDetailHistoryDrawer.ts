export type MyContractsDetailHistoryDrawerProps = {
  open: boolean;
  onClose: () => void;
  contractId?: number;
  revisionNumber?: number | null;
};

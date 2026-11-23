export type ReservationCompleteRequestDepositProps = {
  status?: string;
  paymentDate?: string | null;
  repaymentDate?: string | null;
  onViewReceipt?: () => void;
  className?: string;
};

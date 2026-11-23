export type ReservationFactorCardStatus = "paid" | "pendingPayment" | "overdue";

export type ReservationFactorCardProps = {
  status: ReservationFactorCardStatus;
  lateFeeAmount?: number | string;
  onViewFactor?: () => void;
  Installment?: boolean;
};

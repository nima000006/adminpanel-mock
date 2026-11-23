export type ReservationRequestInfoCardProps = {
  showLastActionInfo?: boolean;
  Icon?: React.FC<{
    fillColor?: string;
    size?: string;
  }>;
  title: string;
  paymentTypeText: string;
  paymentTypeColor: string;
  reservationAcceptanceProgramText: string;
  reservationAcceptanceProgramColor: string;
  showAdmissionDate?: boolean;
};

export type ReservationInResidenceProgressStatus = "inResidence" | "overdue" | "dueToday";

export type ReservationInResidenceRequestProgressBarProps = {
  status?: ReservationInResidenceProgressStatus;
  percent?: number;
  remainingText?: string;
  residenceCompletionDate?: string | null;
  className?: string;
};

export type AdmissionStepsFinancialCalculateWithDateModalProps = {
  open: boolean;
  isMonthly: boolean;
  installmentTitle: string;
  stayDateRange: string;
  onCancel: () => void;
  onConfirm: (dueDays: number) => void;
};

export type AdmissionStepsFinancialCalculateWithDateFormType = {
  installmentTitle: string;
  dueDate?: string;
  dueDays?: number;
};

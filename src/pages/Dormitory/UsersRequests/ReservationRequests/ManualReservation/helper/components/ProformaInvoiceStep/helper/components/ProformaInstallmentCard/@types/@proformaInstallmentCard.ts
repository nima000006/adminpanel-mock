export type ProformaInstallmentItem = {
  id: string;
  label: string;
  dueDate: string;
  amount: number;
};
export type ProformaInstallmentCardProps = {
  item: ProformaInstallmentItem;
};

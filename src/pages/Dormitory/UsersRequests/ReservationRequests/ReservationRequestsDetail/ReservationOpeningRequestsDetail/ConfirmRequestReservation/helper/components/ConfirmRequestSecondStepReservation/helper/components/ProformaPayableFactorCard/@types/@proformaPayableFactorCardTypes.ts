export type ProformaPayableFactorCardVariant = "deposit" | "installment" | "lumpSum";

export type ProformaPayableFactorCardProps = {
  variant: ProformaPayableFactorCardVariant;
  title: string;
  dueDate: string;
  amount: number;
  onEditDueDate?: () => void;
};

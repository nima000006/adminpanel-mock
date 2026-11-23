export type PerformanceCardProps = {
  title: string;
  icon: React.ReactNode;
  unit: string;
  createBodyParams: () => Record<number, string | number> | null | undefined;
  triggerItems: Record<string, string | string[]>;
  reportId: number;
  isPrice: boolean;
  isFormValid: boolean;
  validateData: (data: unknown, reportTypeTitle: string) => boolean | null;
};

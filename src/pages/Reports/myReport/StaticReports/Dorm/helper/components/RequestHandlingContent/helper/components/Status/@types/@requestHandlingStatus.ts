export type RequestHandlingStatusProps = {
  createBodyParams: () => Record<number, string | number> | null | undefined;
  triggerItems: Record<string, string | string[]>;
  isFormValid: boolean;
  validateData: (data: unknown, reportTypeTitle: string) => boolean | null;
};

export type RequestStatusChartDataItem = {
  p1_title: string;
  p1_amount: number;
};

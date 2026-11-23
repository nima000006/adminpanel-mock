export type FutureOrderContentProps = {
  createBodyParams: () => Record<number, string | number> | null | undefined;
  isFormValid: boolean;
  triggerItems: Record<string, string>;
  validateData: (data: unknown, reportTypeTitle: string) => boolean | null;
};

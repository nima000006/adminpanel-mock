export type TypePresentationFoodSegmentContentProps = {
  createBodyParams: () => Record<number, string | number> | null | undefined;
  isFormValid: boolean;
  triggerItems: Record<string, string>;
  view: string;
  validateData: (data: unknown, reportTypeTitle: string) => boolean | null;
};

export type AnalysisResidenceGenderProps = {
  createBodyParams: () => Record<number, string | number> | null | undefined;
  triggerItems: Record<string, string | string[]>;
  isFormValid: boolean;
};

export type GenderDataItem = {
  total: number;
  gender: string;
  percentage: number;
};

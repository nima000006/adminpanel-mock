export type PriceReserveRoomSegmentContentProps = {
  createBodyParams: () => Record<number, string | number> | null | undefined;
  triggerItems: Record<string, string | string[]>;
  view: string;
  isFormValid: boolean;
  validateData: (data: unknown, reportTypeTitle: string) => boolean | null;
};
export type TableDataRecord = Record<string, string | number | null | undefined>;

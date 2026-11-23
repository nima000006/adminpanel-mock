export type CustomTotalTableItemsProps = {
  totalCount: number;
  label?: string;
  className?: string;
  separator?: string;
  countUpClassName?: string;
  formattingFn?: (n: number) => string;
};

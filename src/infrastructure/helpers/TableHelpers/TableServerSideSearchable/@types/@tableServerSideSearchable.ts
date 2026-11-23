export type TextTypeProps = {
  type: "text";
  isSingle?: undefined;
};

export type SortTypeProps = {
  type: "sort";
  isSingle?: boolean;
};

export type Props = TextTypeProps | SortTypeProps;

export type CommonProps = {
  dataIndex: string;
  label: string;
  pageName?: string;
  pageSizeName?: string;
  isReverseOrder?: boolean;
};

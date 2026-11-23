export type mapItemType = {
  children: string;
  code: number;
  disabled: undefined;
  item: { title: string; id: number };
  key: number;
  label: string;
  value: string;
};

export type ApplicationLevelType = {
  value: number;
  label: string;
  isLeaf: boolean;
  level: string;
  loading?: boolean;
  children?: ApplicationLevelType[];
};

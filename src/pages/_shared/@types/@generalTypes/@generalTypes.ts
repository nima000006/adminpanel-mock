export type GetAllBranchesResponse = {
  id: number;
  title: string;
}[];

export type SelectType<T> = {
  label: string;
  value: string;
  title?: string;
  key: number;
  code: number;
  children?: string;
  item: T;
};

export type IdTitle = {
  id: number;
  title: string;
};

export type IdTitleName = {
  id: number;
  title: string;
  name: string;
};

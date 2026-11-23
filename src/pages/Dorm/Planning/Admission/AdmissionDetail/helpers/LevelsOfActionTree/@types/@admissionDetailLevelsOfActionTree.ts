export type ApplicationTreeDataType = {
  title: string;
  key: string;
  disabled: boolean;
  children?: ApplicationTreeDataType[];
  isLeaf?: boolean;
};

export type MenuItemData = {
  label: string;
  children: MenuItemData[];
  icon: string;
  id: number;
  type: "submenu" | undefined;
  key: string;
};
export type MenuItemDataTransformed = {
  label: string;
  children: MenuItemDataTransformed[] | undefined;
  icon: React.ReactNode;
  id: number;
  type: "submenu" | undefined;
  key: any;
};
export type MenuItemResponse = {
  status: number;
  msg: string;
  data: MenuItemData[];
};

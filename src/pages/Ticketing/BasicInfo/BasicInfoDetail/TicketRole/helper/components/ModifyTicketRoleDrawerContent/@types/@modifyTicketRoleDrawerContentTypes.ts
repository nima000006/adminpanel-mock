import { RenderResult, TransferItem } from "antd/es/transfer";

import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type modifyTicketRoleDrawerContentProps = {
  closeDrawer: () => void;
  refetchList: () => void;
  role: string;
};
export type itemRenderer = (item: TransferItem) => RenderResult;

export type getRoleListResponse = {
  name: string;
  description: string;
  title: string;
  serviceName: string;
  status: boolean;
  id: number;
}[];

export type getRoleListRequest = {
  samimService: string;
};

export type viewRoleItem = {
  id: number;
  title: string;
  samimService: IdTitleName;
};

export type viewRoleListItem = {
  id: number;
  title: string;
  samimService: IdTitleName;
};
export type viewRoleListResponse = viewRoleListItem[];

export type basicInfoModifyRoleRequest = {
  role: string;
  topicIds: string;
};

export type basicInfoAddRoleRequest = {
  role: string;
  topicIds: string;
};

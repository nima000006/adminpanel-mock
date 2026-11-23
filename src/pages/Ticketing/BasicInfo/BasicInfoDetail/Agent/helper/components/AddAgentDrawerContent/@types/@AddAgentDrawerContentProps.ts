import { RenderResult, TransferItem } from "antd/es/transfer";

import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AddAgentDrawerContentProps = {
  closeDrawer: () => void;
};
export type itemRenderer = (item: TransferItem) => RenderResult;

export type dataSourceTransferType = IdTitle;

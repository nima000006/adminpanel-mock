import { RenderResult, TransferItem } from "antd/es/transfer";

import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { AgentListType } from "@pages/Ticketing/BasicInfo/BasicInfoDetail/Agent/@types/@AgentListType";

export type EditAgentDrawerContentProps = {
  closeDrawer: () => void;
  record: AgentListType;
};

export type itemRenderer = (item: TransferItem) => RenderResult;

export type dataSourceTransferType = IdTitle;

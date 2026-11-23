import { TablePaginationConfig } from "antd";

import NextIcon from "../../../../assets/icons/NestIcon";
import PrevIcon from "../../../../assets/icons/PrevIcon";

const manualPaginationConfig = ({
  onChange,
  total,
  defaultPageSize = 8,
  showSizeChanger = true,
  showQuickJumper = false,
  pageSizeOptions = ["8", "25", "50", "100"],
  placement = ["bottomStart"],
  size = "small",
  pageNumber,
}: TablePaginationConfig & {
  pageNumber?: number;
}) => {
  //direction
  return {
    showSizeChanger,
    showQuickJumper,
    defaultPageSize,
    pageSizeOptions,
    placement,
    size,
    current: pageNumber ?? undefined,
    nextIcon: (info: any) => (
      <PrevIcon
        fillColor={info.disabled ? "var(--app-text-placeholder)" : "var(--app-text)"}
      />
    ),
    prevIcon: (info: any) => (
      <NextIcon
        fillColor={info.disabled ? "var(--app-text-placeholder)" : "var(--app-text)"}
      />
    ),
    total,
    onChange,
  };
};

export default manualPaginationConfig;

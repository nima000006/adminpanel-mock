import { TablePaginationConfig } from "antd";

import NextIcon from "../../../../assets/icons/NestIcon";
import PrevIcon from "../../../../assets/icons/PrevIcon";

const paginationConfig: TablePaginationConfig = {
  showSizeChanger: true,
  showQuickJumper: true,
  defaultPageSize: 8,
  pageSizeOptions: ["8", "10", "25", "50", "100"],
  position: ["bottomLeft"],
  size: "small",
  nextIcon: (info: any) => <PrevIcon fillColor={info.disabled ? "#D9D9D9" : "#222"} />,
  prevIcon: (info: any) => <NextIcon fillColor={info.disabled ? "#D9D9D9" : "#222"} />,
};

export default paginationConfig;

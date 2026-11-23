import { Pagination } from "antd";

import type { PaginationProps } from "antd";
const CustomPagination: React.FC<PaginationProps> = ({
  locale = { jump_to: "برو به", page: "صفحه" },
  ...props
}) => {
  return <Pagination locale={locale} {...props} />;
};

export default CustomPagination;

import { forwardRef } from "react";

import { GetProps, GetRef, Tree } from "antd";

type CustomTreeProps = {
  className?: string;
} & GetProps<typeof Tree>;

const CustomTree = forwardRef<GetRef<typeof Tree>, CustomTreeProps>(
  ({ className, ...props }, ref) => {
    return <Tree ref={ref} className={`custom-tree-container ${className}`} {...props} />;
  }
);
CustomTree.displayName = "CustomTree";

export default CustomTree;

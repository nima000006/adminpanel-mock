import { forwardRef } from "react";

import { Badge, GetProps, GetRef } from "antd";
import "./_customBadge.scss";
type CustomBadgeProps = { children: React.ReactNode; className?: string } & GetProps<
  typeof Badge
>;
const CustomBadge = forwardRef<GetRef<typeof Badge>, CustomBadgeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Badge ref={ref} className={`custom-badge-container ${className}`} {...props}>
        {children}
      </Badge>
    );
  }
);
CustomBadge.displayName = "CustomBadge";
export default CustomBadge;

import { forwardRef } from "react";

import { Badge, GetProps, GetRef } from "antd";
import "./_customSingleBadge.scss";
type CustomSingleBadgeProps = {
  text: React.ReactNode;
  className?: string;
} & GetProps<typeof Badge>;

const CustomSingleBadge = forwardRef<GetRef<typeof Badge>, CustomSingleBadgeProps>(
  ({ className, text, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        className={`custom-single-badge-container ${className}`}
        text={text}
        {...props}
      />
    );
  }
);
CustomSingleBadge.displayName = "CustomSingleBadge";
export default CustomSingleBadge;

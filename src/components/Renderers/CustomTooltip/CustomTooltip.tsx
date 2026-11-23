import { forwardRef } from "react";

import { GetProps, GetRef, Tooltip } from "antd";
import "./_customTooltip.scss";

type CustomTooltipProps = {
  children: React.ReactNode;
  className?: string;
} & GetProps<typeof Tooltip>;
const CustomTooltip = forwardRef<GetRef<typeof Tooltip>, CustomTooltipProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Tooltip className={` ${className ? className : ""}`} ref={ref} {...props}>
        {children}
      </Tooltip>
    );
  }
);

CustomTooltip.displayName = "CustomTooltip";
export default CustomTooltip;

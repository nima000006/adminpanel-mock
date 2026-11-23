import { forwardRef } from "react";

import { Rate, GetProps, GetRef } from "antd";
import "./_customRate.scss";

type CustomAlertProps = {
  className?: string;
} & GetProps<typeof Rate>;

const CustomRate = forwardRef<GetRef<typeof Rate>, CustomAlertProps>(
  ({ className, ...props }, ref) => {
    return <Rate ref={ref} className={`custom-rate-container ${className}`} {...props} />;
  }
);
CustomRate.displayName = "CustomRate";
export default CustomRate;

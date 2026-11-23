import { forwardRef } from "react";

import { Alert, GetProps, GetRef } from "antd";
import "./_customAlert.scss";

type CustomAlertProps = {
  className?: string;
} & GetProps<typeof Alert>;

const CustomAlert = forwardRef<GetRef<typeof Alert>, CustomAlertProps>(
  ({ className, ...props }, ref) => {
    return (
      <Alert ref={ref} className={`custom-alert-container ${className}`} {...props} />
    );
  }
);
CustomAlert.displayName = "CustomAlert";
export default CustomAlert;

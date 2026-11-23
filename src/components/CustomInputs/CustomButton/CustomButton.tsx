import { forwardRef, ReactNode } from "react";

import { Button, GetProps, GetRef } from "antd";
import "./_customButton.scss";

type CustomButtonProps = {
  children: ReactNode;
  className?: string;
  isWarning?: boolean;
} & GetProps<typeof Button>;

const CustomButton = forwardRef<GetRef<typeof Button>, CustomButtonProps>(
  ({ children, className, isWarning = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`custom-button-main-container ${className ? className : ""} ${isWarning ? "custom-button-warning-color" : ""}`}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;

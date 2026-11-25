import { forwardRef, ReactNode } from "react";

import { Button, GetProps, GetRef } from "antd";
import { toast } from "react-toastify";

import { isMockMode } from "@infra/mock/mockMode";

import "./_customButton.scss";

type CustomButtonProps = {
  children: ReactNode;
  className?: string;
  isWarning?: boolean;
} & GetProps<typeof Button>;

const CustomButton = forwardRef<GetRef<typeof Button>, CustomButtonProps>(
  ({ children, className, isWarning = false, ...props }, ref) => {
    const hasMockFallback =
      isMockMode() && !props.onClick && props.htmlType !== "submit" && !props.href;

    const runMockAction = () => {
      toast.success("عملیات آزمایشی با موفقیت انجام شد.", {
        toastId: "mock-button-action-success",
      });
    };

    return (
      <Button
        ref={ref}
        className={`custom-button-main-container ${className ? className : ""} ${isWarning ? "custom-button-warning-color" : ""}`}
        {...props}
        disabled={hasMockFallback ? false : props.disabled}
        onClick={hasMockFallback ? runMockAction : props.onClick}
      >
        {children}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;

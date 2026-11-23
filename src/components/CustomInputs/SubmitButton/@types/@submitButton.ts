import { CSSProperties, MouseEventHandler, ReactNode } from "react";

import { FormInstance } from "antd";

export type SubmitButtonProps = {
  form: FormInstance;
  label: string;
  type: "primary" | "default" | "dashed" | "text" | "link" | undefined;
  block?: boolean;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean | { delay: number };
  ghost?: boolean;
  className?: string;
  href?: string;
  icon?: ReactNode;
  shape?: "default" | "circle" | "round";
  size?: "large" | "middle" | "small";
  styles?:
    | {
        icon: CSSProperties;
      }
    | undefined;
  target?: string;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
};

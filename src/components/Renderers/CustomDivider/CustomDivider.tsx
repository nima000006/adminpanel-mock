import { CSSProperties, ReactNode } from "react";

import { Divider, GetProps } from "antd";
import "./_customDivider.scss";

type CustomDividerProps = {
  text?: ReactNode;
  extraContent?: ReactNode;
  titlePlacement?: "left" | "right" | "center";
  className?: string;
  rootClassName?: string;
  extraContentClassName?: string;
  orientationMargin?: any;
  type?: "horizontal" | "vertical";
  style?: CSSProperties;
  plain?: boolean;
  dashed?: boolean;
  titleClassName?: string;
} & GetProps<typeof Divider>;

const CustomDivider = ({
  text,
  titlePlacement = "right",
  className,
  rootClassName,
  orientationMargin,
  type = "horizontal",
  style,
  plain = true,
  dashed = false,
  extraContent,
  extraContentClassName,
  titleClassName,
  ...props
}: CustomDividerProps) => {
  return (
    <div className="divider-container">
      <Divider
        titlePlacement={titlePlacement}
        className={`divider-main ${className}`}
        rootClassName={rootClassName}
        style={{ ...style }}
        // orientationMargin={orientationMargin}
        orientation={type}
        plain={plain}
        dashed={dashed}
        {...props}
      >
        <span className={titleClassName ? titleClassName : ""}>{text}</span>
      </Divider>
      <div className={`extra-content-container ${extraContentClassName}`}>
        {extraContent}
      </div>
    </div>
  );
};

export default CustomDivider;

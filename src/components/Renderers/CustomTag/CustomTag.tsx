import { forwardRef, ReactNode } from "react";

import { GetProps, GetRef, Tag } from "antd";
import "./_customTag.scss";

type CustomTagProps = {
  children: ReactNode;
  staticWidth?: number | string;
} & GetProps<typeof Tag>;

const CustomTag = forwardRef<GetRef<typeof Tag>, CustomTagProps>(
  ({ children, staticWidth, className, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={`custom-tag-main-container ${className ? className : ""}`}
        {...props}
        style={{ width: staticWidth }}
        variant="outlined"
      >
        {children}
      </Tag>
    );
  }
);

CustomTag.displayName = "CustomTag";

export default CustomTag;

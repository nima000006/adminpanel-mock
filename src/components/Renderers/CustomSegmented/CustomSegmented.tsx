import { forwardRef } from "react";

import { GetRef, Segmented } from "antd";
import { GetProps } from "react-redux";
import "./_customSegmented.scss";

type CustomSegmentedProps = GetProps<typeof Segmented> & {
  className?: string;
};

const CustomSegmented = forwardRef<GetRef<typeof Segmented>, CustomSegmentedProps>(
  ({ className, ...props }, ref) => {
    return (
      <Segmented
        className={`custom-segmented-main-container ${className ? className : ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);

CustomSegmented.displayName = "CustomSegmented";

export default CustomSegmented;

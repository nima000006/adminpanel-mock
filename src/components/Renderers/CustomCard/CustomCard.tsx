import { forwardRef } from "react";

import { Card, GetProps, GetRef } from "antd";
import "./_customCard.scss";

type CustomCard = {
  className?: string;
} & GetProps<typeof Card>;

const CustomCard = forwardRef<GetRef<typeof Card>, CustomCard>(
  ({ className, ...props }, ref) => {
    return (
      <Card
        className={`custom-card-container ${className ? className : ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);

CustomCard.displayName = "CustomCard";
export default CustomCard;

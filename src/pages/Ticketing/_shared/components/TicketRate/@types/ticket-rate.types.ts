import { RateProps } from "antd";

export type TicketRateProps = {
  value?: number | null | string;
  isForTable?: boolean;
  disabled?: boolean;
  allowHalf?: boolean;
  rateProps?: Omit<RateProps, "value" | "count">;
  count?: number;
};

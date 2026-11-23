import { CSSProperties, ReactNode } from "react";

import { PriceCurrency } from "@infra/helpers/utils";

export type SingleVerticalItemProps = {
  label?: ReactNode;
  value?: string;
  className?: string;
  hasCountUpEffect?: boolean;
  decimalSeparator?: string;
  groupSeparator?: string;
  loading?: boolean;
  precision?: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  icon?: React.ReactNode;
  extraContent?: ReactNode;
  /** Helper text below the value box (e.g. "X روز"). Does not change layout when omitted. */
  hint?: ReactNode;
  valueStyle?: CSSProperties;

  // !
  symbol?: string | ReactNode;

  // related to data placeholder
  isDate?: boolean;
  isTime?: boolean;
  callBack?: (data: any) => any;
  isPrice?: boolean;
  isPriceWithExtraNumbers?: boolean;
  customDateFormat?: string;
  hasSpecialTime?: boolean;
  valueClassName?: string;
  currency?: PriceCurrency;
  isRial?: boolean;
};

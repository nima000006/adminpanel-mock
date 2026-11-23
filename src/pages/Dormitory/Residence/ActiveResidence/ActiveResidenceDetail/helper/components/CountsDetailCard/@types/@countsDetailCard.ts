import { PriceCurrency } from "@infra/helpers/utils";

export type CountsDetailCardProps = {
  value: string;
  title?: string;
  isClickable?: boolean;
  clickHandler?: () => void;
  img?: string;
  hasImg?: boolean;
  isPrice?: boolean;
  isRial?: boolean;
  currency?: PriceCurrency;
};

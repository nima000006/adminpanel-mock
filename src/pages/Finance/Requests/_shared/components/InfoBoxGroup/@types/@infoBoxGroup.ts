import { ReactNode } from "react";
export type InfoBoxGroupProps = {
  title: string;
  value: string | number | ReactNode;
  isPrice?: boolean;
};

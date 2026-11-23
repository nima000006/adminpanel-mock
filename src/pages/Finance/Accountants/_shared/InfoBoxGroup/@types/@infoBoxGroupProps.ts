import { ReactNode } from "react";

type InfoItem = {
  title: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
  colorClass?: string;
};

export type InfoBoxGroupProps = {
  items: InfoItem[];
};

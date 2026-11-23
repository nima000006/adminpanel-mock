import { ReactNode } from "react";

export type LabelCardProps = {
  title: string;
  linkLabel: string;
  to: string;
  prefix?: ReactNode;
  className?: string;
};

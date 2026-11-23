import { ReactNode } from "react";

export type MyReportStatCardProps = {
  icon?: ReactNode;
  title: string;
  information?: ReactNode;
  bgColor?: string;
  link: string | { pathname: string; search?: string };
};

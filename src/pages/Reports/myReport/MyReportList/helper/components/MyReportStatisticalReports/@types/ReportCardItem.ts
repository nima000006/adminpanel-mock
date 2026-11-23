import { IconType } from "react-icons";

export type ReportCardItem = {
  id: number;
  title: string;
  icon: string | IconType;
  isIconSvg: boolean;
  bgColor: string;
  link: string;
  counts: number;
};

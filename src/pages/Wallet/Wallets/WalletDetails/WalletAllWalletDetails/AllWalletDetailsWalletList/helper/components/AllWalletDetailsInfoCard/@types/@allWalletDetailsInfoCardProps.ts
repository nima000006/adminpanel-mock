import { IconType } from "react-icons";

export type AllWalletDetailsInfoCardProps = {
  title: string;
  value: string;
  tag?: {
    text: string;
    color: string;
    icon: IconType;
  };
  icon: IconType;
};

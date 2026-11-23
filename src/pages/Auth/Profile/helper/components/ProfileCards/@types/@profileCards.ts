import { IconType } from "react-icons";

export type ProfileCardsProps = {
  title: string;
  icon: IconType;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  active?: boolean;
};

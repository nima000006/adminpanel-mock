import { Badge, GetProps } from "antd";

export type PreRegistrationCardProps = {
  title: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  badge?: boolean;
  badgeColor?: GetProps<typeof Badge>["color"] | undefined;
  badgeTitle?: string;
  active: boolean;
  clickHandler: () => void;
};

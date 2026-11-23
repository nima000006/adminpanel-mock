export type IconTabProps = {
  title: string;
  Icon?: React.FC<{
    fillColor?: string;
    size?: string;
  }>;
  active?: boolean;
  disabled?: boolean;
  clickHandler?: () => void;
  className?: string;
  img?: string;
};

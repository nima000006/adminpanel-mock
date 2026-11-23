export type ReservationRequestResidenceInfoProps = {
  title: string;
  desc: string;
  Icon?: React.FC<{
    fillColor?: string;
    size?: string;
  }>;
  clickHandler?: () => void;
  residenceBtb?: boolean;
};

export type ResidenceListDrawerContentProps = {
  closeDrawerHandler: () => void;
};

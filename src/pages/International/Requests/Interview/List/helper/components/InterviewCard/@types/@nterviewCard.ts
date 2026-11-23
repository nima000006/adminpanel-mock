export type InterviewCardProps = {
  title: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  count?: boolean;
  countTitle: number | undefined;
  active: boolean;
  clickHandler: () => void;
};

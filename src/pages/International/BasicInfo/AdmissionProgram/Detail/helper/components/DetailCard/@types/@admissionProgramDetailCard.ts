export type AdmissionProgramDetailCardProps = {
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  clickHandler: () => void;
};

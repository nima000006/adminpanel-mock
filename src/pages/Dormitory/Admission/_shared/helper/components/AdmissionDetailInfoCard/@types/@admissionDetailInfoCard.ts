import { ReactNode } from "react";

export type AdmissionDetailInfoCardProps = {
  title: string;
  value: ReactNode | number | string | null | undefined;
  isPrice?: boolean;
  isCentered?: boolean;
};

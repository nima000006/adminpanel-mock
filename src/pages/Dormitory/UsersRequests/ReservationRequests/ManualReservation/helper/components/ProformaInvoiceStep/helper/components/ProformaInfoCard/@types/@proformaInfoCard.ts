import { ReactNode } from "react";

import { IconType } from "react-icons";

export type ProformaInfoCardField = {
  label: string;
  value: ReactNode;
  span?: number;
};

export type ProformaInfoCardProps = {
  icon: IconType;
  label: string;
  up: Record<string, ProformaInfoCardField>;
  down: Record<string, ProformaInfoCardField>;
};

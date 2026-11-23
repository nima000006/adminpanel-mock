import { JSX } from "react";

//! LAYOUT
export type AdmissionDetailTimingInfoProps = {
  dataSource: {
    title: JSX.Element;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  }[];
};

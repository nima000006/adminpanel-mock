import { Key } from "react";

//! LAYOUT
export type AdmissionProgramCreateFieldProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

type SelectType = {
  key: string;
  value: string;
  children: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type CreateFieldSearchFormType = {
  fieldGroup: SelectType;
  degree: SelectType;
  fieldOfStudy: SelectType;
  branch: SelectType[];
};

export type CreateInternationalAdmissionBranchInformationRequest = {
  branchFieldIds: Key[];
  id: number;
};

import { InternationalAdmissionDetailFieldsInfoType } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailFields/@types/@admissionProgramDetailFields";

//! LAYOUT
export type AdmissionEditFieldsAddDrawerContentProps = {
  closeDrawerHandler: () => void;
  studyGroupData: { id: number; title: string };
  degreeData: { id: number; title: string };
  defaultSelectedRows: number[];
  setDatasource: React.Dispatch<
    React.SetStateAction<InternationalAdmissionDetailFieldsInfoType[]>
  >;
  dataSource: InternationalAdmissionDetailFieldsInfoType[];
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

export type SearchFormType = {
  fieldOfStudy: SelectType[];
  branch: SelectType[];
};

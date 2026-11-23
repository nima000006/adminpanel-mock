import { InternationalAdmissionDetailFieldsInfoType } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailFields/@types/@admissionProgramDetailFields";

export type AdmissionEditFieldsDeleteDrawerContentProps = {
  closeDrawerHandler: () => void;
  dataSource: InternationalAdmissionDetailFieldsInfoType[];
  setDatasource: React.Dispatch<
    React.SetStateAction<InternationalAdmissionDetailFieldsInfoType[]>
  >;
};

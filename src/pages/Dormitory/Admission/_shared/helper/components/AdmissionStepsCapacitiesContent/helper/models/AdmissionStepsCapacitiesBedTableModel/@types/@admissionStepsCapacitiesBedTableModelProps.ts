import {
  AdmissionStepsCapacitiesTabKey,
  GetAdmissionBedsListContent,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";

export type AdmissionStepsCapacitiesBedTableModelProps = {
  variant: AdmissionStepsCapacitiesTabKey;
  onAdd?: (record: GetAdmissionBedsListContent) => void;
  onEditPrice?: (record: GetAdmissionBedsListContent) => void;
  onRemove?: (record: GetAdmissionBedsListContent) => void;
  onTransfer?: (record: GetAdmissionBedsListContent) => void;
};

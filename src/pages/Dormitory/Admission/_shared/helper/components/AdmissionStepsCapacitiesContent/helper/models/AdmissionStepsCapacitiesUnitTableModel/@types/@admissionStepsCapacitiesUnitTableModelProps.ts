import {
  AdmissionStepsCapacitiesTabKey,
  GetAdmissionUnitListContent,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";

export type AdmissionStepsCapacitiesUnitTableModelProps = {
  variant: AdmissionStepsCapacitiesTabKey;
  onAdd?: (record: GetAdmissionUnitListContent) => void;
  onEditPrice?: (record: GetAdmissionUnitListContent) => void;
  onRemove?: (record: GetAdmissionUnitListContent) => void;
  onTransfer?: (record: GetAdmissionUnitListContent) => void;
};

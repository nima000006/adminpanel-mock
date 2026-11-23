import {
  AdmissionStepsCapacitiesTabKey,
  GetAdmissionBuildingsListContent,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";

export type AdmissionStepsCapacitiesBuildingTableModelProps = {
  variant: AdmissionStepsCapacitiesTabKey;
  onAdd?: (record: GetAdmissionBuildingsListContent) => void;
  onEditPrice?: (record: GetAdmissionBuildingsListContent) => void;
  onRemove?: (record: GetAdmissionBuildingsListContent) => void;
  onTransfer?: (record: GetAdmissionBuildingsListContent) => void;
};

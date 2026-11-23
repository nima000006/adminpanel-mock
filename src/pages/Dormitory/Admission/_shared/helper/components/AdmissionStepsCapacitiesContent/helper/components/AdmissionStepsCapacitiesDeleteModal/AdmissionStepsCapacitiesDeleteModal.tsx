import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { AdmissionStepsCapacitiesDeleteModalProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";
import { getCapacitiesDeleteAlertMessage } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/util";

const AdmissionStepsCapacitiesDeleteModal = ({
  open,
  target,
  context,
  onCancel,
  onConfirm,
}: AdmissionStepsCapacitiesDeleteModalProps) => {
  const isSingle = target?.kind === "single";
  const title = isSingle ? "حذف" : "حذف گروهی";

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      title={title}
      size="medium"
      confirmText="تایید و حذف"
      cancelText="انصراف"
      confirmDanger
      onConfirm={onConfirm}
      destroyOnClose
    >
      <CustomAlert
        type="warning"
        showIcon
        className="border border-dashed! font-medium"
        title={getCapacitiesDeleteAlertMessage({
          mode: context.mode,
          target,
          hasFilter: isSingle ? false : context.hasFilter,
          filteredCount: isSingle ? 1 : context.filteredCount,
          programTitle: context.programTitle,
        })}
      />
    </CustomModal>
  );
};

export default AdmissionStepsCapacitiesDeleteModal;

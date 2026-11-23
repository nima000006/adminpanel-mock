import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { CapacitiesDeleteModalProps } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/@types/@allAdmissionStepsEditDetailCapacitiesContent";
import { getDeleteAlertMessage } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/util";

const AllAdmissionStepsEditDetailCapacitiesDeleteModal = ({
  open,
  target,
  context,
  onCancel,
  onConfirm,
}: CapacitiesDeleteModalProps) => {
  const isSingle = target?.kind === "single";
  const title = isSingle ? "حذف از برنامه" : "حذف گروهی";

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
        title={getDeleteAlertMessage({
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

export default AllAdmissionStepsEditDetailCapacitiesDeleteModal;

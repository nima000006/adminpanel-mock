import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { AdmissionStepsPackagesDrawerProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";
import AdmissionStepsPackagesDrawerTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/helper/components/AdmissionStepsPackagesDrawer/helper/models/AdmissionStepsPackagesDrawerTableModel";

const AdmissionStepsPackagesDrawer = ({
  open,
  onClose,
  data,
}: AdmissionStepsPackagesDrawerProps) => {
  //* ================================ Util Functions ================================
  const closeHandler = () => {
    onClose();
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomDrawer
      open={open}
      onClose={closeHandler}
      closable={false}
      destroyOnHidden
      content={
        <div className="flex h-full flex-col">
          <CustomDrawerHeader
            title="مشاهده بسته‌های قابل رزرو"
            closeDrawerHandler={closeHandler}
            hasLeftSide={false}
          />

          <div className="flex flex-1 flex-col gap-4 overflow-auto p-10">
            <CustomTable
              rowKey="id"
              dataSource={data}
              columns={AdmissionStepsPackagesDrawerTableModel()}
            />
          </div>
        </div>
      }
    />
  );
};

export default AdmissionStepsPackagesDrawer;

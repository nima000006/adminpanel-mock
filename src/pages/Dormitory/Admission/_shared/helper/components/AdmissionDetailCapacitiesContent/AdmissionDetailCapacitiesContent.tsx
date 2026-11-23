import { PiPencilLine } from "react-icons/pi";
import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { AdmissionDetailCapacitiesContentProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailCapacitiesContent/@types/@admissionDetailCapacitiesContent";
import AdmissionCapacityBedTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailCapacitiesContent/helper/models/AdmissionCapacityBed/AdmissionCapacityBedTableModel";
import AdmissionCapacityBuildingTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailCapacitiesContent/helper/models/AdmissionCapacityBuilding/AdmissionCapacityBuildingTableModel";
import AdmissionCapacityUnitTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailCapacitiesContent/helper/models/AdmissionCapacityUnit/AdmissionCapacityUnitTableModel";
import {
  MY_ADMISSION_STATUS,
  RESERVABLE_CAPACITY_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";

const AdmissionDetailCapacitiesContent = ({
  variant,
  data,
  editTo,
  status,
}: AdmissionDetailCapacitiesContentProps) => {
  const navigate = useNavigate();
  const isAllVariant = variant === "all";
  const showEdit = status === MY_ADMISSION_STATUS.waiting;
  const isBed = data.reservableCapacity === RESERVABLE_CAPACITY_TYPE.bed;
  const isUnit = data.reservableCapacity === RESERVABLE_CAPACITY_TYPE.unit;
  const isBuilding = data.reservableCapacity === RESERVABLE_CAPACITY_TYPE.building;

  //* ================================ Util Functions ================================
  const renderTable = () => {
    if (isBed) {
      return (
        <CustomTable
          dataSource={data.capacityBeds as any}
          rowKey="id"
          columns={AdmissionCapacityBedTableModel()}
          pagination={false}
        />
      );
    }

    if (isUnit) {
      return (
        <CustomTable
          dataSource={data.capacityUnits as any}
          rowKey="id"
          columns={AdmissionCapacityUnitTableModel()}
          pagination={false}
        />
      );
    }

    if (isBuilding) {
      return (
        <CustomTable
          dataSource={data.capacityBuildings as any}
          rowKey="id"
          columns={AdmissionCapacityBuildingTableModel()}
          pagination={false}
        />
      );
    }

    return null;
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      {isAllVariant && showEdit && editTo && (
        <CustomDivider
          text=""
          extraContent={
            <CustomButton
              type="dashed"
              icon={<PiPencilLine />}
              onClick={() => navigate(editTo)}
            >
              ویرایش
            </CustomButton>
          }
        />
      )}

      {renderTable()}
    </div>
  );
};

export default AdmissionDetailCapacitiesContent;

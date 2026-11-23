import { useEffect, useState } from "react";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import {
  AdmissionCapacityBedItem,
  AdmissionCapacityBuildingItem,
  AdmissionCapacityUnitItem,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import {
  AdmissionStepsSettingsRenewalCapacityDrawerProps,
  RenewalCapacitySegment,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/@types/@admissionStepsSettingsContent";
import AdmissionStepsSettingsRenewalCapacityBedTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/models/AdmissionStepsSettingsRenewalCapacityBed/AdmissionStepsSettingsRenewalCapacityBedTableModel";
import AdmissionStepsSettingsRenewalCapacityBuildingTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/models/AdmissionStepsSettingsRenewalCapacityBuilding/AdmissionStepsSettingsRenewalCapacityBuildingTableModel";
import AdmissionStepsSettingsRenewalCapacityUnitTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/models/AdmissionStepsSettingsRenewalCapacityUnit/AdmissionStepsSettingsRenewalCapacityUnitTableModel";
import {
  getRenewalCapacitySegmentOptions,
  getRenewalCapacityTableData,
  RENEWAL_CAPACITY_SEGMENT,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/util";
import { RESERVABLE_CAPACITY_TYPE } from "@pages/Dormitory/Admission/_shared/util";

const AdmissionStepsSettingsRenewalCapacityDrawer = ({
  open,
  record,
  capacityType,
  onClose,
}: AdmissionStepsSettingsRenewalCapacityDrawerProps) => {
  const [segment, setSegment] = useState<RenewalCapacitySegment>(
    RENEWAL_CAPACITY_SEGMENT.renewable
  );

  //? ================================ Effects ================================
  useEffect(() => {
    if (!open) {
      return;
    }

    setSegment(RENEWAL_CAPACITY_SEGMENT.renewable);
  }, [open, record?.id]);

  //* ================================ Util Functions ================================
  const closeHandler = () => {
    onClose();
  };

  const renderTable = () => {
    if (!record) {
      return null;
    }

    const tableData = getRenewalCapacityTableData(capacityType, segment, record);

    if (capacityType === RESERVABLE_CAPACITY_TYPE.bed) {
      return (
        <CustomTable<AdmissionCapacityBedItem>
          dataSource={tableData as AdmissionCapacityBedItem[]}
          rowKey="id"
          columns={AdmissionStepsSettingsRenewalCapacityBedTableModel()}
          pagination={false}
        />
      );
    }

    if (capacityType === RESERVABLE_CAPACITY_TYPE.unit) {
      return (
        <CustomTable<AdmissionCapacityUnitItem>
          dataSource={tableData as AdmissionCapacityUnitItem[]}
          rowKey="id"
          columns={AdmissionStepsSettingsRenewalCapacityUnitTableModel()}
          pagination={false}
        />
      );
    }

    if (capacityType === RESERVABLE_CAPACITY_TYPE.building) {
      return (
        <CustomTable<AdmissionCapacityBuildingItem>
          dataSource={tableData as AdmissionCapacityBuildingItem[]}
          rowKey="id"
          columns={AdmissionStepsSettingsRenewalCapacityBuildingTableModel()}
          pagination={false}
        />
      );
    }

    return null;
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomDrawer
      open={open}
      onClose={closeHandler}
      closable={false}
      destroyOnHidden
      content={
        record ? (
          <div className="flex h-full flex-col">
            <CustomDrawerHeader
              title="مشاهده وضعیت قابلیت تمدید ظرفیت‌های برنامه پذیرش مبدأ"
              closeDrawerHandler={closeHandler}
              hasLeftSide={false}
            />

            <div className="flex flex-1 flex-col gap-5 overflow-auto p-10">
              <CustomSegmented
                block
                value={segment}
                options={getRenewalCapacitySegmentOptions(record)}
                onChange={(value) => setSegment(value as RenewalCapacitySegment)}
              />

              {renderTable()}
            </div>
          </div>
        ) : null
      }
    />
  );
};

export default AdmissionStepsSettingsRenewalCapacityDrawer;

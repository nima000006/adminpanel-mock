import { useState } from "react";

import { Form } from "antd";
import { PiPencilSimpleLine, PiTrash } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import {
  AdmissionCapacityBedItem,
  AdmissionCapacityBuildingItem,
  AdmissionCapacityUnitItem,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { ADMISSION_DETAIL_MOCK_DATA } from "@pages/Dormitory/Admission/_shared/helper/mock/admissionDetailMockData";
import { RESERVABLE_CAPACITY_TYPE } from "@pages/Dormitory/Admission/_shared/util";
import {
  CapacitiesEditPriceFormType,
  CapacitiesFilterFormType,
  CapacitiesModalContext,
  CapacitiesModalTarget,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/@types/@allAdmissionStepsEditDetailCapacitiesContent";
import AllAdmissionStepsEditDetailCapacitiesDeleteModal from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/components/AllAdmissionStepsEditDetailCapacitiesDeleteModal/AllAdmissionStepsEditDetailCapacitiesDeleteModal";
import AllAdmissionStepsEditDetailCapacitiesEditPriceModal from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/components/AllAdmissionStepsEditDetailCapacitiesEditPriceModal/AllAdmissionStepsEditDetailCapacitiesEditPriceModal";
import AllAdmissionStepsEditDetailCapacitiesFilters from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/components/AllAdmissionStepsEditDetailCapacitiesFilters/AllAdmissionStepsEditDetailCapacitiesFilters";
import AllAdmissionStepsEditDetailCapacitiesBedTableModel from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/models/AllAdmissionStepsEditDetailCapacitiesBed/AllAdmissionStepsEditDetailCapacitiesBedTableModel";
import AllAdmissionStepsEditDetailCapacitiesBuildingTableModel from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/models/AllAdmissionStepsEditDetailCapacitiesBuilding/AllAdmissionStepsEditDetailCapacitiesBuildingTableModel";
import AllAdmissionStepsEditDetailCapacitiesUnitTableModel from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/models/AllAdmissionStepsEditDetailCapacitiesUnit/AllAdmissionStepsEditDetailCapacitiesUnitTableModel";
import {
  getCapacitiesInfoAlertMessage,
  hasActiveCapacitiesFilter,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/helper/util";

const data = ADMISSION_DETAIL_MOCK_DATA;

const FILTER_OPTIONS = {
  building: [{ id: 1, title: "شهید بهشتی" }],
  floor: [{ id: 1, title: "طبقه همکف" }],
  unitTitle: [{ id: 1, title: "عنوان واحد اقامتی (X تخته)" }],
  unitType: [
    { id: 1, title: "اتاق مستقل" },
    { id: 2, title: "اتاق سوئیت" },
    { id: 3, title: "سوئیت" },
    { id: 4, title: "واحد آپارتمانی" },
  ],
  qualityGrade: [
    { id: 1, title: "درجه یک" },
    { id: 2, title: "درجه دو" },
  ],
  bedCountInUnit: [
    { id: 1, title: "1" },
    { id: 2, title: "2" },
    { id: 4, title: "4" },
  ],
  bedType: [
    { id: 1, title: "کف خواب" },
    { id: 2, title: "تک طبقه" },
    { id: 3, title: "دو طبقه" },
    { id: 4, title: "سه طبقه" },
  ],
};

const AllAdmissionStepsEditDetailCapacitiesContent = () => {
  const [filterForm] = Form.useForm<CapacitiesFilterFormType>();
  const filterValues = Form.useWatch([], filterForm) as
    CapacitiesFilterFormType | undefined;

  const [editTarget, setEditTarget] = useState<CapacitiesModalTarget | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CapacitiesModalTarget | null>(null);

  const mode = data.reservableCapacity;
  const isBed = mode === RESERVABLE_CAPACITY_TYPE.bed;
  const isUnit = mode === RESERVABLE_CAPACITY_TYPE.unit;
  const isBuilding = mode === RESERVABLE_CAPACITY_TYPE.building;
  const hasFilter = hasActiveCapacitiesFilter(filterValues);

  const tableCount = isBed
    ? data.capacityBeds.length
    : isUnit
      ? data.capacityUnits.length
      : data.capacityBuildings.length;

  const modalContext: CapacitiesModalContext = {
    mode,
    hasFilter,
    filteredCount: tableCount,
    scheduleType: data.scheduleType,
    programTitle: data.programTitle,
  };

  const groupEditLabel = hasFilter
    ? "ویرایش گروهی قیمت (بر اساس فیلترها)"
    : "ویرایش گروهی قیمت";
  const groupDeleteLabel = hasFilter
    ? "حذف گروهی از برنامه (بر اساس فیلترها)"
    : "حذف گروهی از برنامه";

  //* ================================ Util Functions ================================
  const cancelEditHandler = () => {};
  const editConfirmHandler = () => {};

  const openGroupEditHandler = () => {
    setEditTarget({ kind: "group" });
  };

  const openGroupDeleteHandler = () => {
    setDeleteTarget({ kind: "group" });
  };

  const openSingleEditHandler = (
    record:
      AdmissionCapacityBedItem | AdmissionCapacityUnitItem | AdmissionCapacityBuildingItem
  ) => {
    setEditTarget({ kind: "single", record });
  };

  const openSingleDeleteHandler = (
    record:
      AdmissionCapacityBedItem | AdmissionCapacityUnitItem | AdmissionCapacityBuildingItem
  ) => {
    setDeleteTarget({ kind: "single", record });
  };

  const editPriceConfirmHandler = (_values: CapacitiesEditPriceFormType) => {
    // TODO: wire submit API when contract is available
    setEditTarget(null);
  };

  const deleteConfirmHandler = () => {
    // TODO: wire delete API when contract is available
    setDeleteTarget(null);
  };

  const bedColumns = AllAdmissionStepsEditDetailCapacitiesBedTableModel({
    onEditPrice: openSingleEditHandler,
    onDelete: openSingleDeleteHandler,
  });
  const unitColumns = AllAdmissionStepsEditDetailCapacitiesUnitTableModel({
    onEditPrice: openSingleEditHandler,
    onDelete: openSingleDeleteHandler,
  });
  const buildingColumns = AllAdmissionStepsEditDetailCapacitiesBuildingTableModel({
    onEditPrice: openSingleEditHandler,
    onDelete: openSingleDeleteHandler,
  });

  const renderTable = () => {
    if (isBed) {
      return (
        <CustomTable dataSource={data.capacityBeds} rowKey="id" columns={bedColumns} />
      );
    }

    if (isUnit) {
      return (
        <CustomTable dataSource={data.capacityUnits} rowKey="id" columns={unitColumns} />
      );
    }

    if (isBuilding) {
      return (
        <CustomTable
          dataSource={data.capacityBuildings}
          rowKey="id"
          columns={buildingColumns}
        />
      );
    }

    return null;
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-1 flex-col gap-6">
      <AllAdmissionStepsEditDetailCapacitiesFilters
        mode={mode}
        form={filterForm}
        options={FILTER_OPTIONS}
      />

      <CustomAlert
        type="info"
        showIcon
        className="border border-dashed! font-medium"
        title={getCapacitiesInfoAlertMessage(mode)}
      />

      <ToolBox
        leftSide={
          <div className="flex items-center gap-2">
            <CustomButton
              type="dashed"
              icon={<PiPencilSimpleLine />}
              onClick={openGroupEditHandler}
            >
              {groupEditLabel}
            </CustomButton>
            <CustomButton
              type="dashed"
              danger
              icon={<PiTrash />}
              onClick={openGroupDeleteHandler}
            >
              {groupDeleteLabel}
            </CustomButton>
          </div>
        }
      />

      {renderTable()}

      <div className="mt-auto flex items-center justify-end gap-4 self-end">
        <CustomButton onClick={cancelEditHandler}>انصراف از ویرایش</CustomButton>
        <CustomButton type="primary" onClick={editConfirmHandler}>
          ثبت و اعمال تغییرات
        </CustomButton>
      </div>

      <AllAdmissionStepsEditDetailCapacitiesEditPriceModal
        open={Boolean(editTarget)}
        target={editTarget}
        context={modalContext}
        onCancel={() => setEditTarget(null)}
        onConfirm={editPriceConfirmHandler}
      />

      <AllAdmissionStepsEditDetailCapacitiesDeleteModal
        open={Boolean(deleteTarget)}
        target={deleteTarget}
        context={modalContext}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteConfirmHandler}
      />
    </div>
  );
};

export default AllAdmissionStepsEditDetailCapacitiesContent;

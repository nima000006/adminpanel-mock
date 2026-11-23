import { useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { RiEditLine } from "react-icons/ri";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useQueryParams from "@infra/hooks/useQueryParams";
import { AdmissionDetailMockData } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import AdmissionCapacityBedTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailCapacitiesContent/helper/models/AdmissionCapacityBed/AdmissionCapacityBedTableModel";
import AdmissionCapacityBuildingTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailCapacitiesContent/helper/models/AdmissionCapacityBuilding/AdmissionCapacityBuildingTableModel";
import AdmissionCapacityUnitTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailCapacitiesContent/helper/models/AdmissionCapacityUnit/AdmissionCapacityUnitTableModel";
import {
  AdmissionStepsCapacitiesModalTarget,
  AdmissionStepsCapacitiesRecord,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";
import {
  getCapacitiesBulkDeleteLabel,
  getCapacitiesBulkEditLabel,
  getCapacitiesDeleteAlertMessage,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/util";
import { ActiveAdmissionDetailCapacitiesAdvanceFilterFormType } from "@pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/helper/components/ActiveAdmissionDetailCapacitiesContent/@types/@activeAdmissionDetailCapacitiesContent";
import { EditCapacityPriceFormValues } from "@pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/helper/components/ActiveAdmissionDetailCapacitiesContent/helper/components/EditCapacityPriceModalContent/@types/@editCapacityPriceModalContent";
import EditCapacityPriceModalContent from "@pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/helper/components/ActiveAdmissionDetailCapacitiesContent/helper/components/EditCapacityPriceModalContent/EditCapacityPriceModalContent";
import useActiveAdmissionDetailCapacitiesAdvanceFilter from "@pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/helper/components/ActiveAdmissionDetailCapacitiesContent/helper/hooks/useActiveAdmissionDetailCapacitiesAdvanceFilter";
import { RESERVABLE_CAPACITY_TYPE } from "@pages/Dormitory/Admission/_shared/util";

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const ActiveAdmissionDetailCapacitiesContent = ({
  data,
}: {
  data: AdmissionDetailMockData;
}) => {
  const { params: url } = useQueryParams();

  const mode = data.reservableCapacity;
  const isBed = mode === RESERVABLE_CAPACITY_TYPE.bed;
  const isUnit = mode === RESERVABLE_CAPACITY_TYPE.unit;
  const isBuilding = mode === RESERVABLE_CAPACITY_TYPE.building;

  const [editPriceForm] = Form.useForm<EditCapacityPriceFormValues>();
  const [advanceFilterForm] =
    Form.useForm<ActiveAdmissionDetailCapacitiesAdvanceFilterFormType>();

  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [editTarget, setEditTarget] =
    useState<AdmissionStepsCapacitiesModalTarget | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<AdmissionStepsCapacitiesModalTarget | null>(null);

  const { filterItemsList } = useActiveAdmissionDetailCapacitiesAdvanceFilter(mode);

  const hasFilter = Number(badgeCount) > 0;
  const filteredCount = isBed
    ? data.capacityBeds.length
    : isUnit
      ? data.capacityUnits.length
      : data.capacityBuildings.length;

  //* ================================ Util Functions ================================
  const closeEditPriceModalHandler = () => {
    setEditTarget(null);
    editPriceForm.resetFields();
  };

  const closeDeleteModalHandler = () => {
    setDeleteTarget(null);
  };

  const openSingleEditHandler = (record: AdmissionStepsCapacitiesRecord) => {
    editPriceForm.setFieldsValue({
      price: record.price ?? undefined,
      hasDeposit: record.depositAmount != null,
      deposit: record.depositAmount ?? undefined,
    });
    setEditTarget({ kind: "single", record });
  };

  const openGroupEditHandler = () => {
    editPriceForm.setFieldsValue({
      price: undefined,
      hasDeposit: false,
      deposit: undefined,
    });
    setEditTarget({ kind: "group" });
  };

  const openSingleDeleteHandler = (record: AdmissionStepsCapacitiesRecord) => {
    setDeleteTarget({ kind: "single", record });
  };

  const openGroupDeleteHandler = () => {
    setDeleteTarget({ kind: "group" });
  };

  const confirmEditPriceHandler = async () => {
    await editPriceForm.validateFields();
    closeEditPriceModalHandler();
  };

  const confirmDeleteHandler = () => {
    closeDeleteModalHandler();
  };

  const renderTable = () => {
    if (isBed) {
      return (
        <CustomTable
          dataSource={data.capacityBeds as any}
          rowKey="id"
          columns={AdmissionCapacityBedTableModel({
            from: "active-admission-detail",
            onEditPrice: (record) => openSingleEditHandler(record),
            onDeleteFromProgram: (record) => openSingleDeleteHandler(record),
          })}
          pagination={false}
        />
      );
    }

    if (isUnit) {
      return (
        <CustomTable
          dataSource={data.capacityUnits as any}
          rowKey="id"
          columns={AdmissionCapacityUnitTableModel({
            from: "active-admission-detail",
            onEditPrice: (record) => openSingleEditHandler(record),
            onDeleteFromProgram: (record) => openSingleDeleteHandler(record),
          })}
          pagination={false}
        />
      );
    }

    if (isBuilding) {
      return (
        <CustomTable
          dataSource={data.capacityBuildings as any}
          rowKey="id"
          columns={AdmissionCapacityBuildingTableModel({
            from: "active-admission-detail",
            onEditPrice: (record) => openSingleEditHandler(record),
            onDeleteFromProgram: (record) => openSingleDeleteHandler(record),
          })}
          pagination={false}
        />
      );
    }

    return null;
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={() => setIsAdvanceModalOpen(false)}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={advanceFilterForm}
          defaultParams={url}
        />
      )}

      {editTarget && (
        <ConfirmationModalWithContent
          title={editTarget.kind === "single" ? "ویرایش قیمت" : "ویرایش گروهی قیمت"}
          showIcon={false}
          backBtnText="انصراف"
          confirmBtnText="تایید و اعمال تغییرات"
          isModalOpen={Boolean(editTarget)}
          closeModalHandler={closeEditPriceModalHandler}
          onConfirmClickHandler={confirmEditPriceHandler}
          isFormSensitive
          form={editPriceForm}
          content={
            <EditCapacityPriceModalContent
              form={editPriceForm}
              mode={mode}
              target={editTarget}
              hasFilter={hasFilter}
              filteredCount={filteredCount}
              scheduleType={data.scheduleType}
            />
          }
        />
      )}

      {deleteTarget && (
        <ConfirmationModalWithContent
          title={deleteTarget.kind === "single" ? "حذف از برنامه" : "حذف گروهی"}
          showIcon={false}
          isDangerous
          backBtnText="انصراف"
          confirmBtnText="تایید و حذف"
          isModalOpen={Boolean(deleteTarget)}
          closeModalHandler={closeDeleteModalHandler}
          onConfirmClickHandler={confirmDeleteHandler}
          content={
            <CustomAlert
              type="warning"
              showIcon
              className="border border-dashed! font-medium"
              title={getCapacitiesDeleteAlertMessage({
                mode,
                target: deleteTarget,
                hasFilter: deleteTarget.kind === "single" ? false : hasFilter,
                filteredCount: deleteTarget.kind === "single" ? 1 : filteredCount,
                programTitle: data.programTitle,
              })}
            />
          }
        />
      )}

      <div className="flex flex-col gap-4">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setIsAdvanceModalOpen(true)}
              >
                فیلتر
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex items-center gap-2">
              <CustomButton icon={<RiEditLine />} onClick={openGroupEditHandler}>
                {getCapacitiesBulkEditLabel(hasFilter)}
              </CustomButton>
              <CustomButton
                icon={<BiTrash />}
                danger
                type="dashed"
                onClick={openGroupDeleteHandler}
              >
                {getCapacitiesBulkDeleteLabel(hasFilter)}
              </CustomButton>

              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                  خروجی
                </CustomButton>
              </Dropdown>
            </div>
          }
        />

        {renderTable()}
      </div>
    </>
  );
};

export default ActiveAdmissionDetailCapacitiesContent;

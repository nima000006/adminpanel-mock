import { useEffect, useState } from "react";

import { Form, Tabs } from "antd";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { PiArrowsLeftRight, PiPencilSimpleLine, PiTrash } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAdmissionBedsListCountQuery,
  useLazyGetAdmissionBedsListQuery,
  useLazyGetAdmissionBuildingsListCountQuery,
  useLazyGetAdmissionBuildingsListQuery,
  useLazyGetAdmissionUnitListCountQuery,
  useLazyGetAdmissionUnitListQuery,
  useLazyGetAllAdmissionProgramInfoQuery,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
import {
  AdmissionDetailStatus,
  ScheduleType,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import {
  AdmissionStepsCapacitiesContentProps,
  AdmissionStepsCapacitiesFilterFormType,
  AdmissionStepsCapacitiesModalIntent,
  AdmissionStepsCapacitiesModalTarget,
  AdmissionStepsCapacitiesRecord,
  AdmissionStepsCapacitiesTabKey,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";
import AdmissionStepsCapacitiesAddModal from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/components/AdmissionStepsCapacitiesAddModal/AdmissionStepsCapacitiesAddModal";
import AdmissionStepsCapacitiesDeleteModal from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/components/AdmissionStepsCapacitiesDeleteModal/AdmissionStepsCapacitiesDeleteModal";
import AdmissionStepsCapacitiesFilters from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/components/AdmissionStepsCapacitiesFilters/AdmissionStepsCapacitiesFilters";
import AdmissionStepsCapacitiesBedTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/models/AdmissionStepsCapacitiesBedTableModel/AdmissionStepsCapacitiesBedTableModel";
import AdmissionStepsCapacitiesBuildingTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/models/AdmissionStepsCapacitiesBuildingTableModel/AdmissionStepsCapacitiesBuildingTableModel";
import AdmissionStepsCapacitiesUnitTableModel from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/models/AdmissionStepsCapacitiesUnitTableModel/AdmissionStepsCapacitiesUnitTableModel";
import {
  ADMISSION_STEPS_CAPACITIES_TABS,
  getCapacitiesBulkAddLabel,
  getCapacitiesBulkDeleteLabel,
  getCapacitiesBulkEditLabel,
  getCapacitiesBulkTransferLabel,
  getCapacitiesCreationTabAlertMessage,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/util";
import { ADMISSION_DETAIL_MOCK_DATA } from "@pages/Dormitory/Admission/_shared/helper/mock/admissionDetailMockData";
import {
  CapacitiesMode,
  hasActiveCapacitiesFilter,
  MY_ADMISSION_STATUS,
  RESERVABLE_CAPACITY_TYPE,
  SCHEDULE_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";

const data = ADMISSION_DETAIL_MOCK_DATA;

const TRANSFERABLE_PROGRAM_MOCK = [
  {
    linkedProgramTitle: "عنوان برنامه پذیرش",
    linkedProgramStatus: MY_ADMISSION_STATUS.returned,
    linkedProgramScheduleType: SCHEDULE_TYPE.monthly,
  },

  {
    linkedProgramTitle: "عنوان برنامه پذیرش",
    linkedProgramStatus: MY_ADMISSION_STATUS.draft,
    linkedProgramScheduleType: SCHEDULE_TYPE.dailyFree,
  },

  {
    linkedProgramTitle: "عنوان برنامه پذیرش",
    linkedProgramStatus: MY_ADMISSION_STATUS.returned,
    linkedProgramScheduleType: SCHEDULE_TYPE.termic,
  },
] as const;

const NON_ADDABLE_PROGRAM_MOCK = [
  {
    linkedProgramTitle: "عنوان برنامه پذیرش",
    linkedProgramStatus: MY_ADMISSION_STATUS.active,
    linkedProgramScheduleType: SCHEDULE_TYPE.monthly,
  },

  {
    linkedProgramTitle: "عنوان برنامه پذیرش",
    linkedProgramStatus: MY_ADMISSION_STATUS.waiting,
    linkedProgramScheduleType: SCHEDULE_TYPE.dailyFree,
  },

  {
    linkedProgramTitle: "عنوان برنامه پذیرش",
    linkedProgramStatus: MY_ADMISSION_STATUS.active,
    linkedProgramScheduleType: SCHEDULE_TYPE.termic,
  },
] as const;

const getInitialCapacityItems = (
  mode: CapacitiesMode
): AdmissionStepsCapacitiesRecord[] => {
  if (mode === RESERVABLE_CAPACITY_TYPE.bed) {
    return data.capacityBeds as any;
  }

  if (mode === RESERVABLE_CAPACITY_TYPE.unit) {
    return data.capacityUnits as any;
  }

  return data.capacityBuildings as any;
};

// به هر ظرفیت، اطلاعات برنامه‌ای که فعلاً به آن متصل است را (به‌صورت چرخشی از mock) اضافه می‌کند؛
// کد نمایشی برای تخت همان bedCode و برای واحد/ساختمان شناسه چهار رقمی با صفر ابتدایی است
const withLinkedProgramFields = (
  mode: CapacitiesMode,
  items: AdmissionStepsCapacitiesRecord[],
  programMock: readonly {
    linkedProgramTitle: string;
    linkedProgramStatus: AdmissionDetailStatus;
    linkedProgramScheduleType: ScheduleType;
  }[]
): AdmissionStepsCapacitiesRecord[] =>
  items.map((item, index) => ({
    ...item,

    ...programMock[index % programMock.length],

    code:
      mode === RESERVABLE_CAPACITY_TYPE.bed && "bedCode" in item
        ? item.bedCode
        : String(item.uuid).padStart(4, "0"),
  })) as any;

const getTransferableCapacityItems = (
  mode: CapacitiesMode
): AdmissionStepsCapacitiesRecord[] =>
  withLinkedProgramFields(
    mode,
    getInitialCapacityItems(mode).slice(0, 3),
    TRANSFERABLE_PROGRAM_MOCK
  );

const getNonAddableCapacityItems = (
  mode: CapacitiesMode
): AdmissionStepsCapacitiesRecord[] =>
  withLinkedProgramFields(
    mode,
    getInitialCapacityItems(mode).slice(3, 6),
    NON_ADDABLE_PROGRAM_MOCK
  );

const AdmissionStepsCapacitiesContent = ({
  mode,
  scheduleType,
  programTitle,
  onBack,
  onSaveDraft,
  onSubmitAndContinue,
}: AdmissionStepsCapacitiesContentProps) => {
  const [filterForm] = Form.useForm<AdmissionStepsCapacitiesFilterFormType>();

  const filterValues = Form.useWatch([], filterForm) as
    AdmissionStepsCapacitiesFilterFormType | undefined;

  const hasFilter = hasActiveCapacitiesFilter(filterValues);

  const [activeTab, setActiveTab] = useState<AdmissionStepsCapacitiesTabKey>(
    ADMISSION_STEPS_CAPACITIES_TABS.withoutProgram
  );

  const [modalIntent, setModalIntent] =
    useState<AdmissionStepsCapacitiesModalIntent>("add");

  const [modalTarget, setModalTarget] =
    useState<AdmissionStepsCapacitiesModalTarget | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<AdmissionStepsCapacitiesModalTarget | null>(null);

  const isThisProgramTab = activeTab === ADMISSION_STEPS_CAPACITIES_TABS.thisProgram;
  const isTransferableTab = activeTab === ADMISSION_STEPS_CAPACITIES_TABS.transferable;

  // ۶ ظرفیت اول mock به برنامه‌های دیگر (قابل انتقال / غیر قابل افزودن) متصل‌اند؛ بقیه بدون برنامه هستند
  const [withoutProgramItems, setWithoutProgramItems] = useState<
    AdmissionStepsCapacitiesRecord[]
  >(() => getInitialCapacityItems(mode).slice(6));

  const [thisProgramItems, setThisProgramItems] = useState<
    AdmissionStepsCapacitiesRecord[]
  >([]);

  const [transferableItems, setTransferableItems] = useState<
    AdmissionStepsCapacitiesRecord[]
  >(() => getTransferableCapacityItems(mode));

  const [nonAddableItems] = useState<AdmissionStepsCapacitiesRecord[]>(() =>
    getNonAddableCapacityItems(mode)
  );

  const { params } = useQueryParams();

  const currentItems =
    activeTab === ADMISSION_STEPS_CAPACITIES_TABS.thisProgram
      ? thisProgramItems
      : activeTab === ADMISSION_STEPS_CAPACITIES_TABS.transferable
        ? transferableItems
        : activeTab === ADMISSION_STEPS_CAPACITIES_TABS.nonAddable
          ? nonAddableItems
          : withoutProgramItems;

  const modalContext = {
    mode,
    hasFilter,
    filteredCount: currentItems.length,
    scheduleType,
    programTitle: programTitle ?? "",
  };

  const canBulkAdd = activeTab === ADMISSION_STEPS_CAPACITIES_TABS.withoutProgram;
  const canBulkTransfer = isTransferableTab && transferableItems.length > 0;
  const canBulkManageProgram = isThisProgramTab && thisProgramItems.length > 0;
  const isNonAddableTab = activeTab === ADMISSION_STEPS_CAPACITIES_TABS.nonAddable;
  const tabAlertType =
    isThisProgramTab || isTransferableTab || isNonAddableTab ? "info" : "warning";

  //? ================================  Api Calls ================================
  // admission program info
  const [getAllAdmissionProgramInfo, { data: admissionProgramInfoData }] =
    useLazyGetAllAdmissionProgramInfoQuery();

  // admission beds list
  const [
    getAdmissionBedsList,
    { data: admissionBedsListData, isFetching: isGetAdmissionBedsListLoading },
  ] = useLazyGetAdmissionBedsListQuery();

  // admission beds list count
  const [
    getAdmissionBedsListCount,
    { data: admissionBedsListCountData, isFetching: isGetAdmissionBedsListCountLoading },
  ] = useLazyGetAdmissionBedsListCountQuery();

  // admission buildings list
  const [
    getAdmissionBuildingsList,
    { data: admissionBuildingsListData, isFetching: isGetAdmissionBuildingsListLoading },
  ] = useLazyGetAdmissionBuildingsListQuery();

  // admission buildings list count
  const [
    getAdmissionBuildingsListCount,
    {
      data: admissionBuildingsListCountData,
      isFetching: isGetAdmissionBuildingsListCountLoading,
    },
  ] = useLazyGetAdmissionBuildingsListCountQuery();

  // admission unit list
  const [
    getAdmissionUnitList,
    { data: admissionUnitListData, isFetching: isGetAdmissionUnitListLoading },
  ] = useLazyGetAdmissionUnitListQuery();

  // admission unit list count
  const [
    getAdmissionUnitListCount,
    { data: admissionUnitListCountData, isFetching: isGetAdmissionUnitListCountLoading },
  ] = useLazyGetAdmissionUnitListCountQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (params?.id) {
      getAllAdmissionProgramInfo(params.id);
    }
  }, []);

  useEffect(() => {
    if (params?.id) {
      const tab =
        activeTab === ADMISSION_STEPS_CAPACITIES_TABS.withoutProgram
          ? "UNASSIGNED"
          : activeTab === ADMISSION_STEPS_CAPACITIES_TABS.thisProgram
            ? "THIS_PLAN"
            : activeTab === ADMISSION_STEPS_CAPACITIES_TABS.transferable
              ? "MOVABLE"
              : "NOT_ADDABLE";

      if (admissionProgramInfoData?.saleUnitType?.name === RESERVABLE_CAPACITY_TYPE.bed) {
        getAdmissionBedsList({
          uuid: params.id,
          pageNumber: 0,
          pageSize: 100,
          tab,
        });

        getAdmissionBedsListCount({
          uuid: params.id,
        });
      }

      if (
        admissionProgramInfoData?.saleUnitType?.name === RESERVABLE_CAPACITY_TYPE.building
      ) {
        getAdmissionBuildingsList({
          uuid: params.id,
          pageNumber: 0,
          pageSize: 100,
          tab,
        });

        getAdmissionBuildingsListCount({
          uuid: params.id,
        });
      }

      if (
        admissionProgramInfoData?.saleUnitType?.name === RESERVABLE_CAPACITY_TYPE.unit
      ) {
        getAdmissionUnitList({
          uuid: params.id,
          pageNumber: 0,
          pageSize: 100,
          tab,
        });

        getAdmissionUnitListCount({
          uuid: params.id,
        });
      }
    }
  }, [activeTab, admissionProgramInfoData]);

  //* ================================ Util Functions ================================

  const saleUnitTypeName = admissionProgramInfoData?.saleUnitType?.name;

  const capacitiesCountData =
    saleUnitTypeName === RESERVABLE_CAPACITY_TYPE.building
      ? admissionBuildingsListCountData
      : saleUnitTypeName === RESERVABLE_CAPACITY_TYPE.unit
        ? admissionUnitListCountData
        : admissionBedsListCountData;

  const openGroupAddHandler = () => {
    setModalIntent("add");

    setModalTarget({ kind: "group" });
  };

  const openGroupTransferHandler = () => {
    setModalIntent("transfer");

    setModalTarget({ kind: "group" });
  };

  const openGroupEditHandler = () => {
    setModalIntent("edit");

    setModalTarget({ kind: "group" });
  };

  const openGroupDeleteHandler = () => {
    setDeleteTarget({ kind: "group" });
  };

  const openSingleAddHandler = (record: AdmissionStepsCapacitiesRecord) => {
    setModalIntent("add");

    setModalTarget({ kind: "single", record });
  };

  const openSingleTransferHandler = (record: AdmissionStepsCapacitiesRecord) => {
    setModalIntent("transfer");

    setModalTarget({ kind: "single", record });
  };

  const openSingleEditHandler = (record: AdmissionStepsCapacitiesRecord) => {
    setModalIntent("edit");

    setModalTarget({ kind: "single", record });
  };

  const openSingleDeleteHandler = (record: AdmissionStepsCapacitiesRecord) => {
    setDeleteTarget({ kind: "single", record });
  };

  // حذف از این برنامه، ظرفیت را به «بدون برنامه» برمی‌گرداند (حتی اگر از تب «قابل انتقال» آمده باشد)
  const removeFromProgramHandler = (record: AdmissionStepsCapacitiesRecord) => {
    setThisProgramItems((prev) => prev.filter((item) => item.uuid !== record.uuid));

    setWithoutProgramItems((prev) => [...prev, record]);
  };

  // بر اساس نوع عملیات (ویرایش / انتقال / افزودن) و هدف (تکی / گروهی)، قیمت و ودیعه جدید اعمال
  // و ظرفیت‌ها بین لیست‌ها جابه‌جا می‌شوند؛ ودیعه فقط در صورت فعال بودن «دریافت ودیعه» ذخیره می‌شود
  const modalConfirmHandler = (/*values: AdmissionStepsCapacitiesAddFormType*/) => {
    if (!modalTarget) return;

    // const nextPrice = values.price ?? 0;

    // const nextDeposit = values.receiveDeposit ? (values.deposit ?? null) : null;

    // ویرایش تکی: فقط قیمت همان ظرفیت در «این برنامه» به‌روز می‌شود
    if (modalIntent === "edit" && modalTarget.kind === "single") {
      // setThisProgramItems((prev) =>
      //   prev.map((item) =>
      //     item.id === modalTarget.record.id
      //       ? { ...item, price: nextPrice, deposit: nextDeposit }
      //       : item
      //   )
      // );

      setModalTarget(null);
      return;
    }

    // ویرایش گروهی: قیمت همه ظرفیت‌های «این برنامه» یکسان می‌شود
    if (modalIntent === "edit" && modalTarget.kind === "group") {
      // setThisProgramItems((prev) =>
      //   prev.map((item) => ({
      //     ...item,
      //     price: nextPrice,
      //     deposit: nextDeposit,
      //   }))
      // );
      setModalTarget(null);
      return;
    }

    // انتقال: ظرفیت(ها) از «قابل انتقال» حذف و با قیمت جدید به «این برنامه» اضافه می‌شوند
    if (modalIntent === "transfer") {
      if (modalTarget.kind === "single") {
        // const updated = {
        //   ...modalTarget.record,
        //   price: nextPrice,
        //   deposit: nextDeposit,
        // };

        // setTransferableItems((prev) =>
        //   prev.filter((item) => item.id !== modalTarget.record.id)
        // );

        // setThisProgramItems((prev) => [...prev, updated]);
        setModalTarget(null);
        return;
      }

      // const updatedItems = transferableItems.map((item) => ({
      //   ...item,
      //   price: nextPrice,
      //   deposit: nextDeposit,
      // }));

      setTransferableItems([]);
      // setThisProgramItems((prev) => [...prev, ...updatedItems]);
      setModalTarget(null);
      return;
    }

    // افزودن تکی: اگر از تب «بدون برنامه» باشد از آن لیست حذف و به «این برنامه» اضافه می‌شود
    if (modalTarget.kind === "single") {
      // const updated = {
      //   ...modalTarget.record,
      //   price: nextPrice,
      //   deposit: nextDeposit,
      // };

      if (activeTab === ADMISSION_STEPS_CAPACITIES_TABS.withoutProgram) {
        // setWithoutProgramItems((prev) =>
        //   prev.filter((item) => item.id !== modalTarget.record.id)
        // );
      }
      // setThisProgramItems((prev) => [...prev, updated]);
      setModalTarget(null);
      return;
    }

    // افزودن گروهی: همه ظرفیت‌های «بدون برنامه» با قیمت جدید به «این برنامه» منتقل می‌شوند
    // const updatedItems = withoutProgramItems.map((item) => ({
    //   ...item,
    //   price: nextPrice,
    //   deposit: nextDeposit,
    // }));

    setWithoutProgramItems([]);
    // setThisProgramItems((prev) => [...prev, ...updatedItems]);
    setModalTarget(null);
  };

  const deleteConfirmHandler = () => {
    if (!deleteTarget) return;
    if (deleteTarget.kind === "single") {
      removeFromProgramHandler(deleteTarget.record);
      setDeleteTarget(null);
      return;
    }
    setWithoutProgramItems((prev) => [...prev, ...thisProgramItems]);
    setThisProgramItems([]);
    setDeleteTarget(null);
  };

  const items = [
    {
      key: ADMISSION_STEPS_CAPACITIES_TABS.withoutProgram,
      label: `ظرفیت‌های فاقد برنامه (${capacitiesCountData?.unassigned ?? "-"})`,
    },

    {
      key: ADMISSION_STEPS_CAPACITIES_TABS.thisProgram,
      label: `ظرفیت‌های این برنامه (${capacitiesCountData?.thisPlan ?? "-"})`,
    },

    {
      key: ADMISSION_STEPS_CAPACITIES_TABS.transferable,
      label: `ظرفیت‌های قابل انتقال (${capacitiesCountData?.movable ?? "-"})`,
    },

    {
      key: ADMISSION_STEPS_CAPACITIES_TABS.nonAddable,
      label: `ظرفیت‌های غیر قابل افزودن (${capacitiesCountData?.notAddable ?? "-"})`,
    },
  ];

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Form form={filterForm}>
        <AdmissionStepsCapacitiesFilters
          form={filterForm}
          admissionInfo={admissionProgramInfoData}
        />
      </Form>

      <Div
        loading={
          isGetAdmissionBedsListCountLoading ||
          isGetAdmissionBuildingsListCountLoading ||
          isGetAdmissionUnitListCountLoading
        }
        className="flex flex-1 flex-col gap-6"
      >
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as AdmissionStepsCapacitiesTabKey)}
          items={items}
        />

        <CustomAlert
          type={tabAlertType}
          showIcon
          className="border border-dashed! font-medium"
          title={getCapacitiesCreationTabAlertMessage({
            mode,
            tab: activeTab,
          })}
        />

        {canBulkAdd ? (
          <ToolBox
            leftSide={
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={openGroupAddHandler}
              >
                {getCapacitiesBulkAddLabel(hasFilter)}
              </CustomButton>
            }
          />
        ) : null}

        {canBulkTransfer ? (
          <ToolBox
            leftSide={
              <CustomButton
                type="primary"
                icon={<PiArrowsLeftRight />}
                onClick={openGroupTransferHandler}
              >
                {getCapacitiesBulkTransferLabel(hasFilter)}
              </CustomButton>
            }
          />
        ) : null}

        {canBulkManageProgram ? (
          <ToolBox
            leftSide={
              <div className="flex items-center gap-2">
                <CustomButton
                  type="dashed"
                  icon={<PiPencilSimpleLine />}
                  onClick={openGroupEditHandler}
                >
                  {getCapacitiesBulkEditLabel(hasFilter)}
                </CustomButton>

                <CustomButton
                  type="dashed"
                  danger
                  icon={<PiTrash />}
                  onClick={openGroupDeleteHandler}
                >
                  {getCapacitiesBulkDeleteLabel(hasFilter)}
                </CustomButton>
              </div>
            }
          />
        ) : null}

        {saleUnitTypeName === RESERVABLE_CAPACITY_TYPE.bed && (
          <CustomTable
            dataSource={admissionBedsListData?.content}
            rowKey="id"
            columns={AdmissionStepsCapacitiesBedTableModel({
              variant: activeTab,
              onAdd: (record) => openSingleAddHandler(record),
              onEditPrice: (record) => openSingleEditHandler(record),
              onRemove: (record) => openSingleDeleteHandler(record),
              onTransfer: (record) => openSingleTransferHandler(record),
            })}
            pagination={paginationConfig}
            loading={isGetAdmissionBedsListLoading}
          />
        )}

        {saleUnitTypeName === RESERVABLE_CAPACITY_TYPE.unit && (
          <CustomTable
            dataSource={admissionUnitListData?.content}
            rowKey="uuid"
            columns={AdmissionStepsCapacitiesUnitTableModel({
              variant: activeTab,
              onAdd: (record) => openSingleAddHandler(record),
              onEditPrice: (record) => openSingleEditHandler(record),
              onRemove: (record) => openSingleDeleteHandler(record),
              onTransfer: (record) => openSingleTransferHandler(record),
            })}
            pagination={paginationConfig}
            loading={isGetAdmissionUnitListLoading}
          />
        )}

        {saleUnitTypeName === RESERVABLE_CAPACITY_TYPE.building && (
          <CustomTable
            dataSource={admissionBuildingsListData?.content}
            rowKey="uuid"
            columns={AdmissionStepsCapacitiesBuildingTableModel({
              variant: activeTab,
              onAdd: (record) => openSingleAddHandler(record),
              onEditPrice: (record) => openSingleEditHandler(record),
              onRemove: (record) => openSingleDeleteHandler(record),
              onTransfer: (record) => openSingleTransferHandler(record),
            })}
            pagination={paginationConfig}
            loading={isGetAdmissionBuildingsListLoading}
          />
        )}
      </Div>
      <div className="mt-auto flex items-center justify-end gap-4 self-end">
        <CustomButton htmlType="button" onClick={onBack}>
          بازگشت
        </CustomButton>

        <CustomButton htmlType="button" onClick={onSaveDraft}>
          ثبت پیش‌نویس
        </CustomButton>

        <CustomButton
          type="primary"
          htmlType="button"
          icon={<AiOutlineArrowLeft />}
          iconPlacement="end"
          onClick={onSubmitAndContinue}
        >
          ثبت و ادامه
        </CustomButton>
      </div>

      <AdmissionStepsCapacitiesAddModal
        open={Boolean(modalTarget)}
        intent={modalIntent}
        target={modalTarget}
        context={modalContext}
        onCancel={() => setModalTarget(null)}
        onConfirm={modalConfirmHandler}
      />

      <AdmissionStepsCapacitiesDeleteModal
        open={Boolean(deleteTarget)}
        target={deleteTarget}
        context={modalContext}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteConfirmHandler}
      />
    </div>
  );
};

export default AdmissionStepsCapacitiesContent;

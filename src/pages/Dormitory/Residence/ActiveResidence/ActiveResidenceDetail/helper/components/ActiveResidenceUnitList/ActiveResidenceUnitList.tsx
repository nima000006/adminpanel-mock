import { useEffect, useState } from "react";

import { Dropdown, Form, MenuProps, Modal } from "antd";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useActiveResidenceUnitDeactivateMutation,
  useLazyGeActiveResidenceUnitListQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import ActiveResidenceDropDowns from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceDropDowns/ActiveResidenceDropDowns";
import {
  ActiveResidenceUnitListFormType,
  ActiveResidenceUnitListProps,
  getActiveResidenceUnitListContent,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/@types/@activeResidenceUnitListType";
import ArchiveUnitDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/drawer/ArchiveUnitDrawerContent/ArchiveUnitDrawerContent";
import ModifyUnitDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/drawer/ModifyUnitDrawerContent/ModifyUnitDrawerContent";
import ViewUnitDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/drawer/ViewUnitDrawerContent/ViewUnitDrawerContent";
import DisableUnitModalContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/modal/DisableUnitModalContent/DisableUnitModalContent";
import ActiveResidenceUnitListTableModel from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/model/ActiveResidenceUnitListTableModel";
import { RESIDENCE_ACTIVE_DETAIL_TABS_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

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

const ActiveResidenceUnitList = ({ form }: ActiveResidenceUnitListProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isModifyDrawerOpen, setIsModifyDrawerOpen] = useState({
    isOpen: false,
    id: "-1",
  });
  const [isViewDrawerOpen, setIsviewDrawerOpen] = useState({ isOpen: false, id: "-1" });
  const [isDisableUnitModalOpen, setIsDisableUnitModalOpen] = useState<{
    isOpen: boolean;
    data?: getActiveResidenceUnitListContent;
  }>({
    isOpen: false,
  });
  const [isArchiveDrawerOpen, setIsArchiveDrawerOpen] = useState({
    isOpen: false,
    id: "-1",
  });
  const [disableForm] = Form.useForm<ActiveResidenceUnitListFormType>();

  const building = Form?.useWatch("building", form);
  const floor = Form?.useWatch("floor", form);

  const isActionsDisabled = !building || !floor;

  const disableUnit = true; // صرفا برای پیاده سازی حالت های مودال میباشد. در زمان کانکت ای پی ای برداشته شود.

  //? ================================  Api Calls ================================
  const [getUnitList, { data: unitListData, isFetching: isUnitListLoading }] =
    useLazyGeActiveResidenceUnitListQuery();

  // deactivate
  const [deactivateUnit, { isLoading: isDeactivateUnitLoading }] =
    useActiveResidenceUnitDeactivateMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    //  skip list while drawer is open
    if (isArchiveDrawerOpen.isOpen) return;

    getUnitListHandler();
  }, [floor?.value, url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const getUnitListHandler = () => {
    if (!floor?.value) return;

    const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

    getUnitList({
      uuid: floor.value,
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        ...(sorting?.sortBy && { sortBy: sorting.sortBy }),
        ...(sorting?.sortOrder && {
          sortDirection: String(sorting.sortOrder).toUpperCase(),
        }),
      },
    });
  };

  // MODIFY
  const createResidenceUnit = () => {
    setIsModifyDrawerOpen({ isOpen: true, id: "-1" });
  };

  const editUnitClickHandler = (id: string) => {
    setIsModifyDrawerOpen({ isOpen: true, id });
  };

  const closeModifyDrawerHandler = () => {
    setIsModifyDrawerOpen({ isOpen: false, id: "-1" });
  };

  // VIEW
  const viewUnitHandler = (id: string) => {
    setIsviewDrawerOpen({ isOpen: true, id });
  };

  const closeViewDrawerHandler = () => {
    setIsviewDrawerOpen({ isOpen: false, id: "-1" });
  };

  const viewBedHandler = () => {
    form.resetFields();
    setSearchParams({ ...url, status: RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.bed });
  };

  // ARCHIVE
  const viewArchiveHandler = (id: string) => {
    setIsArchiveDrawerOpen({ isOpen: true, id });
  };

  const closeArchiveDrawerHandler = () => {
    setIsArchiveDrawerOpen({ isOpen: false, id: "-1" });

    const { archivePage, archivePageSize, sortings, ...rest } = url;
    setSearchParams(rest);
  };

  // DISABLE
  const disableUnitHandler = (record: getActiveResidenceUnitListContent) => {
    setIsDisableUnitModalOpen({ isOpen: true, data: record });
  };

  const CloseDisableUnitModalHandler = () => {
    setIsDisableUnitModalOpen({ isOpen: false, data: undefined });
    disableForm?.setFieldsValue({ reason: undefined });
  };

  const confirmDisableUnitHandler = () => {
    deactivateUnit({
      uuid: isDisableUnitModalOpen?.data?.uuid ?? "",
      params: {
        reasonUuid: disableForm?.getFieldValue("reason")?.value ?? "",
      },
    })
      .unwrap()
      .then(confirmDisableUnitHandlerOnSuccess);
  };

  // confirm disable unit on success
  const confirmDisableUnitHandlerOnSuccess = () => {
    CloseDisableUnitModalHandler();
    getUnitListHandler();
  };

  // table column
  const column = ActiveResidenceUnitListTableModel({
    editUnitClickHandler,
    viewUnitHandler,
    disableUnitHandler,
    viewBedHandler,
  });

  const hasUnits = (unitListData?.content?.length ?? 0) > 0;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* MODIFY UNIT */}
      {isModifyDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeModifyDrawerHandler}
          open={isModifyDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ModifyUnitDrawerContent
              closeDrawerHandler={closeModifyDrawerHandler}
              getUnitListHandler={getUnitListHandler}
              id={isModifyDrawerOpen?.id}
              floor={floor}
              buildingTitle={building?.title ?? ""}
            />
          }
        />
      )}

      {/* VIEW UNIT */}
      {isViewDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeViewDrawerHandler}
          open={isViewDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ViewUnitDrawerContent
              closeDrawerHandler={closeViewDrawerHandler}
              buildingTitle={building?.title ?? ""}
              floorTitle={floor?.title ?? ""}
              id={isViewDrawerOpen?.id}
            />
          }
        />
      )}

      {/* ARCHIVE */}
      {isArchiveDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeArchiveDrawerHandler}
          open={isArchiveDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ArchiveUnitDrawerContent
              closeDrawerHandler={closeArchiveDrawerHandler}
              id={isArchiveDrawerOpen?.id}
              buildingTitle={building?.title ?? ""}
              floorTitle={floor?.title ?? ""}
            />
          }
        />
      )}

      {/* UNIT DISABLE */}
      {isDisableUnitModalOpen?.isOpen && (
        <Modal
          title="غیر فعالسازی واحد اقامتی"
          open={isDisableUnitModalOpen?.isOpen}
          onCancel={CloseDisableUnitModalHandler}
          confirmLoading={isDeactivateUnitLoading}
          footer={
            disableUnit ? (
              <>
                <CustomButton onClick={CloseDisableUnitModalHandler}>انصراف</CustomButton>
                <CustomButton type="primary" danger onClick={confirmDisableUnitHandler}>
                  تایید و غیرفعالسازی
                </CustomButton>
              </>
            ) : null
          }
          width={500}
        >
          <DisableUnitModalContent
            disableUnit={disableUnit}
            data={isDisableUnitModalOpen?.data}
            form={disableForm}
          />
        </Modal>
      )}

      <div>
        <ActiveResidenceDropDowns form={form} />

        <div className="flex flex-col gap-6">
          <ToolBox
            leftSide={
              <div className="flex flex-wrap gap-2">
                <CustomButton
                  type="primary"
                  ghost
                  icon={<FiArchive />}
                  onClick={() => viewArchiveHandler(floor?.value ?? "-1")}
                  disabled={isActionsDisabled}
                >
                  آرشیو
                </CustomButton>

                <CustomButton
                  type="primary"
                  icon={<AiOutlinePlus />}
                  onClick={createResidenceUnit}
                  disabled={isActionsDisabled}
                >
                  ایجاد واحد اقامتی
                </CustomButton>

                <Dropdown menu={exportMenu} trigger={["click"]}>
                  <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                    خروجی
                  </CustomButton>
                </Dropdown>
              </div>
            }
          />

          {isActionsDisabled ? (
            <CustomEmpty
              description={
                <div className="flex flex-col">
                  <span>واحد اقامتی برای نمایش وجود ندارد!</span>
                  <span>لطفاً ساختمان و طبقه را مشخص بفرمایید.</span>
                </div>
              }
            />
          ) : hasUnits ? (
            <CustomTable<getActiveResidenceUnitListContent>
              dataSource={unitListData?.content}
              loading={isUnitListLoading}
              columns={column}
              rowKey="uuid"
              draggableColumns
              draggableId={ExcelCodes.DORMITORY_ACTIVE_RESIDENCE_UNIT_LIST_TABLE}
              pagination={manualPaginationConfig({
                total: unitListData?.totalElements || 0,
                onChange: (page, pageSize) => {
                  setSearchParams({
                    ...url,
                    page: page?.toString(),
                    pageSize: pageSize?.toString(),
                  });
                },
              })}
              key={`table-${url?.pageSize || "8"}`}
            />
          ) : (
            <CustomEmpty description="هنوز واحد اقامتی ایجاد نکرده‌اید!" />
          )}
        </div>
      </div>
    </>
  );
};
export default ActiveResidenceUnitList;

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
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useActiveResidenceFloorDeactivateMutation,
  useLazyGeActiveResidenceFloorListQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import ActiveResidenceDropDowns from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceDropDowns/ActiveResidenceDropDowns";
import {
  ActiveResidenceFloorListFormType,
  ActiveResidenceFloorListProps,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/@types/@activeResidenceFloorListTypes";
import { getActiveResidenceFloorListContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/@types/@activeResidenceFloorListTypes";
import ArchiveFloorDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/drawer/ArchiveFloorDrawerContent/ArchiveFloorDrawerContent";
import ModifyFloorDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/drawer/ModifyFloorDrawerContent/ModifyFloorDrawerContent";
import ViewFloorDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/drawer/ViewFloorDrawerContent/ViewFloorDrawerContent";
import DisableFloorModalContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/modal/DisableFloorModalContent/DisableFloorModalContent";
import ActiveResidenceFloorListTableModel from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/model/ActiveResidenceFloorListTableModel";
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

const ActiveResidenceFloorList = ({ form }: ActiveResidenceFloorListProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  const [isArchiveDrawerOpen, setIsArchiveDrawerOpen] = useState({
    isOpen: false,
    id: "-1",
  });
  const [isModifyDrawerOpen, setIsModifyDrawerOpen] = useState({
    isOpen: false,
    id: "-1",
  });
  const [isViewDrawerOpen, setIsviewDrawerOpen] = useState({ isOpen: false, id: "-1" });
  const [isDisableFloorModalOpen, setIsDisableFloorModalOpen] = useState<{
    isOpen: boolean;
    data?: getActiveResidenceFloorListContent;
  }>({
    isOpen: false,
  });
  const [disableForm] = Form.useForm<ActiveResidenceFloorListFormType>();

  const building = Form?.useWatch("building", form);
  const isActionsDisabled = !building;

  const disableFloor = true; // صرفا برای پیاده سازی حالت های مودال میباشد. در زمان کانکت ای پی ای برداشته شود.

  //? ================================  Api Calls ================================
  // list
  const [getFloorList, { data: floorListData, isFetching: isFloorListLoading }] =
    useLazyGeActiveResidenceFloorListQuery();

  // deactivate
  const [deactivateFloor, { isLoading: isDeactivateLoading }] =
    useActiveResidenceFloorDeactivateMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    // skip list while drawer is open
    if (isArchiveDrawerOpen.isOpen) return;

    getFloorListHandler();
  }, [building?.value, url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const getFloorListHandler = () => {
    if (!building?.value) return;

    const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

    getFloorList({
      uuid: building.value,
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
  const createFloor = () => {
    setIsModifyDrawerOpen({ isOpen: true, id: "-1" });
  };

  const editFloorClickHandler = (id: string) => {
    setIsModifyDrawerOpen({ isOpen: true, id });
  };

  const closeModifyDrawerHandler = () => {
    setIsModifyDrawerOpen({ isOpen: false, id: "-1" });

    const { amenityPage, amenityPageSize, ...rest } = url;
    setSearchParams(rest);
  };

  // VIEW
  const viewFloorHandler = (id: string) => {
    setIsviewDrawerOpen({ isOpen: true, id });
  };

  const closeViewDrawerHandler = () => {
    setIsviewDrawerOpen({ isOpen: false, id: "-1" });
  };

  const viewUnitHandler = () => {
    form.resetFields();
    setSearchParams({ ...url, status: RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.unit });
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
  const disableFloorHandler = (record: getActiveResidenceFloorListContent) => {
    setIsDisableFloorModalOpen({ isOpen: true, data: record });
  };

  const CloseDisableFloorModalHandler = () => {
    setIsDisableFloorModalOpen({ isOpen: false, data: undefined });
    disableForm?.setFieldsValue({ reason: undefined });
  };

  const confirmDisableFloorHandler = () => {
    deactivateFloor({
      uuid: isDisableFloorModalOpen?.data?.uuid ?? "",
      params: {
        reasonUuid: disableForm?.getFieldValue("reason")?.value ?? "",
      },
    })
      .unwrap()
      .then(confirmDisableFloorHandlerOnSuccess);
  };

  // confirm disable floor on success
  const confirmDisableFloorHandlerOnSuccess = () => {
    CloseDisableFloorModalHandler();
    getFloorListHandler();
  };

  // table column
  const column = ActiveResidenceFloorListTableModel({
    editFloorClickHandler,
    viewFloorHandler,
    disableFloorHandler,
    viewUnitHandler,
  });

  const hasFloors = (floorListData?.content?.length ?? 0) > 0;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* MODIFY FLOOR */}
      {isModifyDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeModifyDrawerHandler}
          open={isModifyDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ModifyFloorDrawerContent
              closeDrawerHandler={closeModifyDrawerHandler}
              id={isModifyDrawerOpen?.id}
              building={building}
              getFloorListHandler={getFloorListHandler}
            />
          }
        />
      )}

      {/* VIEW FLOOR */}
      {isViewDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeViewDrawerHandler}
          open={isViewDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ViewFloorDrawerContent
              closeDrawerHandler={closeViewDrawerHandler}
              id={isViewDrawerOpen?.id}
              buildingTitle={building?.title}
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
            <ArchiveFloorDrawerContent
              closeDrawerHandler={closeArchiveDrawerHandler}
              id={isArchiveDrawerOpen?.id}
              buildingTitle={building?.title}
            />
          }
        />
      )}

      {/* FLOOR DISABLE */}
      {isDisableFloorModalOpen?.isOpen && (
        <Modal
          title="غیر فعالسازی طبقه"
          open={isDisableFloorModalOpen?.isOpen}
          onCancel={CloseDisableFloorModalHandler}
          confirmLoading={isDeactivateLoading}
          footer={
            disableFloor ? (
              <>
                <CustomButton type="default" onClick={CloseDisableFloorModalHandler}>
                  انصراف
                </CustomButton>
                <CustomButton
                  type="primary"
                  danger
                  loading={false}
                  onClick={confirmDisableFloorHandler}
                >
                  تایید و غیرفعالسازی
                </CustomButton>
              </>
            ) : null
          }
          width={500}
        >
          <DisableFloorModalContent
            disableFloor={disableFloor}
            data={isDisableFloorModalOpen?.data ?? undefined}
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
                  onClick={() => viewArchiveHandler(building?.value ?? "-1")}
                  disabled={isActionsDisabled}
                >
                  آرشیو
                </CustomButton>

                <CustomButton
                  type="primary"
                  icon={<AiOutlinePlus />}
                  onClick={createFloor}
                  disabled={isActionsDisabled}
                >
                  ایجاد طبقه
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
                  <span>لطفاً ساختمان را مشخص بفرمایید.</span>
                </div>
              }
            />
          ) : hasFloors ? (
            <CustomTable<getActiveResidenceFloorListContent>
              dataSource={floorListData?.content}
              loading={isFloorListLoading}
              columns={column}
              rowKey="uuid"
              draggableColumns
              draggableId={ExcelCodes.DORMITORY_ACTIVE_RESIDENCE_FLOOR_LIST_TABLE}
              pagination={paginationConfig}
              key={`table-${url?.pageSize || "8"}`}
            />
          ) : (
            <CustomEmpty description="هنوز طبقه ای ایجاد نکرده‌اید!" />
          )}
        </div>
      </div>
    </>
  );
};
export default ActiveResidenceFloorList;

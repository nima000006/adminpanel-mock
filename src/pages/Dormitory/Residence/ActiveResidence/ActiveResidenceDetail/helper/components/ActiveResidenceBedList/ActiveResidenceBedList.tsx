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
  useActiveResidenceBedDeactivateMutation,
  useLazyGeActiveResidenceBedListQuery,
  useLazyGetActiveResidenceBedDetailQuery,
  useLazyGetBedTypeQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  ActiveResidenceBedListFormType,
  ActiveResidenceBedListProps,
  getActiveResidenceBedDetailResponse,
  getActiveResidenceBedListContent,
  GetBedTypeResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/@types/@activeResidenceBedListType";
import ArchiveBedDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/drawer/ArchiveBedDrawerContent/ArchiveBedDrawerContent";
import ModifyBedDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/drawer/ModifyBedDrawerContent/ModifyBedDrawerContent";
import ViewBedDetailDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/drawer/ViewBedDetailDrawerContent/ViewBedDetailDrawerContent";
import CreateBedModalContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/modal/CreateBedModalContent/CreateBedModalContent";
import DisableBedModalContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/modal/DisableBedModalContent/DisableBedModalContent";
import ActiveBedListTableModel from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/model/ActiveBedListTableModel";
import ActiveResidenceDropDowns from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceDropDowns/ActiveResidenceDropDowns";

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

const ActiveResidenceBedList = ({ form }: ActiveResidenceBedListProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  const [isCreateBedModalOpen, setIsCreateBedModalOpen] = useState(false);

  const [isModifyDrawerOpen, setIsModifyDrawerOpen] = useState({
    isOpen: false,
    id: "-1",
  });
  const [isViewDrawerOpen, setIsviewDrawerOpen] = useState({ isOpen: false, id: "-1" });
  const [isArchiveDrawerOpen, setIsArchiveDrawerOpen] = useState({
    isOpen: false,
    id: "-1",
  });
  const [isDisableBedModalOpen, setIsDisableBedModalOpen] = useState<{
    isOpen: boolean;
    uuid?: string;
  }>({
    isOpen: false,
  });
  const [bedDetailData, setBedDetailData] = useState<
    getActiveResidenceBedDetailResponse | undefined
  >();
  const [bedTypeList, setBedTypeList] = useState<GetBedTypeResponse>([]);

  const [disableForm] = Form.useForm<ActiveResidenceBedListFormType>();

  const building = Form?.useWatch("building", form);
  const floor = Form?.useWatch("floor", form);
  const unit = Form?.useWatch("unit", form);

  const isActionsDisabled = !building || !floor || !unit;

  const disableBed = true; // صرفا برای پیاده سازی حالت های مودال میباشد. در زمان کانکت ای پی ای برداشته شود.

  //? ================================  Api Calls ================================
  // list
  const [getBedList, { data: bedListData, isFetching: isBedListLoading }] =
    useLazyGeActiveResidenceBedListQuery();

  // detail
  const [getBedDetail, { isFetching: isBedDetailLoading }] =
    useLazyGetActiveResidenceBedDetailQuery();

  // deactivate
  const [deactivateBed, { isLoading: isDeactivateBedLoading }] =
    useActiveResidenceBedDeactivateMutation();

  // bed type
  const [getBedType, { isFetching: isGetBedTypeLoading }] = useLazyGetBedTypeQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    //  skip list while drawer is open
    if (isArchiveDrawerOpen.isOpen) return;

    getBedListHandler();
  }, [unit?.value, url?.page, url?.pageSize, url?.sortings]);

  // bed type
  useEffect(() => {
    if (!isCreateBedModalOpen && !isModifyDrawerOpen.isOpen) return;
    if (bedTypeList.length > 0) return;

    getBedType()
      .unwrap()
      .then((res: GetBedTypeResponse) => {
        setBedTypeList(res ?? []);
      });
  }, [isCreateBedModalOpen, isModifyDrawerOpen.isOpen]);

  //* ================================ Util Functions ================================
  //list
  const getBedListHandler = () => {
    if (!unit?.value) return;

    const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

    getBedList({
      uuid: unit.value,
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

  // detail
  const getBedDetailHandler = (uuid: string) => {
    if (!uuid) return;

    return getBedDetail(uuid)
      .unwrap()
      .then((res: getActiveResidenceBedDetailResponse) => {
        setBedDetailData(res);
        return res;
      });
  };

  // Create
  const createBedHandler = () => {
    setIsCreateBedModalOpen(true);
  };

  const CloseCreateBedModalHandler = () => {
    setIsCreateBedModalOpen(false);
  };

  // MODIFY
  const editBedClickHandler = (record: getActiveResidenceBedListContent) => {
    setIsModifyDrawerOpen({ isOpen: true, id: record?.uuid });
    setSearchParams({ ...url, bedStatus: record?.bedType?.name });
  };

  const closeModifyDrawerHandler = () => {
    setIsModifyDrawerOpen({ isOpen: false, id: "-1" });
    CloseCreateBedModalHandler();

    const { bedStatus, ...rest } = url;
    setSearchParams(rest); // حذف بعد از بستن مودال
  };

  // VIEW
  const viewBedDetailHandler = (record: getActiveResidenceBedListContent) => {
    getBedDetailHandler(record.uuid)?.then((res: getActiveResidenceBedDetailResponse) => {
      setBedDetailData(res);
      setIsviewDrawerOpen({ isOpen: true, id: record.uuid });
    });
  };

  const closeViewDrawerHandler = () => {
    setIsviewDrawerOpen({ isOpen: false, id: "-1" });
    setBedDetailData(undefined);
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
  const disableBedHandler = (record: getActiveResidenceBedListContent) => {
    getBedDetailHandler(record.uuid)?.then(() => {
      setIsDisableBedModalOpen({ isOpen: true, uuid: record.uuid });
    });
  };

  const CloseDisableBedModalHandler = () => {
    setIsDisableBedModalOpen({ isOpen: false, uuid: undefined });
    setBedDetailData(undefined);
    disableForm?.setFieldsValue({ reason: undefined });
  };

  const confirmDisableBedHandler = () => {
    deactivateBed({
      uuid: isDisableBedModalOpen?.uuid ?? "",
      params: {
        reasonUuid: disableForm?.getFieldValue("reason")?.value ?? "",
      },
    })
      .unwrap()
      .then(confirmDisableBedHandlerOnSuccess);
  };

  // confirm disable bed on success
  const confirmDisableBedHandlerOnSuccess = () => {
    CloseDisableBedModalHandler();
    getBedListHandler();
  };

  // table column
  const column = ActiveBedListTableModel({
    editBedClickHandler,
    viewBedDetailHandler,
    disableBedHandler,
  });

  const hasBeds = (bedListData?.content?.length ?? 0) > 0;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* CREATE MODAL */}
      {isCreateBedModalOpen && (
        <Modal
          title="انتخاب نوع تخت"
          open={isCreateBedModalOpen}
          onCancel={CloseCreateBedModalHandler}
          width={800}
          footer={null}
        >
          <CreateBedModalContent
            setIsModifyDrawerOpen={setIsModifyDrawerOpen}
            bedTypeList={bedTypeList}
            isGetBedTypeLoading={isGetBedTypeLoading}
          />
        </Modal>
      )}

      {/* MODIFY BED */}
      {isModifyDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeModifyDrawerHandler}
          open={isModifyDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ModifyBedDrawerContent
              closeModifyDrawerHandler={closeModifyDrawerHandler}
              getBedListHandler={getBedListHandler}
              getBedDetailHandler={getBedDetailHandler}
              id={isModifyDrawerOpen?.id}
              unitUuid={unit?.value ?? ""}
              buildingTitle={building?.title ?? ""}
              floorTitle={floor?.title ?? ""}
              unitTitle={unit?.title ?? ""}
              bedTypeList={bedTypeList}
            />
          }
        />
      )}

      {/* VIEW BED DETAIL */}
      {isViewDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeViewDrawerHandler}
          open={isViewDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ViewBedDetailDrawerContent
              closeViewDrawerHandler={closeViewDrawerHandler}
              data={bedDetailData}
              loading={isBedDetailLoading}
              buildingTitle={building?.title ?? ""}
              floorTitle={floor?.title ?? ""}
              unitTitle={unit?.title ?? ""}
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
            <ArchiveBedDrawerContent
              closeDrawerHandler={closeArchiveDrawerHandler}
              id={isArchiveDrawerOpen?.id}
              buildingTitle={building?.title ?? ""}
              floorTitle={floor?.title ?? ""}
              unitTitle={unit?.title ?? ""}
            />
          }
        />
      )}

      {/* BED DISABLE */}
      {isDisableBedModalOpen?.isOpen && (
        <Modal
          title="غیر فعالسازی تخت"
          open={isDisableBedModalOpen?.isOpen}
          onCancel={CloseDisableBedModalHandler}
          confirmLoading={isDeactivateBedLoading}
          footer={
            disableBed ? (
              <>
                <CustomButton onClick={CloseDisableBedModalHandler}>انصراف</CustomButton>
                <CustomButton type="primary" danger onClick={confirmDisableBedHandler}>
                  تایید و غیرفعالسازی
                </CustomButton>
              </>
            ) : null
          }
          width={500}
        >
          <DisableBedModalContent
            disableBed={disableBed}
            data={bedDetailData}
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
                  onClick={() => viewArchiveHandler(unit?.value ?? "-1")}
                  disabled={isActionsDisabled}
                >
                  آرشیو
                </CustomButton>

                <CustomButton
                  type="primary"
                  icon={<AiOutlinePlus />}
                  onClick={createBedHandler}
                  disabled={isActionsDisabled}
                >
                  ایجاد تخت
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
                  <span> تختی برای نمایش وجود ندارد!</span>
                  <span>لطفاً ساختمان، طبقه و واحد اقامتی را مشخص بفرمایید.</span>
                </div>
              }
            />
          ) : hasBeds ? (
            <CustomTable<getActiveResidenceBedListContent>
              dataSource={bedListData?.content ?? []}
              loading={isBedListLoading}
              columns={column}
              rowKey="uuid"
              draggableColumns
              draggableId={ExcelCodes.DORMITORY_ACTIVE_BED_LIST_TABLE}
              pagination={manualPaginationConfig({
                total: bedListData?.totalElements || 0,
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
            <CustomEmpty description="هنوز  تختی ایجاد نکرده‌اید!" />
          )}
        </div>
      </div>
    </>
  );
};
export default ActiveResidenceBedList;

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
  useMyActiveResidenceBuildingDeactivateMutation,
  useLazyGeMyActiveResidenceBuildingListQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  MyActiveResidenceBuildingListFormType,
  getMyActiveResidenceBuildingListContent,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/@types/@myActiveResidenceBuildingListTypes";
import MyArchiveBuildingDrawerContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/drawer/MyArchiveBuildingDrawerContent/MyArchiveBuildingDrawerContent";
import MyModifyBuildingDrawerContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/drawer/MyModifyBuildingDrawerContent/MyModifyBuildingDrawerContent";
import MyViewBuildingDrawerContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/drawer/MyViewBuildingDrawerContent/MyViewBuildingDrawerContent";
import MyDisableBuildingModalContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/modal/MyDisableBuildingModalContent/MyDisableBuildingModalContent";
import MyActiveResidenceBuildingListTableModel from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/model/MyActiveResidenceBuildingListTableModel";
import { RESIDENCE_ACTIVE_DETAIL_TABS_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

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

const MyActiveResidenceBuildingList = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isModifyDrawerOpen, setIsModifyDrawerOpen] = useState({
    isOpen: false,
    id: "-1",
  });
  const [isViewDrawerOpen, setIsviewDrawerOpen] = useState({ isOpen: false, id: "-1" });
  const [isArchiveDrawerOpen, setIsArchiveDrawerOpen] = useState({
    isOpen: false,
    id: "-1",
  });
  const [isDisableBuildingModalOpen, setIsDisableBuildingModalOpen] = useState<{
    isOpen: boolean;
    data?: getMyActiveResidenceBuildingListContent;
  }>({
    isOpen: false,
  });
  const [disableForm] = Form.useForm<MyActiveResidenceBuildingListFormType>();

  const disableBuilding = true; // صرفا برای پیاده سازی حالت های مودال میباشد. در زمان کانکت ای پی ای برداشته شود.

  //? ================================  Api Calls ================================
  const [getBuildingList, { data: buildingListData, isFetching: isBuildingListLoading }] =
    useLazyGeMyActiveResidenceBuildingListQuery();

  // deactivate
  const [deactivateBuilding, { isLoading: isDeactivateBuildingLoading }] =
    useMyActiveResidenceBuildingDeactivateMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    // skip list while drawer is open
    if (isArchiveDrawerOpen.isOpen) return;

    getBuildingListHandler();
  }, [url?.residenceId, url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const getBuildingListHandler = () => {
    if (!url?.residenceId) return;

    const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

    getBuildingList({
      uuid: url?.residenceId,
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
  const createBuilding = () => {
    setIsModifyDrawerOpen({ isOpen: true, id: "-1" });
  };

  const editBuildingClickHandler = (id: string) => {
    setIsModifyDrawerOpen({ isOpen: true, id });
  };

  const closeModifyDrawerHandler = () => {
    setIsModifyDrawerOpen({ isOpen: false, id: "-1" });

    const { amenityPage, amenityPageSize, ...rest } = url;
    setSearchParams(rest);
  };

  // VIEW
  const viewBuildingHandler = (id: string) => {
    setIsviewDrawerOpen({ isOpen: true, id });
  };

  const closeViewDrawerHandler = () => {
    setIsviewDrawerOpen({ isOpen: false, id: "-1" });
  };

  const viewFloorHandler = (_id: string) => {
    setSearchParams({ ...url, status: RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.floor });
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
  const disableBuildingHandler = (record: getMyActiveResidenceBuildingListContent) => {
    setIsDisableBuildingModalOpen({ isOpen: true, data: record });
  };

  const CloseDisableBuildingModalHandler = () => {
    setIsDisableBuildingModalOpen({ isOpen: false, data: undefined });
    disableForm?.setFieldsValue({ reason: undefined });
  };

  const confirmDisableBuildingHandler = () => {
    deactivateBuilding({
      uuid: isDisableBuildingModalOpen?.data?.uuid ?? "",
      params: {
        reasonUuid: disableForm?.getFieldValue("reason")?.value ?? "",
      },
    })
      .unwrap()
      .then(confirmDisableBuildingHandlerOnSuccess);
  };

  // confirm disable building on success
  const confirmDisableBuildingHandlerOnSuccess = () => {
    CloseDisableBuildingModalHandler();
    getBuildingListHandler();
  };

  // table column
  const column = MyActiveResidenceBuildingListTableModel({
    editBuildingClickHandler,
    viewBuildingHandler,
    disableBuildingHandler,
    viewFloorHandler,
  });

  const hasBuildings = (buildingListData?.content?.length ?? 0) > 0;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* MODIFY RESIDENCE */}
      {isModifyDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeModifyDrawerHandler}
          open={isModifyDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <MyModifyBuildingDrawerContent
              closeDrawerHandler={closeModifyDrawerHandler}
              getBuildingListHandler={getBuildingListHandler}
              id={isModifyDrawerOpen?.id}
            />
          }
        />
      )}

      {/* VIEW BUILDING */}
      {isViewDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeViewDrawerHandler}
          open={isViewDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <MyViewBuildingDrawerContent
              closeDrawerHandler={closeViewDrawerHandler}
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
            <MyArchiveBuildingDrawerContent
              closeDrawerHandler={closeArchiveDrawerHandler}
              id={isArchiveDrawerOpen?.id}
            />
          }
        />
      )}

      {/* BUILDING DISABLE */}
      {isDisableBuildingModalOpen?.isOpen && (
        <Modal
          title="غیر فعالسازی ساختمان"
          open={isDisableBuildingModalOpen?.isOpen}
          onCancel={CloseDisableBuildingModalHandler}
          confirmLoading={isDeactivateBuildingLoading}
          footer={
            disableBuilding ? (
              <>
                <CustomButton onClick={CloseDisableBuildingModalHandler}>
                  انصراف
                </CustomButton>
                <CustomButton
                  type="primary"
                  danger
                  onClick={confirmDisableBuildingHandler}
                >
                  تایید و غیرفعالسازی
                </CustomButton>
              </>
            ) : null
          }
          width={500}
        >
          <MyDisableBuildingModalContent
            disableBuilding={disableBuilding}
            data={isDisableBuildingModalOpen?.data}
            form={disableForm}
          />
        </Modal>
      )}

      <div className="flex flex-col gap-6">
        <ToolBox
          leftSide={
            <div className="flex flex-wrap gap-2">
              <CustomButton
                type="primary"
                ghost
                icon={<FiArchive />}
                onClick={() => viewArchiveHandler(url?.residenceId ?? "")}
              >
                آرشیو
              </CustomButton>

              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={createBuilding}
              >
                ایجاد ساختمان
              </CustomButton>

              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                  خروجی
                </CustomButton>
              </Dropdown>
            </div>
          }
        />
        {hasBuildings ? (
          <CustomTable<getMyActiveResidenceBuildingListContent>
            dataSource={buildingListData?.content}
            loading={isBuildingListLoading}
            columns={column}
            rowKey="uuid"
            draggableColumns
            draggableId={ExcelCodes.DORMITORY_ACTIVE_RESIDENCE_BUILDING_LIST_TABLE}
            pagination={manualPaginationConfig({
              total: buildingListData?.totalElements || 0,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...url,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.page ? Number(url.page) : 1,
              defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
            })}
            key={`table-${url?.pageSize || "8"}`}
          />
        ) : (
          <CustomEmpty description="هنوز ساختمانی ایجاد نکرده‌اید!" />
        )}
      </div>
    </>
  );
};
export default MyActiveResidenceBuildingList;

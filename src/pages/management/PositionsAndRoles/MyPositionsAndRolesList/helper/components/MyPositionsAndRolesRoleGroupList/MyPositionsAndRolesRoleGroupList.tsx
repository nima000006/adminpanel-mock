import { useCallback, useEffect, useMemo, useState } from "react";

import { Dropdown, MenuProps } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSearchBox from "@components/CustomInputs/CustomSearchBox/CustomSearchBox";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { convertSearchText } from "@infra/helpers/TableHelpers/utils/convertSearchText";
import { makeSearchParams } from "@infra/helpers/utils";
import {
  useLazyMyManagementRolesGroupsListsQuery,
  useMyManagementActivateRolesGroupsMutation,
  useMyManagementDeactivateRolesGroupsMutation,
} from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { USER_INFO_CHANGED_SUCCESSFULLY } from "@infra/VARS/globalToasts/globalToasts";

import {
  MyManagementRolesGroupsResponse,
  MyPositionsAndRolesRoleGroupListProps,
  MyRoleGroup,
} from "./@types/@MypositionsAndRolesRoleGroupList";
import ModifyMyRoleGroupContent from "./helper/components/drawers/ModifyMyRoleGroupContent/ModifyMyRoleGroupContent";
import MyRolesOfGroups from "./helper/components/drawers/MyRolesOfGroups/MyRolesOfGroups";
import MyInActiveRoleGroupsRequestModalContent from "./helper/components/MyInActiveRoleGroupsRequestModalContent/MyInActiveRoleGroupsRequestModalContent";
import MyPositionsAndRolesRoleGroupListTableModel from "./helper/models/MyPositionsAndRolesRoleGroupListTableModel/MyPositionsAndRolesRoleGroupListTableModel";

const MyPositionsAndRolesRoleGroupList = ({
  activeTab,
}: MyPositionsAndRolesRoleGroupListProps) => {
  const [listData, setListData] = useState<MyManagementRolesGroupsResponse>([]);

  const [isEditRoleDrawerOpen, setIsEditRoleDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [searchValue, setSearchValue] = useState("");

  const [deactivateModal, setDeactivateModal] = useState<{
    isOpen: boolean;
    groupName: string | null;
  }>({ isOpen: false, groupName: null });

  const [isOverRideRoleGroupDrawerOpen, setIsOverRideRoleGroupDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const navigate = useNavigate();

  const exportMenu: MenuProps = {
    items: [
      { label: "خروجی Excel", key: "excel" },
      { label: "خروجی PDF", key: "pdf" },
    ],
  };

  //? ================================ Api ================================
  const [getRoleGroupList, { isFetching: fetchingRoleGroups }] =
    useLazyMyManagementRolesGroupsListsQuery();

  const [activateRolesGroup, { isLoading: activating }] =
    useMyManagementActivateRolesGroupsMutation();
  const [deactivateRolesGroup, { isLoading: deactivating }] =
    useMyManagementDeactivateRolesGroupsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, []);

  //* ================================ Util Functions ================================
  const getListData = () => {
    getRoleGroupList()
      .unwrap()
      .then((value) => setListData(value));
  };

  const filteredData = useMemo(() => {
    if (!searchValue) return listData;

    const normalizedSearch = convertSearchText(searchValue).toString().toLowerCase();

    return listData.filter((item) => {
      const name = item?.title?.toString() ?? "";
      const normalizedName = convertSearchText(name).toString().toLowerCase();
      return normalizedName.includes(normalizedSearch);
    });
  }, [listData, searchValue]);

  const tableLoading = useMemo(
    () => fetchingRoleGroups || activating || deactivating,
    [fetchingRoleGroups, activating, deactivating]
  );

  const onEditClickHandler = (record: MyRoleGroup) => {
    setIsEditRoleDrawerOpen({ isOpen: true, id: +record.groupId });
    navigate({
      search: makeSearchParams({
        status: activeTab,
        id: record.groupId,
        name: record.groupName,
        title: record.title,
      }),
    });
  };
  const onOverRideRoleGroups = (record: MyRoleGroup) => {
    setIsOverRideRoleGroupDrawerOpen({ isOpen: true, id: +record.groupId });
    navigate({
      search: makeSearchParams({
        status: activeTab,
        id: record.groupId,
        name: record.groupName,
        title: record.title,
      }),
    });
  };
  const onCloseModifyBanner = () => {
    setIsEditRoleDrawerOpen({ isOpen: false, id: -1 });
  };
  const onCloseOverRideRoleGroup = () => {
    setIsOverRideRoleGroupDrawerOpen({ isOpen: false, id: -1 });
  };
  const onRoleUpdated = () => {
    getListData();
    onCloseModifyBanner();
  };

  const switchHandler = useCallback(
    (groupName: string, isActive: boolean) => {
      if (isActive) {
        setDeactivateModal({ isOpen: true, groupName });
      } else {
        activateRolesGroup(groupName)
          .unwrap()
          .then(() => {
            getListData();
            toast.success(USER_INFO_CHANGED_SUCCESSFULLY, {
              toastId: USER_INFO_CHANGED_SUCCESSFULLY,
            });
          });
      }
    },
    [activateRolesGroup, getListData]
  );

  const confirmDeactivateHandler = () => {
    if (!deactivateModal.groupName) return;

    deactivateRolesGroup(deactivateModal.groupName)
      .unwrap()
      .then(() => {
        toast.success(USER_INFO_CHANGED_SUCCESSFULLY, {
          toastId: USER_INFO_CHANGED_SUCCESSFULLY,
        });
        getListData();
        closeDeactivateModal();
      });
  };

  const closeDeactivateModal = () => {
    setDeactivateModal({ isOpen: false, groupName: null });
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {deactivateModal.isOpen && (
        <ConfirmationModalWithContent
          title="غیرفعال کردن گروه نقش"
          isModalOpen={deactivateModal.isOpen}
          confirmBtnText="غیرفعال کن"
          isDangerous={true}
          backBtnText="انصراف"
          closeModalHandler={closeDeactivateModal}
          onConfirmClickHandler={confirmDeactivateHandler}
          content={<MyInActiveRoleGroupsRequestModalContent />}
          width={600}
          isConfirmButtonLoading={deactivating}
          showIcon={true}
        />
      )}
      {isOverRideRoleGroupDrawerOpen.isOpen && (
        <CustomDrawer
          title="نام گروه نقش"
          content={
            <MyRolesOfGroups
              onSuccess={onRoleUpdated}
              onClose={onCloseOverRideRoleGroup}
              dataRoleGroups={listData}
            />
          }
          onClose={onCloseOverRideRoleGroup}
          open={isOverRideRoleGroupDrawerOpen.isOpen}
          closeIcon={<AiOutlineClose />}
        />
      )}
      {isEditRoleDrawerOpen.isOpen && (
        <CustomDrawer
          title="ویرایش نقش"
          content={
            <ModifyMyRoleGroupContent
              key={isEditRoleDrawerOpen.id}
              onClose={onCloseModifyBanner}
              onSuccess={onRoleUpdated}
            />
          }
          onClose={onCloseModifyBanner}
          open={isEditRoleDrawerOpen.isOpen}
          closeIcon={<AiOutlineClose />}
        />
      )}
      <CustomDivider text="لیست گروه نقش" />
      <ToolBox
        rightSide={
          <>
            <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
            <CustomSearchBox
              onChange={(val) => setSearchValue(val)}
              placeholder="جست و جو بر اساس نام گروه نقش"
            />
          </>
        }
        leftSide={
          <Dropdown menu={exportMenu} trigger={["click"]}>
            <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
              خروجی
            </CustomButton>
          </Dropdown>
        }
      />

      <CustomTable<MyRoleGroup>
        className="my-management-role-group-table-container"
        dataSource={filteredData}
        columns={MyPositionsAndRolesRoleGroupListTableModel(
          switchHandler,
          onEditClickHandler,
          onOverRideRoleGroups,
          filteredData
        )}
        rowKey="groupId"
        pagination={paginationConfig}
        {...TABLE_PROPS(filteredData.length)}
        loading={tableLoading}
      />
    </>
  );
};

export default MyPositionsAndRolesRoleGroupList;

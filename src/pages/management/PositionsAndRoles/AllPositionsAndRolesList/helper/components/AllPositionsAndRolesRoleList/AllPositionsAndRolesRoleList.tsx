import { useEffect, useMemo, useState } from "react";

import { Dropdown, MenuProps } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
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
import {
  useAllManagementActivateRolesMutation,
  useAllManagementDeactivateRolesMutation,
  useLazyAllManagementRolesListsQuery,
} from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { USER_INFO_CHANGED_SUCCESSFULLY } from "@infra/VARS/globalToasts/globalToasts";
import { ManagementRole } from "@pages/management/PositionsAndRoles/_shared/utils/@types/@managementRole";

import { AllManagementRolesResponse } from "./@types/AllPositionsAndRolesRoleListProps";
import AllInActiveRoleRequestModalContent from "./helper/components/AllInActiveRoleRequestModalContent/AllInActiveRoleRequestModalContent";
import AllModifyRoleContent from "./helper/components/ModifyAllRoleContent/AllModifyRoleContent";
import AllPositionsAndRolesRoleListTableModel from "./helper/models/AllPositionsAndRolesRoleListTableModel/AllPositionsAndRolesRoleListTableModel";

const AllPositionsAndRolesRoleList = () => {
  const [listData, setListData] = useState<AllManagementRolesResponse>([]);

  const [searchValue, setSearchValue] = useState("");

  const [deactivateModal, setDeactivateModal] = useState<{
    isOpen: boolean;
    roleName: string | null;
  }>({ isOpen: false, roleName: null });

  const [isEditRoleDrawerOpen, seIsEditRoleDrawerOpen] = useState<{
    isOpen: boolean;
    data: { name?: string; serviceName?: string; title?: string } | null;
    isAddMode: boolean;
  }>({
    isOpen: false,
    data: null,
    isAddMode: false,
  });

  //? ================================ Api ================================
  const [getRoleList, { isFetching: fetchingRoles }] =
    useLazyAllManagementRolesListsQuery();

  const [activateRoles, { isLoading: activating }] =
    useAllManagementActivateRolesMutation();

  const [deactivateRoles, { isLoading: deactivating }] =
    useAllManagementDeactivateRolesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, []);

  //* ================================ Util Functions ================================
  const getListData = () => {
    getRoleList()
      .unwrap()
      .then((value) => setListData(value));
  };

  const filteredData = useMemo(() => {
    if (!searchValue) return listData;

    const normalizedSearch = convertSearchText(searchValue).toString().toLowerCase();

    return listData.filter((item) => {
      const title = item?.title?.toString() ?? "";
      const normalizedName = convertSearchText(title).toString().toLowerCase();
      return normalizedName.includes(normalizedSearch);
    });
  }, [listData, searchValue]);

  const onEditClickHandler = (record: ManagementRole) => {
    seIsEditRoleDrawerOpen({
      isOpen: true,
      data: {
        name: record?.name,
        serviceName: record?.serviceName,
        title: record?.title ? record?.title : undefined,
      },
      isAddMode: false,
    });
  };

  const onCloseModifyBanner = () => {
    seIsEditRoleDrawerOpen({ isOpen: false, data: null, isAddMode: false });
  };

  const addRoleHandler = () => {
    seIsEditRoleDrawerOpen({
      isOpen: true,
      data: null,
      isAddMode: true,
    });
  };

  const switchHandler = (name: string, isActive: boolean) => {
    if (!isActive) {
      setDeactivateModal({ isOpen: true, roleName: name });
    } else {
      activateRoles([name])
        .unwrap()
        .then(() => {
          toast.success(USER_INFO_CHANGED_SUCCESSFULLY, {
            toastId: USER_INFO_CHANGED_SUCCESSFULLY,
          });
          getListData();
        });
    }
  };

  const exportMenu: MenuProps = {
    items: [
      { label: "خروجی Excel", key: "excel" },
      { label: "خروجی PDF", key: "pdf" },
    ],
  };

  const onRoleUpdated = () => {
    getListData();
    onCloseModifyBanner();
  };

  const tableLoading = fetchingRoles || activating || deactivating;

  const confirmDeactivateHandler = () => {
    if (!deactivateModal.roleName) return;

    deactivateRoles([deactivateModal.roleName])
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
    setDeactivateModal({ isOpen: false, roleName: null });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {deactivateModal.isOpen && (
        <ConfirmationModalWithContent
          title="غیر فعال کردن نقش ها "
          isModalOpen={deactivateModal.isOpen}
          confirmBtnText="غیر فعال کن"
          isDangerous={true}
          backBtnText="انصراف"
          closeModalHandler={closeDeactivateModal}
          onConfirmClickHandler={confirmDeactivateHandler}
          content={<AllInActiveRoleRequestModalContent />}
          width={600}
          isConfirmButtonLoading={deactivating}
          showIcon={true}
        />
      )}
      {isEditRoleDrawerOpen.isOpen && (
        <CustomDrawer
          title="ویرایش نقش"
          content={
            <AllModifyRoleContent
              key={isEditRoleDrawerOpen.data?.serviceName}
              onClose={onCloseModifyBanner}
              onSuccess={onRoleUpdated}
              data={isEditRoleDrawerOpen.data}
              isAddMode={isEditRoleDrawerOpen?.isAddMode}
            />
          }
          onClose={onCloseModifyBanner}
          open={isEditRoleDrawerOpen.isOpen}
          closeIcon={<AiOutlineClose />}
        />
      )}
      <CustomDivider text="لیست نقش‌ها" />
      <ToolBox
        leftSide={
          <div className="flex gap-2">
            <CustomButton type="primary" onClick={addRoleHandler}>
              افزودن نقش
            </CustomButton>
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
                خروجی
              </CustomButton>
            </Dropdown>
          </div>
        }
        rightSide={
          <>
            <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
            <CustomSearchBox
              onChange={(val) => setSearchValue(val)}
              placeholder="جست و جو بر اساس نام نقش"
            />
          </>
        }
      />
      <CustomTable<ManagementRole>
        className="all-management-roles-table-container"
        dataSource={filteredData}
        columns={AllPositionsAndRolesRoleListTableModel({
          switchHandler,
          data: filteredData,
          onEditClickHandler,
        })}
        loading={tableLoading}
        pagination={paginationConfig}
        {...TABLE_PROPS(filteredData.length)}
        rowKey="name"
      />
    </>
  );
};

export default AllPositionsAndRolesRoleList;

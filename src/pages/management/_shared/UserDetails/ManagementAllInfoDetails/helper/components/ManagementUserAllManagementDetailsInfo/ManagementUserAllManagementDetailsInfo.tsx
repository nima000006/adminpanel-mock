import { useEffect, useMemo, useRef, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiPlus } from "react-icons/pi";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSearchBox from "@components/CustomInputs/CustomSearchBox/CustomSearchBox";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useAdminChangeActiveDeActiveStatusMutation } from "@infra/states/redux/Apis/authApi";
import {
  useLazyManagementAllListsOfStaffQuery,
  useLazyManagementAllStaffInfoListsQuery,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { ADMIN_ACTIVE_DE_ACTIVE_STATUS } from "@pages/management/_shared/utils";

import { Staff } from "./@types/@managementAllListsOfStaff";
import AllManagementDetailsAddRoleDrawerContent from "./helper/components/AllManagementDetailsAddRoleDrawerContent/AllManagementDetailsAddRoleDrawerContent";
import AllManagementDetailsEditRoleDrawerContent from "./helper/components/AllManagementDetailsEditRoleDrawerContent/AllManagementDetailsEditRoleDrawerContent";
import AllManagementDetailsViewRoleDrawerContent from "./helper/components/AllManagementDetailsViewRoleDrawerContent/AllManagementDetailsViewRoleDrawerContent";
import ManagementUserAllManagementDetailsInfoTableModel from "./helper/models/ManagementUserAllManagementDetailsInfoTableModel";
import ManagementAllDetailsUserInfo from "../ManagementAllDetailsInfo/helper/components/ManagementAllDetailsUserInfo/ManagementAllDetailsUserInfo";

import "./_managementUserAllManagementDetailsInfo.scss";

const ACTIVE_MSG = "سمت کاربر با موفقیت فعال شد.";
const DE_ACTIVE_MSG = "سمت کاربر با موفقیت غیرفعال شد.";

const ManagementUserAllManagementDetailsInfo = () => {
  const [isOpenAddRole, setIsOpenAddRole] = useState(false);
  const [isOpenViewRole, setIsOpenViewRole] = useState(false);
  const [isOpenEditRole, setIsOpenEditRole] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { params, setSearchParams } = useQueryParams();
  //? ================================ API ================================
  const [getUsersCustomersInfo, { data, isLoading: isGetUsersCustomersInfoLoading }] =
    useLazyManagementAllStaffInfoListsQuery();

  const [
    ManagementAllListsOfStaff,
    { data: listOfStaffData, isFetching: isGetListOfStaffLoading },
  ] = useLazyManagementAllListsOfStaffQuery();

  const [changeStatus] = useAdminChangeActiveDeActiveStatusMutation();

  //? ================================ Effects ================================
  // 1️⃣ Fetch user and staff info when ID changes
  useEffect(() => {
    if (!params?.id) return;
    getUsersCustomersInfo({ userId: +params.id });
    ManagementAllListsOfStaff({ userId: +params.id });
  }, [params?.id]);
  // ================================ Util function ================================
  const openAddDrawerHandler = () => {
    setIsOpenAddRole(true);
  };
  const closeAddDrawerHandler = () => {
    setIsOpenAddRole(false);
  };

  const getStaffTypeLabel = (staffType?: string) => {
    switch (staffType) {
      case "STUDENT":
        return "دانشجو";
      case "EMPLOYEE":
        return "کارمند";
      case "ADMIN":
        return "ادمین";
      default:
        return staffType || "";
    }
  };
  const openViewRolesDrawerHandler = (record: Staff) => {
    setIsOpenViewRole(true);
    setSearchParams({
      ...params,
      staffId: record?.staffId?.toString(),
      position: record?.position,
      staffType: getStaffTypeLabel(record?.staffType),
    });
  };
  const closeViewDrawerHandler = () => {
    setIsOpenViewRole(false);
  };
  const openEditRolesDrawerHandler = (record: Staff) => {
    setIsOpenEditRole(true);
    setSearchParams({
      ...params,
      staffId: record?.staffId?.toString(),
      position: record?.position,
      staffType: getStaffTypeLabel(record?.staffType),
    });
  };
  const closeEditDrawerHandler = () => {
    setIsOpenEditRole(false);
  };

  const onSearchChange = (value: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);
  };
  // Filtered data based on position
  const filteredData = useMemo(() => {
    if (!listOfStaffData) return [];
    if (!debouncedSearch) return listOfStaffData;

    return listOfStaffData.filter((item) =>
      item.position?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [listOfStaffData, debouncedSearch]);

  const changePositionStatusHandler = (value: boolean, id: number) => {
    if (id) {
      if (value) {
        // فعال کردن
        changeStatus({
          status: ADMIN_ACTIVE_DE_ACTIVE_STATUS.active,
          params: { staffIds: [id.toString()] },
        })
          .unwrap()
          .then(() => {
            ManagementAllListsOfStaff({ userId: +params.id });
            toast.success(ACTIVE_MSG, { toastId: ACTIVE_MSG });
          });
      } else {
        // غیرفعال کردن
        changeStatus({
          status: ADMIN_ACTIVE_DE_ACTIVE_STATUS.deActive,
          params: { staffIds: [id.toString()] },
        })
          .unwrap()
          .then(() => {
            ManagementAllListsOfStaff({ userId: +params.id });
            toast.success(DE_ACTIVE_MSG, { toastId: DE_ACTIVE_MSG });
          });
      }
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenViewRole && (
        <CustomDrawer
          onClose={closeViewDrawerHandler}
          open={isOpenViewRole}
          closeIcon={<AiOutlineClose />}
          content={
            <AllManagementDetailsViewRoleDrawerContent
              closeDrawerHandler={closeViewDrawerHandler}
            />
          }
        />
      )}
      {isOpenEditRole && (
        <CustomDrawer
          onClose={closeEditDrawerHandler}
          open={isOpenEditRole}
          closeIcon={<AiOutlineClose />}
          content={
            <AllManagementDetailsEditRoleDrawerContent
              closeDrawerHandler={closeEditDrawerHandler}
            />
          }
        />
      )}

      {isOpenAddRole && (
        <CustomDrawer
          onClose={closeAddDrawerHandler}
          open={isOpenAddRole}
          closeIcon={<AiOutlineClose />}
          content={
            <AllManagementDetailsAddRoleDrawerContent
              closeDrawerHandler={closeAddDrawerHandler}
            />
          }
        />
      )}
      <Div loading={isGetUsersCustomersInfoLoading}>
        <ManagementAllDetailsUserInfo data={data} />
      </Div>
      <CustomDivider text="لیست سمت‌ها" />
      <ToolBox
        rightSide={
          <CustomSearchBox
            mode="client"
            onChange={(value) => onSearchChange(value)}
            placeholder="جستجو بر اساس سمت"
          />
        }
        leftSide={
          <>
            <CustomButton
              icon={<PiPlus />}
              onClick={openAddDrawerHandler}
              disabled
              type="primary"
            >
              افزودن نقش
            </CustomButton>
            <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
              خروجی
            </CustomButton>
          </>
        }
      />
      <CustomTable<Staff>
        dataSource={filteredData}
        columns={ManagementUserAllManagementDetailsInfoTableModel({
          onViewRoles: openViewRolesDrawerHandler,
          onEditRoles: openEditRolesDrawerHandler,
          changePositionStatus: changePositionStatusHandler,
        })}
        pagination={paginationConfig}
        {...TABLE_PROPS(filteredData?.length ?? 0)}
        rowKey="staffId"
        loading={isGetListOfStaffLoading}
        className="management-user-all-management-details-info-table-model-container"
      />
    </>
  );
};
export default ManagementUserAllManagementDetailsInfo;

import { useEffect, useMemo, useRef, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiPlus } from "react-icons/pi";

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
import {
  useLazyManagementAllRolesCustomerQuery,
  useLazyManagementAllStaffInfoListsQuery,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { RoleItem } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementAllDetailsRolesUserInfo/@types/@managementAllRolesCustomer";

import AllManagementRolesDetailsAddRoleDrawerContent from "./helper/components/AllManagementRolesDetailsAddRoleDrawerContent/AllManagementRolesDetailsAddRoleDrawerContent";
import ManagementAllDetailsRolesUserInfoTableModel from "./helper/models/ManagementAllDetailsRolesUserInfoTableModel";
import ManagementAllDetailsUserInfo from "../ManagementAllDetailsInfo/helper/components/ManagementAllDetailsUserInfo/ManagementAllDetailsUserInfo";
import "./_managementAllDetailsRolesUserInfo.scss";

const ManagementAllDetailsRolesUserInfo = () => {
  const { params } = useQueryParams();
  const [isOpenAddRole, setIsOpenAddRole] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  //? ================================ API ================================
  const [getUsersCustomersInfo, { data, isLoading: isGetUsersCustomersInfoLoading }] =
    useLazyManagementAllStaffInfoListsQuery();

  const [
    getUsersCustomersRoles,
    { data: userRolesData, isLoading: isGetUsersCustomersRolesLoading },
  ] = useLazyManagementAllRolesCustomerQuery();
  //? ================================ Effects ================================
  // 1️⃣ Fetch user info and roles when ID changes
  useEffect(() => {
    if (!params?.id) return;
    getUsersCustomersInfo({ userId: +params.id });
    getUsersCustomersRoles({ userId: +params.id });
  }, [params?.id]);

  // ================================ Util function ================================
  const openAddDrawerHandler = () => {
    setIsOpenAddRole(true);
  };
  const closeAddDrawerHandler = () => {
    setIsOpenAddRole(false);
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
    if (!userRolesData) return [];
    if (!debouncedSearch) return userRolesData;

    return userRolesData.filter((item) =>
      item.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [userRolesData, debouncedSearch]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenAddRole && (
        <CustomDrawer
          onClose={closeAddDrawerHandler}
          open={isOpenAddRole}
          closeIcon={<AiOutlineClose />}
          content={
            <AllManagementRolesDetailsAddRoleDrawerContent
              closeDrawerHandler={closeAddDrawerHandler}
            />
          }
        />
      )}
      <Div loading={isGetUsersCustomersInfoLoading}>
        <ManagementAllDetailsUserInfo data={data} />
      </Div>
      <CustomDivider text="لیست نقش‌ها" />
      <ToolBox
        rightSide={
          <>
            <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
            <CustomSearchBox
              onChange={(value) => onSearchChange(value)}
              mode="client"
              placeholder="جستجو بر اساس نقش"
            />
          </>
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
      <CustomTable<RoleItem>
        dataSource={filteredData}
        columns={ManagementAllDetailsRolesUserInfoTableModel()}
        pagination={paginationConfig}
        {...TABLE_PROPS(filteredData?.length || 0)}
        rowKey="id"
        loading={isGetUsersCustomersRolesLoading}
        className="management-all-details-roles-user-info-table-model-container"
      />
    </>
  );
};
export default ManagementAllDetailsRolesUserInfo;

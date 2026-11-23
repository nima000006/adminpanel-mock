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
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyManagementMyRolesCustomerQuery,
  useLazyManagementMyStaffInfoListsQuery,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import "./_managementMyDetailsRolesUserInfo.scss";
import { RoleItem } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementMyDetailsRolesUserInfo/@types/@managementMyRolesCustomer";

import MyManagementRolesDetailsAddRoleDrawerContent from "./helper/components/MyManagementRolesDetailsAddRoleDrawerContent/MyManagementRolesDetailsAddRoleDrawerContent";
import ManagementMyDetailsRolesUserInfoTableModel from "./helper/models/ManagementMyDetailsRolesUserInfoTableModel";
import ManagementMyDetailsUserInfo from "../ManagementMyDetailsInfo/helper/components/ManagementMyDetailsUserInfo/ManagementMyDetailsUserInfo";

const ManagementMyDetailsRolesUserInfo = () => {
  const { params } = useQueryParams();
  const [isOpenAddRole, setIsOpenAddRole] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  //? ================================ API ================================
  const [getUsersCustomersInfo, { data, isLoading: isGetUsersCustomersInfoLoading }] =
    useLazyManagementMyStaffInfoListsQuery();

  const [
    getUsersCustomersRoles,
    { data: userRolesData, isLoading: isGetUsersCustomersRolesLoading },
  ] = useLazyManagementMyRolesCustomerQuery();
  //? ================================ Effects ================================
  // 1️⃣ Fetch user info when ID changes
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
            <MyManagementRolesDetailsAddRoleDrawerContent
              closeDrawerHandler={closeAddDrawerHandler}
            />
          }
        />
      )}
      <Div loading={isGetUsersCustomersInfoLoading}>
        <ManagementMyDetailsUserInfo data={data} />
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
              type="primary"
              disabled
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
        columns={ManagementMyDetailsRolesUserInfoTableModel()}
        pagination={paginationConfig}
        rowKey="name"
        loading={isGetUsersCustomersRolesLoading}
        className="management-my-details-roles-user-info-table-model-container"
      />
    </>
  );
};
export default ManagementMyDetailsRolesUserInfo;

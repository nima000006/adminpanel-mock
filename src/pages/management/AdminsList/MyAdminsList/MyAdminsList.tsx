import { useEffect, useState } from "react";

import { Checkbox, CheckboxChangeEvent, Dropdown, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useManagerChangeActiveDeActiveStatusMutation } from "@infra/states/redux/Apis/authApi";
import {
  useLazyManagementUsersMyAdminsListsAdvanceFilterQuery,
  useLazyManagementUsersMyAdminsListsQuery,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import { ADMIN_ACTIVE_DE_ACTIVE_STATUS } from "@pages/management/_shared/utils";

import {
  ManagementMyAdminData,
  ManagementUsersMyAdminListAdvanceFilterResponse,
  ManagementUsersMyAdminListResponse,
  MyAdminListByAdvanceFilterRequest,
  userResponseDto,
} from "./@types/@managementsUserMyAdminListTypes";
import ManagementMyAdminsListTableModel from "./helpers/models/ManagementMyAdminListTableModel/ManagementMyAdminsListTableModel";

import "./_myAdminsList.scss";

const advanceFilterItems = [
  "username",
  "mobileNumber",
  "firstName",
  "lastName",
  "employeeCode",
  "email",
];

const AdminsList = () => {
  const { params, setSearchParams } = useQueryParams();
  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;

  const [dataSource, setDataSource] = useState<ManagementMyAdminData[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">افراد</span>,
      },
      {
        title: "ادمین های من",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getAdminsList, { isFetching: isFetchingGetAdminsList }] =
    useLazyManagementUsersMyAdminsListsQuery();

  const [advanceFilter, { isFetching: isAdvanceFilterDataLoading }] =
    useLazyManagementUsersMyAdminsListsAdvanceFilterQuery();

  const [changeStatus] = useManagerChangeActiveDeActiveStatusMutation();

  //? ================================ Effects  ================================

  useEffect(() => {
    getListHandler();
  }, [currentPage, currentPageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  // ================================ Utils function ================================

  const getListHandler = () => {
    if (hasActiveKey(params, advanceFilterItems)) {
      const filters: MyAdminListByAdvanceFilterRequest = {
        ...(params?.username && { username: params?.username?.trim() }),
        ...(params?.employeeCode && { employeeCode: params?.employeeCode?.trim() }),
        ...(params?.mobileNumber && { mobileNumber: params?.mobileNumber?.trim() }),
        ...(params?.firstName && { firstname: params?.firstName?.trim() }),
        ...(params?.lastName && { lastname: params?.lastName?.trim() }),
        ...(params?.email && { email: params?.email?.trim() }),
      };

      const requestParams = {
        pageNumber: currentPage - 1,
        pageSize: currentPageSize,
        ...filters,
      };

      advanceFilter(requestParams).unwrap().then(getListDataSuccess);
    } else {
      getAdminsList({ pageNo: currentPage - 1, pageSize: currentPageSize })
        .unwrap()
        .then(getListDataSuccess);
    }
  };

  const getListDataSuccess = async (
    value:
      | ManagementUsersMyAdminListResponse
      | ManagementUsersMyAdminListAdvanceFilterResponse
  ) => {
    setDataSource(value?.content);
    setTotalElements(value?.totalElements);
  };
  const admins = (dataSource ?? []).map((item) => ({
    ...item.userResponseDto,
    ...item.employeeDtos?.[0],
    ...item,
  }));

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const dataList: userResponseDto[] = admins ?? [];

  const allSelected = dataList.length > 0 && selectedRowKeys.length === dataList.length;

  const isIndeterminate =
    selectedRowKeys.length > 0 && selectedRowKeys.length < dataList.length;

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allKeys = dataList.map((item) => item.id).filter(Boolean);
      setSelectedRowKeys(allKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const usersDeActiveHandler = () => {
    changeStatus({
      status: ADMIN_ACTIVE_DE_ACTIVE_STATUS.deActive,
      params: { staffIds: selectedRowKeys as string[] },
    })
      .unwrap()
      .then(() => {
        getListHandler();
        setSelectedRowKeys([]);
      });
  };

  const usersActiveHandler = () => {
    changeStatus({
      status: ADMIN_ACTIVE_DE_ACTIVE_STATUS.active,
      params: { staffIds: selectedRowKeys as string[] },
    })
      .unwrap()
      .then(() => {
        getListHandler();
        setSelectedRowKeys([]);
      });
  };

  const items: MenuProps["items"] = [
    {
      label: "غیر فعال کردن",
      key: "1",
      disabled: selectedRowKeys?.length === 0 ? true : false,
      onClick: usersDeActiveHandler,
    },
    {
      label: "فعال کردن",
      key: "2",
      disabled: selectedRowKeys?.length === 0 ? true : false,
      onClick: usersActiveHandler,
    },
    {
      label: "اجبار به تغییر رمز",
      key: "3",
      disabled: true,
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="management-my-admin-list-container">
      <CustomDivider
        text="لیست ادمین های من"
        extraContent={
          <Checkbox
            indeterminate={isIndeterminate}
            onChange={onCheckAllChange}
            checked={allSelected}
            disabled
          >
            انتخاب همه
          </Checkbox>
        }
      />
      <ToolBox
        rightSide={
          <CustomButton disabled icon={<AiOutlineFilter />}>
            فیلتر پیشرفته
          </CustomButton>
        }
        leftSide={
          <>
            <CustomButton disabled type="primary">
              ایجاد ادمین
            </CustomButton>
            <Dropdown.Button type="default" menu={{ items }}>
              اقدامات
            </Dropdown.Button>
            <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
              خروجی
            </CustomButton>
          </>
        }
      />
      <CustomTable<ManagementMyAdminData>
        className="management-my-admin-list-table-container"
        dataSource={admins}
        columns={ManagementMyAdminsListTableModel()}
        loading={isFetchingGetAdminsList || isAdvanceFilterDataLoading}
        pagination={manualPaginationConfig({
          total: totalElements,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...params,
              page: page?.toString(),
              pageSize: pageSize?.toString(),
            });
          },
          pageNumber: params?.page ? Number(params?.page) : 1,
          defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
        })}
        key={`table-${params?.pageSize || "8"}`}
        {...TABLE_PROPS(totalElements)}
        rowKey="userStaffId"
        rowSelection={rowSelection}
      />
      <CustomTotalTableItems
        className="mt-4"
        totalCount={totalElements}
        label="تعداد کل ادمین های من:"
      />
    </div>
  );
};
export default AdminsList;

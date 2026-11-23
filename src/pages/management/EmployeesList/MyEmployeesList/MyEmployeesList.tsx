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
  useMyEmployeeListByAdvanceFilterMutation,
  useLazyManagementUsersMyEmployeesListsQuery,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import { ADMIN_ACTIVE_DE_ACTIVE_STATUS } from "@pages/management/_shared/utils";

import {
  ManagementUserData,
  MyEmployeeListByAdvanceFilterRequest,
  MyEmployeeListByAdvanceFilterResponse,
  UserResponseDto,
} from "./@types/@managementUsersMyEmployeesListTypes";
import ManagementMyEmployeesListTableModel from "./helpers/models/ManagementMyEmployeesListTableModel/ManagementMyEmployeesListTableModel";

import "./_myEmployeesList.scss";

const advanceFilterItems = [
  "firstName",
  "lastName",
  "nationalCode",
  "employeeCode",
  "studentNumber",
  "mobileNumber",
  "email",
  "username",
  "regionsId",
  "degreeId",
  "fieldId",
  "branchId",
  "statusId",
];
const MyEmployeesList = () => {
  const { params, setSearchParams } = useQueryParams();
  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;

  const [customerInfo, setCustomersInfo] =
    useState<MyEmployeeListByAdvanceFilterResponse>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">افراد</span>,
      },
      {
        title: "کارمندان من",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getMyEmployeesList, { isFetching: isFetchingGetMyEmployeesList }] =
    useLazyManagementUsersMyEmployeesListsQuery();

  const [advanceFilter, { isLoading: isAdvanceFilterLoading }] =
    useMyEmployeeListByAdvanceFilterMutation();

  const [changeStatus] = useManagerChangeActiveDeActiveStatusMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    getListHandler();
  }, [currentPage, currentPageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  // ================================ Utils function ================================
  const getListHandler = () => {
    if (hasActiveKey(params, advanceFilterItems)) {
      const filters: Omit<
        MyEmployeeListByAdvanceFilterRequest,
        "pageSize" | "pageNumber"
      > = {
        ...(params?.firstName && { firstName: params?.firstName?.trim() }),
        ...(params?.lastName && { lastName: params?.lastName?.trim() }),
        ...(params?.nationalCode && { nationalCode: params?.nationalCode?.trim() }),
        ...(params?.employeeCode && {
          employeeCode: params?.employeeCode?.trim(),
        }),
        ...(params?.mobileNumber && { mobileNumber: params?.mobileNumber?.trim() }),
        ...(params?.email && { email: params?.email?.trim() }),
      };
      advanceFilter({
        pageNumber: currentPage - 1,
        pageSize: currentPageSize,
        ...filters,
      })
        .unwrap()
        .then((res) => setCustomersInfo(res));
    } else {
      getMyEmployeesList({
        pageNo: currentPage - 1,
        pageSize: currentPageSize,
      })
        .unwrap()
        .then((res) => setCustomersInfo(res));
    }
  };

  const employees = (customerInfo?.content ?? []).map((item) => ({
    ...item.userResponseDto,
    ...item,
  }));

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const dataList: UserResponseDto[] = employees ?? [];

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
    <div className="management-my-employee-list-container">
      <CustomDivider
        text="لیست کارمندان من"
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
            <Dropdown.Button type="default" menu={{ items }}>
              اقدامات
            </Dropdown.Button>
            <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
              خروجی
            </CustomButton>
          </>
        }
      />
      <CustomTable<ManagementUserData>
        className="management-my-employee-list-table-container"
        dataSource={employees}
        loading={isFetchingGetMyEmployeesList || isAdvanceFilterLoading}
        columns={ManagementMyEmployeesListTableModel()}
        pagination={manualPaginationConfig({
          total: customerInfo?.totalElements,
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
        {...TABLE_PROPS(customerInfo?.totalElements ?? 0)}
        rowKey="userStaffId"
        rowSelection={rowSelection}
      />
      <CustomTotalTableItems
        className="mt-4"
        totalCount={customerInfo?.totalElements || 0}
        label="تعداد کل کارمندان من:"
      />
    </div>
  );
};
export default MyEmployeesList;

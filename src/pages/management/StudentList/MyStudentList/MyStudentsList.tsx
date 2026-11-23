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
  useLazyManagementMyStudentsListsQuery,
  useMyStudentListByAdvanceFilterMutation,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { ADMIN_ACTIVE_DE_ACTIVE_STATUS } from "@pages/management/_shared/utils";

import {
  ManagementUserWithStudentInfo,
  MyStudentListByAdvanceFilterRequest,
  UserResponseDto,
} from "./@types/@managementMyStudentsListTypes";
import { hasActiveKey } from "../../_shared/hasActiveKey";
import { StudentListByAdvanceFilterResponse } from "../AllStudentList/@types/@managementAllStudentsListTypes";
import ManagementMyStudentsListTableModel from "./helpers/models/ManagementMyStudentsListTableModel/ManagementMyStudentsListTableModel";

import "./_myStudentsList.scss";

const advanceFilterItems = [
  "firstName",
  "lastName",
  "studentNumber",
  "username",
  "mobileNumber",
  "email",
];

const MyStudentsList = () => {
  const [customerInfo, setCustomersInfo] = useState<StudentListByAdvanceFilterResponse>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { params, setSearchParams } = useQueryParams();
  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">افراد</span>,
      },
      {
        title: "دانشجویان من",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getStudentsList, { isFetching: isFetchingGetStudentsList }] =
    useLazyManagementMyStudentsListsQuery();

  const [advanceFilter, { isLoading: isAdvanceFilterLoading }] =
    useMyStudentListByAdvanceFilterMutation();

  const [changeStatus] = useManagerChangeActiveDeActiveStatusMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    getListHandler();
  }, [currentPage, currentPageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  // ================================ Utils function ================================
  const getListHandler = () => {
    if (hasActiveKey(params, advanceFilterItems)) {
      const filters: Omit<
        MyStudentListByAdvanceFilterRequest,
        "pageSize" | "pageNumber"
      > = {
        ...(params?.firstName && { firstName: params?.firstName?.trim() }),
        ...(params?.lastName && { lastName: params?.lastName?.trim() }),
        ...(params?.username && { username: params?.username?.trim() }),
        ...(params?.mobileNumber && { mobileNumber: params?.mobileNumber?.trim() }),
        ...(params?.email && { email: params?.email?.trim() }),
        ...(params?.studentNumber && {
          studentNumber: params?.studentNumber?.trim(),
        }),
      };
      advanceFilter({
        pageNumber: currentPage - 1,
        pageSize: currentPageSize,
        ...filters,
      })
        .unwrap()
        .then((res) => setCustomersInfo(res));
    } else {
      getStudentsList({ pageNo: currentPage - 1, pageSize: currentPageSize })
        .unwrap()
        .then((res) => setCustomersInfo(res));
    }
  };

  const students = (customerInfo?.content ?? []).map((item) => ({
    ...item.userResponseDto,
    ...item,
  }));

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const dataList: UserResponseDto[] = students ?? [];

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
    <div className="management-my-student-list-container">
      <CustomDivider
        text="لیست دانشجویان"
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
      <CustomTable<ManagementUserWithStudentInfo>
        className="management-student-list-table-container"
        dataSource={students}
        columns={ManagementMyStudentsListTableModel()}
        loading={isFetchingGetStudentsList || isAdvanceFilterLoading}
        pagination={manualPaginationConfig({
          total: customerInfo?.totalElements ?? 0,
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
        label="تعداد کل دانشجویان من:"
      />
    </div>
  );
};
export default MyStudentsList;

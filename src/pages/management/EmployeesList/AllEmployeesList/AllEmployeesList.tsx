import { useEffect, useState } from "react";

import { Checkbox, CheckboxChangeEvent, Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useAdminChangeActiveDeActiveStatusMutation } from "@infra/states/redux/Apis/authApi";
import {
  useAllEmployeeListByAdvanceFilterMutation,
  useLazyManagementUsersAllEmployeesListsQuery,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import { ADMIN_ACTIVE_DE_ACTIVE_STATUS } from "@pages/management/_shared/utils";
import useManagementAllEmployeeAdvanceFilter from "@pages/management/EmployeesList/AllEmployeesList/helpers/hooks/useManagementAllEmployeeAdvanceFilter";

import {
  AllEmployeeListByAdvanceFilterRequest,
  AllEmployeeListByAdvanceFilterResponse,
  ManagementUserData,
  UserResponseDto,
} from "./@types/@managementUsersAllEmployeesListTypes";
import ManagementAllEmployeesListTableModel from "./helpers/models/ManagementAllEmployeesListTableModel/ManagementAllEmployeesListTableModel";

import "./_allEmployeesList.scss";

const advanceFilterItems = [
  "firstName",
  "lastName",
  "nationalCode",
  "employeeCode",
  "studentNumber",
  "username",
  "mobileNumber",
  "email",
  "regionsId",
  "degreeId",
  "fieldId",
  "branchId",
  "statusId",
];
const AllEmployeesList = () => {
  const [customerInfo, setCustomersInfo] =
    useState<AllEmployeeListByAdvanceFilterResponse>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { params, setSearchParams } = useQueryParams();
  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const { filterItemsList } = useManagementAllEmployeeAdvanceFilter({
    isAdvanceModalOpen,
  });

  const [advanceFilterForm] = Form.useForm<{ branch: SelectType<IdTitle> }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">افراد</span>,
      },
      {
        title: "کارمندان",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getAllEmployeesList, { isFetching: isFetchingGetAllEmployeesList }] =
    useLazyManagementUsersAllEmployeesListsQuery();

  const [advanceFilter, { isLoading: isAdvanceFilterLoading }] =
    useAllEmployeeListByAdvanceFilterMutation();

  const [changeStatus] = useAdminChangeActiveDeActiveStatusMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    getListHandler();
  }, [currentPage, currentPageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  // ================================ Utils function ================================
  const getListHandler = () => {
    if (hasActiveKey(params, advanceFilterItems)) {
      const filters: Omit<
        AllEmployeeListByAdvanceFilterRequest,
        "pageSize" | "pageNumber"
      > = {
        ...(params?.firstName && { firstName: params?.firstName?.trim() }),
        ...(params?.lastName && { lastName: params?.lastName?.trim() }),
        ...(params?.mobileNumber && { mobileNumber: params?.mobileNumber?.trim() }),
        ...(params?.email && { email: params?.email?.trim() }),
        ...(params?.nationalCode && { nationalCode: params?.nationalCode?.trim() }),
        ...(params?.employeeCode && {
          employeeCode: params?.employeeCode?.trim(),
        }),
        ...(params?.branchId && {
          branchIds: params?.branchId?.split(",")?.map((item) => +item),
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
      getAllEmployeesList({
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

  const closeAdvanceFilterHandler = () => {
    setIsAdvanceModalOpen(false);
    advanceFilterForm.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={advanceFilterForm}
          defaultParams={params}
        />
      )}
      <div className="management-all-employee-list-container">
        <CustomDivider
          text="لیست کارمندان"
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
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setIsAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
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
          className="management-all-employee-list-table-container"
          dataSource={employees}
          loading={isFetchingGetAllEmployeesList || isAdvanceFilterLoading}
          columns={ManagementAllEmployeesListTableModel()}
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
          label="تعداد کل کارمندان:"
        />
      </div>
    </>
  );
};
export default AllEmployeesList;

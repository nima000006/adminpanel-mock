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
import {
  useLazyManagementUsersMyCustomersListsQuery,
  useMyUserListByAdvanceFilterMutation,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import { UserListByAdvanceFilterRequest } from "@pages/management/_shared/@types/@advanceFilterEmployeesTypes";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";

import {
  UseMyCustomerListAdvanceFilterFormType,
  ManagementMyCustomerListData,
  ManagementMyCustomerListDataResponse,
  MyUserListByAdvanceFilterResponse,
} from "./@types/@managementUsersMyCustomersListTypes";
import ManagementMyCustomersListTableModel from "./helpers/models/ManagementMyCustomersListTableModel/ManagementMyCustomersListTableModel";
import useMyCustomListAdvanceFilter from "./hooks/useMyCustomListAdvanceFilter/useMyCustomListAdvanceFilter";
import "./_myCustomerList.scss";

const advanceFilterItems = [
  "firstName",
  "lastName",
  "username",
  "mobileNumber",
  "email",
  "regionsId",
  "fromCreatedDateDateStart",
  "fromCreatedDateDateEnd",
];

const MyCustomersList = () => {
  const { params, setSearchParams } = useQueryParams();
  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });
  const [customersInfo, setCustomersInfo] = useState<
    ManagementMyCustomerListDataResponse | MyUserListByAdvanceFilterResponse
  >();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [form] = Form.useForm<UseMyCustomerListAdvanceFilterFormType>();
  const { filterItemsList } = useMyCustomListAdvanceFilter();

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">افراد</span>,
      },
      {
        title: "کاربران من",
      },
    ],
  });

  const items: MenuProps["items"] = [
    {
      label: "اجبار به تغییر رمز",
      key: "3",
      disabled: true,
    },
  ];

  //? ================================  Api Calls ================================
  const [fetchCustomers, { isFetching: isFetchingCustomers }] =
    useLazyManagementUsersMyCustomersListsQuery();

  const [advanceFilter, { isLoading: isAdvanceFilterLoading }] =
    useMyUserListByAdvanceFilterMutation();

  //? ================================ Effects ================================
  const { from: fromCreatedDate, to: toCreatedDate } = formatDateRangeForApi({
    from: params?.fromCreatedDateDateStart,
    to: params?.fromCreatedDateDateEnd,
  });
  useEffect(() => {
    if (hasActiveKey(params, advanceFilterItems)) {
      const filters: Omit<UserListByAdvanceFilterRequest, "pageSize" | "pageNumber"> = {
        ...(params?.firstName && { firstName: params?.firstName?.trim() }),
        ...(params?.lastName && { lastName: params?.lastName?.trim() }),
        ...(params?.username && { username: params?.username?.trim() }),
        ...(params?.mobileNumber && { mobileNumber: params?.mobileNumber?.trim() }),
        ...(params?.email && { email: params?.email?.trim() }),
        ...(fromCreatedDate && { fromCreatedDate }),
        ...(toCreatedDate && { toCreatedDate }),
      };
      advanceFilter({
        pageNumber: currentPage - 1,
        pageSize: currentPageSize,
        ...filters,
      })
        .unwrap()
        .then((res) => setCustomersInfo(res));
    } else {
      fetchCustomers({ pageNo: currentPage - 1, pageSize: currentPageSize })
        .unwrap()
        .then((res) => setCustomersInfo(res));
    }
  }, [currentPage, currentPageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  // ================================ Utils function ================================
  const customers = (customersInfo?.content ?? []).map((item) => ({
    ...item,
  }));
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: () => ({
      disabled: true,
    }),
  };

  const dataList: ManagementMyCustomerListData[] = customers ?? [];

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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={() => {
            setAdvanceModalOpen(false);
            form.resetFields();
          }}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...params }}
        />
      )}

      <div className="management-my-customer-list-container">
        <CustomDivider
          text="لیست کاربران من"
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
                onClick={() => setAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <>
              <CustomButton disabled type="primary">
                ایجاد ادمین
              </CustomButton>
              <Dropdown.Button type="default" menu={{ items }} disabled>
                اقدامات
              </Dropdown.Button>
              <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
                خروجی
              </CustomButton>
            </>
          }
        />
        <CustomTable<ManagementMyCustomerListData>
          className="management-my-customer-list-table-container"
          dataSource={customers}
          columns={ManagementMyCustomersListTableModel()}
          loading={isFetchingCustomers || isAdvanceFilterLoading}
          pagination={manualPaginationConfig({
            total: customersInfo?.totalElements ?? 0,
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
          {...TABLE_PROPS(customersInfo?.totalElements ?? 0)}
          rowKey="id"
          rowSelection={rowSelection}
        />
        <CustomTotalTableItems
          className="mt-4"
          totalCount={customersInfo?.totalElements || 0}
          label="تعداد کل کاربران من:"
        />
      </div>
    </>
  );
};
export default MyCustomersList;

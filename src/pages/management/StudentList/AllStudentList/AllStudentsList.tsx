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
  useLazyManagementAllStudentsListsQuery,
  useStudentListByAdvanceFilterMutation,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ADMIN_ACTIVE_DE_ACTIVE_STATUS } from "@pages/management/_shared/utils";
import useManagementAllStudentsAdvanceFilter from "@pages/management/StudentList/AllStudentList/helpers/hooks/useManagementAllStudentsAdvanceFilter";

import {
  ManagementUserWithStudentInfo,
  StudentListByAdvanceFilterRequest,
  StudentListByAdvanceFilterResponse,
  UserResponseDto,
} from "./@types/@managementAllStudentsListTypes";
import { hasActiveKey } from "../../_shared/hasActiveKey";
import ManagementAllStudentsListTableModel from "./helpers/models/ManagementAllStudentsListTableModel/ManagementAllStudentsListTableModel";

import "./_allStudentsList.scss";

const advanceFilterItems = [
  "firstName",
  "lastName",
  "studentNumber",
  "username",
  "mobileNumber",
  "email",
  "branchId",
];

const AllStudentsList = () => {
  const [customerInfo, setCustomersInfo] = useState<StudentListByAdvanceFilterResponse>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { params, setSearchParams } = useQueryParams();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const { filterItemsList } = useManagementAllStudentsAdvanceFilter({
    isAdvanceModalOpen,
  });

  const [advanceFilterForm] = Form.useForm<{ branch: SelectType<IdTitle> }>();

  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">افراد</span>,
      },
      {
        title: "دانشجویان",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getStudentsList, { isFetching: isFetchingGetStudentsList }] =
    useLazyManagementAllStudentsListsQuery();

  const [advanceFilter, { isLoading: isAdvanceFilterLoading }] =
    useStudentListByAdvanceFilterMutation();

  const [changeStatus] = useAdminChangeActiveDeActiveStatusMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    getListHandler();
  }, [currentPage, currentPageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  // ================================ Utils function ================================
  const getListHandler = () => {
    if (hasActiveKey(params, advanceFilterItems)) {
      const filters: Omit<StudentListByAdvanceFilterRequest, "pageSize" | "pageNumber"> =
        {
          ...(params?.firstName && { firstName: params?.firstName?.trim() }),
          ...(params?.lastName && { lastName: params?.lastName?.trim() }),
          ...(params?.username && { username: params?.username?.trim() }),
          ...(params?.mobileNumber && { mobileNumber: params?.mobileNumber?.trim() }),
          ...(params?.email && { email: params?.email?.trim() }),
          ...(params?.studentNumber && {
            studentNumber: params?.studentNumber?.trim(),
          }),
          ...(params?.branchId && {
            branchId: params?.branchId?.split(",")?.map((item) => +item),
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
      <div className="management-all-student-list-container">
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
        <CustomTable<ManagementUserWithStudentInfo>
          className="management-student-list-table-container"
          dataSource={students}
          columns={ManagementAllStudentsListTableModel()}
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
          label="تعداد کل دانشجویان:"
        />
      </div>
    </>
  );
};
export default AllStudentsList;

import { useEffect, useState } from "react";

import {
  Checkbox,
  CheckboxChangeEvent,
  Dropdown,
  Form,
  MenuProps,
  TransferProps,
} from "antd";
import moment from "jalali-moment";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
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
import { useManagementCreateAdminMutation } from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import {
  useLazyManagementUsersAllAdminsListsAdvanceFilterQuery,
  useLazyManagementUsersAllAdminsListsQuery,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import { ADMIN_ACTIVE_DE_ACTIVE_STATUS } from "@pages/management/_shared/utils";
import useManagementAllAdminsAdvanceFilter from "@pages/management/AdminsList/AllAdminsList/helpers/hooks/useManagementAllAdminsAdvanceFilter";

import {
  AdminListByAdvanceFilterRequest,
  CreateAdminFormType,
  ManagementAllAdminData,
  ManagementUsersAllAdminListAdvanceFilterResponse,
  ManagementUsersAllAdminListResponse,
  userResponseDto,
} from "./@types/@managementsUserAllAdminListTypes";
import CreateAdminModalContent from "./helpers/modals/CreateAdmin/CreateAdminModalContent";
import ManagementAdminsListTableModel from "./helpers/models/ManagementAllAdminListTableModel/ManagementAllAdminsListTableModel";

import "./_allAdminsList.scss";

const advanceFilterItems = [
  "username",
  "mobileNumber",
  "firstName",
  "lastName",
  "employeeCode",
  "email",
  "branchId",
];

const ALL_RULES_DID_NOT_PASS = "رمز عبور با شروط مورد نظر هم خوانی ندارد.";

const AllAdminsList = () => {
  const { params, setSearchParams } = useQueryParams();
  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;

  const [dataSource, setDataSource] = useState<ManagementAllAdminData[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [adminModalStep, setAdminModalStep] = useState(0);
  const [isPasswordAllRulesPassed, setIsPasswordAllRulesPassed] = useState(false);
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>();

  const [createAdminForm] = Form.useForm<CreateAdminFormType>();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const { filterItemsList } = useManagementAllAdminsAdvanceFilter({
    isAdvanceModalOpen,
  });

  const [advanceFilterForm] = Form.useForm<{ branch: SelectType<IdTitle> }>();

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">افراد</span>,
      },
      {
        title: "ادمین‌ها",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getAdminsList, { isFetching: isFetchingGetAdminsList }] =
    useLazyManagementUsersAllAdminsListsQuery();

  const [advanceFilter, { isFetching: isAdvanceFilterDataLoading }] =
    useLazyManagementUsersAllAdminsListsAdvanceFilterQuery();

  const [createAdmin, { isLoading: isCreateAdminLoading }] =
    useManagementCreateAdminMutation();

  const [changeStatus] = useAdminChangeActiveDeActiveStatusMutation();

  //? ================================ Effects  ================================

  useEffect(() => {
    getListHandler();
  }, [currentPage, currentPageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  // ================================ Utils function ================================
  const getListHandler = () => {
    if (hasActiveKey(params, advanceFilterItems)) {
      const filters: AdminListByAdvanceFilterRequest = {
        ...(params?.username && { username: params?.username?.trim() }),
        ...(params?.employeeCode && { employeeCode: params?.employeeCode?.trim() }),
        ...(params?.mobileNumber && { mobileNumber: params?.mobileNumber?.trim() }),
        ...(params?.firstName && { firstname: params?.firstName?.trim() }),
        ...(params?.lastName && { lastname: params?.lastName?.trim() }),
        ...(params?.email && { email: params?.email?.trim() }),
        ...(params?.branchId && {
          branchIds: params?.branchId?.split(",")?.map((item) => +item),
        }),
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
      | ManagementUsersAllAdminListResponse
      | ManagementUsersAllAdminListAdvanceFilterResponse
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

  // add admin
  const openCreateAdminModal = () => setAddAdminModalOpen(true);

  const closeCreateAdminModal = () => {
    setAddAdminModalOpen(false);
    createAdminForm.resetFields();
    setAdminModalStep(0);
  };

  const createAdminConfirmHandler = () => {
    if (adminModalStep === 0) {
      if (isPasswordAllRulesPassed) {
        createAdminForm.validateFields().then(() => {
          setAdminModalStep(1);
        });
      } else {
        toast.warning(ALL_RULES_DID_NOT_PASS, { toastId: ALL_RULES_DID_NOT_PASS });
      }
    } else {
      const value = createAdminForm.getFieldsValue(true);

      const tempBody = {
        password: value?.password,
        confirmPassword: value?.password,
        email: value?.email,
        nationalCode: value?.username,
        branchId: value?.branch?.code,
        birthDate: moment(value?.birthdate).format("YYYY-MM-DD"),
        phoneNumber: value?.phone,
        roles: targetKeys as string[],
        hireDate: moment(value?.hireDate).format("YYYY-MM-DD"),
        terminationDate: moment(value?.terminationDate).format("YYYY-MM-DD"),
        employeeCode: value?.personnelCode,
        title: value?.adminRole,
      };

      createAdmin(tempBody).unwrap().then(closeCreateAdminModal);
    }
  };

  const onBackBtnHandler = () => {
    if (adminModalStep === 0) {
      closeCreateAdminModal();
    } else {
      setAdminModalStep(0);
    }
  };
  const onPasswordRulesPassed = (passValue: boolean) => {
    if (passValue) {
      setIsPasswordAllRulesPassed(passValue);
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
      <div className="management-all-admin-list-container">
        <CustomDivider
          text="لیست ادمین‌ها"
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
              <CustomButton onClick={openCreateAdminModal} type="primary">
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
        <CustomTable<ManagementAllAdminData>
          className="management-all-admin-list-table-container"
          dataSource={admins}
          columns={ManagementAdminsListTableModel()}
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
          label="تعداد کل ادمین ها:"
        />
      </div>
      {addAdminModalOpen && (
        <ConfirmationModalWithContent
          title="ایجاد ادمین"
          confirmBtnText={adminModalStep === 0 ? "تایید و ادامه" : "ایجاد ادمین"}
          backBtnText={adminModalStep === 0 ? "انصراف" : "بازگشت"}
          isModalOpen={addAdminModalOpen}
          closeModalHandler={closeCreateAdminModal}
          onConfirmClickHandler={createAdminConfirmHandler}
          onBackBtnHandler={onBackBtnHandler}
          isConfirmButtonLoading={adminModalStep === 1 ? isCreateAdminLoading : false}
          content={
            <CreateAdminModalContent
              step={adminModalStep}
              form={createAdminForm}
              onPasswordRulesPassed={onPasswordRulesPassed}
              targetKeys={targetKeys}
              setTargetKeys={setTargetKeys}
            />
          }
          width={700}
          showIcon={false}
        />
      )}
    </>
  );
};
export default AllAdminsList;

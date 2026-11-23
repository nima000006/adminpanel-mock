import { useEffect, useState } from "react";

import {
  Checkbox,
  CheckboxChangeEvent,
  Col,
  Dropdown,
  Form,
  MenuProps,
  Modal,
  Row,
  Tabs,
} from "antd";
import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

import { CustomInput, CustomSelect } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetSajedInquiriesMutation,
  useLazyUserInquiryNationalCodeQuery,
  useLazyUserInquiryStudentNumberQuery,
} from "@infra/states/redux/Apis/authApi";
import {
  useLazyManagementUsersAllCustomersListsQuery,
  useUserListByAdvanceFilterMutation,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";
import {
  UserInquiryNationalCodeRecordType,
  UserInquiryStudentNumberResponse,
} from "@infra/states/redux/Apis/models/authApi.model";
import { NATIONAL_CODE_RULE } from "@infra/validation/validationSchema";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import {
  UserListByAdvanceFilterContentType,
  UserListByAdvanceFilterRequest,
  UserListByAdvanceFilterResponse,
} from "@pages/management/_shared/@types/@advanceFilterEmployeesTypes";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";

import {
  UseAllCustomerListAdvanceFilterFormType,
  ManagementAllCustomerData,
  SajedInquiriesType,
  SajedInquiriesSelectType,
  UseAllCustomerListEmployeeInquiryFormType,
  UseAllCustomerListStudentInquiryFormType,
} from "./@types/@managementUsersAllCustomersListTypes";
import ManagementAllCustomersListTableModel from "./helpers/models/ManagementAllCustomersListTableModel/ManagementAllCustomersListTableModel";
import useAllCustomListAdvanceFilter from "./hooks/useAllCustomListAdvanceFilter/useCustomListAdvanceFilter";

import "./_allCustomerList.scss";

const AllCustomersList = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const currentPage = url?.page ? Number(url.page) : 1;
  const currentPageSize = url?.pageSize ? Number(url.pageSize) : 8;
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [customersInfo, setCustomersInfo] = useState<UserListByAdvanceFilterResponse>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Employee Inquiry Modal
  const [employeeInquiryModalOpen, setEmployeeInquiryModalOpen] = useState(false);
  const [employeeCodes, setEmployeeCodes] = useState<SajedInquiriesType[] | null>(null);
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] =
    useState<SajedInquiriesType | null>(null);

  const [employeeInquiryForm] = Form.useForm<UseAllCustomerListEmployeeInquiryFormType>();

  // Student Inquiry Modal
  const [studentInquiryModalOpen, setStudentInquiryModalOpen] = useState(false);
  const [studentNumber, setStudentNumber] = useState<
    UserInquiryStudentNumberResponse[] | UserInquiryNationalCodeRecordType[] | null
  >(null);
  const [selectedStudentInfo, setSelectedStudentInfo] = useState<
    UserInquiryStudentNumberResponse | UserInquiryNationalCodeRecordType | null
  >(null);

  const [studentNumberDisable, setStudentNumberDisable] = useState(false);
  const [nationalNumberDisable, setNationalNumberDisable] = useState(false);

  const [studentInquiryForm] = Form.useForm<UseAllCustomerListStudentInquiryFormType>();

  const [form] = Form.useForm<UseAllCustomerListAdvanceFilterFormType>();
  const { filterItemsList } = useAllCustomListAdvanceFilter();

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

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">افراد</span>,
      },
      {
        title: "کاربران",
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
    useLazyManagementUsersAllCustomersListsQuery();

  const [advanceFilter, { isLoading: isAdvanceFilterLoading }] =
    useUserListByAdvanceFilterMutation();

  //Inquiries
  // employee
  const [getEmployeeInquiries, { isLoading: isFetchingEmployeeInquiries }] =
    useGetSajedInquiriesMutation();

  // student by national code
  const [getUsersByNationalCode, { isFetching: isGetAllUsersByNationalCodeLoading }] =
    useLazyUserInquiryNationalCodeQuery();

  // student by student code
  const [getUsersByStudentNumber, { isFetching: isGetAllUsersByStudentNumberLoading }] =
    useLazyUserInquiryStudentNumberQuery();

  //? ================================ Effects ================================
  const { from: fromCreatedDate, to: toCreatedDate } = formatDateRangeForApi({
    from: url?.fromCreatedDateDateStart,
    to: url?.fromCreatedDateDateEnd,
  });
  useEffect(() => {
    if (hasActiveKey(url, advanceFilterItems)) {
      const filters: Omit<UserListByAdvanceFilterRequest, "pageSize" | "pageNumber"> = {
        ...(url?.firstName && { firstName: url?.firstName?.trim() }),
        ...(url?.lastName && { lastName: url?.lastName?.trim() }),
        ...(url?.username && { username: url?.username?.trim() }),
        ...(url?.mobileNumber && { mobileNumber: url?.mobileNumber?.trim() }),
        ...(url?.email && { email: url?.email?.trim() }),
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
  }, [currentPage, currentPageSize, ...advanceFilterItems.map((key) => url?.[key])]);

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

  const dataList: ManagementAllCustomerData[] = customers ?? [];

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

  // Inquiry Modal
  const openInquiryModalHandler = () => {
    setInquiryModalOpen(true);
  };

  const closeInquiryModalHandler = () => {
    setInquiryModalOpen(false);
  };

  // Employee Inquiry Modal
  const openEmployeeInquiryModalHandler = () => {
    closeInquiryModalHandler();
    setEmployeeInquiryModalOpen(true);
  };

  const closeEmployeeInquiryModalHandler = () => {
    setEmployeeInquiryModalOpen(false);

    employeeInquiryForm.resetFields();

    setEmployeeCodes(null);
  };

  const getEmployeeInquiriesHandler = (values: { nationalCode: string }) => {
    if (values?.nationalCode) {
      getEmployeeInquiries({ username: values.nationalCode })
        .unwrap()
        .then((res) => {
          if (res) {
            setEmployeeCodes(res);

            employeeInquiryForm.setFieldsValue({
              personalCode: selectDefaultValueGenerator({
                id: Number(res?.[0]?.personId) + Number(res?.[0]?.organizationChartId),
                title: (
                  Number(res?.[0]?.personId) + Number(res?.[0]?.organizationChartId)
                )?.toString(),
                organizationChartId: res?.[0]?.organizationChartId,
              }),
            });

            setSelectedEmployeeInfo(res?.[0]);
          } else {
            setEmployeeCodes([]);
          }
        });
    }
  };

  const changeEmployeePersonalCodeHandler = (value: SajedInquiriesSelectType) => {
    const selectedInfo = employeeCodes?.find(
      (item) => item.organizationChartId === value?.item?.organizationChartId
    );
    setSelectedEmployeeInfo(selectedInfo ?? null);
  };

  const employeeInquiryItems = [
    {
      label: "اطلاعات هویتی",
      children: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="نام"
            value={selectedEmployeeInfo?.firstName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="نام خانوادگی"
            value={selectedEmployeeInfo?.lastName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="کد ملی"
            value={selectedEmployeeInfo?.nationalCode}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="نام پدر"
            value={selectedEmployeeInfo?.fatherName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="تاریخ تولد"
            value={selectedEmployeeInfo?.jalaliBirthDate}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="جنسیت"
            // "100011:مذکر "
            // "100012:مونث "
            value={selectedEmployeeInfo?.genderCode === 100012 ? "مونث" : "مذکر"}
            xl={8}
            lg={8}
          />
        </Row>
      ),
      key: "1",
    },
    {
      label: "اطلاعات شغلی",
      children: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="سازمان/ واحد محل فعالیت"
            value={selectedEmployeeInfo?.organizationTitle}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="سمت شغلی"
            value={selectedEmployeeInfo?.positionTitle}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="کد پرسنلی"
            value={(
              Number(selectedEmployeeInfo?.personId) +
              Number(selectedEmployeeInfo?.organizationChartId)
            )?.toString()}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="وضعیت اشتغال"
            value={selectedEmployeeInfo?.retired ? "بازنشسته" : "در حال فعالیت"}
            xl={8}
            lg={8}
          />
        </Row>
      ),
      key: "2",
    },
  ];

  // Student Inquiry Modal
  const openStudentInquiryModalHandler = () => {
    closeInquiryModalHandler();
    setStudentInquiryModalOpen(true);
  };

  const closeStudentInquiryModalHandler = () => {
    setStudentInquiryModalOpen(false);

    studentInquiryForm.resetFields();

    setStudentNumber(null);

    setStudentNumberDisable(false);
    setNationalNumberDisable(false);
  };

  const getStudentInquiriesHandler = (values: {
    nationalCode: string;
    studentNumber: string;
  }) => {
    if (values?.nationalCode) {
      getUsersByNationalCode({ nationalCode: values?.nationalCode })
        .unwrap()
        .then((res) => {
          if (res) {
            setStudentNumber(res);

            studentInquiryForm.setFieldsValue({
              selectStudentNumber: selectDefaultValueGenerator({
                id: res?.[0]?.studentNumber,
                title: res?.[0]?.studentNumber?.toString(),
              }),
            });

            setSelectedStudentInfo(res?.[0]);
          } else {
            setStudentNumber([]);
          }
        });
    }

    if (values?.studentNumber) {
      getUsersByStudentNumber({ studentNumber: values?.studentNumber })
        .unwrap()
        .then((res) => {
          if (res) {
            setStudentNumber([res]);
            setSelectedStudentInfo(res);
          } else {
            setStudentNumber([]);
          }
        });
    }
  };

  const changeStudentCodeHandler = (value: string) => {
    const selectedInfo = studentNumber?.find((item) => item?.studentNumber === value);

    setSelectedStudentInfo(selectedInfo ?? null);
  };

  const studentInquiryItems = [
    {
      label: "اطلاعات هویتی",
      children: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="نام"
            value={selectedStudentInfo?.firstName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="نام خانوادگی"
            value={selectedStudentInfo?.lastName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="کد ملی"
            value={selectedStudentInfo?.nationalCode}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="نام پدر"
            value={selectedStudentInfo?.fatherName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="تاریخ تولد"
            value={selectedStudentInfo?.birthDate}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="جنسیت"
            value={selectedStudentInfo?.genderName}
            xl={8}
            lg={8}
          />
        </Row>
      ),
      key: "1",
    },
    {
      label: "اطلاعات تحصیلی",
      children: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره دانشجویی"
            value={selectedStudentInfo?.studentNumber}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="واحد دانشگاهی"
            value={selectedStudentInfo?.branchName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="مقطع تحصیلی"
            value={selectedStudentInfo?.levelName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="رشته تحصیلی"
            value={selectedStudentInfo?.fieldName}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="سال ورود"
            value={selectedStudentInfo?.eduStartDate}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="نیمسال ورود"
            value={
              "-"
              // با صحبت با اقای جماعتی و با توجه به تغییر api از سمت اموزشیار، این قسمت به صورت خط تیره نمایش داده می شود
              // selectedStudentInfo?.eduStartCode?.toString()?.slice(-1) === "1"
              //   ? "نیمسال اول"
              //   : "نیمسال دوم"
            }
            xl={8}
            lg={8}
          />
        </Row>
      ),
      key: "2",
    },
    {
      label: "اطلاعات تماسی",
      children: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره همراه"
            value={selectedStudentInfo?.mobile}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="ایمیل"
            value={selectedStudentInfo?.email}
            xl={8}
            lg={8}
          />
        </Row>
      ),
      key: "3",
    },
    {
      label: "عملکرد تحصیلی",
      children: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="معدل کل"
            value={selectedStudentInfo?.totalAverage}
            xl={8}
            lg={8}
          />
          <SingleVerticalWithCol
            label="تعداد واحدهای پاس‌شده"
            value={selectedStudentInfo?.totalPassedUnits}
            xl={8}
            lg={8}
          />
        </Row>
      ),
      key: "4",
    },
  ];

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
          defaultParams={{ ...url }}
        />
      )}
      {inquiryModalOpen && (
        <Modal
          title="استعلام کاربران"
          centered
          open={inquiryModalOpen}
          onCancel={closeInquiryModalHandler}
          width={500}
          footer={null}
        >
          <div className="flex flex-col gap-5">
            <div className="bg-primary-1 flex items-center gap-1 rounded-lg p-3">
              <BsExclamationCircleFill className="text-primary-6" />
              <p className="h5-medium">از کدام گروه کاربری می‌خواهید استعلام بگیرید؟</p>
            </div>
            <div
              className="bg-neutral-2 hover:bg-primary-1 cursor-pointer rounded-lg p-3"
              onClick={openStudentInquiryModalHandler}
            >
              <p className="h5-medium">دانشجو (استعلام آموزشیار)</p>
            </div>
            <div
              className="bg-neutral-2 hover:bg-primary-1 cursor-pointer rounded-lg p-3"
              onClick={openEmployeeInquiryModalHandler}
            >
              <p className="h5-medium">کارمند (استعلام ساجد)</p>
            </div>
            <div className="flex justify-end">
              <CustomButton onClick={closeInquiryModalHandler}>انصراف</CustomButton>
            </div>
          </div>
        </Modal>
      )}
      {employeeInquiryModalOpen && (
        <Modal
          title="استعلام کارمند (ساجد)"
          centered
          open={employeeInquiryModalOpen}
          onCancel={closeEmployeeInquiryModalHandler}
          width={700}
          footer={null}
        >
          <div className="flex flex-col gap-5">
            <Form form={employeeInquiryForm} onFinish={getEmployeeInquiriesHandler}>
              <div className="flex flex-col gap-4">
                <CustomInput
                  name="nationalCode"
                  label="کد ملی"
                  placeholder="کد ملی کارمند مد نظر خود را وارد نمایید"
                  onChange={() => setEmployeeCodes(null)}
                  rules={[NATIONAL_CODE_RULE]}
                />
                <CustomButton
                  type="primary"
                  htmlType="submit"
                  icon={<AiOutlineSearch />}
                  iconPlacement="end"
                >
                  جستجو
                </CustomButton>
              </div>

              <div className="flex flex-col gap-4">
                <CustomDivider text="نتیجه استعلام" />
                <Div loading={isFetchingEmployeeInquiries}>
                  {!employeeCodes ? (
                    <CustomEmpty description="کد ملی مد نظر خود را وارد نمایید." />
                  ) : employeeCodes?.length === 0 ? (
                    <CustomEmpty description="استعلامی جهت نمایش یافت نشد!" />
                  ) : (
                    <div className="flex flex-col gap-4">
                      <CustomSelect
                        name="personalCode"
                        label="کد پرسنلی"
                        options={employeeCodes?.map((item) => ({
                          id: Number(item?.personId) + Number(item?.organizationChartId),
                          title: (
                            Number(item?.personId) + Number(item?.organizationChartId)
                          )?.toString(),
                          organizationChartId: item?.organizationChartId,
                        }))}
                        form={employeeInquiryForm}
                        onChange={(_, value) =>
                          changeEmployeePersonalCodeHandler(
                            value as SajedInquiriesSelectType
                          )
                        }
                        placeholder="انتخاب کنید"
                      />
                      <Tabs type="line" items={employeeInquiryItems} />
                    </div>
                  )}
                </Div>
              </div>
            </Form>

            <div className="flex justify-end">
              <CustomButton onClick={closeEmployeeInquiryModalHandler}>
                انصراف
              </CustomButton>
            </div>
          </div>
        </Modal>
      )}

      {studentInquiryModalOpen && (
        <Modal
          title="استعلام دانشجو (آموزشیار)"
          centered
          open={studentInquiryModalOpen}
          onCancel={closeStudentInquiryModalHandler}
          width={700}
          footer={null}
        >
          <div className="flex flex-col gap-5">
            <Form form={studentInquiryForm} onFinish={getStudentInquiriesHandler}>
              <div className="flex flex-col gap-4">
                <Row gutter={[16, 16]} className="flex items-center">
                  <Col sm={11} xs={24}>
                    <CustomInput
                      name="nationalCode"
                      label="کد ملی"
                      placeholder="کد ملی دانشجوی مد نظر خود را وارد نمایید"
                      onChange={(e) => {
                        if (e.target.value) {
                          setStudentNumberDisable(true);
                        } else {
                          setStudentNumberDisable(false);
                        }
                        setStudentNumber(null);
                      }}
                      disabled={nationalNumberDisable}
                      rules={[NATIONAL_CODE_RULE]}
                    />
                  </Col>
                  <Col sm={1} xs={24}>
                    یا
                  </Col>
                  <Col sm={12} xs={24}>
                    <CustomInput
                      name="studentNumber"
                      label="شماره دانشجویی"
                      onChange={(e) => {
                        if (e.target.value) {
                          setNationalNumberDisable(true);
                        } else {
                          setNationalNumberDisable(false);
                        }
                        setStudentNumber(null);
                      }}
                      disabled={studentNumberDisable}
                      placeholder="شماره دانشجویی مد نظر خود را وارد نمایید"
                    />
                  </Col>
                </Row>
                <CustomButton
                  type="primary"
                  htmlType="submit"
                  icon={<AiOutlineSearch />}
                  iconPlacement="end"
                >
                  جستجو
                </CustomButton>
              </div>

              <div className="flex flex-col gap-4">
                <CustomDivider text="نتیجه استعلام" />
                <Div
                  loading={
                    isGetAllUsersByNationalCodeLoading ||
                    isGetAllUsersByStudentNumberLoading
                  }
                >
                  {!studentNumber ? (
                    <CustomEmpty description="کد ملی یا شماره دانشجویی مد نظر خود را وارد نمایید." />
                  ) : studentNumber?.length === 0 ? (
                    <CustomEmpty description="استعلامی جهت نمایش یافت نشد!" />
                  ) : (
                    <div className="flex flex-col gap-4">
                      {studentNumberDisable && (
                        <CustomSelect
                          name="selectStudentNumber"
                          label="شماره دانشجویی"
                          options={studentNumber?.map((item) => ({
                            id: item?.studentNumber,
                            title: item?.studentNumber?.toString(),
                          }))}
                          form={studentInquiryForm}
                          onChange={(value) => changeStudentCodeHandler(value as string)}
                          placeholder="انتخاب کنید"
                        />
                      )}
                      <Tabs type="line" items={studentInquiryItems} />
                    </div>
                  )}
                </Div>
              </div>
            </Form>

            <div className="flex justify-end">
              <CustomButton onClick={closeStudentInquiryModalHandler}>
                انصراف
              </CustomButton>
            </div>
          </div>
        </Modal>
      )}
      <div className="management-all-customer-list-container">
        <CustomDivider
          text="لیست  کاربران"
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
              <CustomButton onClick={openInquiryModalHandler} type="primary">
                استعلام
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
        <CustomTable<UserListByAdvanceFilterContentType>
          className="management-all-customer-list-table-container"
          dataSource={customers}
          columns={ManagementAllCustomersListTableModel()}
          loading={isFetchingCustomers || isAdvanceFilterLoading}
          pagination={manualPaginationConfig({
            total: customersInfo?.totalElements ?? 0,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          key={`table-${url?.pageSize || "8"}`}
          {...TABLE_PROPS(customersInfo?.totalElements ?? 0)}
          rowKey="id"
          rowSelection={rowSelection}
        />
        <CustomTotalTableItems
          className="mt-4"
          totalCount={customersInfo?.totalElements || 0}
          label="تعداد کل کاربران:"
        />
      </div>
    </>
  );
};
export default AllCustomersList;

import { useEffect, useState } from "react";

import { Col, Form, Row, Tabs, TabsProps } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyManagementAllStaffInfoListsQuery,
  useLazyManagementAllStaffTypesInfoListsQuery,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";

import ManagementAllDetailsAddressInfo from "./helper/components/ManagementAllDetailsAddressInfo/ManagementAllDetailsAddressInfo";
import ManagementAllDetailsBankInfo from "./helper/components/ManagementAllDetailsBankInfo/ManagementAllDetailsBankInfo";
import ManagementAllDetailsContact from "./helper/components/ManagementAllDetailsContact/ManagementAllDetailsContact";
import ManagementAllDetailsEducationInfo from "./helper/components/ManagementAllDetailsEducationInfo/ManagementAllDetailsEducationInfo";
import ManagementAllDetailsInfoIdentityInfo from "./helper/components/ManagementAllDetailsInfoIdentityInfo/ManagementAllDetailsInfoIdentityInfo";
import ManagementAllDetailsJobInfo from "./helper/components/ManagementAllDetailsJobInfo/ManagementAllDetailsJobInfo";
import ManagementAllDetailsUserInfo from "./helper/components/ManagementAllDetailsUserInfo/ManagementAllDetailsUserInfo";
import { ManagementAllStaffInfoListResponse } from "../../../@types/@managementUserAllCustomerDetails";
import "./_managementUserAllDetailsInfo.scss";

const STUDENT = 1;
const EMPLOYEE = 2;
const MANAGER = 3;
const ManagementUserAllDetailsInfo = () => {
  const [selectedStaffGroupId, setSelectedStaffGroupId] = useState<number | undefined>(
    undefined
  );
  const [employeeCodeOptions, setEmployeeCodeOptions] = useState<
    { id: number; title: string }[]
  >([]);
  const [selectedEmployeeCodeId, setSelectedEmployeeCodeId] = useState<
    number | undefined
  >(undefined);

  const [reInquiryToggle, setReInquiryToggle] = useState(false);
  const [editIdentityInfoToggle, setEditIdentityInfoToggle] = useState(false);

  const { params } = useQueryParams();
  const [staffGroupForm] = Form.useForm();
  const [employeeCodeForm] = Form.useForm();

  //? ================================ API ================================
  const [getUsersCustomersInfo, { data, isLoading: isGetUsersCustomersInfoLoading }] =
    useLazyManagementAllStaffInfoListsQuery();

  const [
    getStaffTypesInfo,
    {
      data: staffTypesInfo,
      isLoading: isGetStaffTypesInfoLoading,
      isError: isStaffTypesInfoError,
    },
  ] = useLazyManagementAllStaffTypesInfoListsQuery();

  //? ================================ Effects ================================
  // 1️⃣ Fetch user info when ID changes
  useEffect(() => {
    if (!params?.id) return;
    getUsersCustomersInfo({ userId: +params.id });
  }, [params?.id, getUsersCustomersInfo, reInquiryToggle, editIdentityInfoToggle]);

  // 2️⃣ When user info arrives → set photo + default staff group in form
  useEffect(() => {
    if (!data) return;

    const info = data as ManagementAllStaffInfoListResponse;
    if (info.staffTypes?.length) {
      const firstGroup = info.staffTypes[0];
      setSelectedStaffGroupId(firstGroup.id);
      staffGroupForm.setFieldsValue({ staffGroups: firstGroup.id.toString() });
    } else {
      // No staff types — clear
      setSelectedStaffGroupId(undefined);
      staffGroupForm.resetFields(["staffGroups"]);
      setEmployeeCodeOptions([]);
      setSelectedEmployeeCodeId(undefined);
      employeeCodeForm.resetFields(["employeeCode"]);
    }
  }, [data, staffGroupForm, employeeCodeForm]);

  // 3️⃣ Fetch employee codes whenever selected staff group or ID changes
  useEffect(() => {
    if (!params?.id || !selectedStaffGroupId) {
      setEmployeeCodeOptions([]);
      setSelectedEmployeeCodeId(undefined);
      employeeCodeForm.resetFields(["employeeCode"]);
      return;
    }
    getStaffTypesInfo({ userId: +params.id, staffTypeId: selectedStaffGroupId });
  }, [
    params?.id,
    selectedStaffGroupId,
    getStaffTypesInfo,
    employeeCodeForm,
    reInquiryToggle,
  ]);

  // 4️⃣ When employee codes data arrives or error → update options and default selection or clear
  useEffect(() => {
    if (isStaffTypesInfoError || !staffTypesInfo || !staffTypesInfo.length) {
      setEmployeeCodeOptions([]);
      setSelectedEmployeeCodeId(undefined);
      employeeCodeForm.resetFields(["employeeCode"]);
      return;
    }

    const options = staffTypesInfo.map(({ id, title }) => ({ id, title }));
    setEmployeeCodeOptions(options);

    const firstCode = staffTypesInfo[0];
    setSelectedEmployeeCodeId(firstCode.id);
    employeeCodeForm.setFieldsValue({ employeeCode: firstCode.id.toString() });
  }, [staffTypesInfo, isStaffTypesInfoError, employeeCodeForm]);

  // ================================ Tabs ================================
  const getFilteredItems = (staffTypeId?: number): TabsProps["items"] => {
    const baseItems: TabsProps["items"] = [
      {
        key: "0",
        label: "اطلاعات هویتی",
        children: (
          <ManagementAllDetailsInfoIdentityInfo
            data={data}
            loading={isGetUsersCustomersInfoLoading}
            setEditIdentityInfoToggle={setEditIdentityInfoToggle}
          />
        ),
      },
      {
        key: "1",
        label: "اطلاعات تماسی",
        children: (
          <ManagementAllDetailsContact
            data={data}
            loading={isGetUsersCustomersInfoLoading}
          />
        ),
      },
      ...(data?.staffTypes?.length
        ? [
            {
              key: "3",
              label: "اطلاعات مکانی",
              children: <ManagementAllDetailsAddressInfo userId={params.id} />,
            },
            {
              key: "4",
              label: "اطلاعات تحصیلی",
              children: (
                <ManagementAllDetailsEducationInfo staffId={selectedEmployeeCodeId} />
              ),
            },
            {
              key: "5",
              label: "اطلاعات شغلی",
              children: <ManagementAllDetailsJobInfo staffId={selectedEmployeeCodeId} />,
            },
            {
              key: "6",
              label: "اطلاعات حسابهای بانکی",
              children: <ManagementAllDetailsBankInfo username={data?.username} />,
            },
          ]
        : []),
    ];

    if (staffTypeId === STUDENT) {
      return baseItems.filter((tab) => tab.key !== "5");
    }
    if (staffTypeId === EMPLOYEE || staffTypeId === MANAGER) {
      return baseItems.filter((tab) => tab.key !== "4");
    }
    return baseItems;
  };

  const filteredItems = getFilteredItems(selectedStaffGroupId);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isGetUsersCustomersInfoLoading}
      className="management-all-detail-info-container"
    >
      <ManagementAllDetailsUserInfo
        data={data}
        setReInquiryToggle={setReInquiryToggle}
        from="user-info-tab"
      />
      <Row gutter={[16, 16]} className="management-all-detail-info-select-container">
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Form form={staffGroupForm}>
            <CustomSelect
              options={
                data?.staffTypes?.map((s) => ({
                  id: s.id,
                  title: s.title,
                  value: s.id.toString(),
                  label: s.title,
                })) || []
              }
              onChange={(value) => {
                const numericId = Number(value);
                setSelectedStaffGroupId(numericId);
                // Clear employeeCode options and form immediately on staff group change
                setEmployeeCodeOptions([]);
                setSelectedEmployeeCodeId(undefined);
                employeeCodeForm.resetFields(["employeeCode"]);

                if (params?.id) {
                  getStaffTypesInfo({ userId: +params.id, staffTypeId: numericId });
                }
              }}
              label="گروه کاربری"
              name="staffGroups"
              value={selectedStaffGroupId?.toString()}
            />
          </Form>
        </Col>

        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Form form={employeeCodeForm}>
            <CustomSelect
              options={employeeCodeOptions.map((s) => ({
                title: s.title,
                id: s.id,
                value: s.id.toString(),
                label: s.title,
              }))}
              value={selectedEmployeeCodeId?.toString()}
              onChange={(value) => {
                const numericId = Number(value);
                setSelectedEmployeeCodeId(numericId);
              }}
              label="سمت"
              name="employeeCode"
              loading={isGetStaffTypesInfoLoading}
              allowClear
            />
          </Form>
        </Col>
      </Row>

      <Tabs className="tab-container" items={filteredItems} />
    </Div>
  );
};

export default ManagementUserAllDetailsInfo;

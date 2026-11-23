import { useEffect, useState } from "react";

import { Col, Form, Row, Tabs, TabsProps } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyManagementMyStaffInfoListsQuery,
  useLazyManagementMyStaffTypesInfoListsQuery,
} from "@infra/states/redux/Apis/management/usersList/usersListApi";

import ManagementMyDetailsAddressInfo from "./helper/components/ManagementMyDetailsAddressInfo/ManagementMyDetailsAddressInfo";
import ManagementMyDetailsContact from "./helper/components/ManagementMyDetailsContact/ManagementMyDetailsContact";
import ManagementMyDetailsEducationInfo from "./helper/components/ManagementMyDetailsEducationInfo/ManagementMyDetailsEducationInfo";
import ManagementMyDetailsInfoIdentityInfo from "./helper/components/ManagementMyDetailsInfoIdentityInfo/ManagementMyDetailsInfoIdentityInfo";
import ManagementMyDetailsJobInfo from "./helper/components/ManagementMyDetailsJobInfo/ManagementMyDetailsJobInfo";
import ManagementMyDetailsUserInfo from "./helper/components/ManagementMyDetailsUserInfo/ManagementMyDetailsUserInfo";
import { ManagementMyStaffInfoListResponse } from "../../../@types/@managementUserMyCustomerDetails";
import "./_managementMyDetailsInfo.scss";

const STUDENT = 1;
const EMPLOYEE = 2;
const MANAGER = 3;
const ManagementMyDetailsInfo = () => {
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

  const { params } = useQueryParams();
  const [staffGroupForm] = Form.useForm();
  const [employeeCodeForm] = Form.useForm();

  //? ================================ API ================================
  const [getUsersCustomersInfo, { data, isLoading: isGetUsersCustomersInfoLoading }] =
    useLazyManagementMyStaffInfoListsQuery();

  const [
    getStaffTypesInfo,
    {
      data: staffTypesInfo,
      isLoading: isGetStaffTypesInfoLoading,
      isError: isStaffTypesInfoError,
    },
  ] = useLazyManagementMyStaffTypesInfoListsQuery();

  //? ================================ Effects ================================
  // 1️⃣ Fetch user info when ID changes
  useEffect(() => {
    if (!params?.id) return;
    getUsersCustomersInfo({ userId: +params.id });
  }, [params?.id, getUsersCustomersInfo, reInquiryToggle]);

  // 2️⃣ When user info arrives → set photo + default staff group in form
  useEffect(() => {
    if (!data) return;
    const info = data as ManagementMyStaffInfoListResponse;

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
          <ManagementMyDetailsInfoIdentityInfo staffId={selectedEmployeeCodeId} />
        ),
      },
      {
        key: "1",
        label: "اطلاعات تماسی",
        children: <ManagementMyDetailsContact staffId={selectedEmployeeCodeId} />,
      },
      {
        key: "3",
        label: "اطلاعات مکانی",
        children: <ManagementMyDetailsAddressInfo userId={params.id} />,
      },
      {
        key: "4",
        label: "اطلاعات تحصیلی",
        children: <ManagementMyDetailsEducationInfo staffId={selectedEmployeeCodeId} />,
      },
      {
        key: "5",
        label: "اطلاعات شغلی",
        children: <ManagementMyDetailsJobInfo staffId={selectedEmployeeCodeId} />,
      },
      // Todo[Atefeh]: uncomment when api got ready. not needed in this phase
      // {
      //   key: "6",
      //   label: "اطلاعات حسابهای بانکی",
      //   children: <ManagementMyDetailsBankInfo username={data?.username} />,
      // },
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
      className="management-my-detail-info-container"
    >
      <ManagementMyDetailsUserInfo
        data={data}
        setReInquiryToggle={setReInquiryToggle}
        from="user-info-tab"
      />

      <Row gutter={[16, 16]} className="management-my-detail-info-select-container">
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

        <Col xs={24} sm={12} md={8} lg={8} xl={8} />
      </Row>

      <Tabs className="tab-container" items={filteredItems} />
    </Div>
  );
};

export default ManagementMyDetailsInfo;

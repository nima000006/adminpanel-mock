import { useEffect, useMemo, useState } from "react";

import { Col, Form, Row } from "antd";
import { RenderResult, TransferItem, TransferProps } from "antd/es/transfer";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_MY_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import {
  useLazyMyManagementRolesGroupsListsQuery,
  useLazyMyManagementRolesListsQuery,
} from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import {
  useLazyGetMyManagementSamimServicesQuery,
  useManagementMyRoleAccessRequestMutation,
} from "@infra/states/redux/Apis/management/requests/requestApi";
import { useLazyManagementUsersMyStaffInfoQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";
import {
  ManagementMyRoleGroup,
  ManagementMyServiceItem,
} from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementUserMyManagementDetailsInfo/helper/components/MyManagementDetailsEditRoleDrawerContent/@types/@managementMyEditRoleOfStaff";
import { ManagementUsersMyStaffInfoResponse } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementUserMyManagementDetailsInfo/helper/components/MyManagementDetailsEditRoleDrawerContent/@types/@managementUsersMyStaffInfo";
import { ROLE_REQUEST_CONFIRMED } from "@pages/management/Requests/RoleRequest/_shared/utils/roleRequestUtil";

import { MyRoleRequestConfirmedDrawerContentProps } from "./@types/@myRoleRequestConfirmedDrawerContent";

import "./_myRoleRequestConfirmedDrawerContent.scss";

type ItemRenderer = (item: TransferItem) => RenderResult;

const MyRoleRequestConfirmedDrawerContent = ({
  closeDrawerHandler,
  adminStaffId,
}: MyRoleRequestConfirmedDrawerContentProps) => {
  const [roleList, setRoleList] = useState<TransferItem[] | []>([]);

  const [selectedServices, setSelectedServices] = useState<ManagementMyServiceItem[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<ManagementMyRoleGroup[]>([]);

  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>();

  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>([]);

  const { params: url } = useQueryParams();

  const [searchForm] = Form.useForm<{
    services: string[];
    groups: string[];
  }>();
  const navigate = useNavigate();

  //? ================================ Api ================================
  const [getRoleList, { data: dataRole, isFetching: fetchingRoles }] =
    useLazyMyManagementRolesListsQuery();

  const [getServicesList, { data: servicesData, isFetching: isServicesLoading }] =
    useLazyGetMyManagementSamimServicesQuery();

  const [getGroupsList, { data: groupsData, isFetching: isGroupsLoading }] =
    useLazyMyManagementRolesGroupsListsQuery();

  const [getSelectedRoles, { isFetching: isGetSelectedRolesLoading }] =
    useLazyManagementUsersMyStaffInfoQuery();

  const [sendRoleAccessRequest, { isLoading: isSending }] =
    useManagementMyRoleAccessRequestMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getRoleList().unwrap();
    getServicesList();
    getGroupsList();

    if (adminStaffId) {
      getSelectedRoles({ staffId: +adminStaffId })
        .unwrap()
        .then(getSelectedRolesOnSuccess);
    }
  }, []);

  // ================================ Util Functions ================================
  // getSelectedRolesOnSuccess
  const getSelectedRolesOnSuccess = (data: ManagementUsersMyStaffInfoResponse) => {
    if (data?.roles) {
      const selectedRoleKeys = data.roles.map((role) => role.name);
      setTargetKeys(selectedRoleKeys);
    }
  };

  const allAvailableRoles: TransferItem[] = useMemo(() => {
    if (!dataRole) return [];

    return dataRole.map((role) => ({
      key: role.name,
      title: role.title ?? role.name, // Show title if available
      description: role.description ?? undefined,
    }));
  }, [dataRole]);

  const filteredRoles = useMemo(() => {
    if (selectedGroups.length === 0 && selectedServices.length === 0) {
      return allAvailableRoles;
    }

    return roleList;
  }, [allAvailableRoles, roleList, selectedGroups.length, selectedServices.length]);

  const roleMap = useMemo(() => {
    const map = new Map<string, TransferItem>();

    allAvailableRoles.forEach((item) => {
      map.set(item.key as string, item);
    });

    filteredRoles.forEach((item) => {
      map.set(item.key as string, item);
    });

    return map;
  }, [allAvailableRoles, filteredRoles]);

  const targetItems = (targetKeys ?? [])
    .map((key) => roleMap.get(key as string))
    .filter(Boolean) as TransferItem[];

  const transferData = [
    ...filteredRoles,
    ...targetItems.filter((item) => !filteredRoles.some((r) => r.key === item.key)),
  ];

  const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const itemRenderer: ItemRenderer = (item: TransferItem) => {
    return {
      key: item?.key || undefined,
      label: <> {item?.title}</> || <>نامشخص</>,
      value: item?.key?.toString() || "",
    };
  };

  const roleAllocationHandler = () => {
    sendRoleAccessRequest({
      roles: targetKeys as string[],
      statusId: ROLE_REQUEST_CONFIRMED,
      requestId: +url.id,
    })
      .unwrap()
      .then(() => {
        closeDrawerHandler();
        navigate(MANAGEMENT_MY_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE);
      });
  };

  const serviceDataChangeHandler = (services: ManagementMyServiceItem[]) => {
    setSelectedServices(services);

    const rolesList = services?.map((s) => s.item?.name);
    const filteredData =
      dataRole?.filter((role) => rolesList.includes(role?.serviceName)) || [];
    const tempData = filteredData.map((role) => ({
      key: role.name,
      title: role.title ?? role.name,
      description: role.description ?? undefined,
    }));

    setRoleList(tempData);
  };

  const groupsChangeHandler = (groups: ManagementMyRoleGroup[]) => {
    setSelectedGroups(groups);

    const rolesList = groups?.map((group) => {
      return group?.item?.roles?.map((role) => role?.name);
    });

    const filteredData =
      dataRole?.filter((item) => rolesList.flat().includes(item.name)) || [];

    const tempData = filteredData?.map((role) => ({
      key: role.name,
      title: role.title ?? role.name, // Show title if available
      description: role.description ?? undefined,
    }));

    setRoleList(tempData);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="my-role-request-confirmed-drawer-content-container">
      <CustomDrawerHeader
        title="تایید درخواست و تخصیص نقش"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="action-btn-container">
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              onClick={roleAllocationHandler}
              loading={isSending}
              disabled={!targetKeys?.length}
            >
              تخصیص نقش
            </CustomButton>
          </div>
        }
      />
      <div className="body-container">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="گروه کاربری"
            value="ادمین"
            xl={12}
            lg={12}
            md={12}
          />
          <SingleVerticalWithCol
            label="سمت"
            value="مدیر خوابگاه"
            xl={12}
            lg={12}
            md={12}
          />
        </Row>
        <Form form={searchForm} className="search-box">
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                name="services"
                options={servicesData || []}
                label="سرویس‌ها"
                onChange={(_, service) =>
                  serviceDataChangeHandler(service as ManagementMyServiceItem[])
                }
                placeholder="انتخاب کنید"
                form={searchForm}
                mode="multiple"
                loading={isServicesLoading}
                disabled={selectedGroups?.length !== 0}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                name="groups"
                options={
                  groupsData?.map((item) => ({
                    id: item?.groupId,
                    ...item,
                  })) || []
                }
                label="گروه‌ها"
                onChange={(_, groups) =>
                  groupsChangeHandler(groups as ManagementMyRoleGroup[])
                }
                placeholder="انتخاب کنید"
                form={searchForm}
                mode="multiple"
                loading={isGroupsLoading}
                disabled={selectedServices?.length !== 0}
              />
            </Col>
          </Row>
        </Form>
        <Div loading={fetchingRoles || isGetSelectedRolesLoading}>
          <CustomTransfer
            onChange={onChange}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onSelectChange={onSelectChange}
            titles={["نقش‌های موجود در سیستم", "نقش‌های تخصیص داده شده"]}
            dataSource={
              selectedGroups?.length === 0 && selectedServices?.length === 0
                ? [
                    ...allAvailableRoles,
                    ...transferData.filter(
                      (role) =>
                        !allAvailableRoles.some(
                          (availableRole) => availableRole.key === role.key
                        )
                    ),
                  ]
                : [
                    ...roleList,
                    ...transferData.filter(
                      (role) => !roleList.some((listRole) => listRole.key === role.key)
                    ),
                  ]
            }
            render={itemRenderer}
            pagination
            // showSearch
          />
        </Div>
      </div>
    </div>
  );
};

export default MyRoleRequestConfirmedDrawerContent;

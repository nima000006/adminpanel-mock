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
import { MANAGEMENT_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import {
  useLazyAllManagementRolesGroupsListsQuery,
  useLazyAllManagementRolesListsQuery,
} from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import {
  useLazyGetAllManagementSamimServicesQuery,
  useManagementRoleAccessRequestMutation,
} from "@infra/states/redux/Apis/management/requests/requestApi";
import { useLazyManagementUsersAllStaffInfoQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";
import {
  ManagementAllRoleGroup,
  ManagementAllServiceItem,
} from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementUserAllManagementDetailsInfo/helper/components/AllManagementDetailsEditRoleDrawerContent/@types/@managementAllEditRoleOfStaff";
import { ManagementUsersAllStaffInfoResponse } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementUserAllManagementDetailsInfo/helper/components/AllManagementDetailsEditRoleDrawerContent/@types/@managementUsersAllStaffInfo";
import { ROLE_REQUEST_CONFIRMED } from "@pages/management/Requests/RoleRequest/_shared/utils/roleRequestUtil";

import { AllRoleRequestConfirmedDrawerContentProps } from "./@types/@allRoleRequestConfirmedDrawerContent";

import "./_allRoleRequestConfirmedDrawerContent.scss";

type ItemRenderer = (item: TransferItem) => RenderResult;

const AllRoleRequestConfirmedDrawerContent = ({
  closeDrawerHandler,
  adminStaffId,
}: AllRoleRequestConfirmedDrawerContentProps) => {
  const [roleList, setRoleList] = useState<TransferItem[] | []>([]);

  const [selectedServices, setSelectedServices] = useState<ManagementAllServiceItem[]>(
    []
  );
  const [selectedGroups, setSelectedGroups] = useState<ManagementAllRoleGroup[]>([]);

  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>();

  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>([]);
  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  const [searchForm] = Form.useForm<{
    services: string[];
    groups: string[];
  }>();

  //? ================================ Api ================================
  const [getRoleList, { data: dataRole, isFetching: fetchingRoles }] =
    useLazyAllManagementRolesListsQuery();

  const [getServicesList, { data: servicesData, isFetching: isServicesLoading }] =
    useLazyGetAllManagementSamimServicesQuery();

  const [getGroupsList, { data: groupsData, isFetching: isGroupsLoading }] =
    useLazyAllManagementRolesGroupsListsQuery();

  const [getSelectedRoles, { isFetching: isGetSelectedRolesLoading }] =
    useLazyManagementUsersAllStaffInfoQuery();

  const [sendRoleAccessRequest, { isLoading: isSending }] =
    useManagementRoleAccessRequestMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getRoleList();
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
  const getSelectedRolesOnSuccess = (data: ManagementUsersAllStaffInfoResponse) => {
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
        navigate(MANAGEMENT_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE);
      });
  };

  const serviceDataChangeHandler = (services: ManagementAllServiceItem[]) => {
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

  const groupsChangeHandler = (groups: ManagementAllRoleGroup[]) => {
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
    <div className="all-role-request-confirmed-drawer-content-container">
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
                  serviceDataChangeHandler(service as ManagementAllServiceItem[])
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
                  groupsChangeHandler(groups as ManagementAllRoleGroup[])
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

export default AllRoleRequestConfirmedDrawerContent;

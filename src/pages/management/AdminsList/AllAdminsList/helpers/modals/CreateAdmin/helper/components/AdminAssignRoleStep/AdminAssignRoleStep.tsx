import { Key, useEffect, useMemo, useState } from "react";

import { Col, Form, FormInstance, Row, TransferProps } from "antd";
import { RenderResult, TransferItem } from "antd/es/transfer";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import Div from "@components/Renderers/Div/Div";
import {
  useLazyAllManagementRolesGroupsListsQuery,
  useLazyAllManagementRolesListsQuery,
} from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { useLazyGetAllManagementSamimServicesQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import {
  ManagementAllRoleGroup,
  ManagementAllServiceItem,
} from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementUserAllManagementDetailsInfo/helper/components/AllManagementDetailsEditRoleDrawerContent/@types/@managementAllEditRoleOfStaff";
import { CreateAdminFormType } from "@pages/management/AdminsList/AllAdminsList/@types/@managementsUserAllAdminListTypes";

type ItemRenderer = (item: TransferItem) => RenderResult;

const AdminAssignRoleStep = ({
  form,
  targetKeys,
  setTargetKeys,
}: {
  form: FormInstance<CreateAdminFormType>;

  targetKeys: Key[] | undefined;
  setTargetKeys: React.Dispatch<React.SetStateAction<React.Key[] | undefined>>;
}) => {
  const [roleList, setRoleList] = useState<TransferItem[] | []>([]);

  const [selectedServices, setSelectedServices] = useState<ManagementAllServiceItem[]>(
    []
  );
  const [selectedGroups, setSelectedGroups] = useState<ManagementAllRoleGroup[]>([]);

  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>([]);

  //? ================================  Api Calls ================================
  const [getRoleList, { data: dataRole, isFetching: fetchingRoles }] =
    useLazyAllManagementRolesListsQuery();

  const [getServicesList, { data: servicesData, isFetching: isServicesLoading }] =
    useLazyGetAllManagementSamimServicesQuery();

  const [getGroupsList, { data: groupsData, isFetching: isGroupsLoading }] =
    useLazyAllManagementRolesGroupsListsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getRoleList();
    getServicesList();
    getGroupsList();
  }, []);

  //* ================================ Util Functions ================================
  const allAvailableRoles: TransferItem[] = useMemo(() => {
    if (!dataRole) return [];

    return dataRole.map((role) => ({
      key: role.name,
      title: role.title ?? role.name, // Show title if available
      description: role.description ?? undefined,
    }));
  }, [dataRole]);

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
    setTargetKeys([]);
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
    setTargetKeys([]);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div>
      <Form form={form}>
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
              form={form}
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
              form={form}
              mode="multiple"
              loading={isGroupsLoading}
              disabled={selectedServices?.length !== 0}
            />
          </Col>
        </Row>
      </Form>
      <Div loading={fetchingRoles}>
        <CustomTransfer
          onChange={onChange}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onSelectChange={onSelectChange}
          titles={["نقش‌های موجود در سیستم", "نقش‌های تخصیص داده شده"]}
          dataSource={
            selectedGroups?.length === 0 && selectedServices?.length === 0
              ? allAvailableRoles
              : roleList
          }
          render={itemRenderer}
          pagination
        />
      </Div>
    </div>
  );
};

export default AdminAssignRoleStep;

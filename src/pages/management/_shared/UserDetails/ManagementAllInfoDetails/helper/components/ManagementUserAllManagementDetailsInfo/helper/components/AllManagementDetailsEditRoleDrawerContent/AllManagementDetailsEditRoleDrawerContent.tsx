import { useEffect, useMemo, useState } from "react";

import { Col, Form, Row } from "antd";
import { RenderResult, TransferItem, TransferProps } from "antd/es/transfer";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyAllManagementRolesGroupsListsQuery,
  useLazyAllManagementRolesListsQuery,
  useManagementOverRideUsersRolesMutation,
} from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { useLazyGetAllManagementSamimServicesQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import { useLazyManagementUsersAllStaffInfoQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { USER_INFO_CHANGED_SUCCESSFULLY } from "@infra/VARS/globalToasts/globalToasts";

import {
  ManagementAllRoleGroup,
  ManagementAllServiceItem,
} from "./@types/@managementAllEditRoleOfStaff";
import { ManagementUsersAllStaffInfoResponse } from "./@types/@managementUsersAllStaffInfo";

type ItemRenderer = (item: TransferItem) => RenderResult;

const EMPTY_WARN_MSG = "انتخاب حداقل یک نقش الزامیست.";

const AllManagementDetailsEditRoleDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  const { params } = useQueryParams();
  const [roleList, setRoleList] = useState<TransferItem[] | []>([]);

  const [selectedServices, setSelectedServices] = useState<ManagementAllServiceItem[]>(
    []
  );
  const [selectedGroups, setSelectedGroups] = useState<ManagementAllRoleGroup[]>([]);

  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["selectedKeys"]>([]);
  const [form] = Form.useForm();

  //? ================================ Api ================================
  const [getRoleList, { data: dataRole, isFetching: fetchingRoles }] =
    useLazyAllManagementRolesListsQuery();

  const [getServicesList, { data: servicesData, isFetching: isServicesLoading }] =
    useLazyGetAllManagementSamimServicesQuery();

  const [getGroupsList, { data: groupsData, isFetching: isGroupsLoading }] =
    useLazyAllManagementRolesGroupsListsQuery();

  const [getSelectedRoles, { isFetching: isGetSelectedRolesLoading }] =
    useLazyManagementUsersAllStaffInfoQuery();

  const [overrideUserRoles, { isLoading: isOverrideUserRolesLoading }] =
    useManagementOverRideUsersRolesMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getRoleList();
    getServicesList();
    getGroupsList();
  }, []);

  useEffect(() => {
    if (params?.staffId)
      getSelectedRoles({ staffId: +params.staffId })
        .unwrap()
        .then(getSelectedRolesOnSuccess);
  }, [params.staffId]);

  // ================================ Util function ================================

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
      title: role.title ?? role.name,
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

  // Handle change in selected roles
  const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  // Handle selection in either list
  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onFinish = () => {
    if (targetKeys && targetKeys?.length > 0) {
      overrideUserRoles({
        staffId: +params?.staffId,
        roles: targetKeys as string[],
      })
        .unwrap()
        .then(() => {
          toast.success(USER_INFO_CHANGED_SUCCESSFULLY, {
            toastId: USER_INFO_CHANGED_SUCCESSFULLY,
          });
          closeDrawerHandler();
        });
    } else {
      toast.warning(EMPTY_WARN_MSG, { toastId: EMPTY_WARN_MSG });
    }
  };
  const groupsChangeHandler = (group: ManagementAllRoleGroup[]) => {
    setSelectedGroups(group);

    const rolesList = group?.map((g) => {
      return g?.item?.roles?.map((r) => r?.name);
    });

    const filteredData =
      dataRole?.filter((item) => rolesList.flat().includes(item.name)) || [];

    const tempData = filteredData?.map((role) => ({
      key: role.name,
      title: role.title ?? role.name,
      description: role.description ?? undefined,
    }));

    setRoleList(tempData);
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

  const itemRenderer: ItemRenderer = (item: TransferItem) => {
    return {
      key: item?.key || undefined,
      label: <>{item?.title}</> || <>نامشخص</>,
      value: item?.key?.toString() || "",
    };
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} onFinish={onFinish}>
      <CustomDrawerHeader
        title="ویرایش نقش"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={isOverrideUserRolesLoading}
            >
              تایید و ثبت
            </CustomButton>
          </>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={params?.staffType}
          label="گروه کاربری"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={params?.position}
          label="سمت"
        />
        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomSelect
            name="services"
            mode="multiple"
            label="سرویس ها"
            options={servicesData}
            loading={isServicesLoading}
            onChange={(_, service) => {
              serviceDataChangeHandler(service as ManagementAllServiceItem[]);
            }}
            disabled={selectedGroups?.length !== 0}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomSelect
            name="groups"
            mode="multiple"
            label="گروه ها"
            options={
              groupsData?.map((item) => ({
                id: item?.groupId,
                ...item,
              })) || []
            }
            onChange={(_, groups) =>
              groupsChangeHandler((groups as ManagementAllRoleGroup[]) ?? [])
            }
            loading={isGroupsLoading}
            disabled={selectedServices?.length !== 0}
          />
        </Col>
      </Row>
      <Div loading={fetchingRoles || isGetSelectedRolesLoading}>
        <CustomTransfer
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
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          pagination
          showSearch
        />
      </Div>
    </Form>
  );
};
export default AllManagementDetailsEditRoleDrawerContent;

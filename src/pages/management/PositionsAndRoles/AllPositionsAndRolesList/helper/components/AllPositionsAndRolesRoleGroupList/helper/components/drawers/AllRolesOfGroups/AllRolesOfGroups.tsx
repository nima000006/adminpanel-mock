import { useEffect, useState, useMemo } from "react";

import { Form, TransferProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { TransferItem } from "antd/es/transfer";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyAllManagementRolesListsQuery,
  useAllManagementOverRideOfUserGroupMutation,
} from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { USER_INFO_CHANGED_SUCCESSFULLY } from "@infra/VARS/globalToasts/globalToasts";

import { AllRolesOfGroupsProps } from "./@types/@allRolesOfGroupsTypes";
import "./_allRolesOfGroups.scss";

const AllRolesOfGroups = ({
  onClose,
  onSuccess,
  dataRoleGroups,
}: AllRolesOfGroupsProps) => {
  const {
    params: { title, id, name: groupName },
  } = useQueryParams();

  const [form] = useForm();
  // Find current group by title or groupName
  const currentGroup = useMemo(() => {
    return dataRoleGroups.find((group) => group.groupId === id);
  }, [id, dataRoleGroups]);
  // Local state for Transfer keys and selection
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["selectedKeys"]>([]);

  //? ================================ Api ================================

  const [getRoleList, { data: dataRole, isFetching: fetchingRoles }] =
    useLazyAllManagementRolesListsQuery();

  const [OverRideRolesGroup, { isLoading: overWriting }] =
    useAllManagementOverRideOfUserGroupMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getRoleList();
  }, []);

  useEffect(() => {
    if (currentGroup?.roles && dataRole) {
      const validSystemRoleNames = new Set(dataRole.map((r) => r.name));

      const selected = currentGroup.roles
        .filter((role) => validSystemRoleNames.has(role.name))
        .map((role) => role.name);

      setTargetKeys(selected);
    }
  }, [currentGroup?.roles, dataRole]);
  // ================================ Util function ================================

  const allAvailableRoles: TransferItem[] = useMemo(() => {
    if (!dataRole) return [];

    return dataRole.map((role) => ({
      key: role.name,
      title: role.title ?? role.name, // Show title if available
      description: role.description ?? undefined,
    }));
  }, [dataRole]);

  // Handle change in selected roles
  const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onFinish = () => {
    return OverRideRolesGroup({
      groupName,
      roles: targetKeys as string[],
    })
      .unwrap()
      .then(() => {
        toast.success(USER_INFO_CHANGED_SUCCESSFULLY, {
          toastId: USER_INFO_CHANGED_SUCCESSFULLY,
        });
        onSuccess();
      });
  };
  // Handle selection in either list
  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form form={form} onFinish={onFinish}>
      <CustomDrawerHeader
        title="نقش‌های گروه"
        closeDrawerHandler={onClose}
        leftSideContent={
          <div className="drawer-header-btn">
            <CustomButton onClick={onClose}>انصراف</CustomButton>
            <CustomButton type="primary" htmlType="submit" loading={overWriting}>
              تایید و ثبت
            </CustomButton>
          </div>
        }
      />
      <SingleVerticalWithCol label="نام گروه نقش" value={title} xl={12} lg={12} md={12} />
      <Div loading={fetchingRoles}>
        <CustomTransfer
          titles={["نقش‌های موجود در سیستم", "نقش های این گروه"]}
          dataSource={allAvailableRoles}
          render={(item) => item.title! ?? item.key!}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          pagination
          showSearch
          styles={{
            section: {
              width: "100%",
            },
          }}
        />
      </Div>
    </Form>
  );
};

export default AllRolesOfGroups;

import { useEffect, useMemo, useState } from "react";

import { Col, Form, Row } from "antd";
import { TransferItem, TransferProps } from "antd/es/transfer";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyMyManagementRolesListsQuery,
  useMyManagementOverRideOfUserGroupMutation,
} from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { USER_INFO_CHANGED_SUCCESSFULLY } from "@infra/VARS/globalToasts/globalToasts";

const MyManagementDetailsAddRoleDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  const {
    params: { name: groupName },
  } = useQueryParams();

  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["selectedKeys"]>([]);
  const [form] = Form.useForm();

  //? ================================ Api ================================

  const [getRoleList, { data: dataRole, isFetching: fetchingRoles }] =
    useLazyMyManagementRolesListsQuery();

  const [OverRideRolesGroup, { isLoading: overWriting }] =
    useMyManagementOverRideOfUserGroupMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getRoleList();
  }, []);
  // ================================ Util function ================================

  const allAvailableRoles: TransferItem[] = useMemo(() => {
    if (!dataRole) return [];

    return dataRole.map((role) => ({
      key: role.name,
      title: role.title ?? role.name,
      description: role.description ?? undefined,
    }));
  }, [dataRole]);

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
    return OverRideRolesGroup({
      groupName,
      roles: targetKeys as string[],
    })
      .unwrap()
      .then(() => {
        toast.success(USER_INFO_CHANGED_SUCCESSFULLY, {
          toastId: USER_INFO_CHANGED_SUCCESSFULLY,
        });
      });
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} onFinish={onFinish}>
      <CustomDrawerHeader
        title="افزودن نقش"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <>
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              onClick={closeDrawerHandler}
              htmlType="submit"
              loading={overWriting}
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
          value={emptyString}
          label="گروه کاربری"
        />
        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomSelect
            label="سمت"
            name="role"
            options={[{ title: "مدیریت خوابگاه", id: 1 }]}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomSelect
            name="service"
            mode="multiple"
            label="سرویس ها"
            rules={[REQUIRED_RULE]}
            options={[
              { title: "خوابگاه", id: 1 },
              { title: "بیمه", id: 2 },
              { title: "تغذیه", id: 3 },
            ]}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <CustomSelect
            name="group"
            mode="multiple"
            label="گروه ها"
            rules={[REQUIRED_RULE]}
            options={[
              { title: "مدیریت", id: 1 },
              { title: "ناظر", id: 2 },
              { title: "تست1", id: 3 },
              { title: "تست2", id: 4 },
              { title: "تست3", id: 5 },
              { title: "تست4", id: 6 },
            ]}
          />
        </Col>
      </Row>
      <Div loading={fetchingRoles}>
        <CustomTransfer
          titles={["نقش‌های موجود در سیستم", "نقش‌های تخصیص داده شده"]}
          dataSource={allAvailableRoles}
          render={(item) => item.title! ?? item.key!}
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
export default MyManagementDetailsAddRoleDrawerContent;

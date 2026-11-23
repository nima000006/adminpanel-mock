import { useEffect } from "react";

import { Col, Form, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyManagementUpdateOfUserGroupMutation } from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { USER_INFO_CHANGED_SUCCESSFULLY } from "@infra/VARS/globalToasts/globalToasts";

import { MyModifyRoleFormGroupValues } from "./types/@modifyMyRoleGroupContent";
import "./_modifyMyRoleGroupContent.scss";

const ModifyMyRoleGroupContent = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [form] = useForm<MyModifyRoleFormGroupValues>();
  const { params } = useQueryParams();

  //? ================================ Api ================================

  const [updateRoleGroup, { isLoading: isUpdateRoleGroupLoading }] =
    useMyManagementUpdateOfUserGroupMutation();
  //? ================================ Effects ================================
  useEffect(() => {
    if (params.name) {
      form.setFieldsValue({
        groupName: params?.name,
        title: params?.title,
        eName: params?.name,
      });
    } else {
      form.resetFields(["groupName", "title"]);
    }
  }, [params.name, form]);

  // ================================ Util functions ================================

  const onFinish = (values: MyModifyRoleFormGroupValues) => {
    const payload = {
      groupName: values.groupName,
      title: values.title,
      serviceId: values.serviceId,
    };

    updateRoleGroup(payload)
      .unwrap()
      .then(() => {
        toast.success(USER_INFO_CHANGED_SUCCESSFULLY, {
          toastId: USER_INFO_CHANGED_SUCCESSFULLY,
        });
        onSuccess();
      });
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form
      className="management-modify-roles-groups-content-container"
      form={form}
      onFinish={onFinish}
    >
      <CustomDrawerHeader
        title="ویرایش گروه نقش"
        closeDrawerHandler={onClose}
        leftSideContent={
          <div className="drawer-header-btn">
            <CustomButton onClick={onClose}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={isUpdateRoleGroupLoading}
            >
              تایید و ثبت
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput placeholder="" hidden name="groupName" />
          <CustomInput
            label="نام فارسی گروه نقش"
            type="text"
            placeholder=""
            rules={[REQUIRED_RULE]}
            name="title"
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            label="نام انگلیسی گروه نقش"
            type="text"
            placeholder=""
            name="eName"
            disabled
            readOnly
          />
        </Col>
      </Row>
    </Form>
  );
};

export default ModifyMyRoleGroupContent;

import { useEffect } from "react";

import { Col, Form, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyManagementUpdateOfUserMutation } from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { USER_INFO_CHANGED_SUCCESSFULLY } from "@infra/VARS/globalToasts/globalToasts";

import { MyModifyRoleFormValues } from "./@types/@modifyMyRoleContent";
import "./_modifyMyRoleContent.scss";

const MyModifyMyRoleContent = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [form] = useForm<MyModifyRoleFormValues>();
  const { params } = useQueryParams();
  //? ================================ api ================================

  const [updateRole, { isLoading: isUpdateRoleLoading }] =
    useMyManagementUpdateOfUserMutation();
  //? ================================ Effects ================================

  useEffect(() => {
    if (params.name) {
      form.setFieldsValue({
        oldRoleName: params.name,
        title: params.title,
        eName: params.name,
        serviceName: params.serviceName,
      });
    } else {
      form.resetFields(["oldRoleName", "title", "serviceName"]);
    }
  }, [params.name, params.title, form]);
  //? ================================ utils function ================================

  const onFinish = (values: MyModifyRoleFormValues) => {
    const payload = {
      oldRoleName: values.oldRoleName,
      description: values.description,
      title: values.title,
      serviceId: values.serviceId,
      serviceName: values.serviceName,
    };

    updateRole(payload)
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
      className="my-management-modify-roles-content-container"
      form={form}
      onFinish={onFinish}
    >
      <CustomDrawerHeader
        title="ویرایش نقش"
        closeDrawerHandler={onClose}
        leftSideContent={
          <div className="drawer-header-btn">
            <CustomButton onClick={onClose}>انصراف</CustomButton>
            <CustomButton type="primary" htmlType="submit" loading={isUpdateRoleLoading}>
              تایید و ثبت
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput placeholder="" hidden name="oldRoleName" />
          <CustomInput
            label="نام فارسی نقش"
            type="text"
            rules={[REQUIRED_RULE]}
            name="title"
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            label="نام انگلیسی نقش"
            type="text"
            name="eName"
            readOnly
            disabled
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput label="نام فارسی سرویس" type="text" name="serviceName" />
        </Col>
      </Row>
    </Form>
  );
};

export default MyModifyMyRoleContent;

import { useEffect } from "react";

import { Col, Form, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

import { CustomSelect } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import {
  useAllManagementCreateOfUserMutation,
  useAllManagementUpdateOfUserMutation,
} from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { USER_INFO_CHANGED_SUCCESSFULLY } from "@infra/VARS/globalToasts/globalToasts";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import {
  AllModifyRoleFormValues,
  SelectOptionTypeEditRole,
} from "./@types/@modifyAllRoleContent";

import "./_allModifyRoleContent.scss";

const AllModifyRoleContent = ({
  onClose,
  onSuccess,
  data,
  isAddMode,
}: {
  onClose: () => void;
  onSuccess: () => void;
  data: { name?: string; serviceName?: string; title?: string } | null;
  isAddMode: boolean;
}) => {
  const [form] = useForm<AllModifyRoleFormValues>();

  //? ================================ api ================================
  const [updateRole, { isLoading: isUpdateRoleLoading }] =
    useAllManagementUpdateOfUserMutation();

  const [createRole, { isLoading: isCreateRoleLoading }] =
    useAllManagementCreateOfUserMutation();

  //? ================================ Effects ================================

  useEffect(() => {
    if (data?.name) {
      form.setFieldsValue({
        oldRoleName: data?.name,
        title: data?.title,
        eName: data?.name,
        serviceName: selectDefaultValueGenerator(
          serviceOptions?.find((option) => option.value === data?.serviceName)
        ),
        eServiceName: data?.serviceName,
      });
    } else {
      form.resetFields(["oldRoleName", "title", "serviceName"]);
    }
  }, [data, form]);

  //? ================================ utils function ================================
  const onFinish = (values: AllModifyRoleFormValues) => {
    if (isAddMode) {
      const payload = {
        roleName: values?.eName,
        title: values?.title,
        serviceId: values?.serviceName?.code,
      };
      createRole(payload)
        .unwrap()
        .then(() => {
          toast.success(USER_INFO_CHANGED_SUCCESSFULLY, {
            toastId: USER_INFO_CHANGED_SUCCESSFULLY,
          });
          onSuccess();
        });
    } else {
      const payload = {
        oldRoleName: values?.oldRoleName,
        newRoleName: values?.oldRoleName,
        title: values?.title, // نام فارسی نقش
        serviceId: values?.serviceName?.code,
      };
      updateRole(payload)
        .unwrap()
        .then(() => {
          toast.success(USER_INFO_CHANGED_SUCCESSFULLY, {
            toastId: USER_INFO_CHANGED_SUCCESSFULLY,
          });
          onSuccess();
        });
    }
  };

  const changeServiceNameHandler = (record: SelectOptionTypeEditRole) => {
    form.setFieldsValue({ eServiceName: record?.item?.value });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form
      className="all-management-modify-roles-content-container"
      form={form}
      onFinish={onFinish}
    >
      <CustomDrawerHeader
        title="ویرایش نقش"
        closeDrawerHandler={onClose}
        leftSideContent={
          <div className="drawer-header-btn">
            <CustomButton onClick={onClose}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={isUpdateRoleLoading || isCreateRoleLoading}
            >
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
            readOnly={isAddMode ? false : true}
            disabled={isAddMode ? false : true}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            options={serviceOptions}
            name="serviceName"
            label="نام فارسی سرویس"
            rules={[REQUIRED_RULE]}
            form={form}
            onChange={(_, value) =>
              changeServiceNameHandler(value as SelectOptionTypeEditRole)
            }
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            label="نام انگلیسی سرویس"
            type="text"
            name="eServiceName"
            readOnly
            disabled
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AllModifyRoleContent;

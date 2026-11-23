import { useState } from "react";

import { Button, Col, Form, FormInstance, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomTreeSelect from "../../../../../components/CustomInputs/CustomTreeSelect/CustomTreeSelect";
import ConfirmationModalWithContent from "../../../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import PermissionManagementRolesModel from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/PermissionMangement/roles/PermissionManagementRolesModel";
import { REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";

import "./_rolesList.scss";

const NewStaffContent = ({ form }: { form: FormInstance<any> }) => {
  const treeData = [
    {
      title: "فود",
      value: "0-0",
      key: "0-0",
      children: [
        {
          title: "دسترسی 1",
          value: "0-0-0",
          key: "0-0-0",
        },
        {
          title: "دسترسی 2",
          value: "0-0-1",
          key: "0-0-1",
        },
        {
          title: "دسترسی 3",
          value: "0-0-2",
          key: "0-0-2",
        },
        {
          title: "دسترسی 4",
          value: "0-0-3",
          key: "0-0-3",
        },
      ],
    },
    {
      title: "روم",
      value: "1-0",
      key: "1-0",
      children: [
        {
          title: "دسترسی 1",
          value: "0-1-0",
          key: "0-1-0",
        },
        {
          title: "دسترسی 2",
          value: "0-1-1",
          key: "0-1-1",
        },
        {
          title: "دسترسی 3",
          value: "0-1-2",
          key: "0-1-2",
        },
        {
          title: "دسترسی 4",
          value: "0-1-3",
          key: "0-1-3",
        },
      ],
    },
    {
      title: "فود",
      value: "2-0",
      key: "2-0",
      children: [
        {
          title: "دسترسی 1",
          value: "0-2-0",
          key: "0-2-0",
        },
        {
          title: "دسترسی 2",
          value: "0-2-1",
          key: "0-2-1",
        },
        {
          title: "دسترسی 3",
          value: "0-2-2",
          key: "0-2-2",
        },
        {
          title: "دسترسی 4",
          value: "0-2-3",
          key: "0-2-3",
        },
      ],
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomCard className="new-staff-content">
        <Row gutter={[12, 12]}>
          <Col span={12}>
            {/* md={6} lg={12} xs={24} xl={12} */}
            <CustomInput
              type="text"
              label="عنوان"
              name="firstName"
              placeholder="نام"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={12}>
            <CustomSelect
              label="محصول"
              name="product"
              placeholder="محصول"
              rules={[REQUIRED_RULE]}
              options={[]}
            />
          </Col>
          <Col span={24}>
            <CustomTreeSelect
              label="دسترسی ها"
              name="permissions"
              placeholder="دسترسی ها"
              treeData={treeData}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              name="desc"
              placeholder="توضیحات"
              className="textarea"
            />
          </Col>
        </Row>
      </CustomCard>
    </Form>
  );
};

const RolesList = () => {
  useTitle({ text: "نقش ها" });
  const [newStaffForm] = Form.useForm();
  const [newRoleModal, setNewRoleModal] = useState({ isOpen: false });
  const [dataSource] = useState<any[]>([
    {
      key: 1,
      id: 1,
      title: "عنوان",
      desc: "توضیحات 1",
      product: "فود",
      permissions: "6",
    },
    {
      key: 2,
      id: 2,
      title: "عنوان",
      desc: "توضیحات 2",
      product: "روم",
      permissions: "3",
    },
    {
      key: 3,
      id: 3,
      title: "عنوان",
      desc: "توضیحات 3",
      product: "فود",
      permissions: "5",
    },
    {
      key: 4,
      id: 4,
      title: "عنوان",
      desc: "توضیحات 4",
      product: "روم",
      permissions: "2",
    },
    {
      key: 5,
      id: 5,
      title: "عنوان",
      desc: "توضیحات 5",
      product: "کاربر",
      permissions: "18",
    },
  ]);

  //* ================================ Util Functions ================================
  const onNewStaffClickHandler = () => {
    setNewRoleModal({ isOpen: true });
  };

  const onConfirmCreateNewStaff = () => {
    // newStaffForm?.submit();
    // newStaffForm?.validateFields().then((values) => {
    //   console.log({ values });
    // });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {newRoleModal?.isOpen && (
        <ConfirmationModalWithContent
          title="تعریف نقش جدید"
          closeModalHandler={() => setNewRoleModal({ isOpen: false })}
          content={<NewStaffContent form={newStaffForm} />}
          backBtnText="انصراف"
          onConfirmClickHandler={onConfirmCreateNewStaff}
          confirmBtnText="ایجاد"
          isModalOpen={newRoleModal?.isOpen}
          width={1200}
          showIcon={false}
        />
      )}

      <div className="permission-role-container">
        <div className="permission-role-new-role-btn-container">
          <Button
            type="primary"
            onClick={onNewStaffClickHandler}
            className="permission-role-new-btn"
          >
            نقش جدید
            <AiOutlinePlus />
          </Button>
        </div>
        <CustomTable
          dataSource={dataSource}
          columns={PermissionManagementRolesModel() as any}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
          // loading={historyPaymentsIsLoading}
        />
      </div>
    </>
  );
};

export default RolesList;

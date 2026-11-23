import { useState } from "react";

import { Button, Col, Form, FormInstance, Row } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomTreeSelect from "../../../../../components/CustomInputs/CustomTreeSelect/CustomTreeSelect";
import ConfirmationModalWithContent from "../../../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import PermissionManagementStaffModel from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/PermissionMangement/Staff/PermissionManagementStaffModel";
import { REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";

import "./_staffList.scss";

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
              label="نام"
              name="firstName"
              placeholder="نام"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={12}>
            <CustomInput
              type="text"
              label="نام خانوادگی"
              name="lastName"
              placeholder="نام خانوادگی"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={12}>
            <CustomInput
              type="text"
              label="شماره موبایل"
              name="mobile"
              placeholder="شماره موبایل"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={12}>
            <CustomTreeSelect
              label="نقش"
              name="roles"
              placeholder="نقش"
              treeData={treeData}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={12} offset={6} pull={6}>
            <CustomInput
              type="text"
              label="نام کاربری"
              name="userName"
              placeholder="نام کاربری"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={12}>
            <CustomInput
              type="text"
              label="رمز عبور"
              name="password"
              placeholder="رمز عبور"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={12}>
            <CustomInput
              type="text"
              label="تکرار رمز عبور"
              name="confirmPassword"
              placeholder="تکرار رمز عبور"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea label="توضیحات" name="desc" placeholder="توضیحات" />
          </Col>
        </Row>
      </CustomCard>
    </Form>
  );
};

const StaffList = () => {
  useTitle({ text: "کارکنان" });
  const [newStaffForm] = Form.useForm();
  const [newRoleModal, setNewRoleModal] = useState({ isOpen: false });
  const [dataSource] = useState<any[]>([
    {
      key: 1,
      id: 1,
      firstName: "نام کارمند",
      lastName: "نام خانوادگی کارمند",
      userName: "نام کاربری سیستمی",
      pass: "123124",
      position: "14 پوزیشن",
      mobile: "093125686954",
    },
    {
      key: 2,
      id: 2,
      firstName: "نام کارمند",
      lastName: "نام خانوادگی کارمند",
      userName: "نام کاربری سیستمی",
      pass: "5234sda",
      position: "14 پوزیشن",
      mobile: "093125686954",
    },
    {
      key: 3,
      id: 3,
      firstName: "نام کارمند",
      lastName: "نام خانوادگی کارمند",
      userName: "نام کاربری سیستمی",
      pass: "my password",
      position: "14 پوزیشن",
      mobile: "093125686954",
    },
    {
      key: 4,
      id: 4,
      firstName: "نام کارمند",
      lastName: "نام خانوادگی کارمند",
      userName: "نام کاربری سیستمی",
      pass: "S@msdf",
      position: "14 پوزیشن",
      mobile: "093125686954",
    },
    {
      key: 5,
      id: 5,
      firstName: "نام کارمند",
      lastName: "نام خانوادگی کارمند",
      userName: "نام کاربری سیستمی",
      pass: "Saman",
      position: "14 پوزیشن",
      mobile: "093125686954",
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
          title="تعریف کارکنان جدید"
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

      <div className="permission-staff-container">
        <div className="permission-staff-new-role-btn-container">
          <Button
            type="primary"
            onClick={onNewStaffClickHandler}
            className="permission-staff-new-btn"
          >
            نیروی جدید
            <AiOutlinePlus />
          </Button>
        </div>
        <CustomTable
          dataSource={dataSource}
          columns={PermissionManagementStaffModel() as any}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
          // loading={historyPaymentsIsLoading}
        />
      </div>
    </>
  );
};

export default StaffList;

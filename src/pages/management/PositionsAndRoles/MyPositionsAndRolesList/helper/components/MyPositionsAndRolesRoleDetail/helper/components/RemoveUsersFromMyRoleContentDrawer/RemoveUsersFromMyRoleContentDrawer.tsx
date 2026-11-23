import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { MyUserWithRoles } from "@pages/management/PositionsAndRoles/MyPositionsAndRolesList/helper/components/MyPositionsAndRolesRoleDetail/@types/@myPositionsAndRolesRoleDetail";

import { removeUsersFromMyRoleContentDrawerPropsTypes } from "./@types/@removeUsersFromMyRoleContentDrawerPropsTypes";
import RemoveUsersFromMyRoleContentDrawerTableModel from "./models/RemoveUsersFromMyRoleContentDrawerTableModel";
import "./_removeUsersFromMyRoleContentDrawer.scss";

const RemoveUsersFromMyRoleContentDrawer = ({
  onClose,
  selectedUsers,
}: removeUsersFromMyRoleContentDrawerPropsTypes) => {
  return (
    <Form className="my-management-selected-roles-remove-content-container">
      <CustomDrawerHeader
        title="حذف از لیست انتخاب شده‌ها"
        closeDrawerHandler={onClose}
        leftSideContent={
          <div className="drawer-header-btn">
            <CustomButton onClick={onClose}>انصراف</CustomButton>
            <CustomButton type="primary" danger htmlType="submit">
              تایید و حذف
            </CustomButton>
          </div>
        }
      />
      <CustomAlert
        className="custom-alert"
        type="warning"
        showIcon
        description={
          <>
            <h3>توجه</h3>
            <p>
              حذف افراد زیر به منزله گرفتن نقش ( دسترسی ) از آنها می‌باشد. در صورت اطمینان
              میتوانید بر روی “تایید و حذف” کلیک نمایید...
            </p>
          </>
        }
      />
      <CustomDivider text={"لیست کاربران انتخاب شده"} />
      <CustomTable<MyUserWithRoles>
        dataSource={selectedUsers}
        columns={RemoveUsersFromMyRoleContentDrawerTableModel}
        rowKey={(record) => record.uniqueIdentifier ?? record.nationalCode ?? ""}
        pagination={false}
      />
    </Form>
  );
};

export default RemoveUsersFromMyRoleContentDrawer;

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useAdminDeleteRoleMutation } from "@infra/states/redux/Apis/management/positionsAndRoles/positionsAndRolesApi";
import { AllUserWithRoles } from "@pages/management/PositionsAndRoles/AllPositionsAndRolesList/helper/components/AllPositionsAndRolesRoleDetail/@types/@allPositionsAndRolesRoleDetail";

import { removeUsersFromAllRoleContentDrawerPropsTypes } from "./@types/@removeUsersFromAllRoleContentDrawerPropsTypes";
import RemoveUsersFromAllRoleContentDrawerTableModel from "./models/RemoveUsersFromAllRoleContentDrawerTableModel";

import "./_removeUsersFromAllRoleContentDrawer.scss";

const RemoveUsersFromAllRoleContentDrawer = ({
  onClose,
  selectedUsers,
  fetchUsers,
}: removeUsersFromAllRoleContentDrawerPropsTypes) => {
  const { params } = useQueryParams();

  //? ================================ Api ================================
  const [deleteAdminRole, { isLoading: isDeleteAdminRole }] =
    useAdminDeleteRoleMutation();

  //* ================================ Util Functions ================================
  const deleteListHandler = () => {
    const deleteData: string[] = [];
    selectedUsers?.forEach((item) => {
      item?.staff?.forEach((innerItem) => deleteData.push(innerItem?.keyCloakId));
    });

    deleteAdminRole({
      kcId: deleteData,
      role: params?.name,
    })
      .unwrap()
      .then(() => {
        fetchUsers();
        onClose();
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="all-management-selected-roles-remove-content-container"
      onFinish={deleteListHandler}
    >
      <CustomDrawerHeader
        title="حذف از لیست انتخاب شده‌ها"
        closeDrawerHandler={onClose}
        leftSideContent={
          <div className="drawer-header-btn">
            <CustomButton onClick={onClose}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              danger
              htmlType="submit"
              loading={isDeleteAdminRole}
            >
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
      <CustomTable<AllUserWithRoles>
        dataSource={selectedUsers}
        columns={RemoveUsersFromAllRoleContentDrawerTableModel}
        rowKey={(record) => record.uniqueIdentifier ?? record.nationalCode ?? ""}
        pagination={false}
      />
    </Form>
  );
};

export default RemoveUsersFromAllRoleContentDrawer;

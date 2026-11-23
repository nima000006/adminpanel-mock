import { useEffect } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useLazyManagementUsersMyStaffInfoQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { RoleType } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementUserMyManagementDetailsInfo/helper/components/MyManagementDetailsEditRoleDrawerContent/@types/@managementUsersMyStaffInfo";

import MyRoleRequestDetailConfirmedTableModel from "./helper/models/MyRoleRequestDetailConfirmed/MyRoleRequestDetailConfirmedTableModel";

import "./_myRoleRequestDetailConfirmed.scss";

const MyRoleRequestDetailConfirmed = ({ staffId }: { staffId: number | undefined }) => {
  //? ================================ API ================================
  const [getStaffInfo, { data: staffInfoData, isFetching: isGetSelectedRolesLoading }] =
    useLazyManagementUsersMyStaffInfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (staffId) {
      getStaffInfo({ staffId: staffId });
    }
  }, [staffId]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="my-role-request-detail-confirmed">
      <CustomDivider text="لیست نقش‌های تخصیص داده شده" />
      <div className="table-container">
        {/* //Todo[Atefeh]: با صحبت با اقای جماعتی به دلیل تعداد کم نقش ها قسمت فیلتر پیاده سازی نگردید. */}
        {/* <Form form={searchForm} className="search-box">
          <CustomSelect
            name="services"
            options={[]}
            label="سرویس‌ها"
            onChange={() => {}}
            placeholder="انتخاب کنید"
            form={searchForm}
            mode="multiple"
          />
          <CustomSelect
            name="groups"
            options={[]}
            label="گروه‌ها"
            onChange={() => {}}
            placeholder="انتخاب کنید"
            form={searchForm}
            mode="multiple"
          />
        </Form> */}
        <CustomTable<RoleType>
          dataSource={staffInfoData?.roles}
          rowKey="id"
          columns={MyRoleRequestDetailConfirmedTableModel}
          pagination={paginationConfig}
          loading={isGetSelectedRolesLoading}
          className="waiting-review-list-table-container"
          {...TABLE_PROPS(staffInfoData?.roles ? staffInfoData?.roles?.length : 0)}
        />
      </div>
    </div>
  );
};

export default MyRoleRequestDetailConfirmed;

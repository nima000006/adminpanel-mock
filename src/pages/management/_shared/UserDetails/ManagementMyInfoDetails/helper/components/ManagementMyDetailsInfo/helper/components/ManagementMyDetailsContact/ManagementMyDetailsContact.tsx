import { useEffect } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyManagementMyStaffInfoIdentityInfoListsQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";

import { ManagementMyStaffInfoIdentityInfoListResponse } from "../ManagementMyDetailsInfoIdentityInfo/@types/@managementMyDetailsInfoIdentityInfo";

const ManagementMyDetailsContact = ({ staffId }: { staffId: number | undefined }) => {
  //? ================================ Api ================================
  const [getUsersCustomersInfo, { data, isLoading: isGetUsersCustomersInfoLoading }] =
    useLazyManagementMyStaffInfoIdentityInfoListsQuery();

  const userData: ManagementMyStaffInfoIdentityInfoListResponse | undefined = data;
  //? ================================ Effects ================================

  useEffect(() => {
    if (staffId) {
      getUsersCustomersInfo({ staffId });
    }
  }, [staffId, getUsersCustomersInfo]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div
      loading={isGetUsersCustomersInfoLoading}
      className="management-my-detail-contact-container"
    >
      <CustomDivider text="اطلاعات تماسی" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          value={userData?.mobileNumber}
          label="شماره همراه"
        />
        <SingleVerticalWithCol xl={8} lg={8} value={userData?.email} label="ایمیل" />
      </Row>
    </Div>
  );
};
export default ManagementMyDetailsContact;

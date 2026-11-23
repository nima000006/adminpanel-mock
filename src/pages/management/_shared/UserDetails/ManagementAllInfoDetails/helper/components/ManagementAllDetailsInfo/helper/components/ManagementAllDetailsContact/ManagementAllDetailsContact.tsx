import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { ManagementAllStaffInfoListResponse } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/@types/@managementUserAllCustomerDetails";

const ManagementAllDetailsContact = ({
  data,
  loading,
}: {
  data: ManagementAllStaffInfoListResponse | undefined;
  loading: boolean;
}) => {
  // old version. to talk with Mr. Momtazi it doesn't necessary to call additional api
  //? ================================ Api ================================
  // const [getUsersCustomersInfo, { data, isLoading: isGetUsersCustomersInfoLoading }] =
  //   useLazyManagementAllStaffInfoIdentityInfoListsQuery();

  // const userData: ManagementAllStaffInfoIdentityInfoListResponse | undefined = data;
  //? ================================ Effects ================================

  // useEffect(() => {
  //   if (staffId) {
  //     getUsersCustomersInfo({ staffId });
  //   }
  // }, [staffId, getUsersCustomersInfo]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div loading={loading} className="management-all-detail-contact-container">
      <CustomDivider text="اطلاعات تماسی" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          value={data?.mobileNumber}
          label="شماره همراه"
        />
        <SingleVerticalWithCol xl={8} lg={8} value={data?.email} label="ایمیل" />
      </Row>
    </Div>
  );
};
export default ManagementAllDetailsContact;

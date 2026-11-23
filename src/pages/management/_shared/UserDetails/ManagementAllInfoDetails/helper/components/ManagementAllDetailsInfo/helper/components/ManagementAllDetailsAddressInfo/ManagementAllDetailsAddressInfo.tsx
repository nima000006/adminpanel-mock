import { useEffect } from "react";

import { Row } from "antd";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyManagementAllAddressInfoQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";

import type { ManagementAllAddressInfoAddress } from "./@types/@managementAllDetailsAddressInfo";
import "./_managementAllDetailsAddressInfo.scss";

const ManagementAllDetailsAddressInfo = ({ userId }: { userId: string | undefined }) => {
  //? ================================ API ================================
  const [
    getUsersCustomersAddressInfo,
    { data: addressData, isLoading: isGetUsersCustomersAddressInfoLoading },
  ] = useLazyManagementAllAddressInfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (userId) {
      getUsersCustomersAddressInfo({ userId: +userId });
    }
  }, [userId, getUsersCustomersAddressInfo]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="management-all-detail-address-container"
      loading={isGetUsersCustomersAddressInfoLoading}
    >
      <CustomDivider text="اطلاعات مکانی" />
      {addressData && addressData.length > 0 ? (
        addressData.map((addr: ManagementAllAddressInfoAddress) => (
          <div key={addr.id} style={{ marginBottom: 32 }}>
            <CustomDivider text={addr?.faTitle ? addr?.faTitle : "-"} />

            <CustomMap
              lat={addr.latitude}
              lng={addr.longitude}
              className="management-all-detail-address-map-container"
            />

            <Row gutter={[16, 16]} className="mt-4">
              <SingleVerticalWithCol value={addr?.province} label="استان" />
              <SingleVerticalWithCol value={addr?.cityTitle} label="شهر" />
              <SingleVerticalWithCol value={addr?.unitNumber} label="پلاک" />
              <SingleVerticalWithCol value={addr?.buildingNumber} label="واحد" />
              <SingleVerticalWithCol value={addr?.zipCode} label="کد پستی" />
              <SingleVerticalWithCol
                lg={24}
                md={24}
                sm={24}
                value={addr?.address}
                label="آدرس"
              />
            </Row>
          </div>
        ))
      ) : (
        <CustomEmpty />
      )}
    </Div>
  );
};

export default ManagementAllDetailsAddressInfo;

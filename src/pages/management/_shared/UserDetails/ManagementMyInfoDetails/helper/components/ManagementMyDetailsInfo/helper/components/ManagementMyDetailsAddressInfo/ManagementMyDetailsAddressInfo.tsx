import { useEffect } from "react";

import { Row } from "antd";

import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyManagementMyAddressInfoQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";

import { ManagementMyAddressInfoAddress } from "./@types/@managementMyDetailsAddressInfo";
import "./_managementMyDetailsAddressInfo.scss";

const ManagementMyDetailsAddressInfo = ({ userId }: { userId: string | undefined }) => {
  //? ================================ API ================================
  const [
    getUsersCustomersAddressInfo,
    { data: addressData, isLoading: isGetUsersCustomersAddressInfoLoading },
  ] = useLazyManagementMyAddressInfoQuery();
  //? ================================ Effects ================================
  useEffect(() => {
    if (userId) {
      getUsersCustomersAddressInfo({ userId: +userId });
    }
  }, [userId, getUsersCustomersAddressInfo]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="management-my-detail-address-container"
      loading={isGetUsersCustomersAddressInfoLoading}
    >
      <CustomDivider text="اطلاعات مکانی" />
      {addressData && addressData.length > 0 ? (
        addressData.map((addr: ManagementMyAddressInfoAddress) => (
          <div key={addr.id} className="mb-8">
            <CustomDivider text={dataPlaceHolder({ data: addr?.faTitle })} />

            <CustomMap
              lat={addr.latitude}
              lng={addr.longitude}
              className="management-my-detail-address-map-container"
            />

            <Row gutter={[16, 16]} className="mt-4">
              <SingleVerticalWithCol value={addr?.province} label="استان" />
              <SingleVerticalWithCol value={addr?.cityTitle} label="شهر" />
              <SingleVerticalWithCol value={addr?.unitNumber} label="پلاک" />
              <SingleVerticalWithCol value={addr?.buildingNumber} label="واحد" />
              <SingleVerticalWithCol value={addr?.zipCode} label="کد پستی" />
              <SingleVerticalWithCol span={24} value={addr?.address} label="آدرس" />
            </Row>
          </div>
        ))
      ) : (
        <CustomEmpty />
      )}
    </Div>
  );
};

export default ManagementMyDetailsAddressInfo;

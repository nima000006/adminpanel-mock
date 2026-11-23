import { useEffect } from "react";

import { Row } from "antd";
import { PiArrowCounterClockwise } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyManagementMyStaffInfoIdentityInfoListsQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";

import { ManagementMyStaffInfoIdentityInfoListResponse } from "./@types/@managementMyDetailsInfoIdentityInfo";

const ManagementMyDetailsInfoIdentityInfo = ({
  staffId,
}: {
  staffId: number | undefined;
}) => {
  //? ================================ Api ================================
  const [
    getUsersCustomersInfoIdentityInfo,
    { data, isLoading: isGetUsersCustomersInfoIdentityInfoLoading },
  ] = useLazyManagementMyStaffInfoIdentityInfoListsQuery();

  const userData: ManagementMyStaffInfoIdentityInfoListResponse | undefined = data;
  //? ================================ Effects ================================

  useEffect(() => {
    if (staffId) {
      getUsersCustomersInfoIdentityInfo({ staffId });
    }
  }, [staffId, getUsersCustomersInfoIdentityInfo]);

  // ================================ Utils function ================================
  const genderMap: Record<number, string> = {
    1: "آقا",
    2: "خانم",
    3: "نامشخص",
  };

  const validGenderIds = [1, 2, 3];

  const genderId = userData?.genderId;
  const genderText = validGenderIds.includes(genderId ?? 0)
    ? genderMap[genderId as 1 | 2 | 3]
    : "_";

  const nationalityText = userData?.regionId
    ? userData?.regionId === 103
      ? "ایرانی"
      : "غیر ایرانی"
    : "-";

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isGetUsersCustomersInfoIdentityInfoLoading}
      className="management-my-detail-identity-info"
    >
      <CustomDivider
        text="اطلاعات هویتی"
        extraContent={
          <CustomButton disabled icon={<PiArrowCounterClockwise />}>
            استعلام
          </CustomButton>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol value={userData?.firstName} label="نام" />
        <SingleVerticalWithCol value={userData?.lastName} label="نام خانوادگی" />
        <SingleVerticalWithCol value={userData?.username} label="کدملی / کد فراگیر" />
        <SingleVerticalWithCol value={nationalityText} label="ملیت" />
        <SingleVerticalWithCol value={userData?.fatherName} label="نام پدر" />
        <SingleVerticalWithCol value={userData?.birthDate} isDate label="تاریخ تولد" />
        <SingleVerticalWithCol value={genderText} label="جنسیت" />
      </Row>
    </Div>
  );
};
export default ManagementMyDetailsInfoIdentityInfo;

import { useEffect } from "react";

import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetHabitantExtraUserInformationMutation,
  useLazyGetHabitantUserInfoQuery,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";

import MoreInfoSection from "./helper/components/MoreInfoSection/MoreInfoSection";
import PlaceUserInfo from "./helper/components/PlaceUserInfo/PlaceUserInfo";
import UserInfoSection from "./helper/components/UserInfoSection/UserInfoSection";
//Todo[uncomment if needed in the future
// import EmergencyCallSection from "./helper/components/EmergencyCallSection/EmergencyCallSection";

const HabitantsUserInfo = () => {
  const {
    params: { userGroup, id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getHabitantsUserInfo,
    { data: habitantsUserInfoData, isFetching: isGetHabitantsUserInfoLoading },
  ] = useLazyGetHabitantUserInfoQuery();

  const [
    getHabitantsExtraUserInfo,
    { data: habitantsExtraUserInfoData, isLoading: isGetHabitantsExtraUserInfoLoading },
  ] = useGetHabitantExtraUserInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getHabitantsUserInfo({ maxResults: 2000, firstResult: 0, id_EQ: +id });
      getHabitantsExtraUserInfo(+id);
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="flex flex-col gap-4"
      loading={isGetHabitantsUserInfoLoading || isGetHabitantsExtraUserInfoLoading}
    >
      {/* ---------------------------------- مشخصات کاربر  ---------------------------------- */}
      <UserInfoSection
        userGroupStatus={+userGroup}
        data={habitantsUserInfoData?.data[0]}
        extraData={
          habitantsExtraUserInfoData?.data?.AssociationInfoForEssentialCondition?.[0]
        }
      />
      {/* ---------------------------------- مشخصات سکونت  ---------------------------------- */}
      <PlaceUserInfo data={habitantsUserInfoData?.data[0]} />
      {/* //Todo[uncomment if needed in the future */}
      {/* ---------------------------------- تماس ضروری  ---------------------------------- */}
      {/* <EmergencyCallSection data={habitantsUserInfoData?.data[0]} /> */}
      {/* ---------------------------------- اطلاعات بیشتر  ---------------------------------- */}
      <MoreInfoSection
        data={habitantsExtraUserInfoData?.data?.AssociationInfoForEssentialCondition?.[0]}
      />
    </Div>
  );
};
export default HabitantsUserInfo;

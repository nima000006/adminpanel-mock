import {
  AssociationInfoForEssentialConditionType,
  HabitantUserInfoData,
} from "../../../../@types/@firstTabUserInfo";

//! LAYOUT
export type UserInfoSectionProps = {
  userGroupStatus: number;
  data: HabitantUserInfoData | undefined;
  extraData: AssociationInfoForEssentialConditionType | undefined;
};

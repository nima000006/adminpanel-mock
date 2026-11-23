import { GetSessionMeetingMembersRawResponse } from "../../../../../../components/Committee/Committee/Meetings/SessionDetailMembers/@types/@members";

export const sessionMeetingListTransformer = (
  data: GetSessionMeetingMembersRawResponse
) => {
  if (Array.isArray(data)) {
    // 1- معاونت دانشجویی (رییس کمیته)
    const boss = {
      key: "boss",
      name: data?.[0]?.AssociationBosPersonnel_firstName,
      familyName: data?.[0]?.AssociationBosPersonnel_lastName,
      role: "معاونت دانشجویی (رییس کمیته)",
      userNumber: data?.[0]?.AssociationBosPersonnel_personnelNumber,
      mobile: data?.[0]?.AssociationBosPersonnel_mobile,
      presence: false,
    };
    // 2- مدیر کل فرهنگی واحد
    const cultural = {
      key: "cultural",
      name: data?.[0]?.AssociationCulturalPersonnel_firstName,
      familyName: data?.[0]?.AssociationCulturalPersonnel_lastName,
      role: "مدیرکل امور فرهنگی واحد",
      userNumber: data?.[0]?.AssociationCulturalPersonnel_personnelNumber,
      mobile: data?.[0]?.AssociationCulturalPersonnel_mobile,
      presence: false,
    };
    // 3- عضو هیات علمی گروه حقوق یا الهیات
    const legal = {
      key: "legal",
      name: data?.[0]?.AssociationLegalPersonnel_firstName,
      familyName: data?.[0]?.AssociationLegalPersonnel_lastName,
      role: "عضو هیات علمی گروه حقوق یا الهیات",
      userNumber: data?.[0]?.AssociationLegalPersonnel_personnelNumber,
      mobile: data?.[0]?.AssociationLegalPersonnel_mobile,
      presence: false,
    };
    // 4- عضو هیات علمی واحد روانشناسی و مشاوره
    const academic = {
      key: "academic",
      name: data?.[0]?.AssociationAcademicPersonnel_firstName,
      familyName: data?.[0]?.AssociationAcademicPersonnel_lastName,
      role: "عضو هیات علمی واحد روانشناسی و مشاوره",
      userNumber: data?.[0]?.AssociationAcademicPersonnel_personnelNumber,
      mobile: data?.[0]?.AssociationAcademicPersonnel_mobile,
      presence: false,
    };
    // 5- عضو دانشجویی
    const student = {
      key: "student",
      name: data?.[0]?.AssociationStudentInfo_firstName,
      familyName: data?.[0]?.AssociationStudentInfo_lastName,
      role: "عضو دانشجویی",
      userNumber: data?.[0]?.AssociationStudentInfo_personnelNumber,
      mobile: data?.[0]?.AssociationStudentInfo_mobile,
      presence: false,
    };
    // 6- دبیر کمیته
    const secretary = {
      key: "secretary",
      name: data?.[0]?.AssociationSectetaryPersonnel_firstName,
      familyName: data?.[0]?.AssociationSectetaryPersonnel_lastName,
      role: "دبیر کمیته",
      userNumber: data?.[0]?.AssociationSectetaryPersonnel_personnelNumber,
      mobile: data?.[0]?.AssociationSectetaryPersonnel_mobile,
      presence: false,
    };
    return {
      data: [boss, cultural, legal, academic, student, secretary],
      status: 200,
      msg: "success",
    };
  } else {
    return {
      data,
      status: 403,
      msg: "fail",
    };
  }
};

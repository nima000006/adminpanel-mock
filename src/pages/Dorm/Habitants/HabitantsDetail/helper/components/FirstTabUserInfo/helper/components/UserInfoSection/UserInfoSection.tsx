import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { userGroup } from "@pages/Dorm/_shared/utils/DormUtils";

import { UserInfoSectionProps } from "./@types/@userInfoSection";

const MARITAL_STATUS = {
  1: "مجرد",
  2: "متاهل",
};

const UserInfoSection = ({ userGroupStatus, data, extraData }: UserInfoSectionProps) => {
  return (
    <div>
      <CustomDivider text="مشخصات کاربر" />

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نام"
          value={data?.AssociationCustomer_AssociationCustomerUser_firstName}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نام خانوادگی"
          value={data?.AssociationCustomer_AssociationCustomerUser_lastName}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شماره دانشجویی / شماره پرسنلی"
          value={data?.AssociationCustomer_AssociationStudent_studentNumber}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="کدملی/اتباع"
          value={data?.AssociationCustomer_AssociationCustomerUser_nationalCode}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="جنسیت"
          value={
            data?.AssociationCustomer_AssociationCustomerUser_AssociationGender_title
          }
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="ملیت"
          value={
            data?.AssociationCustomer_AssociationCustomerUser_nationalityId === "1"
              ? "ایرانی"
              : data?.AssociationCustomer_AssociationCustomerUser_nationalityId === "2"
                ? "غیرایرانی"
                : ""
          }
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تاریخ تولد"
          value={data?.AssociationCustomer_AssociationCustomerUser_birthDate}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شماره موبایل"
          value={data?.AssociationCustomer_AssociationCustomerUser_mobile}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="گروه کاربری"
          value={data?.AssociationCustomer_AssociationUserGroup_title}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="واحد دانشگاهی"
          value={
            data?.AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title
          }
        />

        {userGroupStatus === userGroup.student ? (
          <>
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="مقطع تحصیلی"
              value={data?.AssociationCustomer_AssociationStudent_AssociationGrade_title}
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="رشته تحصیلی"
              value={data?.AssociationCustomer_AssociationStudent_fieldTitle}
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="سال ورود"
              value={
                data?.AssociationCustomer_AssociationStudent_enCode
                  ? "1" + data.AssociationCustomer_AssociationStudent_enCode.slice(0, -1)
                  : ""
              }
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="نیمسال ورود"
              value={
                data?.AssociationCustomer_AssociationStudent_enCode
                  ? data.AssociationCustomer_AssociationStudent_enCode.slice(-1) === "1"
                    ? "نیم سال اول"
                    : "نیم سال دوم"
                  : ""
              }
            />
            <SingleVerticalWithCol md={12} sm={24} label="ترم تحصیلی" value={""} />
          </>
        ) : null}
        {/* //Todo[Atefeh]: uncomment when api got ready */}
        {/* {userGroupStatus === userGroup.staff ? (
          <>
            <SingleVerticalWithCol md={12} sm={24} label="سمت" value={"data?.position"} />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="سازمان"
              value={"data?.organization"}
            />
          </>
        ) : null} */}
        {/* <SingleVerticalWithCol
          md={12}
          sm={24}
          label="آخرین وضعیت تحصیلی"
          value={extraData?.}
        /> */}
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="وضعیت تأهل"
          value={extraData?.maritalStatus && MARITAL_STATUS[extraData?.maritalStatus]}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تلفن ثابت"
          value={extraData?.relativesPhone}
        />
      </Row>
    </div>
  );
};

export default UserInfoSection;

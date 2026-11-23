import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  entryYearSemesterGenerator,
  userGroup,
} from "@pages/Dorm/_shared/utils/DormUtils";

import { UsersRequestsDetailApplicantInfoProps } from "./@types/@usersRequestsDetailApplicantInfo";

const UsersRequestsDetailApplicantInfo = ({
  data,
}: UsersRequestsDetailApplicantInfoProps) => {
  const isStudent =
    data?.AssociationCustomer_AssociationUserGroup_id === userGroup.student;

  const isStaff = data?.AssociationCustomer_AssociationUserGroup_id === userGroup.staff;

  const { entryYear, entrySemester } = entryYearSemesterGenerator(
    data?.AssociationCustomer_AssociationStudent_enCode
  );

  return (
    <div>
      <CustomDivider text="مشخصات درخواست دهنده" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="نام"
          value={data?.AssociationCustomer_AssociationCustomerUser_firstName}
        />
        <SingleVerticalWithCol
          label="نام خانوادگی"
          value={data?.AssociationCustomer_AssociationCustomerUser_lastName}
        />
        {isStudent ? (
          <SingleVerticalWithCol
            label="شماره دانشجویی"
            value={data?.AssociationCustomer_AssociationStudent_studentNumber}
          /> // دانشجو
        ) : (
          <SingleVerticalWithCol
            label="شماره پرسنلی"
            value={data?.AssociationCustomer_AssociationStudent_studentNumber}
          /> // اساتید- کارکنان
        )}

        <SingleVerticalWithCol
          label="کد ملی / اتباع"
          value={data?.AssociationCustomer_AssociationCustomerUser_nationalCode}
        />
        <SingleVerticalWithCol
          label="جنسیت"
          value={
            data?.AssociationCustomer_AssociationCustomerUser_AssociationGender_title
          }
        />
        <SingleVerticalWithCol
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
          label="تاریخ تولد"
          value={data?.AssociationCustomer_AssociationCustomerUser_birthDate}
          isDate
        />
        <SingleVerticalWithCol
          label="شماره موبایل"
          value={data?.AssociationCustomer_AssociationCustomerUser_mobile}
        />
        <SingleVerticalWithCol
          label="گروه کاربری"
          value={data?.AssociationCustomer_AssociationUserGroup_title}
        />
        <SingleVerticalWithCol
          label="واحد دانشگاهی"
          value={
            data?.AssociationCustomer_AssociationStudent_AssociationCategoryBranchid_title
          }
        />

        {isStudent && (
          <>
            <SingleVerticalWithCol
              label="مقطع تحصیلی"
              value={data?.AssociationCustomer_AssociationStudent_AssociationGrade_title}
            />
            <SingleVerticalWithCol
              label="رشته تحصیلی"
              value={data?.AssociationCustomer_AssociationStudent_fieldTitle}
            />
            <SingleVerticalWithCol label="سال ورود" value={entryYear} />
            <SingleVerticalWithCol label="نیمسال ورود" value={entrySemester} />
            <SingleVerticalWithCol label="ترم تحصیلی" value={"-"} />
            <SingleVerticalWithCol label="آخرین وضعیت تحصیلی" value="در حال تحصیل" />
          </>
        )}

        {isStaff && (
          <>
            {/* //todo[Atefeh]: api not ready */}
            {/* <SingleVerticalWithCol label="سمت" value={data?.post} />
            <SingleVerticalWithCol label="سازمان" value={data?.organization} /> */}
          </>
        )}
      </Row>
    </div>
  );
};

export default UsersRequestsDetailApplicantInfo;

import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { HabitantEvacuationDrawerSectionProps } from "../../../@types/@evacuationType";

const HabitantEvacuationDrawerUserInfoSection = ({
  data,
}: HabitantEvacuationDrawerSectionProps) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        xl={12}
        lg={12}
        md={12}
        label="نام"
        value={data?.AssociationCustomer_AssociationCustomerUser_firstName}
      />
      <SingleVerticalWithCol
        xl={12}
        lg={12}
        md={12}
        label="نام خانوادگی"
        value={data?.AssociationCustomer_AssociationCustomerUser_lastName}
      />
      <SingleVerticalWithCol
        xl={12}
        lg={12}
        md={12}
        label="شماره دانشجویی / شماره پرسنلی"
        value={data?.AssociationCustomer_AssociationStudent_studentNumber}
      />
      <SingleVerticalWithCol
        xl={12}
        lg={12}
        md={12}
        label="کد ملی / اتباع"
        value={data?.AssociationCustomer_AssociationCustomerUser_nationalCode}
      />
    </Row>
  );
};
export default HabitantEvacuationDrawerUserInfoSection;

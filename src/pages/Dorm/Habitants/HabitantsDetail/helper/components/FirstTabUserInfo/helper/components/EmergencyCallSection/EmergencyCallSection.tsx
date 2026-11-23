import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { EmergencyCallSectionProps } from "./@types/@emergencyCallSection";

const EmergencyCallSection = ({ data }: EmergencyCallSectionProps) => {
  return (
    <div>
      <CustomDivider text="تماس ضروری" />

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
        <SingleVerticalWithCol md={12} sm={24} label="نسبت" value={""} />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شماره موبایل"
          value={data?.AssociationCustomer_AssociationCustomerUser_mobile}
        />
      </Row>
    </div>
  );
};

export default EmergencyCallSection;

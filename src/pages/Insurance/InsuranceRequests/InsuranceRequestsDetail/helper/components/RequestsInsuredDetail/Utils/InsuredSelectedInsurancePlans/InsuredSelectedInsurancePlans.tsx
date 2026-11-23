import { Col, Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import InsuranceCard from "@pages/Insurance/InsuranceRequests/InsuranceRequestsDetail/_shared/components/InsuranceCard/InsuranceCard";

import { InsuredSelectedInsurancePlansProps } from "./@types/@insuredSelectedInsurancePlans";
import "./_insuredSelectedInsurancePlans.scss";

const InsuredSelectedInsurancePlans = ({
  plansImg,
  plansTitle,
  plansRole,
  plansPeriod,
  plansPrice,
  plansStatus,
}: InsuredSelectedInsurancePlansProps) => {
  return (
    <div className="insured-selected-insurance-plans-container">
      <CustomDivider text="طرح‌ بیمه انتخابی" />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <InsuranceCard
            img={plansImg}
            title={plansTitle}
            role={plansRole}
            period={plansPeriod}
            price={plansPrice}
            status={+plansStatus}
          />
        </Col>
      </Row>
    </div>
  );
};

export default InsuredSelectedInsurancePlans;

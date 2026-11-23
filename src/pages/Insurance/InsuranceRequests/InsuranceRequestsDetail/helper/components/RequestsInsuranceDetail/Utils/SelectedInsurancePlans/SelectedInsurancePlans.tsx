import { Col, Row } from "antd";
import { useSearchParams } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import InsuranceCard from "@pages/Insurance/InsuranceRequests/InsuranceRequestsDetail/_shared/components/InsuranceCard/InsuranceCard";

import { SelectedInsurancePlansProps } from "./@types/@selectedInsurancePlans";
import "./_selectedInsurancePlans.scss";

const INSURED_ROLE = {
  main: 3, // دانشجو
  boy: 0, // فرزند پسر
  girl: 1, // فرزند دختر
  spouse: 2, // همسر
};

const SelectedInsurancePlans = ({ list }: { list: SelectedInsurancePlansProps[] }) => {
  const [searchParams] = useSearchParams();
  const { insuranceStatus } = Object.fromEntries([...searchParams]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <section className="insurance-selected-plans-container">
      <CustomDivider text="طرح‌های بیمه انتخابی" />
      <Row gutter={[16, 16]}>
        {list.map((item) => (
          <Col lg={12} md={24} sm={24} xs={24} key={item?.id}>
            <InsuranceCard
              img={item?.img}
              title={item?.title}
              role={
                item?.role === INSURED_ROLE.main
                  ? "بیمه شده اصلی (دانشجو)"
                  : item?.role === INSURED_ROLE.spouse
                    ? "بیمه شده تبعی (همسر)"
                    : "بیمه شده تبعی (فرزند)"
              }
              period={item?.period}
              price={item?.price}
              status={+insuranceStatus}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default SelectedInsurancePlans;

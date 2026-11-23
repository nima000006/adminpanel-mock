import { Col, Row } from "antd";
import {
  PiBank,
  PiCoin,
  PiHandCoins,
  PiTrendDown,
  PiTrendUp,
  PiWarningCircle,
} from "react-icons/pi";

import { dataPlaceHolder } from "@infra/helpers/utils";
import FinanceBusinessOwnerCard from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/_shared/helper/components/FinanceBusinessOwnerCard/FinanceBusinessOwnerCard";

const FinanceBusinessOwnerOverall = () => {
  {
    /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  }
  return (
    <Row gutter={[16, 16]} className="mt-10">
      <Col xl={6} lg={8} md={12} xs={24}>
        <FinanceBusinessOwnerCard
          title="فروش خدمات / کالا"
          rightIcon={<PiCoin />}
          leftIcon={<PiWarningCircle />}
          description={dataPlaceHolder({
            data: 100000,
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          })}
          footerTagColor="green"
          footerTagIcon={<PiTrendUp />}
          footerTagText="۲۰% افزایش نسبت به دوره مشابه"
        />
      </Col>
      <Col xl={6} lg={8} md={12} xs={24}>
        <FinanceBusinessOwnerCard
          title="عودت شده به خریداران"
          rightIcon={<PiHandCoins />}
          leftIcon={<PiWarningCircle />}
          description={dataPlaceHolder({
            data: 10000,
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          })}
          footerTagColor="red"
          footerTagIcon={<PiTrendDown />}
          footerTagText="۱۵% کاهش نسبت به دوره مشابه"
        />
      </Col>
      <Col xl={6} lg={8} md={12} xs={24}>
        <FinanceBusinessOwnerCard
          title="سهم شرکا (کارمزد)"
          rightIcon={<PiHandCoins />}
          leftIcon={<PiWarningCircle />}
          description={dataPlaceHolder({
            data: 10000,
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          })}
          footerTagColor="red"
          footerTagIcon={<PiTrendDown />}
          footerTagText="۱۵% کاهش نسبت به دوره مشابه"
        />
      </Col>
      <Col xl={6} lg={8} md={12} xs={24}>
        <FinanceBusinessOwnerCard
          title="فروش خالص"
          rightIcon={<PiBank />}
          leftIcon={<PiWarningCircle />}
          description={dataPlaceHolder({
            data: 10000,
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          })}
          footerTagColor="red"
          footerTagIcon={<PiTrendDown />}
          footerTagText="۱۵% کاهش نسبت به دوره مشابه"
        />
      </Col>
      <Col xl={6} lg={8} md={12} xs={24}>
        <FinanceBusinessOwnerCard
          title="نرخ عودت"
          rightIcon={<PiHandCoins />}
          leftIcon={<PiWarningCircle />}
          description="1%"
          footerTagColor="red"
          footerTagIcon={<PiTrendDown />}
          footerTagText="۱۵% کاهش نسبت به دوره مشابه"
        />
      </Col>
    </Row>
  );
};

export default FinanceBusinessOwnerOverall;

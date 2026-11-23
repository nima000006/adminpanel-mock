import { Col, Row } from "antd";
import {
  PiBedLight,
  PiDoorOpenLight,
  PiMoneyDuotone,
  PiUsersThree,
} from "react-icons/pi";

import { PerformanceContentProps } from "./@types/@performanceContent";
import PerformanceCard from "./helper/components/PerformanceCard/PerformanceCard";

const PerformanceContent = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: PerformanceContentProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xl={6} lg={8} md={12} sm={24} xs={24}>
        <PerformanceCard
          title={"درآمد کل"}
          icon={<PiMoneyDuotone size={23} />}
          unit={"ریال"}
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          reportId={43} // آی‌دی گزارش مربوط به درآمد کل
          isPrice={true}
          isFormValid={isFormValid}
          validateData={validateData}
        />
      </Col>
      <Col xl={6} lg={8} md={12} sm={24} xs={24}>
        <PerformanceCard
          title={" ساکنین"}
          icon={<PiUsersThree size={23} />}
          unit={"نفر"}
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          reportId={44} // آی‌دی گزارش مربوط به ساکنین
          isPrice={false}
          isFormValid={isFormValid}
          validateData={validateData}
        />
      </Col>

      <Col xl={6} lg={8} md={12} sm={24} xs={24}>
        <PerformanceCard
          title={"میانگین قیمت اتاق"}
          icon={<PiDoorOpenLight size={23} />}
          unit={"ریال"}
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          reportId={45} // آی‌دی گزارش مربوط به میانگین قیمت اتاق
          isPrice={true}
          isFormValid={isFormValid}
          validateData={validateData}
        />
      </Col>
      <Col xl={6} lg={8} md={12} sm={24} xs={24}>
        <PerformanceCard
          title={" ضریب اشغال تخت"}
          icon={<PiBedLight size={23} />}
          unit={"%"}
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          reportId={46} // آی‌دی گزارش مربوط به ضریب اشغال تخت
          isPrice={false}
          isFormValid={isFormValid}
          validateData={validateData}
        />
      </Col>
    </Row>
  );
};
export default PerformanceContent;

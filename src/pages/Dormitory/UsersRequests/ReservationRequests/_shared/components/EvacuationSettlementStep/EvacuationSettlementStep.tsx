import { Col, Row } from "antd";

import { EvacuationSettlementStepProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/components/EvacuationSettlementStep/@types/@evacuationSettlementStepTypes";
import EvacuationSettlementLedgerCard from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/components/EvacuationSettlementLedgerCard/EvacuationSettlementLedgerCard";
import EvacuationSettlementResultCard from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/components/EvacuationSettlementResultCard/EvacuationSettlementResultCard";

const EvacuationSettlementStep = ({ data }: EvacuationSettlementStepProps) => {
  const hasDeposit = Boolean(data.depositLedger);
  const cardColSpan = hasDeposit
    ? { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 }
    : { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full flex-col gap-6">
      <p className="text-neutral-11 text-center text-base font-bold">
        وضعیت مالی کاربر پس از محاسبه هزینه‌ها و پرداخت‌های مربوط به سکونت در این اقامتگاه
      </p>

      <Row gutter={[24, 24]} align="top" className="w-full">
        <Col {...cardColSpan}>
          <EvacuationSettlementResultCard data={data.result} />
        </Col>

        <Col {...cardColSpan}>
          <EvacuationSettlementLedgerCard data={data.balanceLedger} />
        </Col>

        {data.depositLedger ? (
          <Col {...cardColSpan}>
            <EvacuationSettlementLedgerCard data={data.depositLedger} />
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default EvacuationSettlementStep;

import { Col, Row } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { FinalApprovalStepProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinalApprovalStep/@types/@finalApprovalStepTypes";
import FinalApprovalAmountSummaryCard from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinalApprovalStep/helper/components/FinalApprovalAmountSummaryCard/FinalApprovalAmountSummaryCard";
import FinalApprovalPaymentCard from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinalApprovalStep/helper/components/FinalApprovalPaymentCard/FinalApprovalPaymentCard";
import FinalApprovalResidenceCard from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinalApprovalStep/helper/components/FinalApprovalResidenceCard/FinalApprovalResidenceCard";

const FinalApprovalColumn = ({
  data,
}: {
  data: FinalApprovalStepProps["data"]["current"];
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="border-neutral-10/10 flex items-center justify-center border-b px-5 py-4">
        <p className="text-neutral-13 m-0 text-center text-sm font-medium">
          {data.sectionTitle}
        </p>
      </div>

      <FinalApprovalResidenceCard
        data={data.residence}
        isAlternative={data.isAlternative}
      />

      <FinalApprovalPaymentCard data={data.payment} isAlternative={data.isAlternative} />

      <div className="flex w-full flex-col gap-4">
        {data.amountCards.map((item) => (
          <FinalApprovalAmountSummaryCard key={item.title} data={item} />
        ))}
      </div>
    </div>
  );
};

const FinalApprovalStep = ({ data }: FinalApprovalStepProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full flex-col gap-10">
      <CustomAlert
        type="success"
        showIcon
        description={
          "تسویه صورتحساب جابه‌جایی پس از تأیید مسئول امور مالی انجام خواهد شد."
        }
      />

      <Row gutter={[16, 16]} className="w-full">
        {/* اقامت فعلی */}
        <Col xs={24} lg={12}>
          <FinalApprovalColumn data={data.current} />
        </Col>

        {/* اقامت جایگزین */}
        <Col xs={24} lg={12}>
          <FinalApprovalColumn data={data.alternative} />
        </Col>
      </Row>
    </div>
  );
};

export default FinalApprovalStep;

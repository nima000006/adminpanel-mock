import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { EvacuationFinancialCalculationStepProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/components/EvacuationFinancialCalculationStep/@types/@evacuationFinancialCalculationStepTypes";
import EvacuationStaySummary from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/components/EvacuationStaySummary/EvacuationStaySummary";
import { EVACUATION_TIMING } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";
import EvacuationFinancialLawCard from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/components/EvacuationFinancialLawCard/EvacuationFinancialLawCard";
import EvacuationOnTimeStatusCard from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/components/EvacuationOnTimeStatusCard/EvacuationOnTimeStatusCard";

const EvacuationFinancialCalculationStep = ({
  form,
  data,
}: EvacuationFinancialCalculationStepProps) => {
  const isOnTime = data.timing === EVACUATION_TIMING.onTime;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <EvacuationStaySummary timing={data.timing} data={data.staySummary} />

      {!isOnTime ? <CustomDivider text="محاسبه مالی صورت حساب تخلیه" /> : null}

      <div className="flex w-full justify-center">
        {isOnTime ? (
          <EvacuationOnTimeStatusCard />
        ) : (
          <EvacuationFinancialLawCard form={form} data={data} />
        )}
      </div>
    </div>
  );
};

export default EvacuationFinancialCalculationStep;

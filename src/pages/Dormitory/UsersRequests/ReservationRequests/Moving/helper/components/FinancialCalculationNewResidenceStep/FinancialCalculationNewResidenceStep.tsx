import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import EvacuationStaySummary from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/components/EvacuationStaySummary/EvacuationStaySummary";
import { FinancialCalculationNewResidenceStepProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinancialCalculationNewResidenceStep/@types/@financialCalculationNewResidenceStepTypes";
import NewResidenceFinancialLawCard from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinancialCalculationNewResidenceStep/helper/components/NewResidenceFinancialLawCard/NewResidenceFinancialLawCard";

const FinancialCalculationNewResidenceStep = ({
  form,
  data,
}: FinancialCalculationNewResidenceStepProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <EvacuationStaySummary timing={data.timing} data={data.staySummary} />

      <CustomDivider text="محاسبه مالی صورتحساب اقامت جدید" />

      <div className="flex w-full justify-center">
        <NewResidenceFinancialLawCard form={form} data={data} />
      </div>
    </div>
  );
};

export default FinancialCalculationNewResidenceStep;

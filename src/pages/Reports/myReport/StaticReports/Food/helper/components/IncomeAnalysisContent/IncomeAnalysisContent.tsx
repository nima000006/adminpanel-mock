import { IncomeAnalysisContentProps } from "./@types/@incomeAnalysisContent";
import FoodReportBreakdownRevenue from "./helper/components/BreakdownRevenue/FoodReportBreakdownRevenue";
import IncomeAnalysisLineChart from "./helper/components/IncomeAnalysisLineChart/IncomeAnalysisLineChart";

const IncomeAnalysisContent = ({
  createBodyParams,
  triggerItems,
  serviceDetailData,
  isFormValid,
  validateData,
}: IncomeAnalysisContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <IncomeAnalysisLineChart
        isFormValid={isFormValid}
        serviceDetailData={serviceDetailData}
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        validateData={validateData}
      />

      {/* Revenue Breakdown */}
      <FoodReportBreakdownRevenue
        isFormValid={isFormValid}
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        validateData={validateData}
      />
    </div>
  );
};
export default IncomeAnalysisContent;

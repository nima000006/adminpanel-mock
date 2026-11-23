import { RequestStatusSuicideRiskProps } from "./@types/@requestStatusSuicideRisk";
import RequestStatusChart from "./helper/components/RequestStatusChart/RequestStatusChart";
import SuicideRiskChart from "./helper/components/SuicideRiskChart/SuicideRiskChart";

const RequestStatusSuicideRisk = ({
  isFormValid,
  createBodyParams,
  triggerItems,
  validateData,
}: RequestStatusSuicideRiskProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 max-[750px]:grid-cols-1">
      <RequestStatusChart
        isFormValid={isFormValid}
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        validateData={validateData}
      />
      <SuicideRiskChart
        isFormValid={isFormValid}
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        validateData={validateData}
      />
    </div>
  );
};

export default RequestStatusSuicideRisk;

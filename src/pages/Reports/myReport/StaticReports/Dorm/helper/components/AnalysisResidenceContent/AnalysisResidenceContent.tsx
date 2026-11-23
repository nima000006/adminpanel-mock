import { AnalysisResidenceContentProps } from "./@types/@analysisResidenceContent";
import AnalysisResidenceChanges from "./helper/components/Changes/AnalysisResidenceChanges";
import AnalysisResidenceGender from "./helper/components/Gender/AnalysisResidenceGender";

const AnalysisResidenceContent = ({
  createBodyParams,
  triggerItems,
  serviceDetailData,
  isFormValid,
  validateData,
}: AnalysisResidenceContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="grid grid-cols-2 gap-6 max-[1200px]:grid-cols-1">
      {/* Based on Gender */}
      <AnalysisResidenceGender
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        isFormValid={isFormValid}
      />

      {/* Based on Changes */}
      <AnalysisResidenceChanges
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        serviceDetailData={serviceDetailData}
        isFormValid={isFormValid}
        validateData={validateData}
      />
    </div>
  );
};
export default AnalysisResidenceContent;

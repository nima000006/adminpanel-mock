import { DormitoryManagementContentProps } from "./@types/@dormitoryManagementContent";
import DormitoryManagementType from "./helper/components/ManagementType/DormitoryManagementType";
import DormitorySettlementMethod from "./helper/components/SettlementMethod/DormitorySettlementMethod";

const DormitoryManagementContent = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: DormitoryManagementContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="grid grid-cols-2 gap-6 max-[800px]:grid-cols-1">
      {/* Management type */}
      <DormitoryManagementType
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        isFormValid={isFormValid}
        validateData={validateData}
      />
      {/* Settlement method  */}
      <DormitorySettlementMethod
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        isFormValid={isFormValid}
        validateData={validateData}
      />
    </div>
  );
};
export default DormitoryManagementContent;

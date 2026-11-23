import { RequestHandlingContentProps } from "./@types/@requestHandlingContent";
import RequestHandlingStatus from "./helper/components/Status/RequestHandlingStatus";
import RequestHandlingTime from "./helper/components/Time/RequestHandlingTime";

const RequestHandlingContent = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: RequestHandlingContentProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 max-[1300px]:grid-cols-1">
      <RequestHandlingTime
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        isFormValid={isFormValid}
      />
      <RequestHandlingStatus
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        isFormValid={isFormValid}
        validateData={validateData}
      />
    </div>
  );
};
export default RequestHandlingContent;

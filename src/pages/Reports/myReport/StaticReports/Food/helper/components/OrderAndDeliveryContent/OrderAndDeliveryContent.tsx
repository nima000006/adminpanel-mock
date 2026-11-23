import { OrderAndDeliveryContentProps } from "./@types/@orderAndDeliveryContent";
import BranchesOrder from "./helper/components/BranchesOrder/BranchesOrder";
import OrderDeliveryStatus from "./helper/components/OrderDeliveryStatus/OrderDeliveryStatus";
import OrderLineChart from "./helper/components/OrderLineChart/OrderLineChart";

const OrderAndDeliveryContent = ({
  createBodyParams,
  serviceDetailData,
  triggerItems,
  isFormValid,
  validateData,
}: OrderAndDeliveryContentProps) => {
  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="grid grid-cols-2 gap-6 max-[1200px]:grid-cols-1">
        <OrderLineChart
          createBodyParams={createBodyParams}
          serviceDetailData={serviceDetailData}
          triggerItems={triggerItems}
          isFormValid={isFormValid}
          validateData={validateData}
        />

        <OrderDeliveryStatus
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          isFormValid={isFormValid}
          validateData={validateData}
        />
      </div>

      {/* Branches orders */}
      <BranchesOrder
        createBodyParams={createBodyParams}
        serviceDetailData={serviceDetailData}
        triggerItems={triggerItems}
        isFormValid={isFormValid}
        validateData={validateData}
      />
    </div>
  );
};
export default OrderAndDeliveryContent;

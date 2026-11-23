import { useState } from "react";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";

import { TemplateFoodOrderContentProps } from "./@types/@templateFoodOrderContent";
import CountOrderSegmentContent from "./helper/components/CountOrderSegmentContent/CountOrderSegmentContent";
import OrderByDaySegmentContent from "./helper/components/OrderByDaySegmentContent/OrderByDaySegmentContent";
import TypePresentationFoodSegmentContent from "./helper/components/TypePresentationFoodSegmentContent/TypePresentationFoodSegmentContent";

const TemplateFoodOrderContent = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: TemplateFoodOrderContentProps) => {
  const [view, setView] = useState("0");

  const options = [
    {
      label: "تعداد سفارشات",
      value: "0",
    },
    {
      label: "سفارشات بر اساس نوع ارائه غذا",
      value: "1",
    },
    {
      label: "سفارشات به تفکیک روز",
      value: "2",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomSegmented
        size="large"
        className="mb-6!"
        options={options}
        block
        onChange={(value) => setView(value as "0" | "1" | "2")}
        value={view}
      />

      {view === "0" ? (
        <CountOrderSegmentContent
          isFormValid={isFormValid}
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          view={view}
          validateData={validateData}
        />
      ) : view === "1" ? (
        <TypePresentationFoodSegmentContent
          isFormValid={isFormValid}
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          view={view}
          validateData={validateData}
        />
      ) : view === "2" ? (
        <OrderByDaySegmentContent
          isFormValid={isFormValid}
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          view={view}
          validateData={validateData}
        />
      ) : null}
    </div>
  );
};
export default TemplateFoodOrderContent;

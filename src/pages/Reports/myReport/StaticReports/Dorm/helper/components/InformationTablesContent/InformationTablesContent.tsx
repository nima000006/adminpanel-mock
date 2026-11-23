import { useState } from "react";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";

import { InformationTablesContentProps } from "./@types/@informationTablesContent";
import DormCapacitySegmentContent from "./helper/components/DormCapacitySegmentContent/DormCapacitySegmentContent";
import IncomeSegmentContent from "./helper/components/IncomeSegmentContent/IncomeSegmentContent";
import PriceReserveRoomSegmentContent from "./helper/components/PriceReserveRoomSegmentContent/PriceReserveRoomSegmentContent";

const InformationTablesContent = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: InformationTablesContentProps) => {
  const [view, setView] = useState("0");

  const options = [
    {
      label: "ظرفیت خوابگاه‌",
      value: "0",
    },
    {
      label: "لیست خوابگاه ها",
      value: "1",
    },
    {
      label: "درآمد",
      value: "2",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="segment-container">
      <CustomSegmented
        size="large"
        className="mb-6!"
        options={options}
        block
        onChange={(value) => setView(value as "0" | "1" | "2")}
        value={view}
      />

      {view === "0" ? (
        <DormCapacitySegmentContent
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          view={view}
          isFormValid={isFormValid}
          validateData={validateData}
        />
      ) : view === "1" ? (
        <PriceReserveRoomSegmentContent
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          view={view}
          isFormValid={isFormValid}
          validateData={validateData}
        />
      ) : view === "2" ? (
        <IncomeSegmentContent
          createBodyParams={createBodyParams}
          triggerItems={triggerItems}
          view={view}
          isFormValid={isFormValid}
          validateData={validateData}
        />
      ) : null}
    </div>
  );
};
export default InformationTablesContent;

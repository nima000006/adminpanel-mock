import { useState } from "react";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";

import {
  BaseInfoSegmentedMode,
  BUSINESS_BASE_INFO_ALERT_FIRST_ROW,
  BUSINESS_BASE_INFO_ALERT_SECOND_ROW,
} from "../../utils/businessDetailUtils";
import PositionTypeSegmentContent from "./helper/components/PositionTypeSegmentContent/PositionTypeSegmentContent";
import UnitTypeSegmentContent from "./helper/components/UnitTypeSegmentContent/UnitTypeSegmentContent";
import "./_businessBaseInfoTab.scss";

const BusinessBaseInfoTab = () => {
  const [view, setView] = useState("0");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="business-base-info-container">
      <CustomAlert
        message="اطلاعات پایه کسب و کار چیست؟!"
        description={
          <div>
            <p>{BUSINESS_BASE_INFO_ALERT_FIRST_ROW}</p>
            <p>{BUSINESS_BASE_INFO_ALERT_SECOND_ROW}</p>
          </div>
        }
        showIcon
        className="alert"
      />

      <div className="segment-wrapper">
        <h3>مشاهده:</h3>
        <CustomSegmented
          options={[
            { value: "0", label: "انواع واحد" },
            { value: "1", label: "انواع سمت", disabled: false },
          ]}
          className="segmented-container"
          onChange={(value) => setView(value as "0" | "1")}
          value={view}
        />
      </div>

      {view === BaseInfoSegmentedMode?.unitType ? (
        <UnitTypeSegmentContent />
      ) : BaseInfoSegmentedMode?.positionType ? (
        <PositionTypeSegmentContent />
      ) : null}
    </div>
  );
};
export default BusinessBaseInfoTab;

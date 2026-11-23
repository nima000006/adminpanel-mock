import { useState } from "react";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";

import PositionOrganizationSegmentContent from "./components/PositionOrganizationSegmentContent/PositionOrganizationSegmentContent";
import PositionOrganizationStructureSegmentContent from "./components/PositionOrganizationStructureSegmentContent/PositionOrganizationStructureSegmentContent";
import { PositionSegmentMode } from "../../utils/businessDetailUtils";

const PositionsTab = () => {
  const [view, setView] = useState("0");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard className="organization-unit-tab-container">
      <div>
        <CustomSegmented
          options={[
            { value: "0", label: "سمت سازمانی" },
            { value: "1", label: "ساختار سازمانی", disabled: false },
          ]}
          className="segmented-container"
          onChange={(value) => setView(value as "0" | "1" | "2")}
          value={view}
        />
      </div>
      {view === PositionSegmentMode?.positionOrganization ? (
        <PositionOrganizationSegmentContent />
      ) : view === PositionSegmentMode?.structureOrganization ? (
        <PositionOrganizationStructureSegmentContent />
      ) : null}
    </CustomCard>
  );
};
export default PositionsTab;

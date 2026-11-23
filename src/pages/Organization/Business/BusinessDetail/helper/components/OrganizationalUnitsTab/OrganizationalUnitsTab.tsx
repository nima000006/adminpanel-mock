import { useState } from "react";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";

import { OrganUnitSegmentedMode } from "../../utils/businessDetailUtils";
import OrganizationStructureSegmentContent from "./helper/components/OrganizationStructureSegmentContent/OrganizationStructureSegmentContent";
import OrganizationUnitSegmentContent from "./helper/components/OrganizationUnitSegmentContent/OrganizationUnitSegmentContent";
import TopChartSegmentContent from "./helper/components/TopChartSegmentContent/TopChartSegmentContent";
import "./_organizationalUnitsTab.scss";

const OrganizationalUnitsTab = () => {
  const [view, setView] = useState("0");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard className="organization-unit-tab-container">
      <div>
        <CustomSegmented
          options={[
            { value: "0", label: "واحدهای سازمانی" },
            { value: "1", label: "ساختار سازمانی", disabled: false },
            { value: "2", label: "تاپ چارت", disabled: false },
          ]}
          className="segmented-container"
          onChange={(value) => setView(value as "0" | "1" | "2")}
          value={view}
        />
      </div>
      {view === OrganUnitSegmentedMode?.organUnit ? (
        <OrganizationUnitSegmentContent />
      ) : view === OrganUnitSegmentedMode?.organStructure ? (
        <OrganizationStructureSegmentContent />
      ) : view === OrganUnitSegmentedMode?.topChart ? (
        <TopChartSegmentContent />
      ) : null}
    </CustomCard>
  );
};
export default OrganizationalUnitsTab;

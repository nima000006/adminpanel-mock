import { useState } from "react";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import { TopChartViewMode } from "@pages/Organization/Business/BusinessDetail/helper/utils/businessDetailUtils";

import PositionsAndPersonnelSegmentContent from "../../components/PositionsAndPersonnelSegmentContent/PositionsAndPersonnelSegmentContent";
import UnitInfoSection from "../../components/UnitInfoSection/UnitInfoSection";
import { ViewTopChartDrawerContentProps } from "../@types/@organizationUnitDrawerContentType";
import "./_viewTopChartDrawerContent.scss";

const ViewTopChartDrawerContent = ({
  closeDrawerHandler,
}: ViewTopChartDrawerContentProps) => {
  const [view, setView] = useState("0");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="view-top-chart-drawer-content">
      <CustomDrawerHeader
        title={"مشاهده واحد سازمانی تاپ چارت"}
        closeDrawerHandler={closeDrawerHandler}
      />

      <div>
        <CustomSegmented
          options={[
            { value: "0", label: "اطلاعات واحد" },
            { value: "1", label: "سمت‌ها و پرسنل", disabled: false },
          ]}
          className="segmented-container"
          onChange={(value) => setView(value as "0" | "1")}
          value={view}
        />
      </div>
      {view === TopChartViewMode?.unitInfo ? (
        <UnitInfoSection />
      ) : view === TopChartViewMode?.positions ? (
        <PositionsAndPersonnelSegmentContent />
      ) : null}
    </div>
  );
};
export default ViewTopChartDrawerContent;

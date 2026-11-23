import { useState } from "react";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import { SegmentedMode } from "@pages/Organization/Business/BusinessDetail/helper/utils/businessDetailUtils";

import { ViewBranchDrawerContentProps } from "../@types/@createBranchDrawerContentProps";
import BranchInfoSegmentedContent from "./helper/components/BranchInfoSegmentedContent/BranchInfoSegmentedContent";
import BranchOrganUnitSegmentedContent from "./helper/components/BranchOrganUnitSegmentedContent/BranchOrganUnitSegmentedContent";
import BranchPositionSegmentedContent from "./helper/components/BranchPositionSegmentedContent/BranchPositionSegmentedContent";
import "./_viewBranchDrawerContent.scss";

const ViewBranchDrawerContent = ({
  closeDrawerHandler,
  branchTitle,
}: ViewBranchDrawerContentProps) => {
  const [view, setView] = useState("0");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="view-branch-drawer-content-container">
      <CustomDrawerHeader
        title={`مشاهده شعبه  "${branchTitle}"`}
        closeDrawerHandler={closeDrawerHandler}
      />
      <div>
        <CustomSegmented
          options={[
            { value: "0", label: "اطلاعات شعبه" },
            { value: "1", label: "واحدهای سازمانی", disabled: false },
            { value: "2", label: "سمت‌های سازمانی", disabled: false },
          ]}
          className="segmented-container"
          onChange={(value) => setView(value as "0" | "1" | "2")}
          value={view}
        />
      </div>
      {view === SegmentedMode?.branchInfo ? (
        <BranchInfoSegmentedContent />
      ) : view === SegmentedMode?.organUnit ? (
        <BranchOrganUnitSegmentedContent />
      ) : view === SegmentedMode?.position ? (
        <BranchPositionSegmentedContent />
      ) : null}
    </div>
  );
};
export default ViewBranchDrawerContent;

import { useState } from "react";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import { SegmentViewBuildingMode } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";
import { ViewBuildingDrawerContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/@types/@activeResidenceBuildingListTypes";
import ViewBuildingInfoSegmentContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/components/ViewBuildingInfoSegmentContent/ViewBuildingInfoSegmentContent";
import ViewFacilityBuildingSegmentContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/components/ViewFacilityBuildingSegmentContent/ViewFacilityBuildingSegmentContent";

const ViewBuildingDrawerContent = ({
  closeDrawerHandler,
  id,
}: ViewBuildingDrawerContentProps) => {
  const [view, setView] = useState("0");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="مشاهده ساختمان"
        closeDrawerHandler={closeDrawerHandler}
      />

      <div>
        <CustomSegmented
          options={[
            { value: "0", label: "اطلاعات ساختمان" },
            { value: "1", label: "امکانات ساختمان", disabled: false },
          ]}
          block
          onChange={(value) => setView(value as "0" | "1")}
          value={view}
        />

        {view === SegmentViewBuildingMode?.buildingInfo ? (
          <ViewBuildingInfoSegmentContent id={id} />
        ) : view === SegmentViewBuildingMode.facilityBuilding ? (
          <ViewFacilityBuildingSegmentContent id={id} />
        ) : null}
      </div>
    </div>
  );
};
export default ViewBuildingDrawerContent;

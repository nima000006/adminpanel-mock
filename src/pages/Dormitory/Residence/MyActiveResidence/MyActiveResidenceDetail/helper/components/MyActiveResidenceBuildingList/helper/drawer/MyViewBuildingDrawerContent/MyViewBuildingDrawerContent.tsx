import { useState } from "react";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import { SegmentViewBuildingMode } from "@pages/Dormitory/Residence/MyActiveResidence/My_shared/MyUtil";
import { MyViewBuildingDrawerContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/@types/@myActiveResidenceBuildingListTypes";
import MyViewBuildingInfoSegmentContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyViewBuildingInfoSegmentContent/MyViewBuildingInfoSegmentContent";
import MyViewFacilityBuildingSegmentContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/helper/components/MyViewFacilityBuildingSegmentContent/MyViewFacilityBuildingSegmentContent";

const MyViewBuildingDrawerContent = ({
  closeDrawerHandler,
  id,
}: MyViewBuildingDrawerContentProps) => {
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
          <MyViewBuildingInfoSegmentContent id={id} />
        ) : view === SegmentViewBuildingMode.facilityBuilding ? (
          <MyViewFacilityBuildingSegmentContent id={id} />
        ) : null}
      </div>
    </div>
  );
};
export default MyViewBuildingDrawerContent;

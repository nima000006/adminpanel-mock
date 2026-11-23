import { useState } from "react";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import useQueryParams from "@infra/hooks/useQueryParams";
import { ViewFloorDrawerContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/@types/@activeResidenceFloorListTypes";
import ViewFacilityFloorSegmentContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/components/ViewFacilityFloorSegmentContent/ViewFacilityFloorSegmentContent";
import ViewFloorInfoSegmentContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/components/ViewFloorInfoSegmentContent/ViewFloorInfoSegmentContent";
import { SegmentViewFloorMode } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

const ViewFloorDrawerContent = ({
  closeDrawerHandler,
  id,
  buildingTitle,
}: ViewFloorDrawerContentProps) => {
  const { params: url } = useQueryParams();
  const [view, setView] = useState("0");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader title="مشاهده طبقه" closeDrawerHandler={closeDrawerHandler} />

      <div>
        مشاهده طبقه برای اقامتگاه{" "}
        <span className="text-neutral-13 font-bold">{url?.residenceTitle}</span> در
        ساختمان <span className="text-neutral-13 font-bold">{buildingTitle}</span>
      </div>

      <div>
        <CustomSegmented
          options={[
            { value: "0", label: "اطلاعات طبقه" },
            { value: "1", label: "امکانات طبقه", disabled: false },
          ]}
          block
          onChange={(value) => setView(value as "0" | "1")}
          value={view}
        />

        {view === SegmentViewFloorMode?.floorInfo ? (
          <ViewFloorInfoSegmentContent id={id} />
        ) : view === SegmentViewFloorMode?.facilityFloor ? (
          <ViewFacilityFloorSegmentContent id={id} />
        ) : null}
      </div>
    </div>
  );
};
export default ViewFloorDrawerContent;

import { useState } from "react";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MyViewFloorDrawerContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/@types/@myActiveResidenceFloorListTypes";
import MyViewFacilityFloorSegmentContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/components/MyViewFacilityFloorSegmentContent/MyViewFacilityFloorSegmentContent";
import MyViewFloorInfoSegmentContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/helper/components/MyViewFloorInfoSegmentContent/MyViewFloorInfoSegmentContent";
import { SegmentViewFloorMode } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

const MyViewFloorDrawerContent = ({
  closeDrawerHandler,
  id,
  buildingTitle,
}: MyViewFloorDrawerContentProps) => {
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
          <MyViewFloorInfoSegmentContent id={id} />
        ) : view === SegmentViewFloorMode?.facilityFloor ? (
          <MyViewFacilityFloorSegmentContent id={id} />
        ) : null}
      </div>
    </div>
  );
};
export default MyViewFloorDrawerContent;

import { useState } from "react";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import useQueryParams from "@infra/hooks/useQueryParams";
import MyViewFacilityUnitSegmentContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/helper/components/MyViewFacilityUnitSegmentContent/MyViewFacilityUnitSegmentContent";
import MyViewUnitInfoSegmentContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/helper/components/MyViewUnitInfoSegmentContent/MyViewUnitInfoSegmentContent";
import { MyViewUnitDrawerContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/helper/drawer/MyViewUnitDrawerContent/@types/@myViewUnitDrawerContentTypes";
import { SegmentViewUnitMode } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

const MyViewUnitDrawerContent = ({
  closeDrawerHandler,
  buildingTitle,
  floorTitle,
  id,
}: MyViewUnitDrawerContentProps) => {
  const [view, setView] = useState("0");
  const { params: url } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="مشاهده واحد اقامتی"
        closeDrawerHandler={closeDrawerHandler}
      />

      <div>
        "مشاهده واحد اقامتی برای اقامتگاه"{" "}
        <span className="text-neutral-13 font-bold">{url?.residenceTitle}</span> در
        ساختمان <span className="text-neutral-13 font-bold">{buildingTitle}</span> در طبقه{" "}
        <span className="text-neutral-13 font-bold">{floorTitle}</span>
      </div>

      <div>
        <CustomSegmented
          options={[
            { value: "0", label: "اطلاعات واحد اقامتی" },
            { value: "1", label: "امکانات واحد اقامتی", disabled: false },
          ]}
          block
          onChange={(value) => setView(value as "0" | "1")}
          value={view}
        />

        {view === SegmentViewUnitMode?.unitInfo ? (
          <MyViewUnitInfoSegmentContent id={id} />
        ) : view === SegmentViewUnitMode?.facilityUnit ? (
          <MyViewFacilityUnitSegmentContent id={id} />
        ) : null}
      </div>
    </div>
  );
};
export default MyViewUnitDrawerContent;

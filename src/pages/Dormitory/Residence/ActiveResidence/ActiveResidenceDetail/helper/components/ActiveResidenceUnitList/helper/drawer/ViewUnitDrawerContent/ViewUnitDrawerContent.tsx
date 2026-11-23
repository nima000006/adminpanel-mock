import { useState } from "react";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import useQueryParams from "@infra/hooks/useQueryParams";
import ViewFacilityUnitSegmentContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/components/ViewFacilityUnitSegmentContent/ViewFacilityUnitSegmentContent";
import ViewUnitInfoSegmentContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/components/ViewUnitInfoSegmentContent/ViewUnitInfoSegmentContent";
import { ViewUnitDrawerContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/drawer/ViewUnitDrawerContent/@types/@viewUnitDrawerContentTypes";
import { SegmentViewUnitMode } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

const ViewUnitDrawerContent = ({
  closeDrawerHandler,
  buildingTitle,
  floorTitle,
  id,
}: ViewUnitDrawerContentProps) => {
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
          <ViewUnitInfoSegmentContent id={id} />
        ) : view === SegmentViewUnitMode?.facilityUnit ? (
          <ViewFacilityUnitSegmentContent id={id} />
        ) : null}
      </div>
    </div>
  );
};
export default ViewUnitDrawerContent;

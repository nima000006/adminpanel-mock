import { useState } from "react";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";

import { PositionDrawerSegmentMode } from "../../../../utils/businessDetailUtils";
import { ViewOrganizationPositionInfoProps } from "../@types/@viewOrganizationPositionInfoProps";
import PersonnelListSegmentContentReadOnly from "./helper/components/PersonnelListSegmentContentReadOnly/PersonnelListSegmentContentReadOnly";
import PositionInfoSegmentContentReadOnly from "./helper/components/PositionInfoSegmentContentReadOnly/PositionInfoSegmentContentReadOnly";

const ViewOrganizationPositionStructureDrawerContent = ({
  closeDrawerHandler,
}: ViewOrganizationPositionInfoProps) => {
  const [view, setView] = useState("0");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="view-organization-position-info-drawer-content-container">
      <CustomDrawerHeader
        title={"مشاهده ساختار سمت سازمانی"}
        closeDrawerHandler={closeDrawerHandler}
      />

      <div>
        <CustomSegmented
          options={[
            { value: "0", label: "اطلاعات سمت" },
            { value: "1", label: "لیست پرسنل", disabled: false },
          ]}
          className="segmented-container"
          onChange={(value) => setView(value as "0" | "1")}
          value={view}
        />
      </div>
      {view === PositionDrawerSegmentMode?.positionInfo ? (
        <PositionInfoSegmentContentReadOnly />
      ) : view === PositionDrawerSegmentMode?.personnelList ? (
        <PersonnelListSegmentContentReadOnly />
      ) : null}
    </div>
  );
};
export default ViewOrganizationPositionStructureDrawerContent;

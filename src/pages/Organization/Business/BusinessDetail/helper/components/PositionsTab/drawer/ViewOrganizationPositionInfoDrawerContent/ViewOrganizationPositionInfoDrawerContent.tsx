import { useState } from "react";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";

import PersonnelListSegmentContent from "./helper/components/PersonnelListSegmentContent/PersonnelListSegmentContent";
import PositionInfoSegmentContent from "./helper/components/PositionInfoSegmentContent/PositionInfoSegmentContent";
import { PositionDrawerSegmentMode } from "../../../../utils/businessDetailUtils";
import { ViewOrganizationPositionInfoProps } from "../@types/@viewOrganizationPositionInfoProps";
import "./_viewOrganizationPositionInfoDrawerContent.scss";

const ViewOrganizationPositionInfoDrawerContent = ({
  closeDrawerHandler,
}: ViewOrganizationPositionInfoProps) => {
  const [view, setView] = useState("0");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="view-organization-position-info-drawer-content-container">
      <CustomDrawerHeader
        title={"مشاهده سمت سازمانی"}
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
        <PositionInfoSegmentContent />
      ) : view === PositionDrawerSegmentMode?.personnelList ? (
        <PersonnelListSegmentContent />
      ) : null}
    </div>
  );
};
export default ViewOrganizationPositionInfoDrawerContent;

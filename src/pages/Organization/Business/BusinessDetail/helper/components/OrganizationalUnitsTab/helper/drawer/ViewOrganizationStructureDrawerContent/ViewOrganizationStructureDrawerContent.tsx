import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";

import UnitInfoSection from "../../components/UnitInfoSection/UnitInfoSection";
import { ViewOrganizationUnitDrawerContentProps } from "../@types/@organizationUnitDrawerContentType";

const ViewOrganizationStructureDrawerContent = ({
  closeDrawerHandler,
}: ViewOrganizationUnitDrawerContentProps) => {
  //* ================================ Util Functions ================================

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title={"مشاهده واحد سازمانی"}
        closeDrawerHandler={closeDrawerHandler}
      />

      <UnitInfoSection />
    </div>
  );
};
export default ViewOrganizationStructureDrawerContent;

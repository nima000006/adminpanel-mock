import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { ViewOrganizationUnitDrawerContentProps } from "../@types/@organizationUnitDrawerContentType";

const ViewOrganizationUnitDrawerContent = ({
  closeDrawerHandler,
}: ViewOrganizationUnitDrawerContentProps) => {
  //* ================================ Util Functions ================================

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title={"مشاهده اطلاعات واحد سازمانی"}
        closeDrawerHandler={closeDrawerHandler}
      />

      <div>
        <CustomDivider text={"اطلاعات واحد سازمانی"} />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol xl={12} lg={12} md={12} label="نوع واحد" value={""} />

          <SingleVerticalWithCol xl={12} lg={12} md={12} label="عنوان واحد" value={""} />

          <SingleVerticalWithCol span={24} label="توضیحات" value={""} />
        </Row>
      </div>
    </div>
  );
};
export default ViewOrganizationUnitDrawerContent;

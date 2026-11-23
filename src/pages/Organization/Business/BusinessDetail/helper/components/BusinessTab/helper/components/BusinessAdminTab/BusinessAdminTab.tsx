import { useState } from "react";

import { Col } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import ActivePeriodReadOnly from "@pages/Organization/_shared/components/ActivePeriodReadOnly/ActivePeriodReadOnly";

import CallInfoSection from "../../../../_shared/components/CallInfoSection/CallInfoSection";
import LocationInfoSection from "../../../../_shared/components/LocationInfoSection/LocationInfoSection";
import EducationInfoSection from "../EducationInfoSection/EducationInfoSection";
import PersonnelInfoSection from "../PersonnelInfoSection/PersonnelInfoSection";
import "./_businessAdminTab.scss";

const BusinessAdminTab = () => {
  const [passportPhoto, setPassportPhoto] = useState<any[]>([]); //عکس پرسنلی (3*4)

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="business-admin-tab-container">
      <div className="business-admin-tab-image-wrapper">
        <CustomDivider text={"عکس پرسنلی"} />
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomUploader
            fileList={passportPhoto}
            setFileList={setPassportPhoto}
            isReadOnly={true}
            name="passPortPhoto"
            uploaderText="عکس پرسنلی (3*4)"
            label="عکس پرسنلی (3*4)"
            hasVerticalLabel
          />
        </Col>
      </div>

      {/* personnel info */}
      <PersonnelInfoSection />

      {/* education info */}
      <EducationInfoSection />

      {/* call info */}
      <CallInfoSection />

      {/* location info */}
      <LocationInfoSection />

      {/* active period*/}
      <ActivePeriodReadOnly />
    </Div>
  );
};
export default BusinessAdminTab;

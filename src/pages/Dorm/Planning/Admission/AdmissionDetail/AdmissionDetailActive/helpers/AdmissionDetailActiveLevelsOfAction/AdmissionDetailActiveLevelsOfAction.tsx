import { useState } from "react";

import { ApplicationLevelDataType } from "./@types/@admissionDetailActiveLevelsOfAction";
import AdmissionDetailLevelsOfActionInfo from "../../../helpers/LevelsOfActionInfo/AdmissionDetailLevelsOfActionInfo";
import AdmissionDetailLevelsOfActionTree from "../../../helpers/LevelsOfActionTree/AdmissionDetailLevelsOfActionTree";
import "./_admissionDetailActiveLevelsOfAction.scss";

const AdmissionDetailActiveLevelsOfAction = () => {
  const [applicationLevelData, setApplicationLevelData] =
    useState<ApplicationLevelDataType>({
      residenceId: null,
      residenceTitle: null,
      selectedIds: [],
    });

  return (
    <div className="admission-detail-active-levels-of-action-container">
      <AdmissionDetailLevelsOfActionInfo
        setApplicationLevelData={setApplicationLevelData}
      />
      <AdmissionDetailLevelsOfActionTree applicationLevelData={applicationLevelData} />
    </div>
  );
};

export default AdmissionDetailActiveLevelsOfAction;

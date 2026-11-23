import { useState } from "react";

import { ApplicationLevelDataType } from "../../../AdmissionDetailActive/helpers/AdmissionDetailActiveLevelsOfAction/@types/@admissionDetailActiveLevelsOfAction";
import AdmissionDetailLevelsOfActionInfo from "../../../helpers/LevelsOfActionInfo/AdmissionDetailLevelsOfActionInfo";
import AdmissionDetailLevelsOfActionTree from "../../../helpers/LevelsOfActionTree/AdmissionDetailLevelsOfActionTree";
import "./_admissionDetailRejectedLevelsOfAction.scss";

const AdmissionDetailRejectedLevelsOfAction = () => {
  const [applicationLevelData, setApplicationLevelData] =
    useState<ApplicationLevelDataType>({
      residenceId: null,
      residenceTitle: null,
      selectedIds: [],
    });

  return (
    <div className="admission-detail-rejected-levels-of-action-container">
      <AdmissionDetailLevelsOfActionInfo
        setApplicationLevelData={setApplicationLevelData}
      />
      <AdmissionDetailLevelsOfActionTree applicationLevelData={applicationLevelData} />
    </div>
  );
};

export default AdmissionDetailRejectedLevelsOfAction;

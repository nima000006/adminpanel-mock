import { useState } from "react";

import { ApplicationLevelDataType } from "../../../AdmissionDetailActive/helpers/AdmissionDetailActiveLevelsOfAction/@types/@admissionDetailActiveLevelsOfAction";
import AdmissionDetailLevelsOfActionInfo from "../../../helpers/LevelsOfActionInfo/AdmissionDetailLevelsOfActionInfo";
import AdmissionDetailLevelsOfActionTree from "../../../helpers/LevelsOfActionTree/AdmissionDetailLevelsOfActionTree";
import "./_admissionDetailAwaitingReviewLevelsOfAction.scss";

const AdmissionDetailAwaitingReviewLevelsOfAction = () => {
  const [applicationLevelData, setApplicationLevelData] =
    useState<ApplicationLevelDataType>({
      residenceId: null,
      residenceTitle: null,
      selectedIds: [],
    });

  return (
    <div className="admission-detail-awaiting-review-levels-of-action-container">
      <AdmissionDetailLevelsOfActionInfo
        setApplicationLevelData={setApplicationLevelData}
      />
      <AdmissionDetailLevelsOfActionTree applicationLevelData={applicationLevelData} />
    </div>
  );
};

export default AdmissionDetailAwaitingReviewLevelsOfAction;

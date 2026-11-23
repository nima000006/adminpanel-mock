// import { useSearchParams } from "react-router";
import { useState } from "react";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { massageCreatorInactiveAlert } from "@pages/Dorm/Planning/Admission/utils/AdmissionUtils";

import { ApplicationLevelDataType } from "../../../AdmissionDetailActive/helpers/AdmissionDetailActiveLevelsOfAction/@types/@admissionDetailActiveLevelsOfAction";
import AdmissionDetailLevelsOfActionInfo from "../../../helpers/LevelsOfActionInfo/AdmissionDetailLevelsOfActionInfo";
import AdmissionDetailLevelsOfActionTree from "../../../helpers/LevelsOfActionTree/AdmissionDetailLevelsOfActionTree";
import "./_admissionDetailInactiveLevelsOfAction.scss";

const AdmissionDetailInactiveLevelsOfAction = ({
  deactivationDate,
}: {
  deactivationDate?: string;
}) => {
  const [applicationLevelData, setApplicationLevelData] =
    useState<ApplicationLevelDataType>({
      residenceId: null,
      residenceTitle: null,
      selectedIds: [],
    });

  return (
    <div className="admission-detail-inactive-levels-of-action-container">
      {/* //Todo[Atefeh]: get date from API */}
      <CustomAlert
        message={massageCreatorInactiveAlert(
          dataPlaceHolder({
            data: deactivationDate,
            isDate: true,
          })
        )}
        type="error"
        showIcon
      />
      <AdmissionDetailLevelsOfActionInfo
        setApplicationLevelData={setApplicationLevelData}
      />
      <AdmissionDetailLevelsOfActionTree applicationLevelData={applicationLevelData} />
    </div>
  );
};

export default AdmissionDetailInactiveLevelsOfAction;

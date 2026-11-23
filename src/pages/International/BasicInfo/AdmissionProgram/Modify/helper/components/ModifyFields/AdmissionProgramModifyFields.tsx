import useQueryParams from "@infra/hooks/useQueryParams";

import { AdmissionProgramModifyStepsProps } from "./@types/@AdmissionProgramModifyStepsProps";
import AdmissionProgramCreateField from "./helper/components/CreateField/AdmissionProgramCreateField";
import AdmissionProgramEditField from "./helper/components/EditField/AdmissionProgramEditField";
import "./_admissionProgramModifyFields.scss";

const AdmissionProgramModifyFields = ({
  setCurrent,
}: AdmissionProgramModifyStepsProps) => {
  const {
    params: { copiedId },
  } = useQueryParams();

  return (
    <div className="international-admission-program-modify-fields-info-container">
      {copiedId ? (
        <AdmissionProgramEditField setCurrent={setCurrent} />
      ) : (
        <AdmissionProgramCreateField setCurrent={setCurrent} />
      )}
    </div>
  );
};

export default AdmissionProgramModifyFields;

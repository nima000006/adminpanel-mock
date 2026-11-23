import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { BeneficiaryTypeDisplayProps } from "./@types/@beneficiaryTypeDisplayProps";
import { BENEFICIARY_TYPE_LABEL_MAP } from "../../../utils/enums";

const BeneficiaryTypeDisplay = ({ selectedType }: BeneficiaryTypeDisplayProps) => {
  return (
    <SingleVerticalWithCol
      span={24}
      label="نوع ذینفع"
      value={BENEFICIARY_TYPE_LABEL_MAP[selectedType] ?? "-"}
    />
  );
};

export default BeneficiaryTypeDisplay;

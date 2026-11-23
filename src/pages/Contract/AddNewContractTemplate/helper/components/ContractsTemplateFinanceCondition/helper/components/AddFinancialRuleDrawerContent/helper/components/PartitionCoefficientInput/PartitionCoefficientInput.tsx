import { PiPercent } from "react-icons/pi";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import {
  REQUIRED_RULE,
  NON_NEGATIVE_NUMBER_RULE,
  DECIMAL_RULE,
  PERCENTAGE_RULE,
} from "@infra/validation/validationSchema";

const PartitionCoefficientInput = () => {
  return (
    <CustomInput
      name="partitionCoefficient"
      label="سهم (درصد)"
      addonAfter={<PiPercent />}
      rules={[REQUIRED_RULE, NON_NEGATIVE_NUMBER_RULE, DECIMAL_RULE(2), PERCENTAGE_RULE]}
    />
  );
};

export default PartitionCoefficientInput;

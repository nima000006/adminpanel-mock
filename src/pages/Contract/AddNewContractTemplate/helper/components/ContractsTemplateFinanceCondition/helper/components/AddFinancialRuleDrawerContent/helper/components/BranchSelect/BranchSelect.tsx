import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { BranchSelectProps } from "./@types/@branchSelectProps";

const BranchSelect = ({ options, loading, disabled }: BranchSelectProps) => {
  return (
    <CustomSelect
      label="شعبه"
      name="branch"
      options={options}
      loading={loading}
      rules={[REQUIRED_RULE]}
      disabled={disabled}
      className="mb-0!"
    />
  );
};

export default BranchSelect;

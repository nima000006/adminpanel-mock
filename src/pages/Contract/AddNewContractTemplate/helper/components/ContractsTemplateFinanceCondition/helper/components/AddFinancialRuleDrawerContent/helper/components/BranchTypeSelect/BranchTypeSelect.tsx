import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { BranchTypeSelectProps } from "./@types/@branchTypeSelectProps";

const BranchTypeSelect = ({
  options,
  loading,
  disabled,
  onChange,
}: BranchTypeSelectProps) => {
  return (
    <CustomSelect
      label="نوع شعبه"
      name="branchType"
      options={options?.map((item: { name: string; title: string; id: number }) => ({
        id: item?.name,
        title: item?.title,
        value: String(item?.id),
      }))}
      loading={loading}
      rules={[REQUIRED_RULE]}
      disabled={disabled}
      onChange={onChange}
      className="mb-0!"
    />
  );
};

export default BranchTypeSelect;

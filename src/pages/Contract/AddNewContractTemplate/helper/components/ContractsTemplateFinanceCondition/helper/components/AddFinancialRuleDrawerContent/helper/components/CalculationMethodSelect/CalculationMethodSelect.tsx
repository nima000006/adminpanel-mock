import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { CalculationMethodSelectProps } from "./@types/@calculationMethodSelectProps";

const CalculationMethodSelect = ({ options, loading }: CalculationMethodSelectProps) => {
  return (
    <CustomSelect
      label="روش محاسبه سهم"
      name="calculationMethod"
      options={options?.map((item: { name: string; title: string }) => ({
        id: item?.name,
        title: item?.title,
      }))}
      loading={loading}
      rules={[REQUIRED_RULE]}
      className="mb-0!"
    />
  );
};

export default CalculationMethodSelect;

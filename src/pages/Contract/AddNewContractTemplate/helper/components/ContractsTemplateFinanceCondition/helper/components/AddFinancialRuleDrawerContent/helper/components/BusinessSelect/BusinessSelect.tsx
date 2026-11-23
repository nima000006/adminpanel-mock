import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { BusinessSelectProps } from "./@types/@businessSelectProps";

const BusinessSelect = ({ options, loading, onChange }: BusinessSelectProps) => {
  return (
    <CustomSelect
      label="کسب‌وکار"
      name="business"
      options={options?.content}
      loading={loading}
      rules={[REQUIRED_RULE]}
      onChange={onChange}
      className="mb-0!"
    />
  );
};

export default BusinessSelect;

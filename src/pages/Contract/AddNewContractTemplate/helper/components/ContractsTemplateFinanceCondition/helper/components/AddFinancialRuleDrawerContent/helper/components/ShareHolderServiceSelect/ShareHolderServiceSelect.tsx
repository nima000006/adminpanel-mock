import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ShareHolderServiceSelectProps } from "./@types/@shareHolderServiceSelectProps";

const ShareHolderServiceSelect = ({
  options,
  loading,
}: ShareHolderServiceSelectProps) => {
  return (
    <CustomSelect
      label="خدمت سهام‌دار"
      name="shareHolderService"
      options={options}
      loading={loading}
      rules={[REQUIRED_RULE]}
      className="mb-0!"
    />
  );
};

export default ShareHolderServiceSelect;

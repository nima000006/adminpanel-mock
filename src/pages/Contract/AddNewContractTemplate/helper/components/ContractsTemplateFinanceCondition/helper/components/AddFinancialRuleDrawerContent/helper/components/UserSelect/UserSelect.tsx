import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { UserSelectProps } from "./@types/@userSelectProps";

const UserSelect = ({ options, loading, onSearch }: UserSelectProps) => {
  return (
    <CustomSelect
      label="کاربر"
      name="user"
      options={options}
      rules={[REQUIRED_RULE]}
      loading={loading}
      showSearch={{ onSearch, filterOption: false }}
      className="mb-0!"
    />
  );
};

export default UserSelect;

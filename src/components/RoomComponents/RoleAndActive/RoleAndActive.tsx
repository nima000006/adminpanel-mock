import { Checkbox, Select } from "antd";

type RoleAndActiveProps = {
  setIsDormActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const RoleAndActive = ({ setIsDormActive }: RoleAndActiveProps) => {
  return (
    <div className="active-and-role-section-container">
      <div className="active-section">
        <span className="label">فعال / غیر فعال</span>
        <div>
          <Checkbox onChange={(e) => setIsDormActive(e.target.checked)}>فعال</Checkbox>
        </div>
      </div>
      <div className="role-section">
        <span className="label">جایگاه سازمانی</span>
        <div>
          <Select
            defaultValue="رییس"
            style={{ width: 120 }}
            //   onChange={handleChange}
            options={[
              { value: "رییس", label: "رییس" },
              { value: "معاون", label: "معاون" },
              { value: "همکار", label: "همکار" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleAndActive;

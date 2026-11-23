import CustomCheckboxGroup from "../../../../../../../../../../../../components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";

const IsSupplierCheckbox = () => {
  return (
    <CustomCheckboxGroup
      name="isSupplier"
      options={[
        {
          label: "ذینفع فروشنده قرارداد می‌باشد.",
          value: true,
        },
      ]}
      checkboxClassName="body-regular"
    />
  );
};

export default IsSupplierCheckbox;

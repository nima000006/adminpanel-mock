import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

const BusinessRequestsTableBaseInfoPositionTypeModel = () => {
  return [
    {
      title: "عنوان نوع سمت",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "وضعیت نمایش",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: () => {
        return (
          <CustomSwitch
            checkedChildren="فعال"
            unCheckedChildren="غیر فعال"
            valuePropName={""}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 70,
      render: () => <CustomButton type="link">ویرایش</CustomButton>,
    },
  ];
};
export default BusinessRequestsTableBaseInfoPositionTypeModel;

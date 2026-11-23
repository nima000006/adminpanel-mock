import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { GetCreatePricingStep } from "../components/TariffSteps/PricingStep/@types/@pricingStep";

const DormCreateTariffPricingStepTableModel = () => {
  return [
    {
      title: "انواع اتاق ها",
      dataIndex: "AssociationRoomTypee_title",
      key: "AssociationRoomTypee_title",
      width: 150,
    },

    {
      title: "قیمت (ریال - تخت روز)",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (_: number, record: GetCreatePricingStep) => {
        return (
          <CustomInputNumber
            isPrice={true}
            type="text"
            name={`price-${record?.AssociationRoomTypee_id}`}
            placeholder="قیمت (ریال)"
            rules={[REQUIRED_RULE]}
          />
        );
      },
    },
  ];
};
export default DormCreateTariffPricingStepTableModel;

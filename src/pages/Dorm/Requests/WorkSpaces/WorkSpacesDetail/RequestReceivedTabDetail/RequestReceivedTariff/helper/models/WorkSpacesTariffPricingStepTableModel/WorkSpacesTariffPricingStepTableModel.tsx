import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { GetPricingStepData } from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";

const WorkSpacesTariffPricingStepTableModel = () => {
  return [
    {
      title: "انواع اتاق ها",
      dataIndex: "roomTypeeTitle",
      key: "roomTypeeTitle",
      width: 150,
    },

    {
      title: "قیمت (ریال - تخت روز)",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (_: number, record: GetPricingStepData) => {
        return <CustomInput type="text" name={`price-${record?.id}`} />;
      },
    },
  ];
};
export default WorkSpacesTariffPricingStepTableModel;

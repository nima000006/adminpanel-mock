import { AiOutlineQuestionCircle } from "react-icons/ai";

import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  DORM_PRICING_MODIFY,
  DORM_PRICING_READ_ONLY,
} from "@pages/Dorm/Planning/Tariff/_shared/utils/TariffUtils";

import { GetPricingStepData } from "../components/TariffSteps/PricingStep/@types/@pricingStep";

const DormTariffPricingStepTableModel = (type: number | undefined) => {
  return [
    {
      title: "انواع اتاق ها",
      dataIndex: "roomTypeeTitle",
      key: "roomTypeeTitle",
      width: 150,
    },

    ...(type === DORM_PRICING_MODIFY
      ? [
          {
            title: "قیمت (ریال - تخت روز)",
            dataIndex: "price",
            key: "price",
            width: 150,
            render: (_: number, record: GetPricingStepData) => {
              return (
                <CustomInputNumber
                  isPrice={true}
                  type="text"
                  name={`price-${record?.id}`}
                  placeholder="قیمت (ریال)"
                  rules={[REQUIRED_RULE]}
                />
              );
            },
          },
        ]
      : type === DORM_PRICING_READ_ONLY
        ? [
            {
              title: (
                <div className="flex items-center gap-2">
                  <CustomTooltip title="قیمت به صورت “تخت روز” محاسبه می‌شود.">
                    <AiOutlineQuestionCircle />
                  </CustomTooltip>{" "}
                  <span>قیمت (ریال - تخت روز)</span>
                </div>
              ),
              dataIndex: "price",
              key: "price",
              width: 150,
              render: (value: number) => {
                return <SingleVerticalItem value={value?.toString()} isPrice />;
              },
            },
          ]
        : []),
  ];
};
export default DormTariffPricingStepTableModel;

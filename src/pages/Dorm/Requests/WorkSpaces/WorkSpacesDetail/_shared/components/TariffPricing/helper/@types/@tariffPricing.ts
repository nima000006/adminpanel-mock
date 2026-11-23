import { GetPricingStepData } from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";

export type TariffPricingProps = {
  data: GetPricingStepData[] | undefined;
  loading: boolean;
  countData: number | undefined;
};

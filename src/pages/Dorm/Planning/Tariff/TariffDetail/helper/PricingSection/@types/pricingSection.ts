import { GetPricingStepData } from "../../components/TariffSteps/PricingStep/@types/@pricingStep";

export type PricingSectionProps = {
  countData: number | undefined;
  loading: boolean;
  dataSource: GetPricingStepData[] | undefined;
  type: number;
};

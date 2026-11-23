import { GetPricingStepData } from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";

export type AdmissionDetailTariffPricingProps = {
  data: GetPricingStepData[];
  totalCount: number | undefined;
  loading: boolean;
};

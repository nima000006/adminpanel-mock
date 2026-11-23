import { HabitantAdmissionTabData } from "@pages/Dorm/Habitants/HabitantsDetail/helper/components/FourthTabAdmissionProgram/@types/@fourthTabAdmissionProgram";
import { GetPricingStepData } from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";

//! LAYOUT
export type UsersRequestsDetailTariffDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number | undefined;
  dataSource: GetPricingStepData[];
  admissionTariffData: HabitantAdmissionTabData | null;
};

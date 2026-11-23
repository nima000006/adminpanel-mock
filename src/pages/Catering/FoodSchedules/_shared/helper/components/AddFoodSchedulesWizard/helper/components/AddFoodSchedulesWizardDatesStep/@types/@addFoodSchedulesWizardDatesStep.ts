import {
  AddFoodSchedulesWizardDatesFormValues,
  AddFoodSchedulesWizardScheduleDateItem,
  AddFoodSchedulesWizardScope,
} from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/@types/@addFoodSchedulesWizard";

import type { FormInstance } from "antd";

export type AddFoodSchedulesWizardDatesStepProps = {
  form: FormInstance<AddFoodSchedulesWizardDatesFormValues>;
  scope: AddFoodSchedulesWizardScope;
  scheduleDates: AddFoodSchedulesWizardScheduleDateItem[];
  onBack: () => void;
  onContinue: () => void;
};

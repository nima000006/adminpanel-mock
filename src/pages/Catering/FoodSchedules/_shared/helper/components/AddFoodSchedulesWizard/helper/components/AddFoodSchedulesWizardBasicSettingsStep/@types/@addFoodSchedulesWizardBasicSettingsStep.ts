import {
  AddFoodSchedulesWizardBasicSettingsFormValues,
  AddFoodSchedulesWizardScope,
} from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/@types/@addFoodSchedulesWizard";

import type { FormInstance } from "antd";

export type AddFoodSchedulesWizardBasicSettingsStepProps = {
  form: FormInstance<AddFoodSchedulesWizardBasicSettingsFormValues>;
  scope: AddFoodSchedulesWizardScope;
  onBack: () => void;
  onContinue: () => void;
};

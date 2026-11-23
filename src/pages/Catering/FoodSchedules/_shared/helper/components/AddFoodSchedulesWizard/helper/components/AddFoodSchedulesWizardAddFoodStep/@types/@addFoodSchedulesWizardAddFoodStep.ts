export type AddFoodSchedulesWizardAddFoodItem = {
  id: number;
  title: string;
};

export type AddFoodSchedulesWizardAddFoodStepProps = {
  foods: AddFoodSchedulesWizardAddFoodItem[];
  onAddFood: () => void;
  onBack: () => void;
  onContinue: () => void;
};

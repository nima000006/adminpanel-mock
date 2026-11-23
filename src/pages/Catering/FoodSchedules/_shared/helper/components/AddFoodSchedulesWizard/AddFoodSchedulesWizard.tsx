import { useEffect, useState } from "react";

import { Form, Grid, Steps } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { PADDING_40 } from "@infra/VARS/globalStyles/globalStyles";
import {
  ADD_FOOD_SCHEDULES_PATTERN,
  ADD_FOOD_SCHEDULES_STEP_INDEX,
  ADD_FOOD_SCHEDULES_STEP_ITEMS,
  AddFoodSchedulesStepIndex,
  AddFoodSchedulesWizardBasicSettingsFormValues,
  AddFoodSchedulesWizardDatesFormValues,
  AddFoodSchedulesWizardProps,
  AddFoodSchedulesWizardScheduleDateItem,
} from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/@types/@addFoodSchedulesWizard";
import { AddFoodSchedulesWizardAddFoodItem } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/components/AddFoodSchedulesWizardAddFoodStep/@types/@addFoodSchedulesWizardAddFoodStep";
import AddFoodSchedulesWizardAddFoodStep from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/components/AddFoodSchedulesWizardAddFoodStep/AddFoodSchedulesWizardAddFoodStep";
import AddFoodSchedulesWizardBasicSettingsStep from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/components/AddFoodSchedulesWizardBasicSettingsStep/AddFoodSchedulesWizardBasicSettingsStep";
import AddFoodSchedulesWizardDatesStep from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/components/AddFoodSchedulesWizardDatesStep/AddFoodSchedulesWizardDatesStep";
import { buildWeeklyScheduleDates } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/utils/addFoodSchedulesWizardUtils";
import {
  CATERING_ORDER_MEAL_TYPES,
  CATERING_ORDER_MEAL_TYPES_LABELS,
} from "@pages/Catering/Orders/_shared/utils";

const MEAL_TYPE_OPTIONS = Object.values(CATERING_ORDER_MEAL_TYPES);

const AddFoodSchedulesWizard = ({
  scope,
  onCancel,
  onContinue,
  createFoodSchedule: _createFoodSchedule,
  isCreateFoodScheduleLoading: _isCreateFoodScheduleLoading,
}: AddFoodSchedulesWizardProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [datesForm] = Form.useForm<AddFoodSchedulesWizardDatesFormValues>();
  const [basicSettingsForm] =
    Form.useForm<AddFoodSchedulesWizardBasicSettingsFormValues>();

  const [currentStep, setCurrentStep] = useState<AddFoodSchedulesStepIndex>(
    ADD_FOOD_SCHEDULES_STEP_INDEX.SELECT_MEAL
  );
  const [selectedMealType, setSelectedMealType] = useState<number | null>(null);
  const [scheduleDates, setScheduleDates] = useState<
    AddFoodSchedulesWizardScheduleDateItem[]
  >([]);
  const [foods] = useState<AddFoodSchedulesWizardAddFoodItem[]>([]);

  const weekDays = Form.useWatch("weekDays", datesForm);
  const scheduleDateRange = Form.useWatch("scheduleDateRange", datesForm);
  const pattern = Form.useWatch("pattern", datesForm);

  //* ================================ Effects  ================================
  useEffect(() => {
    if (pattern !== ADD_FOOD_SCHEDULES_PATTERN.WEEKLY) {
      setScheduleDates([]);
      return;
    }

    const [startIso, endIso] = scheduleDateRange ?? [];
    if (!startIso || !endIso || !weekDays?.length) {
      setScheduleDates([]);
      return;
    }

    setScheduleDates((previousItems) =>
      buildWeeklyScheduleDates({
        startIso,
        endIso,
        weekDays,
        previousItems,
      })
    );
  }, [pattern, scheduleDateRange, weekDays]);

  //* ================================ Util Functions ================================
  const handleSelectMealContinue = () => {
    if (selectedMealType == null) {
      return;
    }

    datesForm.setFieldsValue({
      pattern: ADD_FOOD_SCHEDULES_PATTERN.WEEKLY,
    });
    setCurrentStep(ADD_FOOD_SCHEDULES_STEP_INDEX.DATES);
  };

  const handleDatesBack = () => {
    setCurrentStep(ADD_FOOD_SCHEDULES_STEP_INDEX.SELECT_MEAL);
  };

  const handleDatesContinue = () => {
    if (selectedMealType == null) {
      return;
    }

    setCurrentStep(ADD_FOOD_SCHEDULES_STEP_INDEX.BASIC_SETTINGS);
  };

  const handleBasicSettingsBack = () => {
    setCurrentStep(ADD_FOOD_SCHEDULES_STEP_INDEX.DATES);
  };

  const handleBasicSettingsContinue = () => {
    if (selectedMealType == null) {
      return;
    }

    setCurrentStep(ADD_FOOD_SCHEDULES_STEP_INDEX.ADD_FOOD);
  };

  const handleAddFoodBack = () => {
    setCurrentStep(ADD_FOOD_SCHEDULES_STEP_INDEX.BASIC_SETTINGS);
  };

  const handleAddFood = () => {};

  const handleAddFoodContinue = () => {
    if (selectedMealType == null || foods.length === 0) {
      return;
    }

    onContinue?.({
      mealType: selectedMealType,
      datesStep: datesForm.getFieldsValue(true),
      scheduleDates,
      basicSettingsStep: basicSettingsForm.getFieldsValue(true),
      foods,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard padding={PADDING_40} className="flex w-full flex-col gap-10">
      <Steps
        className="body-regular w-full"
        current={currentStep}
        orientation={screens.lg ? "horizontal" : "vertical"}
        size="small"
        items={[...ADD_FOOD_SCHEDULES_STEP_ITEMS]}
      />

      {currentStep === ADD_FOOD_SCHEDULES_STEP_INDEX.SELECT_MEAL ? (
        <>
          <div className="flex w-full flex-col gap-2">
            <CustomAlert
              className="border-primary-4 bg-primary-1 rounded-lg border-dashed"
              type="info"
              showIcon
              title="انتخاب وعده"
              description="لطفاً وعده غذایی موردنظر جهت ایجاد برنامه را مشخص نمایید."
            />
            <CustomAlert
              className="border-yellow-3 bg-yellow-1 rounded-lg border-dashed"
              type="warning"
              showIcon
              title="توجه!"
              description="هر برنامه غذایی فقط مربوط به یک وعده خواهد بود. اگر می‌خواهید چند وعده مختلف داشته باشید، باید برای هر کدام یک برنامه جداگانه ایجاد کنید."
            />
          </div>

          <div
            className="flex w-full flex-1 flex-wrap gap-6"
            role="listbox"
            aria-label="انتخاب وعده"
          >
            {MEAL_TYPE_OPTIONS.map((mealType) => {
              const isSelected = selectedMealType === mealType;

              return (
                <button
                  key={mealType}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`h4-medium flex min-w-[142px] flex-1 cursor-pointer items-center justify-center rounded-lg border p-3 font-[inherit] transition-[border-color,color,background-color] duration-200 ease-in-out ${
                    isSelected
                      ? "border-primary-6 bg-primary-1 text-primary-6"
                      : "border-neutral-4 bg-neutral-1 text-neutral-7 hover:border-primary-4 hover:text-primary-6"
                  }`}
                  onClick={() => setSelectedMealType(mealType)}
                >
                  {CATERING_ORDER_MEAL_TYPES_LABELS[mealType]}
                </button>
              );
            })}
          </div>

          <div className="flex w-full flex-wrap gap-4">
            <CustomButton
              type="primary"
              className="min-w-[120px]"
              disabled={selectedMealType == null}
              onClick={handleSelectMealContinue}
            >
              ثبت و ادامه
            </CustomButton>
            <CustomButton
              type="default"
              danger
              className="min-w-[120px]"
              onClick={onCancel}
            >
              انصراف
            </CustomButton>
          </div>
        </>
      ) : null}

      {currentStep === ADD_FOOD_SCHEDULES_STEP_INDEX.DATES ? (
        <AddFoodSchedulesWizardDatesStep
          form={datesForm}
          scope={scope}
          scheduleDates={scheduleDates}
          onBack={handleDatesBack}
          onContinue={handleDatesContinue}
        />
      ) : null}

      {currentStep === ADD_FOOD_SCHEDULES_STEP_INDEX.BASIC_SETTINGS ? (
        <AddFoodSchedulesWizardBasicSettingsStep
          form={basicSettingsForm}
          scope={scope}
          onBack={handleBasicSettingsBack}
          onContinue={handleBasicSettingsContinue}
        />
      ) : null}

      {currentStep === ADD_FOOD_SCHEDULES_STEP_INDEX.ADD_FOOD ? (
        <AddFoodSchedulesWizardAddFoodStep
          foods={foods}
          onAddFood={handleAddFood}
          onBack={handleAddFoodBack}
          onContinue={handleAddFoodContinue}
        />
      ) : null}
    </CustomCard>
  );
};

export default AddFoodSchedulesWizard;

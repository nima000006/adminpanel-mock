import { AiOutlinePlus } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import { AddFoodSchedulesWizardAddFoodStepProps } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/components/AddFoodSchedulesWizardAddFoodStep/@types/@addFoodSchedulesWizardAddFoodStep";
import { ADD_FOOD_SCHEDULES_ADD_FOOD_ALERT_DESCRIPTION } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/utils/addFoodSchedulesWizardUtils";

const AddFoodSchedulesWizardAddFoodStep = ({
  foods,
  onAddFood,
  onBack,
  onContinue,
}: AddFoodSchedulesWizardAddFoodStepProps) => {
  const foodsCount = foods.length;
  const hasFoods = foodsCount > 0;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full flex-col gap-6">
      <CustomAlert
        className="border-primary-4 bg-primary-1 w-full rounded-lg border-dashed"
        type="info"
        showIcon
        title="افزودن غذا به برنامه غذایی"
        description={ADD_FOOD_SCHEDULES_ADD_FOOD_ALERT_DESCRIPTION}
      />

      <div className="flex w-full flex-1 flex-col gap-6">
        <div className="flex w-full items-center gap-4">
          <div className="min-w-0 flex-1">
            <CustomDivider
              text={`غذاها (${foodsCount})`}
              plain={false}
              titleClassName="h4-medium"
            />
          </div>
          <CustomButton
            type="primary"
            htmlType="button"
            icon={<AiOutlinePlus />}
            onClick={onAddFood}
          >
            افزودن غذا
          </CustomButton>
        </div>

        {hasFoods ? null : (
          <CustomEmpty
            description={
              <>
                در حال حاضر غذایی برای نمایش وجود ندارد.
                <br />
                برای افزودن غذا، روی «افزودن غذا» کلیک کنید.
              </>
            }
          />
        )}
      </div>

      <div className="flex w-full flex-wrap gap-4">
        <CustomButton
          type="primary"
          className="min-w-[120px]"
          disabled={!hasFoods}
          onClick={onContinue}
        >
          ثبت و ادامه
        </CustomButton>
        <CustomButton type="default" className="min-w-[120px]" onClick={onBack}>
          بازگشت
        </CustomButton>
      </div>
    </div>
  );
};

export default AddFoodSchedulesWizardAddFoodStep;

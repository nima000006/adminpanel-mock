import { CustomButton } from "@components/CustomInputs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { AddFoodSchedulesWizardDatesStepDateCardProps } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/helper/components/AddFoodSchedulesWizardDatesStep/helper/components/AddFoodSchedulesWizardDatesStepDateCard/@types/@addFoodSchedulesWizardDatesStepDateCard";

const AddFoodSchedulesWizardDatesStepDateCard = ({
  item,
}: AddFoodSchedulesWizardDatesStepDateCardProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 ${
        item.isDeleted ? "border-dustred-2 bg-dustred-1" : "border-neutral-4 bg-neutral-1"
      }`}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span
          className={`body-regular ${
            item.isDeleted ? "text-dustred-5" : "text-neutral-11"
          }`}
        >
          {item.label}
        </span>

        {item.isHoliday && !item.isDeleted ? (
          <CustomTag color="warning" className="w-fit">
            تعطیل
          </CustomTag>
        ) : null}

        {item.isDeleted ? (
          <CustomTag color="error" className="w-fit">
            حذف شده
          </CustomTag>
        ) : null}
      </div>

      <CustomButton type="default" danger={!item.isDeleted} className="shrink-0">
        {item.isDeleted ? "بازگردانی" : "حذف"}
      </CustomButton>
    </div>
  );
};

export default AddFoodSchedulesWizardDatesStepDateCard;

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { DeleteMyFoodModalContentProps } from "./@types/@deleteMyFoodModalContent";

function DeleteMyFoodModalContent({ title }: DeleteMyFoodModalContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-sm text-(--app-text)">
        <p>از حذف این غذا از قرارداد مطمئن هستید؟</p>
        <p>{dataPlaceHolder({ data: title })}</p>
      </div>
      <CustomAlert
        type="warning"
        showIcon
        description="با حذف این غذا از قرارداد، امکان بازیابی آن وجود نخواهد داشت."
      />
    </div>
  );
}

export default DeleteMyFoodModalContent;

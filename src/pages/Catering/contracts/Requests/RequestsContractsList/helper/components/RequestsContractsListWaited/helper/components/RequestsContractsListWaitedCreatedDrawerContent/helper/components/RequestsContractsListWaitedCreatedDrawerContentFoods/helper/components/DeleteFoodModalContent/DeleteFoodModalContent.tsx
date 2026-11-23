import { dataPlaceHolder } from "@infra/helpers/utils";

import { DeleteFoodModalContentProps } from "./@types/@deleteFoodModalContent";

function DeleteFoodModalContent({ title }: DeleteFoodModalContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-sm text-(--app-text)">
        <p>از حذف این غذا از قرارداد مطمئن هستید؟</p>
        <p>{dataPlaceHolder({ data: title })}</p>
      </div>
    </div>
  );
}

export default DeleteFoodModalContent;

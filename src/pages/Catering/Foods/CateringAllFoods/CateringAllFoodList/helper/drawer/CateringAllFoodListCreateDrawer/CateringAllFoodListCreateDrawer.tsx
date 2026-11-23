import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { CateringAllFoodListCreateDrawerProps } from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/helper/drawer/CateringAllFoodListCreateDrawer/@types/@cateringAllFoodListCreateDrawer";
import CateringAllFoodListCreateDrawerContent from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/helper/drawer/CateringAllFoodListCreateDrawer/helper/components/CateringAllFoodListCreateDrawerContent/CateringAllFoodListCreateDrawerContent";

const CateringAllFoodListCreateDrawer = ({
  open,
  onClose,
  onSuccess,
  mode = "create",
  foodId,
}: CateringAllFoodListCreateDrawerProps) => {
  if (!open) {
    return null;
  }

  return (
    <CustomDrawer
      open={open}
      onClose={onClose}
      closeIcon={<AiOutlineClose />}
      content={
        <CateringAllFoodListCreateDrawerContent
          onCloseDrawer={onClose}
          onSuccess={onSuccess}
          mode={mode}
          foodId={foodId}
        />
      }
    />
  );
};

export default CateringAllFoodListCreateDrawer;

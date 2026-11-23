import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { CateringMyFoodListCreateDrawerProps } from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/helper/drawer/CateringMyFoodListCreateDrawer/@types/@cateringMyFoodListCreateDrawer";
import CateringMyFoodListCreateDrawerContent from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/helper/drawer/CateringMyFoodListCreateDrawer/helper/components/CateringMyFoodListCreateDrawerContent/CateringMyFoodListCreateDrawerContent";

const CateringMyFoodListCreateDrawer = ({
  open,
  onClose,
  onSuccess,
  mode = "create",
  foodId,
}: CateringMyFoodListCreateDrawerProps) => {
  if (!open) {
    return null;
  }

  return (
    <CustomDrawer
      open={open}
      onClose={onClose}
      closeIcon={<AiOutlineClose />}
      content={
        <CateringMyFoodListCreateDrawerContent
          onCloseDrawer={onClose}
          onSuccess={onSuccess}
          mode={mode}
          foodId={foodId}
        />
      }
    />
  );
};

export default CateringMyFoodListCreateDrawer;

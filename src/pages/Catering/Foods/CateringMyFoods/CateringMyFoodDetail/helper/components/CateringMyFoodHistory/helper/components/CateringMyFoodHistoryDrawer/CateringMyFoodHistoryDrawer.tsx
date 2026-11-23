import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetMyFoodHistoryDetailQuery } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import CateringFoodHistoryDrawerContent from "@pages/Catering/Foods/_shared/helper/components/CateringFoodHistory/helper/CateringFoodHistoryDrawerContent/CateringFoodHistoryDrawerContent";
import { CateringMyFoodHistoryDrawerProps } from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/helper/components/CateringMyFoodHistory/helper/components/CateringMyFoodHistoryDrawer/@types/@cateringMyFoodHistoryDrawer";

const CateringMyFoodHistoryDrawer = ({
  open,
  onClose,
  foodId,
  revisionNumber,
}: CateringMyFoodHistoryDrawerProps) => {
  //? ================================  Api Calls ================================
  const { data, isFetching: isGetMyFoodHistoryDetailLoading } =
    useGetMyFoodHistoryDetailQuery(
      {
        id: Number(foodId),
        revisionNumber: Number(revisionNumber),
      },
      {
        skip: !open || !foodId || revisionNumber == null,
        refetchOnMountOrArgChange: true,
      }
    );

  //* ???????????????????????????? Main TSX ???????????????????????????? */
  if (!open) {
    return null;
  }

  return (
    <CustomDrawer
      open={open}
      onClose={onClose}
      closeIcon={<AiOutlineClose />}
      content={
        <CateringFoodHistoryDrawerContent
          data={data}
          isLoading={isGetMyFoodHistoryDetailLoading}
          onClose={onClose}
        />
      }
    />
  );
};

export default CateringMyFoodHistoryDrawer;

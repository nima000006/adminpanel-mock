import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetAllFoodHistoryDetailQuery } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import CateringFoodHistoryDrawerContent from "@pages/Catering/Foods/_shared/helper/components/CateringFoodHistory/helper/CateringFoodHistoryDrawerContent/CateringFoodHistoryDrawerContent";
import { CateringAllFoodHistoryDrawerProps } from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodDetail/helper/components/CateringAllFoodHistory/helper/components/CateringAllFoodHistoryDrawer/@types/@cateringAllFoodHistoryDrawer";

const CateringAllFoodHistoryDrawer = ({
  open,
  onClose,
  foodId,
  revisionNumber,
}: CateringAllFoodHistoryDrawerProps) => {
  //? ================================  Api Calls ================================
  const { data, isFetching: isGetAllFoodHistoryDetailLoading } =
    useGetAllFoodHistoryDetailQuery(
      {
        id: Number(foodId),
        revisionNumber: Number(revisionNumber),
      },
      {
        skip: !open || !foodId || revisionNumber == null,
        refetchOnMountOrArgChange: true,
      }
    );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
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
          isLoading={isGetAllFoodHistoryDetailLoading}
          onClose={onClose}
        />
      }
    />
  );
};

export default CateringAllFoodHistoryDrawer;

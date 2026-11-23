import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetDetailAllSelfsHistoryDetailQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import CateringSelfsHistoryDrawerContent from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsHistory/helper/CateringSelfsHistoryDrawerContent/CateringSelfsHistoryDrawerContent";
import { CateringAllSelfsHistoryDrawerProps } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsHistory/helper/components/CateringAllSelfsHistoryDrawer/@types/@cateringAllSelfsHistoryDrawer";

const CateringAllSelfsHistoryDrawer = ({
  open,
  onClose,
  restaurantId,
  revisionNumber,
}: CateringAllSelfsHistoryDrawerProps) => {
  //? ================================  Api Calls ================================
  const { data, isFetching: isGetDetailAllSelfsHistoryDetailLoading } =
    useGetDetailAllSelfsHistoryDetailQuery(
      {
        id: Number(restaurantId),
        revisionNumber: Number(revisionNumber),
      },
      {
        skip: !open || !restaurantId || revisionNumber == null,
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
        <CateringSelfsHistoryDrawerContent
          data={data}
          isLoading={isGetDetailAllSelfsHistoryDetailLoading}
          onClose={onClose}
        />
      }
    />
  );
};

export default CateringAllSelfsHistoryDrawer;

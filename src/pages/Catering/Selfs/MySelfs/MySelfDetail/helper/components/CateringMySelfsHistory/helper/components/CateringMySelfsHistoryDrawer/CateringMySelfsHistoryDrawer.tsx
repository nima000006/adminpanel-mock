import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetDetailMySelfsHistoryDetailQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import CateringSelfsHistoryDrawerContent from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsHistory/helper/CateringSelfsHistoryDrawerContent/CateringSelfsHistoryDrawerContent";
import { CateringMySelfsHistoryDrawerProps } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsHistory/helper/components/CateringMySelfsHistoryDrawer/@types/@cateringMySelfsHistoryDrawer";

const CateringMySelfsHistoryDrawer = ({
  open,
  onClose,
  restaurantId,
  revisionNumber,
}: CateringMySelfsHistoryDrawerProps) => {
  //? ================================  Api Calls ================================
  const { data, isFetching: isGetDetailMySelfsHistoryDetailLoading } =
    useGetDetailMySelfsHistoryDetailQuery(
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
          isLoading={isGetDetailMySelfsHistoryDetailLoading}
          onClose={onClose}
        />
      }
    />
  );
};

export default CateringMySelfsHistoryDrawer;

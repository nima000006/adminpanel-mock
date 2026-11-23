import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetMyVendorHistoryDetailQuery } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import CateringVendorHistoryDrawerContent from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorHistory/helper/CateringVendorHistoryDrawerContent/CateringVendorHistoryDrawerContent";
import { CateringMyVendorHistoryDrawerProps } from "@pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/components/CateringMyVendorHistory/helper/components/CateringMyVendorHistoryDrawer/@types/@cateringMyVendorHistoryDrawer";

const CateringMyVendorHistoryDrawer = ({
  open,
  onClose,
  vendorId,
  revisionNumber,
}: CateringMyVendorHistoryDrawerProps) => {
  //? ================================  Api Calls ================================
  const { data, isFetching: isGetMyVendorHistoryDetailLoading } =
    useGetMyVendorHistoryDetailQuery(
      {
        id: Number(vendorId),
        revisionNumber: Number(revisionNumber),
      },
      {
        skip: !open || !vendorId || revisionNumber == null,
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
        <CateringVendorHistoryDrawerContent
          data={data}
          isLoading={isGetMyVendorHistoryDetailLoading}
          onClose={onClose}
        />
      }
    />
  );
};

export default CateringMyVendorHistoryDrawer;

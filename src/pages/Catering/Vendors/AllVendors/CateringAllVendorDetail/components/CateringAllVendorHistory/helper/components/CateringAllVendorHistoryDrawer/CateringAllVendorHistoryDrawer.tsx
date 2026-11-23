import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { useGetAllVendorHistoryDetailQuery } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import CateringVendorHistoryDrawerContent from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorHistory/helper/CateringVendorHistoryDrawerContent/CateringVendorHistoryDrawerContent";
import { CateringAllVendorHistoryDrawerProps } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/components/CateringAllVendorHistory/helper/components/CateringAllVendorHistoryDrawer/@types/@cateringAllVendorHistoryDrawer";

const CateringAllVendorHistoryDrawer = ({
  open,
  onClose,
  vendorId,
  revisionNumber,
}: CateringAllVendorHistoryDrawerProps) => {
  //? ================================  Api Calls ================================
  const { data, isFetching: isGetAllVendorHistoryDetailLoading } =
    useGetAllVendorHistoryDetailQuery(
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
          isLoading={isGetAllVendorHistoryDetailLoading}
          onClose={onClose}
        />
      }
    />
  );
};

export default CateringAllVendorHistoryDrawer;

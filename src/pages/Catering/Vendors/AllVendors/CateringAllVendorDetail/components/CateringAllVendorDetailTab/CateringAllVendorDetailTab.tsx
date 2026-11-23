import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetAllVendorViewQuery } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import CateringVendorDetailTabContent from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorDetailTabContent/CateringVendorDetailTabContent";
import CateringAllVendorListCreateAndEditDrawerContent from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/helper/drawer/CateringAllVendorListCreateAndEditDrawerContent/CateringAllVendorListCreateAndEditDrawerContent";

const CateringAllVendorDetailTab = () => {
  const { params } = useQueryParams();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const vendorId = Number(params?.id);

  //? ================================  Api Calls ================================
  const {
    data: allVendorDetail,
    isLoading: isLoadingAllVendorDetail,
    isFetching: isFetchingAllVendorDetail,
    refetch: refetchAllVendorDetail,
  } = useGetAllVendorViewQuery(
    {
      id: vendorId,
    },
    {
      skip: !params?.id,
      refetchOnMountOrArgChange: true,
    }
  );

  //* ================================ Util Functions ================================
  const openEditDrawerHandler = () => {
    setIsEditDrawerOpen(true);
  };

  const closeEditDrawerHandler = () => {
    setIsEditDrawerOpen(false);
  };

  const onEditSuccessHandler = () => {
    refetchAllVendorDetail();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isEditDrawerOpen && (
        <CustomDrawer
          open={isEditDrawerOpen}
          onClose={closeEditDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <CateringAllVendorListCreateAndEditDrawerContent
              onCloseDrawer={closeEditDrawerHandler}
              onSuccess={onEditSuccessHandler}
              mode="edit"
              vendorId={vendorId}
            />
          }
        />
      )}
      <CateringVendorDetailTabContent
        data={allVendorDetail}
        isLoading={isLoadingAllVendorDetail || isFetchingAllVendorDetail}
        onEdit={openEditDrawerHandler}
      />
    </>
  );
};

export default CateringAllVendorDetailTab;

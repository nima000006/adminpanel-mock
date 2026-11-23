import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetMyVendorViewQuery } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import CateringVendorDetailTabContent from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorDetailTabContent/CateringVendorDetailTabContent";
import CateringMyVendorListCreateAndEditDrawerContent from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/helper/drawer/CateringMyVendorListCreateAndEditDrawerContent/CateringMyVendorListCreateAndEditDrawerContent";

const CateringMyVendorDetailTab = () => {
  const { params } = useQueryParams();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const vendorId = Number(params?.id);

  //? ================================  Api Calls ================================
  const {
    data: myVendorDetail,
    isLoading: isLoadingMyVendorDetail,
    isFetching: isFetchingMyVendorDetail,
    refetch: refetchMyVendorDetail,
  } = useGetMyVendorViewQuery(
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
    refetchMyVendorDetail();
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
            <CateringMyVendorListCreateAndEditDrawerContent
              onCloseDrawer={closeEditDrawerHandler}
              onSuccess={onEditSuccessHandler}
              mode="edit"
              vendorId={vendorId}
            />
          }
        />
      )}
      <CateringVendorDetailTabContent
        data={myVendorDetail}
        isLoading={isLoadingMyVendorDetail || isFetchingMyVendorDetail}
        onEdit={openEditDrawerHandler}
      />
    </>
  );
};

export default CateringMyVendorDetailTab;

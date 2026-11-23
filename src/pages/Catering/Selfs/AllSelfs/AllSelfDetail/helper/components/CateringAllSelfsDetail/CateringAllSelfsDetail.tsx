import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetDetailAllSelfQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import CateringSelfsDetail from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsDetail/CateringSelfsDetail";
import AllSelfListDrawerContent from "@pages/Catering/Selfs/AllSelfs/_shared/components/AllSelfListDrawerContent/AllSelfListDrawerContent";

const CateringAllSelfsDetail = () => {
  const { params } = useQueryParams();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  //? ================================  Api Calls ================================
  const {
    data: allSelfDetail,
    isLoading: isLoadingAllSelfDetail,
    isFetching: isFetchingAllSelfDetail,
    refetch: refetchAllSelfDetail,
  } = useGetDetailAllSelfQuery(
    {
      id: Number(params?.id),
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isEditDrawerOpen && (
        <CustomDrawer
          open={isEditDrawerOpen}
          onClose={closeEditDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <AllSelfListDrawerContent
              onCloseDrawer={closeEditDrawerHandler}
              getRestaurantData={refetchAllSelfDetail}
              mode="edit"
              selfId={Number(params?.id)}
            />
          }
        />
      )}
      <CateringSelfsDetail
        data={allSelfDetail}
        isLoading={isLoadingAllSelfDetail || isFetchingAllSelfDetail}
        onEdit={openEditDrawerHandler}
      />
    </>
  );
};

export default CateringAllSelfsDetail;

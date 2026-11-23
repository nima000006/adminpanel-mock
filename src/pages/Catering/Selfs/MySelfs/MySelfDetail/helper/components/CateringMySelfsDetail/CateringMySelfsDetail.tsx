import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetDetailMySelfsQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import CateringSelfsDetail from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsDetail/CateringSelfsDetail";
import MySelfListDrawerContent from "@pages/Catering/Selfs/MySelfs/_shared/components/MySelfListDrawerContent/MySelfListDrawerContent";

const CateringMySelfsDetail = () => {
  const { params } = useQueryParams();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  //? ================================  Api Calls ================================
  const {
    data: mySelfDetail,
    isLoading: isLoadingMySelfDetail,
    isFetching: isFetchingMySelfDetail,
    refetch: refetchMySelfDetail,
  } = useGetDetailMySelfsQuery(
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
            <MySelfListDrawerContent
              onCloseDrawer={closeEditDrawerHandler}
              getRestaurantData={refetchMySelfDetail}
              mode="edit"
              selfId={Number(params?.id)}
            />
          }
        />
      )}
      <CateringSelfsDetail
        data={mySelfDetail}
        isLoading={isLoadingMySelfDetail || isFetchingMySelfDetail}
        onEdit={openEditDrawerHandler}
      />
    </>
  );
};

export default CateringMySelfsDetail;

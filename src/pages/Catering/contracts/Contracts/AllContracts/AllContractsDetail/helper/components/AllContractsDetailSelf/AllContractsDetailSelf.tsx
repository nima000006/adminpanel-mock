import { useGetDetailAllSelfQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { AllContractsDetailSelfProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailSelf/@types/@allContractsDetailSelf";
import CateringSelfsDetail from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsDetail/CateringSelfsDetail";

const AllContractsDetailSelf = ({ restaurantId }: AllContractsDetailSelfProps) => {
  //? ================================  Api Calls ================================
  const {
    data: allSelfDetail,
    isLoading: isLoadingAllSelfDetail,
    isFetching: isFetchingAllSelfDetail,
  } = useGetDetailAllSelfQuery(
    {
      id: Number(restaurantId),
    },
    {
      skip: !restaurantId,
      refetchOnMountOrArgChange: true,
    }
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CateringSelfsDetail
      data={allSelfDetail}
      isLoading={isLoadingAllSelfDetail || isFetchingAllSelfDetail}
    />
  );
};

export default AllContractsDetailSelf;

import { useGetDetailMySelfsQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { MyContractsDetailSelfProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailSelf/@types/@myContractsDetailSelf";
import CateringSelfsDetail from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsDetail/CateringSelfsDetail";

const MyContractsDetailSelf = ({ restaurantId }: MyContractsDetailSelfProps) => {
  //? ================================  Api Calls ================================
  const {
    data: mySelfDetail,
    isLoading: isLoadingMySelfDetail,
    isFetching: isFetchingMySelfDetail,
  } = useGetDetailMySelfsQuery(
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
      data={mySelfDetail}
      isLoading={isLoadingMySelfDetail || isFetchingMySelfDetail}
    />
  );
};

export default MyContractsDetailSelf;

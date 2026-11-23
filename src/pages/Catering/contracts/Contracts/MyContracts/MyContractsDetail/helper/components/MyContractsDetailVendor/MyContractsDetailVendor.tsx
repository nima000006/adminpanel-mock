import { useGetMyVendorViewQuery } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import ContractsDetailVendorContent from "@pages/Catering/contracts/_shared/helper/components/ContractsDetailVendorContent/ContractsDetailVendorContent";
import { MyContractsDetailVendorProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailVendor/@types/@myContractsDetailVendor";

const MyContractsDetailVendor = ({ vendorId }: MyContractsDetailVendorProps) => {
  //? ================================  Api Calls ================================
  const {
    data: myVendorDetail,
    isLoading: isLoadingMyVendorDetail,
    isFetching: isFetchingMyVendorDetail,
  } = useGetMyVendorViewQuery(
    {
      id: Number(vendorId),
    },
    {
      skip: !vendorId,
      refetchOnMountOrArgChange: true,
    }
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <ContractsDetailVendorContent
      data={myVendorDetail}
      isLoading={isLoadingMyVendorDetail || isFetchingMyVendorDetail}
    />
  );
};

export default MyContractsDetailVendor;

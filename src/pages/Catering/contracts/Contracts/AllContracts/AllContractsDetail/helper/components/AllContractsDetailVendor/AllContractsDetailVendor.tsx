import { useGetAllVendorViewQuery } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import ContractsDetailVendorContent from "@pages/Catering/contracts/_shared/helper/components/ContractsDetailVendorContent/ContractsDetailVendorContent";
import { AllContractsDetailVendorProps } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailVendor/@types/@allContractsDetailVendor";

const AllContractsDetailVendor = ({ vendorId }: AllContractsDetailVendorProps) => {
  //? ================================  Api Calls ================================
  const {
    data: allVendorDetail,
    isLoading: isLoadingAllVendorDetail,
    isFetching: isFetchingAllVendorDetail,
  } = useGetAllVendorViewQuery(
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
      data={allVendorDetail}
      isLoading={isLoadingAllVendorDetail || isFetchingAllVendorDetail}
    />
  );
};

export default AllContractsDetailVendor;

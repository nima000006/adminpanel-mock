import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CateringVendorContractsProps,
  CateringVendorContractsRecordType,
} from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorContracts/@types/@cateringVendorContracts";
import CateringVendorContractsTableModels from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorContracts/helper/models/CateringVendorContractsTableModels/CateringVendorContractsTableModels";

const CateringVendorContracts = ({
  data,
  isLoading = false,
}: CateringVendorContractsProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable<CateringVendorContractsRecordType>
      dataSource={data?.content}
      loading={isLoading}
      rowKey="id"
      columns={CateringVendorContractsTableModels()}
      pagination={manualPaginationConfig({
        total: data?.totalElements || 0,
        onChange: (page: number, pageSize: number) => {
          setSearchParams({
            ...url,
            page: page?.toString(),
            pageSize: pageSize?.toString(),
          });
        },
        pageNumber: url?.page ? Number(url.page) : 1,
        defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
      })}
    />
  );
};

export default CateringVendorContracts;

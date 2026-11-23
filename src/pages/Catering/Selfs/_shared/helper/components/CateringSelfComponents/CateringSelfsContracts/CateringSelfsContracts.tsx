import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CateringSelfsContractsProps,
  CateringSelfsContractsRecordType,
} from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsContracts/@types/@cateringSelfsContracts";
import CateringSelfsContractsTableModels from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsContracts/helper/models/CateringSelfsContractsTableModels/CateringSelfsContractsTableModels";

const CateringSelfsContracts = ({
  data,
  isLoading = false,
}: CateringSelfsContractsProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable<CateringSelfsContractsRecordType>
      dataSource={data?.content}
      loading={isLoading}
      rowKey="id"
      columns={CateringSelfsContractsTableModels()}
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

export default CateringSelfsContracts;

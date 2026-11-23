import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CateringVendorHistoryProps,
  CateringVendorHistoryRecordType,
} from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorHistory/@types/@cateringVendorHistory";
import CateringVendorHistoryTableModels from "@pages/Catering/Vendors/_shared/helper/components/CateringVendorHistory/helper/models/CateringVendorHistory/CateringVendorHistoryTableModels";

const CateringVendorHistory = ({
  data,
  isLoading = false,
  onViewHandler,
}: CateringVendorHistoryProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable<CateringVendorHistoryRecordType>
      dataSource={data?.content}
      loading={isLoading}
      rowKey="revisionNumber"
      columns={CateringVendorHistoryTableModels({ onViewHandler })}
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

export default CateringVendorHistory;

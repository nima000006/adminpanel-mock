import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CateringSelfsHistoryProps,
  CateringSelfsHistoryRecordType,
} from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsHistory/@types/@cateringSelfsHistory";
import CateringSelfsHistoryTableModels from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsHistory/helper/models/CateringSelfsHistoryTableModels/CateringSelfsHistoryTableModels";

const CateringSelfsHistory = ({
  data,
  isLoading = false,
  onViewHandler,
}: CateringSelfsHistoryProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable<CateringSelfsHistoryRecordType>
      dataSource={data?.content}
      loading={isLoading}
      rowKey="revisionNumber"
      columns={CateringSelfsHistoryTableModels({ onViewHandler })}
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

export default CateringSelfsHistory;

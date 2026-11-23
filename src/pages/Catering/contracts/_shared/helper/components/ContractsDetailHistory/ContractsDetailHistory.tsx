import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  ContractsDetailHistoryProps,
  ContractsDetailHistoryRecordType,
} from "@pages/Catering/contracts/_shared/helper/components/ContractsDetailHistory/@types/@contractsDetailHistory";
import ContractsDetailHistoryTableModel from "@pages/Catering/contracts/_shared/helper/components/ContractsDetailHistory/helper/models/ContractsDetailHistory/ContractsDetailHistoryTableModel";

const ContractsDetailHistory = ({
  data,
  isLoading = false,
  onViewHandler,
}: ContractsDetailHistoryProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable<ContractsDetailHistoryRecordType>
      dataSource={data?.content}
      loading={isLoading}
      rowKey="revisionNumber"
      columns={ContractsDetailHistoryTableModel({ onViewHandler })}
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

export default ContractsDetailHistory;

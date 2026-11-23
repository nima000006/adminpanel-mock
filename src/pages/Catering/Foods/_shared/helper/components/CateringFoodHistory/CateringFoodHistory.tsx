import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CateringFoodHistoryProps,
  CateringFoodHistoryRecordType,
} from "@pages/Catering/Foods/_shared/helper/components/CateringFoodHistory/@types/@cateringFoodHistory";
import CateringFoodHistoryTableModels from "@pages/Catering/Foods/_shared/helper/components/CateringFoodHistory/helper/models/CateringFoodHistory/CateringFoodHistoryTableModels";

const CateringFoodHistory = ({
  data,
  isLoading = false,
  onViewHandler,
}: CateringFoodHistoryProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable<CateringFoodHistoryRecordType>
      dataSource={data?.content}
      loading={isLoading}
      rowKey="revisionNumber"
      columns={CateringFoodHistoryTableModels({ onViewHandler })}
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

export default CateringFoodHistory;

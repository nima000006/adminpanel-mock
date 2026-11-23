import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CateringSelfsFoodScheduleProps,
  CateringSelfsFoodScheduleRecordType,
} from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsFoodSchedule/@types/@cateringSelfsFoodSchedule";
import CateringSelfsFoodScheduleTableModels from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsFoodSchedule/helper/models/CateringSelfsFoodScheduleTableModels/CateringSelfsFoodScheduleTableModels";

const CateringSelfsFoodSchedule = ({
  data,
  isLoading = false,
}: CateringSelfsFoodScheduleProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable<CateringSelfsFoodScheduleRecordType>
      dataSource={data?.content}
      loading={isLoading}
      rowKey="id"
      columns={CateringSelfsFoodScheduleTableModels()}
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

export default CateringSelfsFoodSchedule;

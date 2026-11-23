import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { AdmissionDetailTariffPricingProps } from "./@types/@admissionDetailTariffPricing";
import { AdmissionDetailTariffPricingTableModel } from "./helper/models/AdmissionDetailTariffPricing/AdmissionDetailTariffPricingTableModel";

const AdmissionDetailTariffPricing = ({
  data,
  totalCount,
  loading,
}: AdmissionDetailTariffPricingProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  return (
    <div>
      <CustomDivider text="قیمت‌گذاری" />
      <CustomTable
        dataSource={data}
        rowKey="id"
        loading={loading}
        columns={AdmissionDetailTariffPricingTableModel}
        pagination={manualPaginationConfig({
          total: totalCount,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...url,
              page: page?.toString(),
              pageSize: pageSize?.toString(),
            });
          },
          pageNumber: url?.page ? Number(url?.page) : 1,
          defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        })}
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(data?.length)}
      />
    </div>
  );
};

export default AdmissionDetailTariffPricing;

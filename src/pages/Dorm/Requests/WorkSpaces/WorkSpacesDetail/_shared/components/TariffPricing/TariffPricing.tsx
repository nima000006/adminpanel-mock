import { Row } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { TariffPricingProps } from "./helper/@types/@tariffPricing";
import TariffPricingTableModel from "./helper/model/TariffPricingTableModel/TariffPricingTableModel";
import "./_tariffPricing.scss";

const TariffPricing = ({ data, loading, countData }: TariffPricingProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="dorm-work-space-pricing-tab-container">
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="نوع زمان بندی"
          value={data?.[0]?.AssociationPriceList_AssociationSchedulingType_title}
        />
        <SingleVerticalWithCol
          label="نیمسال"
          value={data?.[0]?.AssociationPriceList_AssociationAcademicSemester_title}
        />
      </Row>
      <CustomTable
        dataSource={data}
        rowKey="id"
        loading={loading}
        columns={TariffPricingTableModel()}
        pagination={manualPaginationConfig({
          total: countData,
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
        {...TABLE_PROPS(data?.length || 0)}
      />
    </div>
  );
};
export default TariffPricing;

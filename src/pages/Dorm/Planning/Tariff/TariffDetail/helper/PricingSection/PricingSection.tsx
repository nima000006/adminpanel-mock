import { Row } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import DormTariffPricingStepTableModel from "../model/DormTariffPricingStepTableModel";
import { PricingSectionProps } from "./@types/pricingSection";
import "./_pricingSection.scss";

const PricingSection = ({
  countData,
  loading,
  dataSource,
  type,
}: PricingSectionProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  return (
    <div className="dorm-pricing-tab-container">
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="نوع زمان بندی"
          value={dataSource?.[0]?.AssociationPriceList_AssociationSchedulingType_title}
        />
        <SingleVerticalWithCol
          label="نیمسال"
          value={dataSource?.[0]?.AssociationPriceList_AssociationAcademicSemester_title}
        />
      </Row>
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        columns={DormTariffPricingStepTableModel(type)}
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
        {...TABLE_PROPS(dataSource?.length || 0)}
      />
    </div>
  );
};
export default PricingSection;

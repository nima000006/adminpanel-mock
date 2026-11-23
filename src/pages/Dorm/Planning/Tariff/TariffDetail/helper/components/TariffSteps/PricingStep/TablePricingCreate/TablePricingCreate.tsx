import { useEffect } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import DormCreateTariffPricingStepTableModel from "../../../../model/DormCreateTariffPricingStepTableModel";
import {
  GetCreatePricingStepResponse,
  TablePricingViewAndCreateProps,
} from "../@types/@pricingStep";

const TablePricingCreate = ({
  onGetCreatePricingStep,
  loading,
  dormId,
  createDataSource,
  setCreateDataSource,
}: TablePricingViewAndCreateProps) => {
  const { params: url } = useQueryParams();

  //? ================================ Effects ================================
  useEffect(() => {
    onGetCreatePricingStep({
      dormId: dormId?.dormitory?.code,
    })
      .unwrap()
      .then(getCreatePricingStepIsSuccess);
  }, [url?.id]);

  //* ================================ Util Functions ================================
  const getCreatePricingStepIsSuccess = (values: GetCreatePricingStepResponse) => {
    if (values?.status === 200) {
      setCreateDataSource(values?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable
      dataSource={createDataSource}
      rowKey="id"
      loading={loading}
      columns={DormCreateTariffPricingStepTableModel()}
      pagination={{
        ...paginationConfig,
        defaultPageSize: 200,
        pageSizeOptions: ["200"],
      }}
      {...TABLE_PROPS(createDataSource?.length)}
    />
  );
};
export default TablePricingCreate;

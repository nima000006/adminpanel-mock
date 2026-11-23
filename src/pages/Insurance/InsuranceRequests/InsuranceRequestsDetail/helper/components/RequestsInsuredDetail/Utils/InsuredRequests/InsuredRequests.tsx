import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { InsuranceDetailSecondTabListTableModel } from "@infra/models/tableModels/InsuranceTableModels/InsuranceDetailSecondTabList/InsuranceDetailSecondTabList";

import { InsuredRequestsProps } from "./@types/@insuredRequests";
import "./_insuredRequests.scss";

const InsuredRequests = ({ list }: { list: InsuredRequestsProps[] }) => {
  //* ================================ Util Functions ================================
  const insuranceRequestDetailClickHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="insured-requests-container">
      <CustomDivider text="درخواست‌های فرد" />
      <CustomTable
        dataSource={list}
        columns={InsuranceDetailSecondTabListTableModel({
          onInsuranceRequestDetailClickHandler: insuranceRequestDetailClickHandler,
        })}
        pagination={paginationConfig}
        {...TABLE_PROPS(list?.length)}
      />
    </div>
  );
};

export default InsuredRequests;

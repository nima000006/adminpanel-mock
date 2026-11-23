import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { dataSourceTypeArray } from "./@types/@paymentRules";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { PaymentRuleModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/pricing/PaymentRulsModel/PaymentRulsModel";

import "./_paymentRules.scss";

const PaymentRulesTable = () => {
  const correctionClickHandler = () => {};
  const dataSource: dataSourceTypeArray[] = [
    {
      id: 1,
      name: "بلوار لاله",
      managementType: "آزاد",
      nominalCapacity: 22,
      qualityGrade: 1,
      gender: "پسران",
      active: true,
      remainingCapacity: "1",
    },
    {
      id: 2,
      name: "بلوار لاله",
      managementType: "آزاد",
      nominalCapacity: 22,
      qualityGrade: 1,
      gender: "دختران",
      active: true,
      remainingCapacity: "3",
    },
    {
      id: 3,
      name: "بلوار لاله",
      managementType: "آزاد",
      nominalCapacity: 22,
      qualityGrade: 1,
      gender: "متاهلی",
      active: true,
      remainingCapacity: "5",
    },
    {
      id: 4,
      name: "بلوار لاله",
      managementType: "آزاد",
      nominalCapacity: 22,
      qualityGrade: 1,
      gender: "پسران",
      active: true,
      remainingCapacity: "7",
    },
    {
      id: 5,
      name: "بلوار لاله",
      managementType: "دانشگاهی",
      nominalCapacity: 22,
      qualityGrade: 1,
      gender: "دختران",
      active: true,
      remainingCapacity: "2",
    },
    {
      id: 6,
      name: "بلوار لاله",
      managementType: "دانشگاهی",
      nominalCapacity: 22,
      qualityGrade: 1,
      gender: "پسران",
      active: true,
      remainingCapacity: "4",
    },
    {
      id: 7,
      name: "بلوار یاس",
      managementType: "آزاد",
      nominalCapacity: 22,
      qualityGrade: 1,
      gender: "متاهلی",
      active: true,
      remainingCapacity: "6",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="remaining-capacity-container">
      <CustomTable
        dataSource={dataSource}
        columns={
          PaymentRuleModel({
            correctionClickHandler: correctionClickHandler,
          }) as any
        }
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="remaining-capacity-table-container"
      />
    </div>
  );
};
export default PaymentRulesTable;

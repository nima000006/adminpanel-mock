import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import { dataSourceTypeArray } from "./@types/@pricingBasic";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { PaymentRuleModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/pricing/PaymentRulsModel/PaymentRulsModel";

import "./_pricingBasic.scss";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

const PricingBasicTable = () => {
  //  todo[shirin] : this unCommit when create page for navigate
  // const navigate = useNavigate();
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
      name: "بلوار یاس",
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

  //* ================================ Util Functions ================================
  const viewClickHandler = () => {
    //   navigate(`${}?id=${id}`);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="pricing-basic-container">
      <CustomTable
        dataSource={dataSource}
        columns={
          PaymentRuleModel({
            viewClickHandler: viewClickHandler,
          }) as any
        }
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="pricing-basic-table-container"
      />
    </div>
  );
};
export default PricingBasicTable;

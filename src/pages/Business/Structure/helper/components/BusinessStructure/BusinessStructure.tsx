import { useState } from "react";

import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { dataSourceTypeArray } from "./@types/@businessStructure";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { BusinessStructureModel } from "../../../../../../infrastructure/models/tableModels/BusinessTableModel/BusinessStructure/BusinessStructureModel";

import "./_businessStructure.scss";
import { ExcelCodes } from "@infra/config/excel-codes";

const BusinessStructureTable = () => {
  const [dataSource, setDataSource] = useState<dataSourceTypeArray[]>([
    {
      key: 1,
      title: "عنوان در نمودار",
      unitAbove: " عنوان واحد ارشد در ساختار ",
      description: "توضیحات",
    },
    {
      key: 2,
      title: "عنوان در نمودار",
      unitAbove: " عنوان واحد ارشد در ساختار ",
      description: "توضیحات",
    },
    {
      key: 3,
      title: "عنوان در نمودار",
      unitAbove: " عنوان واحد ارشد در ساختار ",
      description: "توضیحات",
    },
    {
      key: 4,
      title: "عنوان در نمودار",
      unitAbove: " عنوان واحد ارشد در ساختار ",
      description: "توضیحات",
    },
    {
      key: 5,
      title: "عنوان در نمودار",
      unitAbove: " عنوان واحد ارشد در ساختار ",
      description: "توضیحات",
    },
  ]);

  const [count, setCount] = useState(2);
  const handleAdd = () => {
    const newData: dataSourceTypeArray = {
      key: count,
      title: "",
      unitAbove: "",
      description: "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const onCheckoutModalClick = () => {
    //id: number
  };
  return (
    <div className="business-structure-container">
      <div className="business-base-action-bar-container">
        <Button type="primary" icon={<AiOutlinePlus />} onClick={handleAdd}>
          سطر جدید
        </Button>
      </div>
      <CustomTable
        dataSource={dataSource}
        columns={
          BusinessStructureModel({ onCheckoutModalClick: onCheckoutModalClick }) as any
        }
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="business-structure-table"
        draggableColumns
        draggableId={ExcelCodes.BUSINESS_BUSINESS_STRUCTURE_TABLE}
      />
    </div>
  );
};
export default BusinessStructureTable;

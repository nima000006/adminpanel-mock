import { useState } from "react";

import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";

import { dataSourceTypeArray } from "./@types/@businessPosition";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { BusinessPositionModel } from "../../../../../../infrastructure/models/tableModels/BusinessTableModel/BusinessPosition/BusinessPositionModel";

import "./_businessPosition.scss";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

const BusinessPositionTable = () => {
  const [dataSource, setDataSource] = useState<dataSourceTypeArray[]>([
    {
      key: 1,
      id: 1,
      title: "عنوان پوزیشن",
      unitAbove: " عنوان واحد در ساختار ",
      seniorPosition: "عنوان پوزیشن ارشد در واحد ساختاری",
      description: "توضیحات",
    },
    {
      key: 2,
      id: 2,
      title: "عنوان پوزیشن",
      unitAbove: " عنوان واحد در ساختار ",
      seniorPosition: "عنوان پوزیشن ارشد در واحد ساختاری",
      description: "توضیحات",
    },
    {
      key: 3,
      id: 3,
      title: "عنوان پوزیشن",
      unitAbove: " عنوان واحد در ساختار ",
      seniorPosition: "عنوان پوزیشن ارشد در واحد ساختاری",
      description: "توضیحات",
    },
    {
      key: 4,
      id: 4,
      title: "عنوان پوزیشن",
      unitAbove: " عنوان واحد در ساختار ",
      seniorPosition: "عنوان پوزیشن ارشد در واحد ساختاری",
      description: "توضیحات",
    },
    {
      key: 5,
      id: 5,
      title: "عنوان پوزیشن",
      unitAbove: " عنوان واحد در ساختار ",
      seniorPosition: "عنوان پوزیشن ارشد در واحد ساختاری",
      description: "توضیحات",
    },
  ]);

  const [count, setCount] = useState(2);
  const handleAdd = () => {
    const newData: dataSourceTypeArray = {
      key: count,
      id: 1,
      title: "",
      description: "",
      unitAbove: "",
      seniorPosition: "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  return (
    <div className="business-position-container">
      <div className="business-base-action-bar-container">
        <Button type="primary" icon={<AiOutlinePlus />} onClick={handleAdd}>
          سطر جدید
        </Button>
      </div>
      <CustomTable
        draggableColumns
        draggableId={ExcelCodes.BUSINESS_BUSINESS_POSITION_TABLE}
        dataSource={dataSource}
        columns={BusinessPositionModel}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
      />
    </div>
  );
};
export default BusinessPositionTable;

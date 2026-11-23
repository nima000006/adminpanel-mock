import { useState } from "react";

import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { dataSourceTypeArray } from "./@types/@businessRoleTable";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { BusinessRoleModel } from "../../../../../../infrastructure/models/tableModels/BusinessTableModel/BusinessRole/BusinessRoleModel";

import "./_businessRoleTable.scss";
import { ExcelCodes } from "@infra/config/excel-codes";

const BusinessRoleTable = () => {
  const [dataSource, setDataSource] = useState<dataSourceTypeArray[]>([
    {
      key: 1,
      id: 1,
      title: "عنوان نقش",
      description: "توضیحات",
      product: "فود",
      access: "21 عدد",
    },
    {
      key: 2,
      id: 2,
      title: "عنوان نقش",
      description: "توضیحات",
      product: "فود",
      access: "21 عدد",
    },
    {
      key: 3,
      id: 3,
      title: "عنوان نقش",
      description: "توضیحات",
      product: "فود",
      access: "21 عدد",
    },
    {
      key: 4,
      id: 4,
      title: "عنوان نقش",
      description: "توضیحات",
      product: "فود",
      access: "21 عدد",
    },
    {
      key: 5,
      id: 5,
      title: "عنوان نقش",
      description: "توضیحات",
      product: "فود",
      access: "21 عدد",
    },
  ]);

  const [count, setCount] = useState(2);
  const handleAdd = () => {
    const newData: dataSourceTypeArray = {
      key: count,
      id: 1,
      title: "",
      description: "",
      product: "",
      access: "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  return (
    <div className="business-role-container">
      <div className="business-base-action-bar-container">
        <Button type="primary" icon={<AiOutlinePlus />} onClick={handleAdd}>
          سطر جدید
        </Button>
      </div>
      <CustomTable
        dataSource={dataSource}
        columns={BusinessRoleModel() as any}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="business-role-table"
        draggableColumns
        draggableId={ExcelCodes.BUSINESS_BUSINESS_ROLE_TABLE_TABLE}
      />
    </div>
  );
};
export default BusinessRoleTable;

import React, { useState } from "react";

import { Button, Popconfirm } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { ColumnTypes, DataType } from "./@types/@businessBaseTable";
import { BusinessBaseTableTypes } from "./UseBusinessBaseTableSelector/@types/@useBusinessBaseTableSelector";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { DENOMINATION } from "../../../../../../infrastructure/models/businessBase";
import "./_businessBaseTable.scss";

const BusinessBaseTable = ({ tableType }: { tableType: BusinessBaseTableTypes }) => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: 1,
      title: "عنوان پارامتر",
      description: "توضیحات",
      operation: "تغییر",
    },
    {
      key: 2,
      title: "عنوان پارامتر",
      description: "توضیحات",
      operation: "تغییر",
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: ColumnTypes = [
    {
      title: "عنوان",
      dataIndex: "title",
      width: "30%",
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      width: "50%",
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?.key)}>
            <a>تغییر</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      title: "",
      description: "",
      operation: "تغییر",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const columns = defaultColumns;
  switch (tableType) {
    case DENOMINATION:
      return (
        <div className="business-base-content-container">
          <div className="business-base-action-bar-container">
            <Button type="primary" icon={<AiOutlinePlus />} onClick={handleAdd}>
              سطر جدید
            </Button>
          </div>

          <CustomTable
            draggableColumns
            draggableId={ExcelCodes.BUSINESS_BUSINESS_BASE_TABLE_TABLE_1}
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={columns}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      );

    default:
      return (
        <div className="business-base-content-container">
          <CustomTable
            draggableColumns
            draggableId={ExcelCodes.BUSINESS_BUSINESS_BASE_TABLE_TABLE_2}
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={columns}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      );
  }
};

export default BusinessBaseTable;

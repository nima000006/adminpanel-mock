import { useState } from "react";

import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { dataSourceTypeArray } from "./@types/@businessStaff";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { BusinessStaffModel } from "../../../../../../infrastructure/models/tableModels/BusinessTableModel/BusinessStaff/BusinessStaffModel";

import "./_businessStaff.scss";
import { ExcelCodes } from "@infra/config/excel-codes";

const BusinessStaffTable = () => {
  const [dataSource, setDataSource] = useState<dataSourceTypeArray[]>([
    {
      key: 1,
      id: 1,
      firstName: "نام کارمند",
      lastName: "نام خانوادگی کارمند",
      userName: "نام کاربری سیستمی",
      pass: "21 عدد",
      position: "14 پوزیشن",
      mobile: "093125686954",
    },
    {
      key: 2,
      id: 2,
      firstName: "نام کارمند",
      lastName: "نام خانوادگی کارمند",
      userName: "نام کاربری سیستمی",
      pass: "21 عدد",
      position: "14 پوزیشن",
      mobile: "093125686954",
    },
    {
      key: 3,
      id: 3,
      firstName: "نام کارمند",
      lastName: "نام خانوادگی کارمند",
      userName: "نام کاربری سیستمی",
      pass: "21 عدد",
      position: "14 پوزیشن",
      mobile: "093125686954",
    },
    {
      key: 4,
      id: 4,
      firstName: "نام کارمند",
      lastName: "نام خانوادگی کارمند",
      userName: "نام کاربری سیستمی",
      pass: "21 عدد",
      position: "14 پوزیشن",
      mobile: "093125686954",
    },
    {
      key: 5,
      id: 5,
      firstName: "نام کارمند",
      lastName: "نام خانوادگی کارمند",
      userName: "نام کاربری سیستمی",
      pass: "21 عدد",
      position: "14 پوزیشن",
      mobile: "093125686954",
    },
  ]);

  const [count, setCount] = useState(2);
  const handleAdd = () => {
    const newData: dataSourceTypeArray = {
      key: count,
      id: 1,
      firstName: "",
      lastName: "",
      userName: "",
      pass: "",
      position: "",
      mobile: "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  return (
    <div className="business-staff-container">
      <div className="business-base-action-bar-container">
        <Button type="primary" icon={<AiOutlinePlus />} onClick={handleAdd}>
          سطر جدید
        </Button>
      </div>
      <CustomTable
        dataSource={dataSource}
        columns={BusinessStaffModel() as any}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        // loading={historyPaymentsIsLoading}
        className="business-staff-table"
        draggableColumns
        draggableId={ExcelCodes.BUSINESS_BUSINESS_STAFF_TABLE}
      />
    </div>
  );
};
export default BusinessStaffTable;

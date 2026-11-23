import { useState } from "react";

import { PiPlus } from "react-icons/pi";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { dataSourceCityTypes } from "./@types/@dataSourceCityTypes";
import InternationalTotalBranchesTableModel from "./helpers/models/InternationalTotalBranchesTableModel/InternationalTotalBranchesTableModel";
import "./_internationalTotalBranches.scss";

const dataSource: dataSourceCityTypes[] = [
  {
    id: 1,
    name: "واحد تهران مرکزی",
  },
  {
    id: 2,
    name: "واحد علوم و تحقیقات",
  },
  {
    id: 3,
    name: "واحد تهران جنوب",
  },
  {
    id: 4,
    name: "واحد تهران شمال",
  },
  {
    id: 5,
    name: "واحد اصفهان (خوراسگان)",
  },
  {
    id: 6,
    name: "واحد مشهد",
  },
  {
    id: 7,
    name: "واحد شیراز",
  },
  {
    id: 8,
    name: "واحد تبریز",
  },
  {
    id: 9,
    name: "واحد کرمانشاه",
  },
  {
    id: 10,
    name: "واحد یزد",
  },
];

const UNIT_ADD_SUCCESSFULLY =
  "واحد(های) مورد نظر شما با موفقیت به لیست واحدهای بین‌الملل اضافه شد.";
const InternationalTotalBranches = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  //* ================================ Util Functions ================================
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const addToInternational = () => {
    toast.success(UNIT_ADD_SUCCESSFULLY, {
      toastId: UNIT_ADD_SUCCESSFULLY,
    });
    setSelectedRowKeys([]);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="international-total-branches-container">
      <CustomDivider
        text="لیست واحد‌های دانشگاهی"
        extraContent={
          <CustomButton
            type="primary"
            disabled={selectedRowKeys.length === 0}
            onClick={addToInternational}
            icon={<PiPlus />}
            iconPlacement="end"
          >
            افزودن به بین‌الملل
          </CustomButton>
        }
      />
      <CustomAlert
        showIcon
        message="راهنما"
        description="با انتخاب واحد دانشگاهی مورد نظر، امکان افزودن آن به فهرست واحدهای دانشگاهی پذیرنده دانشجویان بین‌المللی فراهم می‌شود. بدین ترتیب، دانشجویان بین‌المللی می‌توانند از این واحد دانشگاهی به عنوان یکی از گزینه‌های تحصیلی خود در فرایند پذیرش استفاده نمایند."
        type="info"
        className="custom-alert custom-alert-duplicate"
      />
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        columns={InternationalTotalBranchesTableModel()}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        className="international-total-branches-table-container"
        rowSelection={rowSelection}
      />
    </div>
  );
};
export default InternationalTotalBranches;

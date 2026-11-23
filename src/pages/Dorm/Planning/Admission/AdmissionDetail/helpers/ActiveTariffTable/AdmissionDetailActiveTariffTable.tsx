import { useState } from "react";

import { Key } from "antd/es/table/interface";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import AdmissionDetailActiveTariffLisTableModel from "./Models/AdmissionDetailActiveTariffLisTableModel";

import "./_admissionDetailActiveTariffTable.scss";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

const dataSource = [
  {
    title: "تعرفه شماره یک",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "00:26:00.000",
    endTime: "00:26:00.000",
    id: 1,
  },
  {
    title: "تعرفه شماره یک",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "00:26:00.000",
    endTime: "00:26:00.000",
    id: 2,
  },
  {
    title: "تعرفه شماره یک",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "00:26:00.000",
    endTime: "00:26:00.000",
    id: 3,
  },
  {
    title: "تعرفه شماره یک",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "00:26:00.000",
    endTime: "00:26:00.000",
    id: 4,
  },
];

const AdmissionDetailActiveTariffTable = () =>
  //Todo[Atefeh]: uncomment when APIs got ready
  // {
  // dataSource,
  // }: AdmissionDetailActiveTariffTableProps
  {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys: Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
      },
    };

    return (
      <div className="admission-detail-active-tariff-list-table-container">
        <CustomDivider
          text="تعرفه‌های فعال قابل استفاده"
          extraContent={
            <CustomButton type="primary" ghost>
              خروجی اکسل
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          columns={AdmissionDetailActiveTariffLisTableModel()}
          // pagination={true}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          {...TABLE_PROPS(dataSource?.length)}
          className="admission-detail-active-tariff-list-table"
        />
      </div>
    );
  };

export default AdmissionDetailActiveTariffTable;

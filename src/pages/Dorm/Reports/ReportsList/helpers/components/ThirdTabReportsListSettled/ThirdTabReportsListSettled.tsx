import { useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { ReportsListDebtorsTabType } from "../../../@types/@reportsList";
import ThirdTabReportsListSettledTableModel from "../../models/ThirdTabReportsListSettledTableModel/ThirdTabReportsListSettledTableModel";

const ThirdTabReportsListSettled = () => {
  const [dataSource] = useState<ReportsListDebtorsTabType[]>([
    {
      id: 1,
      firstName: "مجید",
      lastName: "سیانکی",
      MobileNumber: "0912123456789",
      gender: 1, // بانوان
      userGroup: 1, // استاد
      userId: "123654879",
      nationalCode: "0012565987",
      residence: "خوابگاه شهید چمران",
      building: "ساختمان شماره یک",
      room: "اتاق 102",
      unit: "تهران شمال",
      typeSchedule: 1, // ماهانه
      startOfSettlement: "2024-07-11T08:00:41.977Z",
      endOfSettlement: "2024-06-11T08:00:41.977Z",
      settlementDate: "2024-06-11T08:00:41.977Z",
    },
    {
      id: 2,
      firstName: "مجید",
      lastName: "سیانکی",
      MobileNumber: "0912123456789",
      gender: 0, // اقایان
      userGroup: 0, // دانشجو
      userId: "123654879",
      nationalCode: "0012565987",
      residence: "خوابگاه شهید چمران",
      building: "ساختمان شماره یک",
      room: "اتاق 102",
      unit: "تهران شمال",
      typeSchedule: 0, // ترمیک
      startOfSettlement: "2024-07-11T08:00:41.977Z",
      endOfSettlement: "2024-06-11T08:00:41.977Z",
      settlementDate: "2024-06-11T08:00:41.977Z",
    },
    {
      id: 3,
      firstName: "مجید",
      lastName: "سیانکی",
      MobileNumber: "0912123456789",
      gender: 1, // بانوان
      userGroup: 2, // میهمان
      userId: "123654879",
      nationalCode: "0012565987",
      residence: "خوابگاه شهید چمران",
      building: "ساختمان شماره یک",
      room: "اتاق 102",
      unit: "تهران شمال",
      typeSchedule: 2, // روزانه
      startOfSettlement: "2024-04-11T08:00:41.977Z",
      endOfSettlement: "2024-06-11T08:00:41.977Z",
      settlementDate: "2024-06-11T08:00:41.977Z",
    },
    {
      id: 4,
      firstName: "مجید",
      lastName: "سیانکی",
      MobileNumber: "0912123456789",
      gender: 1, // بانوان
      userGroup: 0, // دانشجو
      userId: "123654879",
      nationalCode: "0012565987",
      residence: "خوابگاه شهید چمران",
      building: "ساختمان شماره یک",
      room: "اتاق 102",
      unit: "تهران شمال",
      typeSchedule: 1, // ماهانه
      startOfSettlement: "2024-07-11T08:00:41.977Z",
      endOfSettlement: "2024-06-11T08:00:41.977Z",
      settlementDate: "2024-06-11T08:00:41.977Z",
    },
    {
      id: 5,
      firstName: "مجید",
      lastName: "سیانکی",
      MobileNumber: "0912123456789",
      gender: 1, // بانوان
      userGroup: 0, // دانشجو
      userId: "123654879",
      nationalCode: "0012565987",
      residence: "خوابگاه شهید چمران",
      building: "ساختمان شماره یک",
      room: "اتاق 102",
      unit: "تهران شمال",
      typeSchedule: 1, // ماهانه
      startOfSettlement: "2024-07-11T08:00:41.977Z",
      endOfSettlement: "2024-06-11T08:00:41.977Z",
      settlementDate: "2024-06-11T08:00:41.977Z",
    },
  ]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        columns={ThirdTabReportsListSettledTableModel()}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
      />
    </div>
  );
};
export default ThirdTabReportsListSettled;

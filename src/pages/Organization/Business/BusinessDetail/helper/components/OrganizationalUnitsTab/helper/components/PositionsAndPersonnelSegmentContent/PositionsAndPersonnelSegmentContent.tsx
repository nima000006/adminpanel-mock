import { useState } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  mockDataType,
  personnelListMockDataType,
} from "@pages/Organization/Business/BusinessDetail/helper/components/OrganizationalUnitsTab/helper/components/PositionsAndPersonnelSegmentContent/@types/@positionsAndPersonnelSegmentContent";

import PersonnelListTableModel from "../../models/PersonnelListTableModel";
import PositionUnitTableModel from "../../models/PositionUnitTableModel";
const mockData: mockDataType[] = [
  {
    positionTitle: "صمیم",
    positionType: "موسس",
    activeIn: "4 واحد",
    parentPosition: "هیات امناء",
    unitTitle: "شعبه مرکزی",
    unitType: "موسس",
    createDate: "1403 / 10 / 10",
    lastEditDate: "1403 / 10 / 10",
    creator: "شیرین نجفی",
  },
];

const personnelListMockData: personnelListMockDataType[] = [
  {
    firstName: "شیرین",
    lastName: "نجفی",
    position: "مدیر",
    nationalCode: "123456789",
    personnelCode: "12",
    startDate: "1403 / 10 / 10",
    endDate: "1403 / 10 / 10",
    createDate: "1403 / 10 / 10",
    lastEditDate: "1403 / 10 / 10",
    creator: "شیرین نجفی",
  },
];
const PositionsAndPersonnelSegmentContent = () => {
  const [selectedRowKeys] = useState<React.Key[]>([]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <div>
        <CustomDivider text={"سمت‌های این واحد"} />
        <CustomTable<mockDataType>
          dataSource={mockData}
          columns={PositionUnitTableModel()}
          pagination={paginationConfig}
          rowKey="id"
          rowSelection={{
            type: "radio",
            ...selectedRowKeys,
          }}
          //   loading={}
          {...TABLE_PROPS(mockData?.length)}
        />
      </div>
      <div>
        <CustomDivider text={"لیست پرسنلی سمت انتخاب شده"} />
        <CustomTable<personnelListMockDataType>
          dataSource={personnelListMockData}
          columns={PersonnelListTableModel()}
          pagination={paginationConfig}
          rowKey="id"
          //   loading={}
          {...TABLE_PROPS(personnelListMockData?.length)}
        />
      </div>
    </div>
  );
};
export default PositionsAndPersonnelSegmentContent;

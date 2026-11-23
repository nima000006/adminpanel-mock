import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { BaseInfoDataSourceType } from "./@types/@baseInfoDataSourceType";
import BasicInfoTableModel from "./helper/models/BasicInfoTableModel/BasicInfoTableModel";
import "./_basicInfo.scss";

const BasicInfo = () => {
  useTitle({ text: "اطلاعات پایه" });
  const dataSource: BaseInfoDataSourceType[] = [
    {
      id: 1,
      title: "گروه رشته ها",
      status: "DEFINED",
      records: 5,
      lastedPersonUpdate: "سینا سوجه",
      lastUpdate: "2025-09-23T08:22:39.138033",
    },
    {
      id: 2,
      title: "انواع دلیل",
      status: "UNDEFINED",
      records: 0,
      lastedPersonUpdate: "سینا سوجه",
      lastUpdate: "2025-09-23T08:22:39.138033",
    },
    {
      id: 3,
      title: "برنامه پذیرش",
      status: "UNDEFINED",
      records: 0,
      lastedPersonUpdate: "سینا سوجه",
      lastUpdate: "2025-09-23T08:22:39.138033",
    },
    {
      id: 4,
      title: "واحد های دانشگاهی",
      status: "DEFINED",
      records: 0,
      lastedPersonUpdate: "سینا سوجه",
      lastUpdate: "2025-09-23T08:22:39.138033",
    },
    {
      id: 5,
      title: "افراد",
      status: "DEFINED",
      records: 22,
      lastedPersonUpdate: "سینا سوجه",
      lastUpdate: "2025-09-23T08:22:39.138033",
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="international-base-info">
      <CustomDivider text="اطلاعات پایه" />
      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        columns={BasicInfoTableModel()}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
        className="research-chancellor-list-table"
      />
    </div>
  );
};
export default BasicInfo;

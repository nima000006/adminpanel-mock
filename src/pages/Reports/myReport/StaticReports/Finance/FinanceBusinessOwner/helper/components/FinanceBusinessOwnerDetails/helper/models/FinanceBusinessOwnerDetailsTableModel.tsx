import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  FinanceBusinessOwnerDetailsMockDataType,
  FinanceBusinessOwnerDetailsTabKey,
} from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerDetails/@types/@financeBusinessOwnerDetails";
import { getFirstColumnTitle } from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerDetails/helper/utils";

const FinanceBusinessOwnerDetailsTableModel = (
  activeTab: FinanceBusinessOwnerDetailsTabKey
): CustomColumnType<FinanceBusinessOwnerDetailsMockDataType>[] => [
  {
    title: getFirstColumnTitle(activeTab),
    dataIndex: activeTab,
    key: activeTab,
    width: 240,
    render: (value: string) => value || "-",
  },
  {
    title: "درآمد ناخالص",
    dataIndex: "grossInCome",
    key: "grossInCome",
    width: 220,
    sortable: true,
    render: (value: number) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
        isRial: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
  },
  {
    title: "سهم شرکا (کارمزد)",
    dataIndex: "sharePartnersAmount",
    key: "sharePartnersAmount",
    width: 220,
    sortable: true,
    render: (value: number) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
        isRial: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
  },
  {
    title: "عودت شده به خریداران",
    dataIndex: "turnOverAmount",
    key: "turnOverAmount",
    width: 220,
    sortable: true,
    render: (value: number) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
        isRial: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
  },
  {
    title: "درآمد خالص",
    dataIndex: "netIncome",
    key: "netIncome",
    width: 220,
    sortable: true,
    render: (value: number) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
        isRial: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
  },
];

export default FinanceBusinessOwnerDetailsTableModel;

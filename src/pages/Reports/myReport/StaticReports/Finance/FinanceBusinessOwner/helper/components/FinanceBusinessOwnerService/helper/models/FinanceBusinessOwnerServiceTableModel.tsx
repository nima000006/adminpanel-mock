import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FinanceBusinessOwnerServiceMockDataType } from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerService/@types/@financeBusinessOwnerService";

const FinanceBusinessOwnerServiceTableModel =
  (): CustomColumnType<FinanceBusinessOwnerServiceMockDataType>[] => {
    return [
      {
        title: "سرویس",
        dataIndex: "service",
        key: "service",
        width: 220,
        render: (value: string) => <SamimServiceTag service={value} />,
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
  };
export default FinanceBusinessOwnerServiceTableModel;

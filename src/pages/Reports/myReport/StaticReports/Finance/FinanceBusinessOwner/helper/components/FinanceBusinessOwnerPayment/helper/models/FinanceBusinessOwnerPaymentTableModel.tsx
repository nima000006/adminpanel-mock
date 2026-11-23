import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FinanceBusinessOwnerPaymentMockDataType } from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerPayment/@types/@financeBusinessOwnerPayment";

const FinanceBusinessOwnerPaymentTableModel =
  (): CustomColumnType<FinanceBusinessOwnerPaymentMockDataType>[] => {
    return [
      {
        title: "تاریخ و زمان پرداخت",
        dataIndex: "paymentDate",
        key: "paymentDate",
        width: 220,
        sortable: true,
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm, YYYY/MM/DD ",
          }),
      },
      {
        title: "پرداخت شده",
        dataIndex: "paidAmount",
        key: "paidAmount",
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
        title: "کسب کار",
        dataIndex: "business",
        key: "business",
        width: 220,
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
          }),
      },
      {
        title: "شعبه / واحد (ذینفع)",
        dataIndex: "branch",
        key: "branch",
        width: 220,
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
          }),
      },
      {
        title: "سرویس",
        dataIndex: "service",
        key: "service",
        width: 220,
        render: (value: string) => <SamimServiceTag service={value} />,
      },
    ];
  };

export default FinanceBusinessOwnerPaymentTableModel;

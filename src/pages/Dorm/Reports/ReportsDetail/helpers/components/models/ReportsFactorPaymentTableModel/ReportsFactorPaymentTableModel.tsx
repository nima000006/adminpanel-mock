import { dataPlaceHolder, PriceSeparatorWithExtraNumbers } from "@infra/helpers/utils";

const ReportsFactorPaymentTableModel = [
  {
    title: "درخواست ",
    dataIndex: "request",
    id: "request",
    width: 150,
  },
  {
    title: "نوع درخواست",
    dataIndex: "requestType",
    id: "requestType",
    width: 130,
  },
  {
    title: "نوع اتاق",
    dataIndex: "roomType",
    id: "roomType",
    width: 150,
  },
  {
    title: "نوع زمان بندی",
    dataIndex: "scheduleType",
    id: "scheduleType",
    width: 100,
  },
  {
    title: "مالیات",
    dataIndex: "tax",
    id: "tax",
    width: 100,
  },
  {
    title: "عوارض",
    dataIndex: "payTol",
    id: "payTol",
    width: 100,
  },
  {
    title: "درصد تخفیف",
    dataIndex: "discountPercentage",
    id: "discountPercentage",
    width: 100,
  },
  {
    title: "تخفیف ثابت",
    dataIndex: "staticPercentage",
    id: "staticPercentage",
    width: 100,
  },
  {
    title: "مبلغ(تومان)",
    dataIndex: "price",
    id: "price",
    width: 120,
    render: (value: string) => {
      return dataPlaceHolder({
        data: PriceSeparatorWithExtraNumbers(value),
        isPrice: true,
      });
    },
  },
];
export default ReportsFactorPaymentTableModel;

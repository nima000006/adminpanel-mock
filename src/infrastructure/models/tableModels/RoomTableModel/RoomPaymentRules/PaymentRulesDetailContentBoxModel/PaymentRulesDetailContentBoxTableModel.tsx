import { Radio } from "antd";

export const PaymentRulesDetailContentBoxTableModel = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "درصد",
    dataIndex: "percentage",
    key: "percentage",
    width: 100,
  },
  {
    title: "نسبت به",
    dataIndex: "relatedTo",
    key: "relatedTo",
    width: 100,
    render: () => {
      return (
        <Radio checked={true} className="payment-rule-table-header">
          شروع دوره
        </Radio>
      );
    },
  },
  {
    title: "نسبت زمانی",
    dataIndex: "relatedToTime",
    key: "relatedToTime",
    width: 100,
    render: () => {
      return (
        <Radio checked={true} className="payment-rule-table-header">
          دیر تر
        </Radio>
      );
    },
  },
  {
    title: "چند روز",
    dataIndex: "dayNumber",
    key: "dayNumber",
    width: 100,
  },
];
